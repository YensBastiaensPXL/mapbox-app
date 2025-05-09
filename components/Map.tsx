import Mapbox, { Camera, LocationPuck, MapView } from "@rnmapbox/maps";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'react-native';

Mapbox.setAccessToken("pk.eyJ1IjoieWVuc2IiLCJhIjoiY205dnE0b3ZlMGwxcTJrc2E0cDg2cGY2ciJ9.29EuVfMQla5T3szu5Kiddw");

export default function Map() {
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const bearing = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation([location.coords.longitude, location.coords.latitude]);
        setHasPermission(true);
      }
    })();
  }, []);

  const centerToUser = async () => {
    const location = await Location.getCurrentPositionAsync({});
    cameraRef.current?.setCamera({
      centerCoordinate: [location.coords.longitude, location.coords.latitude],
      zoomLevel: 16,
      animationMode: "flyTo",
      animationDuration: 1000,
      heading: 0,
    });
  };

  const updateBearing = (newBearing: number) => {
    bearing.stopAnimation((currentValue: number) => {
      const normalizedTarget = normalizeAngle(newBearing);
      const newValue = getShortestRotation(currentValue, normalizedTarget);
      Animated.timing(bearing, {
        toValue: newValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };


  function normalizeAngle(angle: number) {
    return ((angle % 360) + 360) % 360;
  }

  function getShortestRotation(current: number, target: number) {
    const delta = ((target - current + 540) % 360) - 180;
    return current + delta;
  }




  if (!hasPermission || !userLocation) return null;

  return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
            style={StyleSheet.absoluteFill}
            styleURL="mapbox://styles/yensb/cmafr3ohl00v601skf107bsla"
            logoEnabled={false}
            attributionEnabled={false}
            onCameraChanged={(event) => {
              const bearingValue = (event.properties as any)?.heading; // soms 'heading' in plaats van 'bearing'
              if (typeof bearingValue === 'number') {
                updateBearing(bearingValue);
              }
            }}

        >
          <Camera ref={cameraRef} />
          <LocationPuck puckBearing="heading" puckBearingEnabled />
        </MapView>

        {/* Kompas rechtsboven */}
        <View style={styles.compassContainer}>
          <TouchableOpacity
              onPress={() => {
                cameraRef.current?.setCamera({
                  heading: 0,
                  animationMode: "easeTo",
                  animationDuration: 500,
                });
              }}
          >
            <Animated.View
                style={{
                  transform: [
                    {
                      rotate: bearing.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '-360deg'], // let op: negatieve rotatie
                      }),

                    },
                  ],
                }}
            >

            <Image
                  source={require('@/assets/images/compass.jpg')}
                  style={{ width: 28, height: 28 }}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Locatieknop */}
        <View style={styles.buttonContainer}>
          <Button title="📍" onPress={centerToUser} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
    padding: 4,
  },
  compassContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 4,
    padding: 8,
  },
});
