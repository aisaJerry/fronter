<template src="./index.html"></template>
<script>
	import icon from '@components/icon'
	export default {
		components: {
			icon: icon
		},
		name: 'home',
		data () {
			return {
				
			}
		},
		methods: {
			goLayOut() {
				this.$router.push('/layout');
			}
		},
	}
</script>
<style src="./index.scss" lang="scss" scope></style>