<template>
    <div id="app" class="pb-6">
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
html {
	font-size:16px;
}
body {
	background-color: theme('colors.black');
}
body.bm-overlay {
    background: rgba(24,24,30);
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
	overflow: hidden;
    padding-top: 20px;
    position: relative;
}

.nav-wrap::after {
	content: "";
	width: 100%;
    position: absolute;
    bottom: -9px;
    right: 50%;
    height: 10px;
    background-color: #3F51B5;
    transform: rotate(-45deg);
}

.nav-wrap::before {
	content: "";
	width: 100%;
    position: absolute;
    bottom: -9px;
    right: 45%;
	height: 10px;
    background-color: #3f51b58c;
    transform: rotate(-45deg);
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
