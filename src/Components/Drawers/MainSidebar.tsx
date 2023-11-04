import React, { useState, } from 'react';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import BiotechIcon from '@mui/icons-material/Biotech';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TimelineIcon from '@mui/icons-material/Timeline';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import MenuIcon from '@mui/icons-material/Menu';

import Button from '@mui/material/Button/Button';

type MainSidebar = { defaultOpen: boolean }

const list = [
    {
        label: 'Live',
        Icon: LiveTvIcon,
        url: '',
    },
    {
        Icon: BiotechIcon,
        label: "Telescope",
        url: "/telescope"
    },
    {
        Icon: CameraEnhanceIcon,
        label: "Camera",
        url: "/camera"
    },
    {
        Icon: PhotoLibraryIcon,
        label: "Photo Library",
        url: "/photos"
    },
    {
        Icon: BookmarksIcon,
        label: "Catalog",
        url: "/catalog"
    },
    {
        Icon: EventNoteIcon,
        label: "Upcoming",
        url: "/upcoming"
    },
    {
        Icon: TimelineIcon,
        label: "Planning",
        url: "/planning"
    },
    {
        Icon: SettingsSuggestIcon,
        label: "Settings",
        url: "/settings"
    }
]

export default function (props: MainSidebar) {
    const { defaultOpen } = props;
    const [open, setOpen] = useState(defaultOpen);
    const navigate = useNavigate();

    const toggle = (arg: boolean) => setOpen(arg);

    return (
        <React.Fragment>
            <Button onClick={() => toggle(true)}><MenuIcon /></Button>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => toggle(false)}
            >

                <Box
                    role="presentation"
                    onClick={() => toggle(false)}
                    onKeyDown={() => toggle(false)}
                >
                    <List sx={{ p: 1 }}>
                        {list.map(({ Icon, label, url }, i) => (
                            <React.Fragment key={i}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => navigate(url)}>
                                        <ListItemIcon>
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={label} />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}
