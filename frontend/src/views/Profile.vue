<template>
	<div>
		THIS IS USER PROFILE
		User logged as : {{userLogged}}
		{{profile}}
		<br/>
		<b-button variant="primary" @click="changeProfile">change profile</b-button>
	</div>
</template>
<script>

import { mapState, mapActions } from 'vuex';

export default {
	name:'Profile',
	methods: {
		...mapActions([
			'changeProfile'
		])
	},
	computed: {
		...mapState([
            'userLogged','profile'
        ])
	},
	mounted() {
		console.log(this.userLogged);
	}
}
</script>