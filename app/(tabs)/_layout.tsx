import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {Button, View} from "react-native";
import {deleteOfflinePack, downloadTMBMap} from "@/utils/offlineMapbox";

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
                        <View style={{ flexDirection: 'row', gap: 10, marginRight: 10}}>
                            <Button title="⬇️" onPress={downloadTMBMap}/>
                            <Button title={"🗑️"} onPress={() => deleteOfflinePack()} />
                        </View>

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
