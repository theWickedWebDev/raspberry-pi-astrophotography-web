import ExifReader from 'exifreader';

const toDataURL = (url: string) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

export const getExif = async (imageUrl: string) => {
    const u = await toDataURL(imageUrl);
    return ExifReader.load(u as Buffer);
}