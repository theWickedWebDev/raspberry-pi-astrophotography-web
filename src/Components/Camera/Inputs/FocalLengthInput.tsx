import { useEffect, useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';
import { config } from 'process';

type FocalLengthInputProps = {} & CameraLcdItemProps;

const FocalLengthInput = (props: FocalLengthInputProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { configuration } = camera;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const focalLengths = configuration.lens ? Object.keys(configuration.lens.apertures) : []

    const handleSetFocalLength = (focalLength: number) => {
        let aperture;
        if (configuration.aperture && configuration.lens?.apertures[focalLength].includes(configuration.aperture)) {
            aperture = configuration.aperture;
        }

        setCamera({
            ...camera,
            apertures: configuration.lens?.apertures[focalLength],
            configuration: {
                ...configuration,
                focalLength,
                aperture,
            },
        });
        handleClose()
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {focalLengths?.map(fl =>
                    <MenuItem
                        key={fl}
                        onClick={() => handleSetFocalLength(parseInt(fl))}
                    >
                        {fl}mm
                    </MenuItem >
                )}
            </Menu >

            <CameraLcdItem
                {...props}
                disabled={!focalLengths || focalLengths.length <= 1}
                label={!camera.configuration.focalLength ? "Focal Length" : ""}
                text={camera.configuration.focalLength ? camera.configuration.focalLength + 'mm' : ''}
                onClick={handleClick}
            />
        </>
    )
}

export default FocalLengthInput;