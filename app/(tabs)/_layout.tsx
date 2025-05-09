import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {Button, View} from "react-native";
import {deleteOfflinePack, downloadTMBMap} from "@/utils/offlineMapbox";
import MapOfflinePopup from "@/components/MapOfflinePopup";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Map',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="map-outline" size={size} color={color}/>
                    ),
                    headerRight: () => (
                        <MapOfflinePopup />
                    ),
                }}
            />

            <Tabs.Screen
                name="Account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person-outline" size={size} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
