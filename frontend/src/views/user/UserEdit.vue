<template>
  <div class="user">
    <h1>User</h1>
      <div class="container">
        {{ $route.params.id }}
  	     <FormUserComponent :editUser="$route.params.user"/>
        }
        }
      </div>
  </div>
</template>
<script>

import FormUserComponent from '@/components/FormUserComponent.vue';

  export default {
  	name: 'UserEdit',

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