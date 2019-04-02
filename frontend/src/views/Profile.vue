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
					<input type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()"/>

					<b-col class="btn-group-save-image">
						<b-btn class="m-2" @click="saveImage">Save</b-btn>
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
import axios from 'axios';

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
		file: null,
		showPreview: null,
		imagePreview: null,
		oldImageId: 0,
	}),
	methods: {
		...mapActions([
			'changeProfile'
		]),
	handleFileUpload(){
		/*
		Set the local file variable to what the user has selected.
		*/
		this.file = this.$refs.file.files[0];

		/*
		Initialize a File Reader object
		*/
		let reader  = new FileReader();

		/*
		Add an event listener to the reader that when the file
		has been loaded, we flag the show preview as true and set the
		image to be what was read from the reader.
		*/
		reader.addEventListener("load", function () {
			this.showPreview = true;
			this.imagePreview = reader.result;
		}.bind(this), false);

		/*
		Check to see if the file is not empty.
		*/
		if( this.file ){
		/*
		Ensure the file is an image file.
		*/
			if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
			/*
			Fire the readAsDataURL method which will read the file in and
			upon completion fire a 'load' event which we will listen to and
			display the image in the preview.
			*/
				reader.readAsDataURL( this.file );
			}
		}
	},
		saveImage() {
			/*
			Initialize the form data
			*/
			console.log('save image');
			let formData = new FormData();

			/*
			Add the form data we need to submit
			*/
			formData.append('file', this.file);

			/*
			Make the request to the POST /single-file URL
			*/
			axios.post( 'http://localhost:3000/api/user/profile/upload',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						'x-data-image': 0,
						'x-data-user': this.userLogged._id,
					}
				}).then(function(data){
					console.log('SUCCESS!!');
					console.log(data);
				}).catch(function(){
					console.log('FAILURE!!');
				});
		}
	},
	computed: {
		...mapState([
            'userLogged','profile'
        ])
	},
	mounted() {
		//console.log(this.userLogged);
		if (this.userLogged.image)
			this.oldImageId = this.userLogged.image.metadata._id;
	},
	watch: {
		file: function (val) {
      		console.log(val);
    	},
	}
}
</script>