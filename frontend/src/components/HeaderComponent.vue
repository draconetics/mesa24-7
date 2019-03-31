<template>
<div class="header">
	<b-container class="searcher">
		<b-row class="justify-content-sm-end">

		</b-row>
		<div class="content">
			<div class="header__logo" @click="$router.push('/')">
				<img src="../assets/logoRestaurant.png"/>
			</div>
			<div class="header__form">
				<form >					
					<input type="text" name="search" id="search"/>
					<button @click.prevent="">Search</button>
				</form>
			</div>
		</div>


	</b-container >
	<b-container fluid class="menu">
		<div>
		<b-navbar toggleable="sm" type="light" >

			<b-navbar-toggle target="nav-collapse "></b-navbar-toggle>




			<b-collapse id="nav-collapse" is-nav>


				<b-navbar-nav class="mx-3">
				<b-nav-item-dropdown >
				<!-- Using 'button-content' slot -->
				<template slot="button-content" ><strong>Categories</strong></template>
				<b-dropdown-item href="#">Restaurant List</b-dropdown-item>
				<b-dropdown-item href="#">Restaurant free food by points</b-dropdown-item>
				</b-nav-item-dropdown>
				</b-navbar-nav>

				<b-navbar-nav>
				<b-nav-item href="#" class="mx-3">Blog</b-nav-item>
				<b-nav-item href="#" class="mx-3">New Gastronomic Experiences</b-nav-item>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto" v-if="userLogged != null">
				<b-nav-item-dropdown left>
				<!-- Using 'button-content' slot -->
				<template slot="button-content"><em>Hola, {{userLogged.name}} - My Account</em></template>
				<b-dropdown-item @click="$router.push('/profile')">Profile</b-dropdown-item>
				<b-dropdown-item @click="loginOut">Sign Out</b-dropdown-item>
				</b-nav-item-dropdown>

				<b-nav-item-dropdown right class="ml-3">
				<!-- Using 'button-content' slot -->
				<template slot="button-content">My Points</template>
				<b-dropdown-item href="#">My Points</b-dropdown-item>
				<b-dropdown-item href="#">Recomendations</b-dropdown-item>
				</b-nav-item-dropdown>
				</b-navbar-nav>

				<!-- When user is not logged -->
				<b-navbar-nav class="ml-auto" v-if="userLogged == null">
				<b-dropdown-item @click="$router.push('/login')">Login</b-dropdown-item>
				<b-dropdown-item @click="$router.push('/register')">Register</b-dropdown-item>
				</b-navbar-nav>

			</b-collapse>
		</b-navbar>
		</div>
	</b-container>
</div>
</template>
<script>

import { mapActions, mapState } from 'vuex';

export default {
	name: 'HeaderComponent',
	methods: {
		...mapActions([
			'changeProfile','loginOut'
		]),
		handleScroll() {
			/*
			if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
				console.log("down");
    			let menu = document.getElementsByClassName('menu')[0];
    			menu.classList.remove('menu');
    			menu.classList.add('menu-hidden');
  			} else {
  				console.log("up");
    			let menu = document.getElementsByClassName('menu-hidden')[0];
    			menu.classList.remove('menu-hidden');
    			menu.classList.add('menu');
    			//document.getElementById("myP").className = "";
  			}*/
		}
		
	},
	computed: {
		...mapState([
            'userLogged'
        ])
	},
	created () {
    	window.addEventListener('scroll', this.handleScroll);
  	},
}

</script>

<style>
.header {
	box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
	width: 100%;
	//background-color: rgba(255,255,255,0.9);
	//position: fixed;
}

.content {
	//background-color: red;
	display:flex;	
	flex-direction: column;
}

.header__logo, .header__form {
	display: block;
	margin: 20px auto;
}


@media(min-width: 576px) {
	.content {
		flex-direction: row;
		height: 100px;
		
	}
	.header__logo {
		flex-grow: 2;
		margin: 5px;
	}
	.header__form {
		flex-grow: 8;
		margin: 0;
		padding: 25px;
	}
	.menu {
		visibility: visible;
  		opacity: 1;
		transition: visibility 0s, opacity 0.5s linear;
	}
	.menu-hidden{
		visibility: hidden;
  		opacity: 0;
	}
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

