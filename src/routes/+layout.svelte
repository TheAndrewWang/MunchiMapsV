<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import logo from '$lib/assets/MunchiMapsLogo.png';
	import helpCircle from '$lib/assets/help-circle.svg';
	import helpCircleWhite from '$lib/assets/help-circle-white.svg';
	import ThemeSwitch from '$lib/ThemeSwitch.svelte';
	import Overlay from '$lib/Overlay.svelte';
	import SignInPopup from '$lib/SignInPopup.svelte';
	import { supabase } from './supabaseClient';
	import { onMount } from 'svelte';

	let { children } = $props();

	import { isOverlayOpen } from '$lib/stores/OverlayStore';
	import { darkMode } from '$lib/stores/ThemeStore';
	import { isSignInOpen } from '$lib/stores/SignInStore';

	// default to the regular icon, then reactively switch when theme changes
	let helpIcon = $derived($darkMode ? helpCircleWhite : helpCircle);

	let session = $state<any>(null);

	const fetchSession = async () => {
		const {
			data: { session: newSession }
		} = await supabase.auth.getSession();
		session = newSession;
	};

	onMount(() => {
		fetchSession();

		// Listen for auth changes
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, newSession) => {
			session = newSession;
		});

		return () => subscription.unsubscribe();
	});
</script>

<nav>
	<img alt="logo" src={logo} width="300" />
	<div class="nav-right">
		{#if session}
			<button
				class="signout-button"
				onclick={() => {
					supabase.auth.signOut();
					console.log('User signed out');
				}}
			>
				Sign Out
			</button>
		{:else}
			<button class="signin-button" onclick={() => isSignInOpen.set(true)}> Sign In </button>
		{/if}

		<ThemeSwitch />
		<button class="help-button" aria-label="Help">
			<img alt="help" src={favicon} class="favicon-img" />
		</button>
		<button class="help-button" aria-label="Help" onclick={() => isOverlayOpen.set(true)}>
			<img alt="help" src={helpIcon} class="help-button-img" />
		</button>
	</div>
</nav>

{#if $isOverlayOpen}
	<Overlay>
		<h1 style="text-align: center; font-weight: bold; font-size: 2rem; margin-bottom: 1rem;">
			MunchiMaps
		</h1>

		<p>
			MunchiMaps is a vending machine tracker for the RPI campus. <br />
			This project was founded through the RCOS Summer 2024 semester.
		</p>

		<div style="text-align: right; margin-top: 2rem; font-size: 0.875rem; color: #666;">
			© MunchiMaps 2025
		</div>
	</Overlay>
{/if}

{#if $isSignInOpen}
	<SignInPopup />
{/if}

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

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
	.signin-button {
		padding: 0.5rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-right: 3rem;
	}
	.signin-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}
	.signout-button {
		padding: 0.5rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-right: 3rem;
	}
	.signout-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
	}
</style>
