import { atom } from 'recoil';

interface Weather {
    temperature: string;
    wind: string;
    moonPhase: string;
    moonday: string;
    precipitation: string;
    zenith: string;
    humidity: string;
    condition: string;
}

const weatherState = atom({
    key: 'weatherState',
    default: {} as Weather,
});

export default weatherState;