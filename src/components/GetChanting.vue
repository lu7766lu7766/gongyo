<template>
  <div class="aboutme">
		<h3><b>查題目數</b></h3>
    <div class="form-group">
			<label>你想查詢？:</label>
			<select v-model="searchMode">
        <option v-for="(type, index) in searchType" :value="index">{{type}}</option>
      </select>
		</div>

    <div class="form-group" v-if="searchMode==1">
			<label>你想查詢的範圍？:</label>
			<select v-model="partnerMode">
        <option v-for="(type, index) in partnerType" :value="index">{{type}}</option>
      </select>
		</div>

    <div class="form-inline">
        <label>開始時間:</label>
        <vue-datetime-picker class="vue-picker3"
                              :model.sync="startDate"
                              type="date"
                              language="en-US"
                              date-format="L">
          </vue-datetime-picker>
    </div>

    <div class="form-inline">
        <label>結束時間:</label>
        <vue-datetime-picker class="vue-picker3"
                              :model.sync="stopDate"
                              type="date"
                              language="en-US"
                              date-format="L">
          </vue-datetime-picker>
    </div>

    <button class="btn btn-primary" @click="get_chanting">查詢</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
      startDate: '',
      stopDate: '',
      chantings: {}
    }
  },
  components: {
    "vue-datetime-picker": VueTimepicker
  },
	methods: {
    get_chanting () {
      if (this.searchMode == 0) {
        this.$store.state.db.ref('chanting/' + this.$store.state.id)
          .startAt(this.startDate)
          .endAt(this.stopDate)
          .on('value', function (result) {
            chantings = result.val()
        })
      } else {
        if (this.partnerMode == 0) {

        } else {

        }
      }
    }
	},
  computed:
	mapState({
    user: 'user',
    rings: 'ring',
    areas: 'area',
    leagues: 'league',
		currentArea () {
      return this.areas[this.user.ring]
		}
  }),
	mounted () {
		// 不先取，select會讀不到值，屬性會被刷成空值
		Promise.all([this.$store.dispatch('GET_RING'),this.$store.dispatch('GET_AREA')]).then(()=>{
			this.$store.dispatch('GET_USER')
		})
	}
}
</script>

<style scoped>

</style>
