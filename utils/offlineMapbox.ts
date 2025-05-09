import { offlineManager, StyleURL } from '@rnmapbox/maps';

const progressListener = (region: any, status: { percentage: number; }) => {
    console.log(`Downloadprogressie: ${status.percentage.toFixed(2)}%`);
};

const errorListener = (region: any, err: any) => {
    console.error('Fout bij downloaden:', err);
};

export const downloadTMBMap = async () => {
    const bounds: [[number, number], [number, number]] = [
        [6.60, 45.70], // southwest
        [7.20, 46.00], // northeast
    ];

    try {
        await offlineManager.createPack(
            {
                name: 'tmb-offline',
                styleURL: StyleURL.Outdoors,
                minZoom: 10,
                maxZoom: 16,
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
