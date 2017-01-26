<template>
  <div class="feedback">
		<h3><b>回報題目數</b></h3>
		<div class="form-group">
      <label>今日題目分鐘數:</label>
			<input type="text" class="form-control" placeholder="今日題目分鐘數" v-model.trim.number="mins" @focus="focusChanting($event)">
		</div>
		<div class="form-group">
      <label>計時小幫手:</label>&nbsp;&nbsp;<span v-show="isCounting">(秒數{{chanting}})</span>
			<div class="form-inline">
				<button v-if="!isCounting" class="btn btn-info" @click="startCounting">開始唱題</button>
				<button v-if="isCounting" class="btn btn-warning" @click="stopCounting">停止</button>
				<button v-if="chanting > 0" class="btn btn-danger" @click="chanting=0">重置</button>
			</div>
		</div>
		<button class="btn btn-primary" @click="update_chanting">送出</button>
		<br>
		<label>
			備註:送出以手機(電腦)時間為主，請務必校正時間
		</label>
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
      chanting: 10000,
      isCounting: false,
			isAlerted: false
    }
  },
	methods: {
		startCounting () {
      this.isCounting = true
			timer = setInterval(function () {
				this.chanting += 1
			}.bind(this), 1000)
		},
		stopCounting () {
      this.isCounting = false
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
			if (this.mins < this.$Store.dailyTarget) {
				if (confirm ('尚未達成今日目標數喔！確定要送出嗎')) {
					Promise.resolve(this.$store.dispatch('UPDATE_CHANTING', { mins: this.mins})).then(function () {
						alert('有空記得把今天的題目補齊喔')
					})
				}
			} else {
				this.$store.dispatch('UPDATE_CHANTING', { mins: this.mins})
			}
			
			
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
