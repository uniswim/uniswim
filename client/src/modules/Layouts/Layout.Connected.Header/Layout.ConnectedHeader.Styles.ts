import { makeStyles } from "@material-ui/core";


export default makeStyles(theme => ({
    root: {
        display: "flex"
    },

    menuButton: {
        marginRight: 36,
    },
    
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar
    },
    
    main: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
}))