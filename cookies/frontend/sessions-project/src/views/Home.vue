<template>
  <div class="home">
    {{message}}
    <p>Probing cookies</p>
    <button @click.orevent="loginUser">Login User</button>
    <p>Counting the view through cookies {{views}}</p>
    <br/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios';
axios.defaults.withCredentials = true;
export default {
  name: 'home',
  data: ()=>({
  		message: null,
  		views: null
  }),
  components: {
    HelloWorld
  },
  methods: {
  		loginUser() {
  		/*0
      	axios.get("http://localhost:3000/api/login")
  				.then(resp=>{
  					console.log(resp);
  					let login = resp.data.login;
  					this.message = login;
  					let viewsCounter = resp.data.views;
  					this.views = viewsCounter;
  				}).catch(err=>console.log(err));
  			console.log('login user');
*/
      axios({
        method: 'get', 
        url: "http://localhost:3000/api/login",
        headers: {
            Authorization: 'Bearer '
          },
        credentials: 'include',
      })
      .then(resp=>{
            console.log(resp);
            let login = resp.data.login;
            this.message = login;
            let viewsCounter = resp.data.views;
            this.views = viewsCounter;
          }).catch(err=>console.log(err));
        console.log('login user');
      },
  },
}
</script>
