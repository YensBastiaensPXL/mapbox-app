import React, {useState} from 'react';
import {Modal, View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import {deleteOfflinePack, downloadTMBMap} from '@/utils/offlineMapbox';

export default function MapOfflinePopup() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [downloadMessage, setDownloadMessage] = useState('');

    const handleDownload = () => {
        setIsDownloading(true);
        downloadTMBMap(
            setProgress,
            () => {
                console.log('✅ Download klaar');
                setIsDownloading(false);
                setDownloadMessage('✅ Download voltooid');
                setTimeout(() => setDownloadMessage(''), 3000);
            },
            () => {
                setIsDownloading(false);
            }
        );
    };

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.iconButton}>
                <Ionicons name="map-outline" size={24} color="black"/>
            </TouchableOpacity>
            {/* Popup */}
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.popup}>
                        <Text style={styles.title}>Offline kaart</Text>

                        <Button title="⬇️ Download TMB" onPress={handleDownload}/>

                        <View style={{marginTop: 10}}/>
                        <Button
                            title="🗑️ Verwijder kaart"
                            color="red"
                            onPress={async () => {
                                await deleteOfflinePack();
                                setDeleteMessage('✅ Kaart verwijderd');
                                setTimeout(() => setDeleteMessage(''), 3000);
                                setProgress(0);
                                setIsDownloading(false);
                            }}
                        />

                        {progress > 0 && (
                            <View style={{marginTop: 20, alignItems: 'center'}}>
                                <Progress.Bar progress={progress / 100} width={200}/>
                                <Text>{progress.toFixed(1)}%</Text>
                            </View>
                        )}
                        {!isDownloading && progress === 100 && (
                            <Text style={{marginTop: 10, color: 'green'}}>✅ Download voltooid</Text>
                        )}
                        {deleteMessage !== '' && (
                            <Text style={{marginTop: 10, color: 'green'}}>{deleteMessage}</Text>
                        )}

                        <View style={{marginTop: 20}}>
                            <Button
                                title="Sluiten"
                                onPress={() => {
                                    setVisible(false);
                                    setProgress(0);
                                    setIsDownloading(false);
                                    setDeleteMessage('');
                                    setDownloadMessage('');
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        padding: 10,
        marginRight: 10,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: 280,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
    },
});
