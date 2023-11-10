import { useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';

type FrameCountInput = {} & CameraLcdItemProps;

const FrameCountInput = (props: FrameCountInput) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { frameCounts, configuration } = camera;
    const { frames } = configuration;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleSetFrames = (c: typeof frameCounts[number]) => {
        setCamera({ ...camera, configuration: { ...configuration, frames: c } });
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
                {frameCounts.map(c => <MenuItem key={c} onClick={() => handleSetFrames(c)}>{c}</MenuItem >)}
            </Menu >
            <CameraLcdItem
                {...props}
                disabled={!configuration.lens}
                label={!frames ? 'Frames' : undefined}
                text={frames ? frames + ' frames' : ' '}
                onClick={handleClick}
            />
        </>
    )
}

export default FrameCountInput;