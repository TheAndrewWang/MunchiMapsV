<script lang="ts">
	import {
		MapLibre,
		Marker,
		NavigationControl,
		ScaleControl,
		GeolocateControl,
		Popup
	} from 'svelte-maplibre-gl';

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
</script>

<MapLibre
	class="h-[100vh] min-h-[300px]"
	style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
	zoom={16}
	center={{ lng: -73.679711, lat: 42.729878 }}
>
	<NavigationControl />
	<ScaleControl />

	<Marker lnglat={[-73.679711, 42.729878]} />
	<Marker lnglat={[-73.681651, 42.730809]}> /* Sage */
		<Popup class="text-black"  offset={offsets}>
			<span class="text-lg">hello</span>
		</Popup> 
	</Marker>
    
	<GeolocateControl
		position="top-left"
		positionOptions={{ enableHighAccuracy: true }}
		trackUserLocation={true}
		showAccuracyCircle={false}
	/>
</MapLibre>
