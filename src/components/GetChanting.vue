<template>
  <div class="aboutme">
		<h3><b>查題目數</b></h3>
		<select v-model="searchMode">
			<option></option>
		</select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
			]
    }
  },
	methods: {
    
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
