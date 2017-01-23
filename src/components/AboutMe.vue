<template>
  <div class="aboutme">
		<h3><b>關於我</b></h3>
		<div class="form-group">
			<label>所屬圈:</label>
			<select class="form-control" placeholder="所屬圈" v-model="user.ring" :disabled="!isEdit" @change="user.area = 0">
				<option v-for="(ring,index) in rings" :value="index">{{ring}}圈</option>
			</select>
		</div>
		<div class="form-group">
			<label>所屬區:</label>
			<select class="form-control" placeholder="所屬區" v-model="user.area" :disabled="!isEdit">
				<option v-for="(area,index) in currentArea" :value="index">{{area}}區</option>
			</select>
		</div>
		<div class="form-group">
			<label>姓名:</label>
			<input type="text" class="form-control" placeholder="姓名" v-model="user.name" :readonly="!isEdit">
		</div>
		<div class="form-group">
			<label>每日題目目標數:</label>
			<input type="text" class="form-control" placeholder="每日題目目標數" v-model="user.dailyTarget" :readonly="!isEdit">
		</div>
		<button v-show="!isEdit" class="btn btn-default" @click="isEdit = !isEdit">修改</button>
		<button v-show="isEdit" class="btn btn-info" @click="save">存檔</button>
		<!--<br>
		{{user|json}}<br>
    {{login_msg|json}}<br>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      isEdit: false
    }
  },
	methods: {
    save () {
      this.isEdit = !this.isEdit
      this.$store.dispatch('UPDATE_USER')
    }
	},
  computed: {
		currentArea () {
				return this.areas[this.user.ring]
		},
		...mapState({
			user: 'user',
			rings: 'ring',
			areas: 'area',
			leagues: 'league'
		})
	},
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
