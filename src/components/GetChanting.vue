<template>
  <div class="aboutme">
		<h3><b>查題目數</b></h3>
    <div class="form-group">
			<label>你想查詢:</label>
			<select v-model="searchMode">
        <option v-for="(type, index) in searchType" :value="index">{{type}}</option>
      </select>
		</div>

    <div class="form-group" v-if="searchMode==1">
			<label>你想查詢的範圍:</label>
			<select v-model="partnerMode">
        <option v-for="(type, index) in partnerType" :value="index">{{type}}</option>
      </select>
		</div>

    <div class="form-inline">
      <div class="form-group">
        <label>開始日期:</label>(預設一個月)
        <datetimepicker className="datepicker form-control" v-model="startDate"></datetimepicker>
      </div>
    </div>

    <div class="form-inline">
        <label>結束日期:</label>
        <datetimepicker className="datepicker form-control" v-model="stopDate"></datetimepicker>
    </div>
    <br>
    <button class="btn btn-primary" @click="get_chanting">查詢</button>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import DateTimePicker from './subComponents/datetimepicker'

// Vue.use(VueTimepicker)

export default {
  data () {
    return {
      searchMode: 0,
			searchType: [
				"自己的題目數",
				"共戰夥伴的題目數"
			],
			partnerMode: 0,
			partnerType: [
				"圈","區"
			],
      startDate: new Date().AddDay(-30).Format('Y-m-d'),
      stopDate: new Date().Format('Y-m-d'),
      chantings: {}
    }
  },
  components: {
    // "vue-datetime-picker": VueTimepicker
    'datetimepicker': DateTimePicker
  },
	methods: {
    get_chanting () {
      this.chantings = {}
      if (this.searchMode == 0) {
        // this.startDate.match("/\d{4}-\d{2}-\d{2}/") && this.stopDate.match("/\d{4}-\d{2}-\d{2}/")

        Promise.resolve(this.get_onceChantings(this.$store.state.id)).then(function (val) {
          alert('目前累計題目數:' + this.totalChanting + '分鐘')
        }.bind(this))
      } else {
        let promises = []
        if (this.partnerMode == 0) { //圈
          this.$store.state.db.ref('member/' + this.$store.state.user.ring).on('value', function (result) {
            const ring_members = result.val()
            Object.keys(ring_members).map(function (area_id) {
              Object.keys(ring_members[area_id]).map(function (member_id) { // 這段可以抽出來
                //this.members.push(member_id)
                promises.push(this.get_onceChantings(member_id))
              }.bind(this))
            }.bind(this))
            Promise.all(promises).then(function (val) {
              alert('目前' + this.currentRing + '累計題目數:' + this.totalChanting + '分鐘')
            }.bind(this))
          }.bind(this))
        } else if (this.partnerMode == 1) { // 區
          this.$store.state.db.ref('member/' + this.$store.state.user.ring + '/' + this.$store.state.user.area).on('value', function (result) {
            const area_members = result.val()
            Object.keys(area_members).map(function (member_id) {
              //this.members.push(member_id)
              promises.push(this.get_onceChantings(member_id))
            }.bind(this))
            Promise.all(promises).then(function (val) {
              alert('目前' + this.currentArea + '累計題目數:' + this.totalChanting + '分鐘')
            }.bind(this))
          }.bind(this))
        }
      }
    },
    get_onceChantings (id) {
      return this.$store.state.db.ref('chanting/' + id)
        .orderByKey()
        .startAt(this.startDate)
        .endAt(this.stopDate)
        .once('value').then(function (result) {
          this.chantings[this.$store.state.id] = result.val()
          // return 'a'
          // alert('目前累計題目數:' + this.totalChanting + '分鐘')
      }.bind(this))
    }
	},
  computed:	{
    totalChanting () {
      let sum = 0
      let object = this.chantings
      Object.keys(object).map(function (id) {
        Object.keys(object[id]).map(function (date) {
          sum += object[id][date]
        })
      });
      return sum
    },
    currentRing () {
      return this.rings[this.user.ring] + '圈'
    },
    currentArea () {
      return this.areas[this.user.ring][this.user.area] + '區'
    },
    ...mapState({
      user: 'user',
      rings: 'ring',
      areas: 'area',
      leagues: 'league'
    })
  },
	mounted () {
	}
}
</script>

<style scoped>

</style>
