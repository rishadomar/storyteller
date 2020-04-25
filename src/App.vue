<template>
    <div id="app" class="py-6">
		<div class="nav-wrap flex items-center justify-between px-4">
			<Logo />
			<div id="nav" class="">
				<Slide  :crossIcon="true">
					<router-link to="/">Home</router-link>
					<router-link to="/about">About</router-link>
				</Slide>
			</div>
		</div>
        
        <router-view />
    </div>
</template>

<script>
import Logo from "./components/Logo";
import { Slide } from "vue-burger-menu";
export default {
    components: {
        Logo,
        Slide
    }
};
</script>

<style>
body {
	background-color: theme('colors.black');
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 auto;
    background-color: theme('colors.black');
	min-height: 100vh;
	max-width: 400px;
}

.nav-wrap {
	border-bottom: 1px solid theme('colors.primary');
    padding-bottom: 20px;
}

#nav {
	position: relative;
}

#nav .bm-burger-button {
	position: relative;
	left: auto;
	top: auto;
	height: 20px;
	width: 25px;
}
#nav .bm-burger-button .bm-burger-bars {
	background-color: theme('colors.primary');
}

#nav a {
    font-weight: bold;
    color: theme('colors.primary');
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
