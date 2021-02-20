import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import packageJson from '../../../package.json';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DevicesIcon from '@material-ui/icons/Devices';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AppsIcon from '@material-ui/icons/Apps';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import CategoryIcon from '@material-ui/icons/Category';
import SettingsIcon from '@material-ui/icons/Settings';
import FeedbackIcon from '@material-ui/icons/Feedback';
import InfoIcon from '@material-ui/icons/Info';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import UserContext from '../user/utils/UserContext';

const useStyles = makeStyles({
    list: {
        width: 250,
        textAlign: "center"
    },
    title: {
        textTransform: "none",
        fontSize: 35,
        margin: 20,
        fontWeight: 600,
        color: "#474747"
    }
});

export interface SideBarProps {
    sidebarState: boolean;
    callbackSidebarToggle: any;
}

export default function SideDrawer(props: SideBarProps) {
    const classes = useStyles();

    function AccountLinksListLoggedIn() {
        return (<List>
            <ListItem button key={1} component={Link} to="/user">
                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary={'My Profile'} />
            </ListItem>
            <ListItem button key={1} component={Link} to="/logout">
                <ListItemIcon><CancelIcon /></ListItemIcon>
                <ListItemText primary={'Logout'} />
            </ListItem>
            <ListItem button key={2} component={Link} to="/device">
                <ListItemIcon><DevicesIcon /></ListItemIcon>
                <ListItemText primary={'This Device'} />
            </ListItem>
            <ListItem button key={3} component={Link} to="/my-apps">
                <ListItemIcon><AssignmentIcon /></ListItemIcon>
                <ListItemText primary={'My Apps'} />
            </ListItem>
            <ListItem button key={4} component={Link} to="/wishlist">
                <ListItemIcon><LibraryAddCheckIcon /></ListItemIcon>
                <ListItemText primary={'Wishlist'} />
            </ListItem>
        </List>);
    }
    function AccountLinksListLoggedOut() {
        return (<List>
            <ListItem button key={1} component={Link} to="/user">
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary={'Login'} />
            </ListItem>
            <ListItem button key={2} component={Link} to="/device">
                <ListItemIcon><DevicesIcon /></ListItemIcon>
                <ListItemText primary={'This Device'} />
            </ListItem>
        </List>);
    }

    function AppsLinksList() {
        return (<List>
            <ListItem button key={1} component={Link} to="/all-apps">
                <ListItemIcon><AppsIcon /></ListItemIcon>
                <ListItemText primary={'All Apps'} />
            </ListItem>
            <ListItem button key={2} component={Link} to="/top">
                <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                <ListItemText primary={'Top Charts'} />
            </ListItem>
            <ListItem button key={3} component={Link} to="/categories">
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary={'Categories'} />
            </ListItem>
        </List>);
    }

    function AboutLinksList() {
        return (<List>
            <ListItem button key={1} component={Link} to="/settings">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary={'Settings'} />
            </ListItem>
            <ListItem button key={2} component={Link} to="/feedback">
                <ListItemIcon><FeedbackIcon /></ListItemIcon>
                <ListItemText primary={'Feedback'} />
            </ListItem>
            <ListItem button key={3} component={Link} to="/about">
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary={'About AllStore'} />
            </ListItem>
        </List>);
    }
    function VersionListItem() {
        return (<List>
            <ListItem key={1} >
                <ListItemIcon><VerifiedUserIcon /></ListItemIcon>
                <ListItemText primary={"Version: " + packageJson.version} />
            </ListItem>
        </List>);
    }

    function TopAppName() {
        return (<Button className={classes.title} component={Link} to={'/'} startIcon={<LocalMallIcon style={{ fontSize: 35 }} />}>
            AllStore
        </Button>);
    }

    function SideBarList() {
        return (
            <div className={classes.list} role="presentation"
                onClick={props.callbackSidebarToggle(false)} onKeyDown={props.callbackSidebarToggle(false)} >
                <TopAppName />
                <Divider />
                <UserContext.Consumer>
                    {({ user, setValue }) => (
                        user.isLoggedIn && <AccountLinksListLoggedIn />
                    )}
                </UserContext.Consumer>
                <UserContext.Consumer>
                    {({ user, setValue }) => (
                        !user.isLoggedIn && <AccountLinksListLoggedOut />
                    )}
                </UserContext.Consumer>
                <Divider />
                <AppsLinksList />
                <Divider />
                <AboutLinksList />
                <Divider />
                <VersionListItem />
                <Divider />
            </div>
        );
    }

    return (
        <div>
            <Drawer anchor='left' open={props.sidebarState} onClose={props.callbackSidebarToggle(false)}>
                <SideBarList />
            </Drawer>
        </div>
    );
}
