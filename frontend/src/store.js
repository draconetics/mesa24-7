import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	apiUrl:"http://localhost:3000/api/",
  	users:[],
  	userLogged:JSON.parse(localStorage.getItem('user')) || null, //user logged
  	error: null,
  	profile: null,
  	token: localStorage.getItem('token') || null,
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
		},
		SET_ERROR(state, error){
			state.error = error;
		},
		SET_USER_LOGGED(state, userLogged){
			state.userLogged = userLogged;
		},
		SET_PROFILE(state, newProfile){
			state.profile = newProfile;
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
			//let response = axios.post(this.state.apiUrl + 'user',{
			let response = axios.post(this.state.apiUrl + 'user/new',{
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
		addUserAndLogin({commit},user) {
			console.log('add user and log in');
			console.log(user);
			//let response = axios.post(this.state.apiUrl + 'user',{
			let response = axios.post(this.state.apiUrl + 'signup',{
				name: user.name,
				lastname: user.lastname,
				email: user.email,
				password: user.password
			},
			{withCredentials:true})
			.then(function (response) {
				console.log(response.data);
				console.log(response.data.info);
			// handle success
				if(response.data.user == false)
					commit('SET_ERROR', response.data.info);
				else{
					//console.log(data.info);
					commit('SET_USER_LOGGED', response.data.user);

					const parsedUser = JSON.stringify(response.data.user);
					//const parseToken = JSON.stringify(data.token);
					localStorage.setItem('user', parsedUser);
					//localStorage.setItem('token', data.token+"");
					router.push('/');
				}
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
		},
		loginUser ({commit}, payload) {
			console.log('login');
			let tmp = axios.post(this.state.apiUrl + 'login', payload , {withCredentials: true})
				.then(function (response) {
					// handle success
					console.log('user encountered');
					let data = response.data;
					console.log(data);
					if(data.user == false)
						commit('SET_ERROR', data.info);
					else{
						console.log(data.info);
						commit('SET_USER_LOGGED', data.user);

						const parsedUser = JSON.stringify(data.user);
						const parseToken = JSON.stringify(data.token);
      					localStorage.setItem('user', parsedUser);
      					localStorage.setItem('token', data.token+"");
						router.push('/');
					}
				}).catch(function (error) {
					// handle error
					console.log(error);
					//console.log(error.data);
					throw error;
				});
			console.log('finish login');
		},
		loginOut ({commit}) {
			console.log('login');
			let tmp = axios.post(this.state.apiUrl + 'logout', {}, {withCredentials: true})
				.then(function (response) {
					// handle success
					console.log('loginout method store');
					let data = response.data;
					console.log(data);
					commit('SET_ERROR', data.info);
					commit('SET_USER_LOGGED', null);
					localStorage.removeItem('user');
					localStorage.removeItem('token');
					document.cookie = 'passport-session' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
					router.push('/');
				}).catch(function (error) {
					// handle error
					console.log(error);
					//console.log(error.data);
					throw error;
				});
			console.log('finish login');
		},
		resetError({commit}, payload) {
			commit('SET_ERROR', payload);
		},
		setUserLogged({commit}, payload) {
			commit('SET_USER_LOGGED', payload);
		},
		changeProfile({commit}) {
			console.log('this is the token');
			console.log(this.state.token);

			axios({
				method: 'get', 
				url: this.state.apiUrl + 'login/profile',
				headers: {
						Authorization: 'Bearer ' + this.state.token
					}
			})
			//axios.get(, config)
				.then(function (response) {
					// handle success

					let data = response.data;
					console.log(data);
					commit('SET_PROFILE', data.data);
				}).catch(function (error) {
					// handle error
					console.log(error);
					//console.log(error.data);
					throw error;
				});


			
		}
  }
})
