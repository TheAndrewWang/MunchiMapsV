<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import logo from '$lib/assets/MunchiMapsLogo.png';
	import helpCircle from '$lib/assets/help-circle.svg';
	import ThemeSwitch from '$lib/ThemeSwitch.svelte';
	import Overlay from '$lib/Overlay.svelte';

	let { children } = $props();

	import {isOverlayOpen} from '$lib/stores/OverlayStore'; // Import variable to check if overlay is open
</script>

<style>
	nav {
		background-color: rgb(255, 255, 255) !important;
		backdrop-filter: blur(10px);
		position: relative;
		z-index: 1000;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em 1em 0.5em 1em;
		transition: background-color 0.2s ease-in-out;
	}
	
	:global(.dark) nav {
		background-color: rgba(17, 24, 39, 0.8) !important;
	}
	
	nav img {
		padding: 0 !important;
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.help-button {
		border: none;
		border-radius: 50px;
		transition: all 0.3s ease; /* Add transition for smooth animation */
		background: transparent;
	}

	.help-button:hover {
		transform: scale(1.1); /* Increase the size of the button */
	}
	.help-button-img {
		height: 30px; /* Adjust the height of the image */
		width: auto; /* Maintain the aspect ratio */
		border-radius: 50px;
	}
	.favicon-img {
		height: 50px; /* 2x the size of help-button-img */
		width: auto;
		border-radius: 40px;
	}
</style>

<nav>
	<img alt="logo" src={logo} width="300"/>
	<div class="nav-right">
		<ThemeSwitch/>
		<button class="help-button" aria-label="Help">
			<img alt="help" src={favicon} class="favicon-img"/>
		</button>
		<button class="help-button" aria-label="Help" onclick={() => {isOverlayOpen.set(true)}}>
			<img alt="help" src={helpCircle} class="help-button-img"/>
		</button>
	</div>
</nav>

{#if $isOverlayOpen}
	<Overlay>
		<h1 style="text-align: center; font-weight: bold; font-size: 2rem; margin-bottom: 1rem;">MunchiMaps</h1>
		
		<p>MunchiMaps is a vending machine tracker for the RPI campus. <br>
			This project was founded through the RCOS Summer 2024 semester.
		</p>
		
		<div style="text-align: right; margin-top: 2rem; font-size: 0.875rem; color: #666;">
			© MunchiMaps 2025
		</div>
	</Overlay>
{/if}

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
