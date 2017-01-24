<template>
  <div class="feedback">
		<h3><b>回報題目數</b></h3>
		<div class="form-group">
			<label>今日題目分鐘數:</label>
			<input type="text" class="form-control" placeholder="今日題目分鐘數" v-model.trim.number="mins" @focus="focusChanting($event)">
		</div>
		<div class="form-group">
			<label>計時小幫手</label>:</label>
			<div class="form-inline">
				<button class="btn btn-info" @click="startCounting">開始唱題</button>
				<button class="btn btn-warning" @click="stopCounting">停止</button>
				<button class="btn btn-danger" @click="chanting=0">重置</button>
			</div>
		</div>
		<button class="btn btn-primary" @click="update_chanting">送出</button>
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
      chanting: 0,
			isAlerted: false
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
		},
		focusChanting (e) {
			if (!this.isAlerted) {
				alert('立足於天地，但求無愧於心!')
			}
			this.isAlerted = true
			e.target.select()
		},
		update_chanting () {
			this.$store.dispatch('UPDATE_CHANTING', { mins: this.mins})
		}
	},
  computed: { 
		mins: {
			get () {
				return Math.floor(this.chanting / 60)
			},
			set (value) {
				this.chanting = value * 60
			}
		},
		currentArea () {
      return this.areas[this.user.ring][this.user.area] + '區'
		},
		...mapState({
			user: 'user',
			leagues: 'league',
			areas: 'area'
		})
	}
}
</script>

<style scoped>
	h3 {
		font-weight: 900;
	}
</style>
