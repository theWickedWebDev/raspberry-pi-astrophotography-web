import { atom } from 'recoil';
import { CameraStateConfig } from './camera';

export interface QueueType {
    start: string;
    cancelled: boolean;
    complete: boolean;
    inProgress: boolean;
    framesRemaining: number;
    configuration: CameraStateConfig
}

const DEFAULT_STATE = [
    {
        "start": "2023-11-11T03:34:03.234Z",
        "framesRemaining": 0,
        "complete": true,
        "inProgress": false,
        "configuration": {
            "aperture": 3.5,
            "lens": {
                "name": "EF-S18-55mm f/3.5-5.6 IS II",
                "focalLengthMin": 18,
                "focalLengthMax": 55,
                "apertures": {
                    "18": [
                        3.5,
                        4,
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22
                    ],
                    "24": [
                        4,
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25
                    ],
                    "35": [
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29
                    ],
                    "45": [
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29,
                        32
                    ],
                    "55": [
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29,
                        32,
                        36
                    ]
                }
            },
            "focalLength": 18,
            "shutterspeed": "BULB 240",
            "frames": 300,
            "shootingmode": "M",
            "iso": 800,
            "imageformat": "RAW + Large Fine JPEG"
        }
    },
    {
        "start": "2023-11-11T03:34:03.234Z",
        "framesRemaining": 146,
        "complete": false,
        "inProgress": true,
        "configuration": {
            "aperture": 3.5,
            "lens": {
                "name": "EF-S18-55mm f/3.5-5.6 IS II",
                "focalLengthMin": 18,
                "focalLengthMax": 55,
                "apertures": {
                    "18": [
                        3.5,
                        4,
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22
                    ],
                    "24": [
                        4,
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25
                    ],
                    "35": [
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29
                    ],
                    "45": [
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29,
                        32
                    ],
                    "55": [
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29,
                        32,
                        36
                    ]
                }
            },
            "focalLength": 18,
            "shutterspeed": "BULB 240",
            "frames": 300,
            "shootingmode": "M",
            "iso": 800,
            "imageformat": "RAW + Large Fine JPEG"
        }
    },
    {
        "start": "2023-11-11T03:34:03.234Z",
        "framesRemaining": 300,
        "complete": false,
        "inProgress": false,
        "configuration": {
            "aperture": 3.5,
            "lens": {
                "name": "EF-S18-55mm f/3.5-5.6 IS II",
                "focalLengthMin": 18,
                "focalLengthMax": 55,
                "apertures": {
                    "18": [
                        3.5,
                        4,
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22
                    ],
                    "24": [
                        4,
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25
                    ],
                    "35": [
                        4.5,
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29
                    ],
                    "45": [
                        5,
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29,
                        32
                    ],
                    "55": [
                        5.6,
                        6.3,
                        7.1,
                        8,
                        9,
                        10,
                        11,
                        13,
                        14,
                        16,
                        18,
                        20,
                        22,
                        25,
                        29,
                        32,
                        36
                    ]
                }
            },
            "focalLength": 18,
            "shutterspeed": "BULB 240",
            "frames": 300,
            "shootingmode": "M",
            "iso": 800,
            "imageformat": "RAW + Large Fine JPEG"
        }
    }
];

const queueState = atom({
    key: 'queueState',
    default: [] as QueueType[],
});

export default queueState;