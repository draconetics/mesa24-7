<template>
	<b-container>
		<b-row class="m-5">
			<b-col class="card-login p-5">
				<Alert  v-if="(error != null)" :message="error"/>

				<FormRegister/>
			</b-col>
			<b-col class="card-login p-5">
				<FormSocialNetwork/>
			</b-col>
		</b-row>
	</b-container>
</template>
<script>

import FormSocialNetwork from '@/components/FormSocialNetworkComponent.vue'
import FormRegister from '@/components/FormRegisterComponent.vue';
import Alert from '@/components/AlertComponent.vue';
import { mapState } from 'vuex';

export default {
	name: 'Register',
	components: {
		FormRegister, Alert, FormSocialNetwork
	},
	computed: {
		...mapState([
			'error'
		])
	}
}

</script>

<style>
	.card-login {
		//background-color: red;
		border: 1px solid rgba(0,0,0,0.1);

	}
</style>