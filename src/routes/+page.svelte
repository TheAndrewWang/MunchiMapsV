<script lang="ts">
	import {
		MapLibre,
		Marker,
		NavigationControl,
		ScaleControl,
		GeolocateControl,
		Popup
	} from 'svelte-maplibre-gl';
	import type { Map } from 'maplibre-gl';
	import { onMount } from 'svelte';

	import Sidebar from '$lib/Sidebar.svelte';
	import { darkMode } from '$lib/stores/ThemeStore';
	import { sidebarOpen, selectedLocation } from '$lib/stores/SidebarStore';
	import { supabase } from './supabaseClient';

	
	let mapInstance: Map | undefined = $state();
	let offset = $state(24);

	let offsets: maplibregl.Offset = $derived({
		top: [0, offset],
		bottom: [0, -offset],
		left: [offset + 12, 0],
		right: [-offset - 12, 0],
		center: [0, 0],
		'top-left': [offset, offset],
		'top-right': [-offset, offset],
		'bottom-left': [offset, -offset],
		'bottom-right': [-offset, -offset]
	});

	interface VendingMachine {
		lngLat: [number, number];
		label: string;
		typeOfMachine: boolean; // true means both food & drink, false means drink only
		desc: string;
		location: string;
	}

	// Vending machines from database
	let vendingMachines: VendingMachine[] = $state([]);

	onMount(async () => {
		console.log('Fetching vending machines...');
		const { data, error } = await supabase
			.from('vending_machines')
			.select('*');

		if (error) {
			console.error('Error fetching vending machines:', error);
		} else if (data) {
			console.log('Fetched data:', data);
			vendingMachines = data.map((machine: any) => ({
				lngLat: [machine.longitude, machine.latitude] as [number, number],
				label: machine.name,
				typeOfMachine: machine.hasSnack ? true : false,
				desc: machine.status === 'active' ? 'Everything works properly' : (machine.status || 'No status information'),
				location: machine.location || 'Location information not available'
			}));
			console.log('Mapped vending machines:', vendingMachines);
		}
	});
	
	let mapStyle = $derived($darkMode 
		? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" 
		: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	);
	
	function handleMarkerClick(location: typeof vendingMachines[0]) {
		selectedLocation.set({
			label: location.label,
			desc: location.desc,
			location: location.location || 'Location information not available'
		});
		sidebarOpen.set(true);
		
		// Zoom to the selected marker with offset for sidebar
		if (mapInstance) {
			const sidebarWidth = 500; // Width of sidebar in pixels
			
			mapInstance.flyTo({
				center: [location.lngLat[0], location.lngLat[1]],
				zoom: 18,
				offset: [sidebarWidth / 2, 0], // Shift view right by half sidebar width
				essential: true
			});
		}
	}

	let session = $state<any>(null);

	const fetchSession = async () => {
		const { data: { session: newSession } } = await supabase.auth.getSession();
		console.log('Current session:', newSession);
		session = newSession;
	};

	onMount(() => {
		fetchSession();
	});
</script>

<Sidebar />

<MapLibre
	bind:map={mapInstance}
	class="h-[89vh] min-h-[300px]"
	style={mapStyle}
	zoom={16}
	minZoom={15}
	maxZoom={20}
	center={{lng: -73.6785225999937, lat: 42.72921501659823}}
>
	<NavigationControl />
	<ScaleControl />

	<!-- Creates markers for each vending machine -->
{#if vendingMachines && vendingMachines.length > 0}
{#each vendingMachines as location, i (location.label)}
	<Marker lnglat={location.lngLat}>
		{#snippet content()}
			<button 
				onclick={() => handleMarkerClick(location)}
				style="background: #3b82f6; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold;"
			>
        {#if location.typeOfMachine == true}
          🍔🥤 <!--If we want to change to images refer to: https://svelte-maplibre-gl.mierune.dev/examples/dynamic-image-->
        {:else}
          🥤
        {/if}
				📍
			</button>
		{/snippet}
	</Marker>
	{/each}
{/if}
	<!-- Creates markers for each vending machine -->

	<GeolocateControl
		position="top-right"
		positionOptions={{ enableHighAccuracy: true }}
		trackUserLocation={true}
		showAccuracyCircle={false}
	/>
</MapLibre>
