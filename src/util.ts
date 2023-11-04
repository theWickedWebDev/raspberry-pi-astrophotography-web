const latitude = 42.8164989;
const longitude = -71.0638871;

export const geolocation = {
    latitude, longitude,
}

export function ConvertDMSToDD(degrees: string, minutes: string, seconds: string, direction: "S" | "W" | "N" | "E"): number {
    var dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);

    if (direction === "S" || direction === "W") {
        dd = dd * -1;
    }
    return dd;
}

export function ParseDMS(dec: string) {
    const [degrees, min, sec] = dec.replace(/\D/g, ' ').trim().split(' ').filter(a => a !== '');
    return ConvertDMSToDD(degrees, min, sec, "N");
}

export const isStarVisible = (dec: string, lat: number) => {
    const a = ParseDMS(dec) + lat
    if (a > 90) return { label: 'Always Visible', deg: a };
    if (a < -90) return { label: 'Never Visible', deg: a };
    return { label: 'Sometimes Visible', deg: a };
}