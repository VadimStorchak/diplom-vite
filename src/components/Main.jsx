import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import TaskList from "./TaskList";
import TaskView from "./TaskView";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import {Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

const Main = () => {
    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    useEffect(() => {
        const currentLocation = window.location.pathname;

    },);

    return (
        <>
            <Box sx={{width: '100%', typography: 'body1'}} className={"main-box"}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1"/>
                            <Tab label="Item Two" value="2"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1"><TaskList/></TabPanel>
                    <TabPanel value="2"><TaskView/></TabPanel>
                </TabContext>
            </Box>
            const DrawerList = (
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            );
            <Button onClick={toggleDrawer(true)}>Open drawer</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
};

export default Main;
