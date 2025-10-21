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
	}[] = [
		{
			lngLat: [-73.681651, 42.730809],
			label: "SAGE",
			name: "Sage Laboratory"
		},
		{
			lngLat: [-73.68330157518193, 42.73116600874377],
			label: "PITT",
			name: "Pittsburgh Building"
		},
		{
			lngLat: [-73.68295555310202, 42.731700696055434],
			label: "WEST",
			name: "West Hall"
		},
		{
			lngLat: [-73.6798374240988, 42.73132975313813],
			label: "NRTH",
			name: "North Hall"
		},
		{
			lngLat: [-73.67752181751882, 42.73061394762189],
			label: "QUAD",
			name: "Quadrangle Complex"
		},
		{
			lngLat: [-73.6825574941326, 42.730197213747864],
			label: "AMOS",
			name: "Amos Eaton Hall"
		},
		{
			lngLat: [-73.68113341612114, 42.7300239006993],
			label: "GREEN",
			name: "Greene Building"
		},
		{
			lngLat: [-73.68029169801159, 42.72960386468434],
			label: "JEC",
			name: "Jonsson Engineering Center"
		},
		{
			lngLat: [-73.68253738669405, 42.72946856762978],
			label: "FOLS",
			name: "Folsom Library"
		},
		{
			lngLat: [-73.68171131969798, 42.72919655301884],
			label: "VCC",
			name: "Voorhees Computing Center"
		},
		{
			lngLat: [-73.68044080659577, 42.728875195952874],
			label: "JROWL",
			name: "Jonsson Rowland Science Center"
		},
		{
			lngLat: [-73.67925449364766, 42.729221843140024],
			label: "DCC",
			name: "Darrins Communication Center"
		},
		{
			lngLat: [-73.67865533083648, 42.72747150666548, ],
			label: "ACAD",
			name: "Academy Hall"
		}

	];
</script>



<MapLibre
	class="h-[100vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={16}
	center={{ lng: -73.679711, lat: 42.729878 }}
>
	<NavigationControl />
	<ScaleControl />

	<!-- Creates markers for each vending machine -->
	{#each vendingMachines as {lngLat, label, name}, i (label)}
	<Marker lnglat={lngLat}>
		<Popup class="text-black" offset={offsets} maxWidth="500px">
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
