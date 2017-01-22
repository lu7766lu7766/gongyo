<template>
  <div class="ablutme">
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
import Firebase from 'firebase'

export default {
  data () {
    return {
      isEdit: false
    }
  },
	methods: {
    save () {
      this.isEdit = !this.isEdit
      this.$store.commit('user_update')
    }
	},
  computed: mapState({
    user: 'user',
    rings: 'ring',
    areas: 'area',
    leagues: 'league',
		currentArea () {
			return this.areas[this.user.ring]
		}
  })
}
</script>

<style scoped>

</style>
