<template>
	<div>
		<input ref="picker" type="text" :value="value" :class="className" @input="updateVal($event.target.value)"/>
	</div>
</template>
<script>

import $ from 'jquery'
import '../../../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js'
import '../../../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.min.css'

export default {
	data () {
		return {
		}
	},
	props: ['value', 'className'],
	methods: {
		updateVal (val) {
			this.$emit('input', val)
			// other way this.$emit('change',newVal), parent @change="function (val) { model = val}"
		}
	},
	computed: {
	},
	mounted () {
		var className = this.className || 'datetimepicker'

		let option = {
			theme: 'dark',
			closeOnDateSelect: true,
			onChangeDateTime: function (dp, $input) {
				this.updateVal($input.val())
			}.bind(this)
		}

		if (className.indexOf('datetimepicker') > -1) {	
			option['format'] = 'Y-m-d H:i:s'
		} else if (className.indexOf('datepicker') > -1) {
			option['timepicker'] = false
			option['format'] = 'Y-m-d'
		} else if(className.indexOf('timepicker') > -1) {
			option['datepicker'] = false
			option['format'] = 'H:i:s'
		}

		this.$nextTick(() => {
			$(this.$refs.picker).datetimepicker(option)
		})

	}
}
</script>
<style scoped>

</style>