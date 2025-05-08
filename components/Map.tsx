import { useEffect, useRef, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import Mapbox, { MapView, Camera, LocationPuck } from '@rnmapbox/maps';

// Mapbox.setAccessToken('sk.eyJ1IjoieWVuc2IiLCJhIjoiY21hNXJnYmd0MGlzNTJpczZ5NXF3ZGdhOCJ9.7Tum822-jbAS7Z0JBeH_UQ');
Mapbox.setAccessToken('pk.eyJ1IjoieWVuc2IiLCJhIjoiY205dnE0b3ZlMGwxcTJrc2E0cDg2cGY2ciJ9.29EuVfMQla5T3szu5Kiddw');
export default function Map() {

    const [hasPermission, setHasPermission] = useState(false);
    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setHasPermission(true);
            }
        })();
    });

    const centerToUser = async () => {
        const location = await Location.getCurrentPositionAsync({});
        cameraRef.current?.setCamera({
            centerCoordinate: [
                location.coords.longitude,
                location.coords.latitude,
            ],
            zoomLevel: 14,
            animationMode: 'flyTo',
            animationDuration: 1000,
        });
    };

    if (!hasPermission) return null;

    return (
        <View style={StyleSheet.absoluteFill}>
            <MapView style={StyleSheet.absoluteFill}
                     styleURL="mapbox://styles/mapbox/outdoors-v12"
                     logoEnabled={false}
                     attributionEnabled={false}>
                <Camera ref={cameraRef} />
                <LocationPuck puckBearing="heading" puckBearingEnabled />
            </MapView>

            <View style={styles.buttonContainer}>
                <Button title="📍" onPress={centerToUser} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 4,
        padding: 4,
    },
});