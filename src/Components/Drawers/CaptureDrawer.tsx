import React, { useState, } from 'react';
import { useNavigate } from "react-router-dom";


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CameraIcon from '@mui/icons-material/CameraAlt';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

type CaptureDrawer = { defaultOpen: boolean }

export default function (props: CaptureDrawer) {
    const { defaultOpen } = props;
    const [open, setOpen] = useState(defaultOpen);
    const navigate = useNavigate();

    const toggle = (arg: boolean) => setOpen(arg);

    return (
        <React.Fragment>
            <Button onClick={() => toggle(true)}><CameraIcon /></Button>

            <Drawer
                anchor="bottom"
                open={open}
                onClose={() => toggle(false)}
            >

                <Box
                    role="presentation"
                    onClick={() => toggle(false)}
                    onKeyDown={() => toggle(false)}
                >
                    <List sx={{ display: 'flex' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsRemoteIcon />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SettingsSuggestIcon />
                                </ListItemIcon>
                                <ListItemText primary="asdf" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ManageHistoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="asdf" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton sx={{ justifyContent: "flex-end" }}>
                                <Button variant="contained" color="error">
                                    <ListItemText primary="Capture" color="primary" />
                                </Button>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
