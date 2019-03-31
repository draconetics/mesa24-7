<template>
	<b-container >
		<b-row class="justify-content-xs-center p-5 mx-5">
			<b-col class="card-login p-5 ">
			<b-form @submit="onSubmit" @reset="onReset" >
				{{userLogged}}
				
				<Alert  v-if="(error != null)" :message="error"/>
				
				<b-form-group
				id="groupEmail"
				label="Email address:"
				label-for="email"
				description="We'll never share your email with anyone else.">
					<b-form-input
					id="email"
					type="email"
					v-model="form.email"
					required />
				</b-form-group>

				<b-form-group
				id="groupPassword"
				label="Password:"
				label-for="password"
				description="Select your password correctly.">
					<b-form-input
					id="password"
					type="password"
					v-model="form.password"
					required/>
				</b-form-group>
				<b-row align-h="around">
				<b-button type="submit" variant="primary">Login</b-button>
				<b-button type="reset" variant="danger" @click.prevent="$router.push('/')">Cancel</b-button>
				</b-row>
			</b-form>
			</b-col>
			<b-col class="card-login p-5 ">
				<FormSocialNetwork/>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>

import FormSocialNetwork from '@/components/FormSocialNetworkComponent.vue'
import Alert from '@/components/AlertComponent.vue';
import { mapActions, mapState } from 'vuex'

export default {
	name:'Login',
	components: {
		Alert, FormSocialNetwork
	},
	data() {
		return {
			form: {
				email:'',
				password:''
			}
		}
	},
	methods: {
		async onSubmit(evt) {
			evt.preventDefault();
			//alert(JSON.stringify(this.form));
			let logged = await this.loginUser(this.form);
			console.log("is user logged??");
			console.log(this.userLogged);
		},
		onReset(evt) {
			evt.preventDefault()
			/* Reset our form values */
			this.form.email = ''
			this.form.password = ''
		},
		...mapActions({
			loginUser: 'loginUser'
		}),
	},
	computed: {
		...mapState(
			['userLogged','error']
		)
	}

}
</script>

<style>
	.card-login {
		border: 1px solid rgba(0,0,0,0.1);
		border-radius: 2px;
	}
</style>