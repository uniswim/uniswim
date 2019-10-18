import React from "react"
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core"
import LayoutConnectedHeaderStyles from "./Layout.ConnectedHeader.Styles"
import ArrowBack from "@material-ui/icons/ArrowBack"
import clsx from "clsx"

export type LayoutConnectedHeaderProps = {
    headerTitle: string
}

const LayoutConnectedHeader: React.FC<LayoutConnectedHeaderProps> = (props) => {
    const classes = LayoutConnectedHeaderStyles();
    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                color="default"
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        className={clsx(classes.menuButton)}
                        onClick={() => window.history.back()}
                    >
                        <ArrowBack />
                    </IconButton>
                    {props.headerTitle && <Typography variant="h6" noWrap>
                        {props.headerTitle}
                    </Typography>}
                </Toolbar>
            </AppBar>

            <main className={classes.main}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    )
}
LayoutConnectedHeader.displayName = "LayoutConnectedHeader";

export default LayoutConnectedHeader;