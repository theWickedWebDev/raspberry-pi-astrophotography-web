import { useState } from 'react';
import CameraLcdItem, { CameraLcdItemProps } from './CameraLcdItem';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import cameraState from '../../../State/camera';
import { useRecoilState } from 'recoil';

type TemplateSelectInputProps = {} & CameraLcdItemProps;

const TemplateSelectInput = (props: TemplateSelectInputProps) => {
    const [camera, setCamera] = useRecoilState(cameraState);
    const { configuration } = camera;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleSetTemplate = (t: typeof camera.templates[number]) => {
        // setCamera({ ...camera, configuration: { ...configuration, iso: s } });
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
                {camera.templates.map(t => <MenuItem key={t.name} onClick={() => handleSetTemplate(t)}>{t.name}</MenuItem >)}
            </Menu >
            <CameraLcdItem
                {...props}
                disabled={!configuration.lens || !configuration.focalLength}
                text="Select template"
                onClick={handleClick}
            />
        </>
    )
}

export default TemplateSelectInput;