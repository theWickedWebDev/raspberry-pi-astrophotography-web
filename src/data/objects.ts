import { Star } from '@mui/icons-material';
import { ParseDMS, geolocation, isStarVisible } from '../util';
import bsc from './bsc.json';
import constellations from './constellations.json';
import messier from './messier.json';

export interface Bsc {
    B: string;
    N: string;
    C: string;
    Dec: string;
    F: string;
    HR: string;
    K: string;
    RA: string;
    V: string;
}

export interface Constellation {
    abbr: string;
    name: string;
    genitive: string;
    en: string;
}

export interface Star {
    id: string;
    constellation?: Constellation;
    name: string;
    magnitude: string;
    temperature: string;
    bayerDesignation: string;
    flamsteed: string;
    visible: {
        label: string;
        deg?: number;
    },
    dec_hms?: string;
    ra_hms?: string;
    dec_dms: number;
    ra_dms: number;
}

export interface Messier {
    id: string;
    name: string;
    object: string;
    constellation?: Constellation;
    magnitude: number;
    discoverer?: string;
    distance: number;
    image: string;
    messier: string;
    ngc: string;
    season: string;
    year?: string;
    dec: string;
    ra: string;
    visible: {
        label: string;
        deg?: number;
    };
}

const Stars: Star[] = (bsc as Bsc[]).map((star, index) => ({
    id: 'star_' + index,
    name: star.N,
    constellation: constellations.find(c => c.abbr.toLowerCase() === star.C?.toLowerCase()),
    magnitude: star.V,
    temperature: star.K,
    dec: star.Dec,
    ra: star.RA,
    bayerDesignation: star.B,
    flamsteed: star.F,
    visible: isStarVisible(star.Dec, geolocation.latitude),
    dec_dms: ParseDMS(star.Dec || ''),
    dec_hms: star.Dec,
    ra_dms: ParseDMS(star.RA || ''),
    ra_hms: star.RA,
}));

const _messier: Messier[] = messier.map(({ recordid, fields }) => ({
    id: recordid,
    name: fields.english_name_nom_en_anglais || '',
    object: fields.objet,
    constellation: constellations.find(c => c.abbr.toLowerCase() === fields.const?.toLowerCase()),
    magnitude: fields.mag,
    discoverer: fields.decouvreur,
    distance: fields.distance,
    image: process.env.PUBLIC_URL + "/images/messier/M" + (fields.messier.replace('M', '')).padStart(3, "0") + ".jpg",
    messier: fields.messier,
    ngc: fields.ngc.replace('NGC ', ''),
    season: fields.saison.split(' / ')[0],
    year: fields.annee,
    ra: fields.ra?.replace(':', 'h').replace(':', 'm') + 's',
    dec: fields.dec?.replace(':', 'd').replace(':', 'm') + 's',
    visible: fields.dec ? isStarVisible(fields.dec, geolocation.latitude) : {
        label: "Unknown", deg: undefined
    }
}));

const Objects = { messier: _messier, stars: Stars };

export default Objects;
// const rows = [...bsc, ...messier_rows].filter(s => !!s.N);
