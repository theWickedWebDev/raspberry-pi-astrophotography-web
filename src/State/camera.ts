import { atom } from 'recoil';

const canon18_55: Lens = {
    name: 'EF-S18-55mm f/3.5-5.6 IS II',
    focalLengthMin: 18,
    focalLengthMax: 55,
    apertures: {
        18: [3.5, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22],
        24: [4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25],
        35: [4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29],
        45: [5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32],
        55: [5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32, 36]
    },
}

const canon75_300: Lens = {
    name: 'EF-S75-300mm f/5.6 IS II',
    focalLengthMin: 75,
    focalLengthMax: 300,
    apertures: {
        75: [4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32],
        100: [4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32],
        135: [5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32, 36],
        200: [5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32, 36, 40],
        300: [5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32, 36, 40, 45]
    },
}

const canon50: Lens = {
    name: 'EF50mm f/1.8 II',
    focalLengthMin: 50,
    focalLengthMax: 50,
    apertures: {
        // TODO: apertures not 100% accurate
        50: [1.8, 2.8, 3.5, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22]
    },
}

export const IMAGE_FORMATS = ["Large Fine JPEG", "Large Normal JPEG", "Medium Fine JPEG", "Medium Normal JPEG", "Small Fine JPEG", "Small Normal JPEG", "RAW + Large Fine JPEG", "RAW"] as const;
export const WHITE_BALANCES = ["Auto", "Daylight", "Shadow", "Cloudy", "Tungsten", "Fluorescent", "Flash", "Manual"] as const;
export const FRAME_COUNTS = [500, 400, 300, 200, 100, 75, 50, 25, 10, 5, 1] as const;
// export const APERTURES = [3.5, 4, 4.5, 5, 5.6, 6.3, 7.1, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32, 36, 40, 45] as const;
export const BULB_EXPOSURES = ['360', '330', '300', '270', '240', '180', '150', '120', '100', '80', '60', '50', '40', '30', '25', '20', '18', '17', '16', '15', '14', '13', '12', '10', '9', '8', '7', '6', '5'] as const;
export const SHUTTERSPEEDS = ["4", "3.2", "2.5", "2", "1.6", "1.3", "1", "0.8", "0.6", "0.5", "0.4", "0.3", "1/4", "1/5", "1/6", "1/8", "1/10", "1/13", "1/15", "1/20", "1/25", "1/30", "1/40", "1/50", "1/60", "1/80", "1/100", "1/125", "1/160", "1/200", "1/250", "1/320", "1/400", "1/500", "1/640", "1/800", "1/1000", "1/1250", "1/1600", "1/2000", "1/2500", "1/3200", "1/4000"] as const;
export const ISOS = [100, 200, 400, 800, 1600, 3200, 6400] as const;
export const SHOOTING_MODE = ['M', 'Av'] as const;

export const TEMPLATES = [
    { name: 'Manual' },
    { name: 'Planetary' },
    { name: 'Planetary w/ moons' },
    { name: 'Stars 1hr stacked' },
    { name: 'Solar' },
    { name: 'Eclipse' },
    { name: 'Calibration: Flats' },
    { name: 'Calibration: Biases' },
    { name: 'Calibration: Darks' },
] as const;

export interface CameraState {
    lenses: Lens[],
    isos: typeof ISOS,
    shutterspeeds: typeof SHUTTERSPEEDS;
    bulbExposures: typeof BULB_EXPOSURES;
    apertures?: number[];
    frameCounts: typeof FRAME_COUNTS;
    whiteBalances: typeof WHITE_BALANCES;
    imageformats: typeof IMAGE_FORMATS;
    shootingmodes: typeof SHOOTING_MODE;
    focalLengths?: number[];
    configuration: CameraStateConfig,
    focalLength?: number;
    templates: typeof TEMPLATES;
}

export interface CameraStateConfig {
    lens?: Lens;
    focalLength?: number;
    aperture?: number;
    shutterspeed?: typeof SHUTTERSPEEDS[number];
    iso?: typeof ISOS[number];
    frames?: typeof FRAME_COUNTS[number];
    whitebalance?: typeof WHITE_BALANCES[number];
    imageformat?: typeof IMAGE_FORMATS[number];
    target?: string;
    shootingmode?: typeof SHOOTING_MODE[number];
}

interface Lens {
    name: string;
    focalLengthMin: number;
    focalLengthMax: number;
    apertures: {
        [focallength: number]: number[]
    }
}

const DEFAULT_CONFIGURATION = {}

const DEFAULT_STATE: CameraState = {
    lenses: [canon18_55, canon75_300, canon50],
    isos: ISOS,
    focalLength: undefined,
    shutterspeeds: SHUTTERSPEEDS,
    bulbExposures: BULB_EXPOSURES,
    apertures: undefined,
    frameCounts: FRAME_COUNTS,
    whiteBalances: WHITE_BALANCES,
    imageformats: IMAGE_FORMATS,
    shootingmodes: SHOOTING_MODE,
    configuration: DEFAULT_CONFIGURATION,
    templates: TEMPLATES,
};

const cameraState = atom({
    key: 'cameraState',
    default: DEFAULT_STATE as CameraState,
});

export default cameraState;