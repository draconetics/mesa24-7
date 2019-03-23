import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	apiUrl:"http://localhost:3000/api/",
  	users:[]
  },
  mutations: {
  		FILL_USERS(state, dataUsers) {
			state.users = dataUsers;
		},
		ADD_USER(state, user) {
			state.users = [...state.users,user];
			//console.log(state.users);
		},
		UPDATE_USER(state, user) {
			const index = state.users.findIndex(item => item._id === user._id);
			//console.log(index);
			//console.log(state.users[index]);
			Vue.set(state.users, index, user);
			//console.log(state.users[index]);
		},
		DELETE_USER(state, id) {
			state.users = state.users.filter((item)=>{
				return (item._id !== id)
			});
			console.log(id);
			console.log(state.users);
			//console.log(state.users);
		}

  },
  actions: {
  		async getUsers ({commit}) {
			let response = await axios.get(this.state.apiUrl + 'user')
								  .then(function (response) {
								    // handle success

								    console.log(response.data);
								    commit('FILL_USERS', response.data);
								  })
								  .catch(function (error) {
								    // handle error
								    console.log(error);
								    throw error;
								  });
			
		},
		addUser({commit},user) {
			console.log(user);
			let response = axios.post(this.state.apiUrl + 'user',{
								    name: user.name,
								    lastname: user.lastname,
								    email: user.email,
								    password: user.password
								  })
								  .then(function (response) {
								    // handle success

								    console.log(response.data);
								    commit('ADD_USER', response.data.user);
								  })
								  .catch(function (error) {
								    // handle error
								    console.log(error);
								    throw error;
								  });
		},
		updateUser({commit},user) {
			console.log(user);
			let response = axios.put(this.state.apiUrl + 'user/' + user._id,{
								    name: user.name,
								    lastname: user.lastname,
								    email: user.email,
								    password: user.password
								  })
								  .then(function (response) {
								    // handle success

								    console.log(response.data);
								    commit('UPDATE_USER', response.data.user);
								  })
								  .catch(function (error) {
								    // handle error
								    console.log(error);
								    throw error;
								  });
		},
		deleteUser({commit},id) {
			console.log(id);
			let response = axios.delete(this.state.apiUrl + 'user/' + id)
								  .then(function (response) {
								    // handle success

								    console.log(response.data);
								    commit('DELETE_USER', id);
								  })
								  .catch(function (error) {
								    // handle error
								    console.log(error);
								    throw error;
								  });
		}

  }
})
