import { useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';


const ShootingModeInput = (props: CameraLcdItemProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { shootingmodes, configuration } = camera;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleSetShootingMode = (m: typeof shootingmodes[number]) => {
        setCamera({ ...camera, configuration: { ...configuration, shootingmode: m } });
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
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
                {shootingmodes.map((s) => <MenuItem key={s} onClick={() => handleSetShootingMode(s)}>{s as string}</MenuItem >)}
            </Menu >
            <CameraLcdItem
                {...props}
                disabled={!configuration.lens}
                label={configuration.shootingmode ? undefined : 'Mode'}
                text={configuration.shootingmode ?? ' '}
                onClick={handleClick}
            />
        </>
    )
}

export default ShootingModeInput;