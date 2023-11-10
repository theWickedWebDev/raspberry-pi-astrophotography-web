import { useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';


const ShutterSpeedInput = (props: CameraLcdItemProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { shutterspeeds, bulbExposures, configuration } = camera;

    type ShutterSpeedType = typeof shutterspeeds[number] & typeof shutterspeeds[number];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleSetSpeed = (s: ShutterSpeedType) => {
        setCamera({ ...camera, configuration: { ...configuration, shutterspeed: s } });
        handleClose()
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const speeds = [...bulbExposures.map(b => ("BULB " + b)), ...shutterspeeds] as ShutterSpeedType[];

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {speeds.map((s) => <MenuItem key={s} onClick={() => handleSetSpeed(s)}>{s as string}</MenuItem >)}
            </Menu >
            <CameraLcdItem
                {...props}
                disabled={!configuration.lens}
                label={!configuration.shutterspeed ? 'Shutterspeed' : (configuration.shutterspeed as ShutterSpeedType)?.includes('BULB') ? "BULB" : ''}
                text={configuration.shutterspeed ? configuration.shutterspeed?.replace('BULB', '') + 's' : ' '}
                onClick={handleClick}
            />

        </>
    )
}

export default ShutterSpeedInput;