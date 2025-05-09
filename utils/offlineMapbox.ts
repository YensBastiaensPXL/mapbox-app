import {offlineManager, StyleURL} from '@rnmapbox/maps';

const progressListener = (region: any, status: { percentage: number; }) => {
    console.log(`Downloadprogressie: ${status.percentage.toFixed(2)}%`);
};

const errorListener = (region: any, err: any) => {
    console.error('Fout bij downloaden:', err);
};

export const downloadTMBMap = async () => {
    const bounds: [[number, number], [number, number]] = [
        [6.50, 45.70], // Zuidwest - iets onder Les Chapieux
        [7.30, 46.10], // Noordoost - iets boven Trient en Orsières
    ];

    try {
        await offlineManager.createPack(
            {
                name: 'tmb-offline',
                styleURL: StyleURL.Outdoors,
                minZoom: 10,
                maxZoom: 22,
                bounds,
                metadata: {
                    trail: 'Tour du Mont Blanc',
                },
            },
            progressListener,
            errorListener
        );
    } catch (err) {
        console.error('Kan TMB-kaart niet downloaden:', err);
    }
};

export const deleteOfflinePack = async (name: string = 'tmb-offline') => {
    try {
        const packs = await offlineManager.getPacks();
        const existing = packs.find(p => p.name === name);
        if (existing) {
            await offlineManager.deletePack(name);
            console.log(`✅ Offline pack '${name}' verwijderd.`);
        } else {
            console.log(`ℹ️ Geen offline pack gevonden met naam: ${name}`);
        }
    } catch (err) {
        console.error('❌ Fout bij verwijderen offline pack:', err);
    }
};