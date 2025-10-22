<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import logo from '$lib/assets/MunchiMapsLogo.png';

	import ThemeSwitch from '$lib/ThemeSwitch.svelte';

	let { children } = $props();
</script>

<nav>
	<img alt="logo" src={logo} width="300" style="padding:1em"/>
	<ThemeSwitch/>
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
