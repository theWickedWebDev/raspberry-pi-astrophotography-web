import React from 'react';
import Typography from "@mui/material/Typography/Typography";
import { Box, Button, Grid } from '@mui/material';

export type CameraLcdItemProps = {
    variant?: 'standard';
    basis?: string;
    light?: boolean;
    children?: React.ReactNode;
    text?: string | number | React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    label?: string;
    lgLabel?: string;
    disabled?: boolean;
}

const CameraLcdItem = (props: CameraLcdItemProps) => {
    const { onClick, text, children, label, lgLabel, disabled } = props;

    const content = (<>
        {lgLabel && <Typography variant="h5">{lgLabel}</Typography>}
        {label && <Typography variant="body2" sx={{ m: 1 }} fontWeight="bold">{label}</Typography>}
        {text
            ? (<Typography variant="h6" className="CameraLcdItem_ListItem_LargeHeader">{text}</Typography>)
            : children
        }</>
    );

    if (onClick) {
        return (
            <Button variant="contained" disabled={disabled} color="inherit" sx={{ height: '100%' }} className="CameraLcdItem_Button" onClick={onClick}>
                {content}
            </Button >

        )
    }
    return <Box className="CameraLcdItem_Display">{content}</Box>
}

export default CameraLcdItem;