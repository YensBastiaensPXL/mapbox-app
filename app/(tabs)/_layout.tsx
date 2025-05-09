import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {Button} from "react-native";
import {downloadTMBMap} from "@/utils/offlineMapbox";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Map',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map-outline" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <Button title="⬇️" onPress={downloadTMBMap} />
                    ),
                }}
            />

            <Tabs.Screen
                name="Account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>

    );
}
