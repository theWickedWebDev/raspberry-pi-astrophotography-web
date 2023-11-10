import { useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';

type ISOInputProps = {} & CameraLcdItemProps;

export const ISOIcon = ({ disabled }: { disabled?: boolean }) => (
    <><span className={`CameraLcdItem_BW ${disabled ? 'CameraLcdItem_BW--disabled' : ''}`}>ISO</span>&nbsp;</>
)

const ISOInput = (props: ISOInputProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { isos, configuration } = camera;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleSetISO = (s: typeof isos[number]) => {
        setCamera({ ...camera, configuration: { ...configuration, iso: s } });
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
                {isos.map(s => <MenuItem key={s} onClick={() => handleSetISO(s)}>ISO {s}</MenuItem >)}
            </Menu >
            <CameraLcdItem
                {...props}
                disabled={!configuration.lens}
                text={<><ISOIcon disabled={!configuration.lens} />{camera.configuration.iso}</>}
                onClick={handleClick}
            />
        </>
    )
}

export default ISOInput;