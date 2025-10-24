<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import logo from '$lib/assets/MunchiMapsLogo.png';
	import helpCircle from '$lib/assets/help-circle.svg';
	import ThemeSwitch from '$lib/ThemeSwitch.svelte';

	let { children } = $props();
</script>

<style>
	nav {
		background-color: rgba(255, 255, 255, 0.8) !important;
		backdrop-filter: blur(10px);
		position: relative;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em 1em 0.5em 1em;
	}
	
	nav img {
		padding: 0 !important;
	}

	.help-button {
		border: none;
		border-radius: 50px;
		transition: all 0.3s ease; /* Add transition for smooth animation */
	}

	.help-button:hover {
		transform: scale(1.1); /* Increase the size of the button */
	}
	.help-button-img {
		height: 30px; /* Adjust the height of the image */
		width: auto; /* Maintain the aspect ratio */
		border-radius: 50px;
	}
</style>

<nav>
	<img alt="logo" src={logo} width="300"/>
	<ThemeSwitch/>
	<button class="help-button" aria-label="Help">
		<img alt="help" src={helpCircle} class="help-button-img" width="50"/>
	</button>
	
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
