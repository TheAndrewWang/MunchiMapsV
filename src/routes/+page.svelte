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

	import Sidebar from '$lib/Sidebar.svelte';
	import { darkMode } from '$lib/stores/ThemeStore';
	import { sidebarOpen, selectedLocation } from '$lib/stores/SidebarStore';
	
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

	// Longitude and Latitude for all vending machines
	const vendingMachines: {
		lngLat: [number, number];
		label: string;
		name: string;
		typeOfMachine: number; // 2 means both food & drink, 1 means drink only
    desc: string;
	}[] = [
		{
			lngLat: [-73.681651, 42.730809],
			label: "SAGE",
			name: "Sage Laboratory",
			desc: "The drink vending machine may be out of order",
      typeOfMachine: 2
		},
		{
			lngLat: [-73.68330157518193, 42.73116600874377],
			label: "PITT",
			name: "Pittsburgh Building",
			desc: "Everything works properly",
      typeOfMachine: 2
		},
		{
			lngLat: [-73.68295555310202, 42.731700696055434],
			label: "WEST",
			name: "West Hall",
			desc: "Everything works properly",
      typeOfMachine: 1
		},
		{
			lngLat: [-73.6798374240988, 42.73132975313813],
			label: "NRTH",
			name: "North Hall",
			desc: "Everything works properly",
      typeOfMachine: 2,
		},
		{
			lngLat: [-73.67752181751882, 42.73061394762189],
			label: "QUAD",
			name: "Quadrangle Complex",
			desc: "Everything works properly",
      typeOfMachine: 1
		},
		{
			lngLat: [-73.6825574941326, 42.730197213747864],
			label: "AMOS",
			name: "Amos Eaton Hall",
			desc: "Everything works properly",
      typeOfMachine: 1
		},
		{
			lngLat: [-73.68113341612114, 42.7300239006993],
			label: "GREENE",
			name: "Greene Building",
			desc: "Everything works properly",
      typeOfMachine: 2
		},
		{
			lngLat: [-73.68029169801159, 42.72960386468434],
			label: "JEC",
			name: "Jonsson Engineering Center",
			desc: "Everything works properly",
      typeOfMachine: 2
		},
		{
			lngLat: [-73.68253738669405, 42.72946856762978],
			label: "FOLSOM",
			name: "Folsom Library",
			desc: "Everything works properly",
      typeOfMachine: 2
		},
		{
			lngLat: [-73.68171131969798, 42.72919655301884],
			label: "VCC",
			name: "Voorhees Computing Center",
			desc: "Everything works properly",
      typeOfMachine: 2
		},
		{
			lngLat: [-73.68044080659577, 42.728875195952874],
			label: "JROWL",
			name: "Jonsson Rowland Science Center",
			desc: "Everything works properly",
      typeOfMachine: 2
		},
		{
			lngLat: [-73.67925449364766, 42.729221843140024],
			label: "DCC",
			name: "Darrins Communication Center",
			desc: "The drink vending machine may be out of order",
      typeOfMachine: 2
		},
		{
			lngLat: [-73.67865533083648, 42.72747150666548, ],
			label: "ACAD",
			name: "Academy Hall",
			desc: "Everything works properly",
      typeOfMachine: 2
		},
    {
			lngLat: [-73.67667306945825, 42.73003109055379],
			label: 'UNION',
			name: 'Student Union',
      desc: "Everything works properly",
			typeOfMachine: 2
		},
		{
			lngLat: [-73.67695508859656, 42.72874095641851],
			label: 'MUELLER',
			name: 'Mueller Center',
      desc: "The drink vending machine may be out of order",
			typeOfMachine: 2
		},
		{
			lngLat: [-73.67706306681026, 42.72925872470994],
			label: 'PUBSAFE',
			name: 'Public Safety',
      desc: "Everything works properly",
			typeOfMachine: 1
		},
		{
			lngLat: [-73.67507235977408, 42.72789628631035],
			label: 'WARREN',
			name: 'Warren Hall',
      desc: "Everything works properly",
			typeOfMachine: 1
		},
		{
			lngLat: [-73.67410609411658, 42.72726872790462],
			label: 'DAVISON',
			name: 'Davison Hall',
      desc: "Everything works properly",
			typeOfMachine: 1
		},
		{
			lngLat: [-73.67466868880095, 42.72701762211237],
			label: 'SHARP',
			name: 'Sharp Hall',
      desc: "Everything works properly",
			typeOfMachine: 1
	];
	
	let mapStyle = $derived($darkMode 
		? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json" 
		: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	);
	
	function handleMarkerClick(location: typeof vendingMachines[0]) {
		selectedLocation.set({
			label: location.label,
			desc: location.desc
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
{#each vendingMachines as location, i (location.label)}
	<Marker lnglat={location.lngLat}>
		{#snippet content()}
			<button 
				onclick={() => handleMarkerClick(location)}
				style="background: #3b82f6; color: white; border: none; border-radius: 50%; width: 30px; height: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold;"
			>
        {#if typeOfMachine == 2}
          🍔🥤 <!--If we want to change to images refer to: https://svelte-maplibre-gl.mierune.dev/examples/dynamic-image-->
        {:else}
          🥤
        {/if}
				📍
			</button>
		{/snippet}
	</Marker>
	{/each}
	<!-- Creates markers for each vending machine -->

	<GeolocateControl
		position="top-right"
		positionOptions={{ enableHighAccuracy: true }}
		trackUserLocation={true}
		showAccuracyCircle={false}
	/>
</MapLibre>
