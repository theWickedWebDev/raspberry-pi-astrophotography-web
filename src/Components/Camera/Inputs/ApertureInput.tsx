import { useEffect, useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';

type ApertureInputProps = {
    min?: number;
    max?: number;
} & CameraLcdItemProps;

const ApertureInput = (props: ApertureInputProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { apertures, configuration } = camera;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleSetAperture = (f: number) => {
        setCamera({ ...camera, configuration: { ...configuration, aperture: f } });
        handleClose()
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (configuration.aperture && !apertures?.includes(configuration.aperture)) {
            setCamera({ ...camera, configuration: { ...configuration, aperture: undefined } });
        }
    }, [apertures]);

    useEffect(() => {
        setCamera({ ...camera, configuration: { ...configuration, aperture: undefined } });
    }, [configuration.lens]);

    const min = 0;
    const max = 100;

    const validValues = apertures?.filter(a => a >= min && a <= max);

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {apertures?.map(s => <MenuItem key={s} onClick={() => handleSetAperture(s)}>{s}</MenuItem >)}
            </Menu >
            <CameraLcdItem
                {...props}
                disabled={!configuration.lens || !apertures}
                label={!configuration.aperture ? 'Aperture' : undefined}
                text={configuration.aperture ? 'ƒ/' + configuration.aperture : ' '}
                onClick={handleClick}
            />
        </>
    )
}

export default ApertureInput;