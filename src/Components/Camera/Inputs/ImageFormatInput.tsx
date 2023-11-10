import { CSSProperties, useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';
import Typography from '@mui/material/Typography/Typography';

type ImageFormatInputProps = {} & CameraLcdItemProps;

type QualityType = 'high' | 'low';

const QualityIcon = ({ disabled, quality }: { quality: QualityType, disabled?: boolean }) => {
    if (quality === 'low') {
        return (
            <span style={{
                display: 'inline-block',
                borderRight: 'solid 5px #000',
                borderBottom: 'solid 5px #000',
                lineHeight: '17px',
                height: '19px',
                width: '14px',
                textAlign: 'right',
                verticalAlign: 'bottom'
            }}>
                <span style={{
                    display: 'inline-block',
                    background: disabled ? '#a8a8a8' : '#000',
                    height: '9px',
                    width: '5px',
                }} />
            </span >
        )
    } else {
        return (
            <span style={{ display: 'inline-block' }}>
                <span style={{
                    display: 'inline-block',
                    background: disabled ? '#a8a8a8' : '#000',
                    height: '19px',
                    width: '14px',
                    borderTopLeftRadius: '100%'
                }} />
            </span>
        )
    }
};

const ImageFormatInput = (props: ImageFormatInputProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { imageformats, configuration } = camera;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleSetImageFormat = (s: typeof imageformats[number]) => {
        setCamera({ ...camera, configuration: { ...configuration, imageformat: s } });
        handleClose()
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let letter;
    let quality;
    if (configuration.imageformat) {
        if (configuration.imageformat.includes('Large')) letter = "L"
        if (configuration.imageformat.includes('Medium')) letter = "M"
        if (configuration.imageformat.includes('Small')) letter = "S"
        if (configuration.imageformat.includes('Fine')) quality = 'high' as QualityType;
        if (configuration.imageformat.includes('Normal')) quality = 'low' as QualityType;
    }

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {imageformats.map(f => <MenuItem key={f} onClick={() => handleSetImageFormat(f)}>{f}</MenuItem >)}
            </Menu >
            <CameraLcdItem
                {...props}
                disabled={!configuration.lens}
                onClick={handleClick}
                label={!configuration.imageformat ? 'Image Quality' : undefined}
            >
                <Typography variant='h5' sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', display: 'flex', gap: 2, flexWrap: 'nowrap' }}>
                    {configuration.imageformat?.includes('RAW') && <span style={{ display: 'inline-block', background: configuration.lens ? '#000' : '#a8a8a8', color: "#fff", fontSize: '.5em', fontWeight: 'bold', padding: '4px 6px' }}>RAW</span>}
                    {quality && <span style={{ display: 'flex', alignItems: "center" }}>
                        <QualityIcon quality={quality} disabled={Boolean(!configuration.lens)} />
                        {letter}
                    </span>}
                </Typography>
            </CameraLcdItem>
        </>
    )
}

export default ImageFormatInput;