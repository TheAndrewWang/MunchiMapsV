<script lang="ts">
	import {
		MapLibre,
		Marker,
		NavigationControl,
		ScaleControl,
		GlobeControl,
		GeolocateControl
	} from 'svelte-maplibre-gl';

	let lnglat: [number, number] = [-73.679711, 42.729878];
</script>

<MapLibre
	class="h-[100vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={16}
	center={{ lng: -73.679711, lat: 42.729878 }}
>
	<NavigationControl />
	<ScaleControl />

	<Marker bind:lnglat />
    
	<GeolocateControl
		position="top-left"
		positionOptions={{ enableHighAccuracy: true }}
		trackUserLocation={true}
		showAccuracyCircle={false}
	/>
</MapLibre>
