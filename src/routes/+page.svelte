<script lang="ts">
	import {
		MapLibre,
		Marker,
		NavigationControl,
		ScaleControl,
		GeolocateControl,
		Popup
	} from 'svelte-maplibre-gl';

	import PopupContent from '../assets/PopupContent.svelte';

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
	}[] = [
		{
			lngLat: [-73.681651, 42.730809],
			label: 'SAGE',
			name: 'Sage Laboratory',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.68330157518193, 42.73116600874377],
			label: 'PITTSBURGH',
			name: 'Pittsburgh Building',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.68295555310202, 42.731700696055434],
			label: 'WEST',
			name: 'West Hall',
			typeOfMachine: 1
		},
		{
			lngLat: [-73.6798374240988, 42.73132975313813],
			label: 'NORTH',
			name: 'North Hall',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.67752181751882, 42.73061394762189],
			label: 'QUAD',
			name: 'Quadrangle Complex',
			typeOfMachine: 1
		},
		{
			lngLat: [-73.6825574941326, 42.730197213747864],
			label: 'AMOS',
			name: 'Amos Eaton Hall',
			typeOfMachine: 1
		},
		{
			lngLat: [-73.68113341612114, 42.7300239006993],
			label: 'GREENE',
			name: 'Greene Building',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.68029169801159, 42.72960386468434],
			label: 'JEC',
			name: 'Jonsson Engineering Center',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.68253738669405, 42.72946856762978],
			label: 'LIBRARY',
			name: 'Folsom Library',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.68171131969798, 42.72919655301884],
			label: 'VCC',
			name: 'Voorhees Computing Center',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.68044080659577, 42.728875195952874],
			label: 'JROWL',
			name: 'Jonsson Rowland Science Center',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.67925449364766, 42.729221843140024],
			label: 'DCC',
			name: 'Darrins Communication Center',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.67865533083648, 42.72747150666548],
			label: 'ACADEMY',
			name: 'Academy Hall',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.67667306945825, 42.73003109055379],
			label: 'UNION',
			name: 'Student Union',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.67695508859656, 42.72874095641851],
			label: 'MUELLER',
			name: 'Mueller Center',
			typeOfMachine: 2
		},
		{
			lngLat: [-73.67706306681026, 42.72925872470994],
			label: 'PUBSAFE',
			name: 'Public Safety',
			typeOfMachine: 1
		},
		{
			lngLat: [-73.67507235977408, 42.72789628631035],
			label: 'WARREN',
			name: 'Warren Hall',
			typeOfMachine: 1
		},
		{
			lngLat: [-73.67410609411658, 42.72726872790462],
			label: 'DAVISON',
			name: 'Davison Hall',
			typeOfMachine: 1
		},
		{
			lngLat: [-73.67466868880095, 42.72701762211237],
			label: 'SHARP',
			name: 'Sharp Hall',
			typeOfMachine: 1
		}
	];
</script>

<MapLibre
	class="h-[100vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	zoom={16}
	center={{ lng: -73.6785225999937, lat: 42.72921501659823}}
>
	<NavigationControl />
	<ScaleControl />

	<!-- Creates markers for each vending machine -->
	{#each vendingMachines as { lngLat, label, name, typeOfMachine }, i (label)}
		<Marker lnglat={lngLat}>
			{#snippet content()}
				<div class="text-center leading-none">
					{#if typeOfMachine == 2}
						<div class="text-3xl">🍔🥤</div> <!--If we want to change to images refer to: https://svelte-maplibre-gl.mierune.dev/examples/dynamic-image-->
					{:else}
						<div class="text-3xl">🥤</div>
					{/if}
					<div class="font-bold text-black drop-shadow-xs">{label}</div>
				</div>
				
			{/snippet}

			<Popup class="text-black" offset={offsets}>
				<span class="text-lg"><PopupContent name={label} /></span>
			</Popup>
		</Marker>
	{/each}
	<!-- Creates markers for each vending machine -->

	<GeolocateControl
		position="top-left"
		positionOptions={{ enableHighAccuracy: true }}
		trackUserLocation={true}
		showAccuracyCircle={false}
	/>
</MapLibre>
