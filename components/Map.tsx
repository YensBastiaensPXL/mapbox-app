import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Mapbox, { MapView, Camera, LocationPuck } from '@rnmapbox/maps';

// Zorg dat je deze key vervangt of haalt uit .env of app.config
// Mapbox.setAccessToken('sk.eyJ1IjoieWVuc2IiLCJhIjoiY21hNXJnYmd0MGlzNTJpczZ5NXF3ZGdhOCJ9.7Tum822-jbAS7Z0JBeH_UQ');
Mapbox.setAccessToken('pk.eyJ1IjoieWVuc2IiLCJhIjoiY205dnE0b3ZlMGwxcTJrc2E0cDg2cGY2ciJ9.29EuVfMQla5T3szu5Kiddw');
export default function Map() {
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setHasPermission(true);
            }
        })();
    }, []);

    if (!hasPermission) return null;

    return (
        <MapView style={{ flex: 1 }} styleURL="mapbox://styles/mapbox/outdoors-v12">
            <Camera followUserLocation followZoomLevel={14} />
            <LocationPuck puckBearing="heading" puckBearingEnabled />
        </MapView>
    );
}
