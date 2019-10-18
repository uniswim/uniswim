import React from "react"
import { AppBar, Toolbar, IconButton, Drawer, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import LayoutConnectedDefaultStyles from "./Layout.Connected.Styles"
import clsx from "clsx"

import MenuIcon from "../../../modules/Icons/Bars"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import HomeIcon from "@material-ui/icons/HomeOutlined"
import InscriptionExpressIcon from "@material-ui/icons/DirectionsRunOutlined"

import { Link } from "@reach/router"


export type LayoutConnectedDefaultProps = {
    headerTitle: string
}

const LayoutConnectedDefault: React.FC<LayoutConnectedDefaultProps> = (props) => {
    const classes = LayoutConnectedDefaultStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, { [classes.appBarShift]: open })}
                color="default"
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => setOpen(!open)}
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    {props.headerTitle && <Typography variant="h6" noWrap>
                        {props.headerTitle}
                    </Typography>}
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                open={open}
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={() => setOpen(!open)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />

                <List>
                    <ListItem button component={Link} to="/accueil" >
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Tableau de bord" />
                    </ListItem>
                    <ListItem button component={Link} to="/inscriptionexpress">
                        <ListItemIcon><InscriptionExpressIcon /></ListItemIcon>
                        <ListItemText primary="Inscription express" />
                    </ListItem>
                </List>

            </Drawer>

            <main className={classes.main}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    )
}
LayoutConnectedDefault.displayName = "LayoutConnectedDefault";

export default LayoutConnectedDefault;