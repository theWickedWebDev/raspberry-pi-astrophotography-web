import { useEffect, useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';

type LensInputProps = {} & CameraLcdItemProps;

const LensInput = (props: LensInputProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { lenses, configuration } = camera;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleAttachLens = (lens: typeof lenses[number]) => {
        const apertures = lens?.apertures ? Object.keys(lens?.apertures) : [];
        const apertureValues = apertures.length > 0 ? lens?.apertures[parseInt(apertures[0])] : undefined;
        const isPrimeLens = apertures.length === 1;

        setCamera({
            ...camera,
            apertures: isPrimeLens ? apertureValues : undefined,
            configuration: {
                ...configuration,
                lens,
                focalLength: isPrimeLens ? parseInt(apertures[0]) : undefined,
            }
        });

        handleClose()
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(configuration, 'bang configuration');

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {lenses.map(lens => <MenuItem key={lens.name} onClick={() => handleAttachLens(lens)}>{lens.name}</MenuItem >)}
            </Menu >
            <CameraLcdItem
                {...props}
                label={!camera.configuration.lens?.name ? "Lens" : ""}
                text={camera.configuration.lens?.name || ''}
                onClick={handleClick}
            />
        </>
    )
}

export default LensInput;