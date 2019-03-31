<template>
<div>
	
	<b-container>
		
		<b-row class="my-1">
			<b-col sm="3">
				<label >Name </label>
			</b-col>
			<b-col sm="9">
				<b-form-input 
				name="name" 
				type="text" 
				v-model="user.name"/>
			</b-col>
		</b-row>
		<b-row class="my-1">
			<b-col sm="3">
				<label >Last Name </label>
			</b-col>
			<b-col sm="9">
				<b-form-input 
				name="lastName" 
				type="text" 
				v-model="user.lastname"/>
			</b-col>
		</b-row>
		<b-row class="my-1">
			<b-col sm="3">
				<label >Email </label>
			</b-col>
			<b-col sm="9">
				<b-form-input 
				name="email" 
				type="text" 
				v-model="user.email"/>
			</b-col>
		</b-row>
		<b-row class="my-1">
			<b-col sm="3">
				<label >Password </label>
			</b-col>
			<b-col sm="9">
				<b-form-input 
				name="password" 
				type="text" 
				v-model="user.password"/>
			</b-col>
		</b-row>
		<hr>
		<b-row class="my-1" align-h="around">

				<b-button 
				variant="success" 
				@click.prevent="saveUser">
					Save
				</b-button>


				<b-button
				flat 
				variant="danger" 
				@click.prevent="$router.push('/')">
					Cancel
				</b-button>

		</b-row>
	</b-container>

</div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
	data() {
		return {
			user: {
				name: '',
				lastname: '',
				email: '',
				password: ''
			}
		}
	},
	methods: {
		...mapActions( [
			'addUserAndLogin',
		]),
	async saveUser(){
		this.addUserAndLogin(this.user);
		//console.log('redirection');
		//this.$router.push({name: 'home'}) 
		//redirect;
	}
},

}
</script>