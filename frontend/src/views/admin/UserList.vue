<template>
  <div class="about">
    <h1>This is an about page</h1>
	  <div class="container">
      <router-link to="/user/new">
          <b-button size="sm"  class="mr-2">
            New User
          </b-button>  
      </router-link> 
      
      
	    <b-table hover :items="users" :fields="fields">
        <template slot="operations" slot-scope="row">
            <router-link :to="{ name: 'UserEdit' , params: {  id: row.item._id, user:row.item } }">
                <b-button size="sm" class="mr-2">
                  Edit 
                </b-button>
            </router-link>
          <b-button size="sm" @click="showModal(row.item._id)" class="mr-2">
            Delete
          </b-button>

      </template>
      </b-table>
      

    <b-modal ref="myModalRef" hide-footer title="Warning Message">
          <div class="d-block text-center">
            <h3>Do you want to delete this item?</h3>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="removeUser">Delete</b-button>
          
    </b-modal>

	  </div>
  </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'

  export default {
  	name: 'UserList',

    data() {
      return {
        fields:['name','lastname','email','operations'],
        idUserForDelete: 0
      }
    },
    methods:{

       showModal(id) {
        console.log(id);
        this.$refs.myModalRef.show();
        this.idUserForDelete = id;
      },
      
      removeUser(){
        console.log("deleted"+this.idUserForDelete);
        this.deleteUser(this.idUserForDelete);
        this.$refs.myModalRef.hide();
      },
      ...mapActions( {
        deleteUser: 'deleteUser'
      } )
    },
	mounted () {
    	this.$store.dispatch('getUsers');
  	},
  	computed: mapState([
    	'users'
  	])
  }
</script>