<template>
  <div>
		{{editUser}}
    	<b-container>
		    <b-row class="my-1">
		      <b-col sm="3">
		        <label >Name </label>
		      </b-col>
		      <b-col sm="9">
		        <b-form-input name="name" type="text" v-model="user.name"/>
		        
		      </b-col>
		    </b-row>
		    <b-row class="my-1">
		      <b-col sm="3">
		        <label >Last Name </label>
		      </b-col>
		      <b-col sm="9">
		        <b-form-input name="lastName" type="text" v-model="user.lastname"/>
		      </b-col>
		    </b-row>
		    <b-row class="my-1">
		      <b-col sm="3">
		        <label >Email </label>
		      </b-col>
		      <b-col sm="9">
		        <b-form-input name="email" type="text" v-model="user.email"/>
		      </b-col>
		    </b-row>
		    <b-row class="my-1">
		      <b-col sm="3">
		        <label >Password </label>
		      </b-col>
		      <b-col sm="9">
		        <b-form-input name="password" type="text" v-model="user.password"/>
		      </b-col>
		    </b-row>
		    <hr>
		    <b-row class="my-1">
		      <b-col>
		        <b-button variant="success" @click.prevent="saveUser">Save</b-button>
		      </b-col>
		    </b-row>
		</b-container>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    props: ['editUser'],
    data() {
      return {
        user: {
        	name: (this.editUser)?this.editUser.name:'',
        	lastname: (this.editUser)?this.editUser.lastname:'',
        	email: (this.editUser)?this.editUser.email:'',
        	password: (this.editUser)?this.editUser.password:''
        }
      }
    },
    methods: {
	    ...mapActions( {
	      addUser: 'addUser',
	      updateUser: 'updateUser'
	    } ),
	    saveUser(){
	    	if(this.editUser){
	    		console.log("updating user");
	    		this.user = {...this.user, _id:this.editUser._id};
	    		this.updateUser(this.user);
	    	}
	    	else
	    		this.addUser(this.user);

	    	this.$router.push({name: 'User'}) 
	    	//redirect;
	    }
  	},

  }
</script>