<template>
  <div class="user">
    <h1>User</h1>
      <div class="container">
  	     <FormUserComponent />
      </div>
  </div>
</template>
<script>

import FormUserComponent from '@/components/FormUserComponent.vue';

  export default {
  	name: 'UserNew',
    
    data() {
      return {
 
      }
    },
    components:{FormUserComponent},
    methods:{
      
    },
	mounted () {

  	},

  }
</script>