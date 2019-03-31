<template>
<div>
		THIS IS USER PROFILE
		User logged as : {{userLogged}}
		{{profile}}
		<br/>
		<b-button variant="primary" @click="changeProfile">change profile</b-button>

<b-container>
<b-navbar toggleable="sm" type="light" >

	<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

	<b-collapse id="nav-collapse" is-nav>
	<b-navbar-nav>
		<b-nav-item href="#">My Account</b-nav-item>
		<b-nav-item href="#">My dates</b-nav-item>
		<b-nav-item href="#">My Points</b-nav-item>
		<b-nav-item href="#">My Comments</b-nav-item>
		<b-nav-item href="#">My Notifications</b-nav-item>

	</b-navbar-nav>

	</b-collapse>
</b-navbar>
</b-container>

<b-container>
	<b-row>
		<b-col>
			<h5>Your photo</h5>
			<b-row>
				<b-col>
					<b-img v-bind="imageProps"></b-img>
					<input type="file" @change="onFileChange"/>
					<b-col class="btn-group-save-image">
						<b-btn class="m-2">Save</b-btn>
						<b-btn class="m-2">Cancel</b-btn>
					</b-col>
					{{file }}
				</b-col>
				<b-col>
					<h4><small>Hello</small> {{userLogged.name}}</h4>
				</b-col>
			</b-row>
		</b-col>
		<b-col>
			<h5>Date to another people?</h5>
		</b-col>
	</b-row>
</b-container>



</div>
</template>
<script>

import { mapState, mapActions } from 'vuex';
import Vue from 'vue';

Vue.filter('json', function (value) {
    return JSON.stringify(value);
});

export default {
	name:'Profile',
	data: ()=>({
		imageProps: { 
			src: require('../assets/profile.png'),
			title: 'your photo\'s profile',
			width: 75, 
			height: 75, 
		},
		file: null
	}),
	methods: {
		...mapActions([
			'changeProfile'
		]),
		onFileChange(e) {
			console.log(this.imageProps);
			let input = e.target;
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = (e)=>{
					this.imageProps.src = e.target.result;
				}

				reader.readAsDataURL(input.files[0]);
			}
		}
	},
	computed: {
		...mapState([
            'userLogged','profile'
        ])
	},
	mounted() {
		console.log(this.userLogged);
	},
	watch: {
		file: function (val) {
      		console.log(val);
    	},
	}
}
</script>