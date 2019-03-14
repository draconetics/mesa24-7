<template>
  <div>
  	<div class="container">
    <b-form >
      <b-form-group
        id="exampleInputGroup1"
        label="Email address:"
        label-for="exampleInput1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="exampleInput1"
          type="email"
          v-model="form.email"
          required
          placeholder="Enter email" />
      </b-form-group>

      <b-form-group id="exampleInputGroup2" label="Your password" label-for="exampleInput2">
        <b-form-input
          id="exampleInput2"
          type="text"
          v-model="form.password"
          required
          placeholder="Enter name" />
      </b-form-group>

      <b-button type="submit" @click.prevent="signIn" variant="primary">Sign in</b-button>
      
    </b-form>
	</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
      	}
      }
    },
    methods: {
    	signIn() {
    		alert("sign in")
    	}
    }
  }//End export
</script>