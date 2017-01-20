<template>
  <div class="ablutme">
		<div class="form-group">
			<label>今日題目分鐘數:</label>
			<input type="text" class="form-control" placeholder="今日題目分鐘數" v-model="mins">
		</div>
		<div class="form-group">
			<label>計時小幫手</label>:</label>
			<div class="form-inline">
				<button class="btn btn-info" @click="startCounting">開始唱題</button>
				<button class="btn btn-warning" @click="stopCounting">停止</button>
				<button class="btn btn-danger" @click="chanting=0">重置</button>
			</div>
		</div>
		<button class="btn btn-primary" @click="">送出</button>
		<div class="form-group">
			<h3>{{currentArea}}目前總題目數</h3>
		</div>
		<!--<br>
		{{user|json}}<br>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

let timer
export default {
  data () {
    return {
      chanting: 0
    }
  },
	methods: {
		startCounting () {
			timer = setInterval(function () {
				this.chanting+=20
			}.bind(this), 1000)
		},
		stopCounting () {
			if (timer) {
				clearInterval(timer)
				timer = null
			}
		}
	},
  computed: mapState({
    user: 'user',
    leagues: 'league',
    areas: 'area',
		mins () {
			return Math.floor(this.chanting/60)
		},
		currentArea () {
			return this.areas[this.user.ring][this.user.area] + '區'
		}
  })
}
</script>

<style scoped>
	h3 {
		font-weight: 900;
	}
</style>
