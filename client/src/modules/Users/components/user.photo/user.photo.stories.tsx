import React from "react"
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, number, color } from '@storybook/addon-knobs';
import UserPhoto from "./user.photo"
import UserPhotoMan from "./user.photo.man"
import UserPhotoWoman from "./user.photo.woman"
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    }
}))

const stories = storiesOf("User.Photo", module);

stories.addDecorator(withKnobs);

stories.add("with image", () => { 
    const classes = useStyles();
    const backgroundColor = color("background", "");
    const imageUrl = text("src", "");
    return (<UserPhoto className={classes.avatar} src={imageUrl}  style={{ background: backgroundColor }} />)
})
stories.add("with Text", () => { 
    const classes = useStyles();
    const backgroundColor = color("background", "");
    const _text = text("Initials", "DV");
    return (<UserPhoto className={classes.avatar}  style={{ background: backgroundColor }} >{_text}</UserPhoto>)
})
stories.add("Man avatar", () => { 
    const classes = useStyles();
    const backgroundColor = color("background", "");
    return (<UserPhotoMan className={classes.avatar}  style={{ background: backgroundColor }} />)
})
stories.add("Woman avatar", () => {
    const classes = useStyles();
    const backgroundColor = color("background", "");
    return (<UserPhotoWoman className={classes.avatar}  style={{ background: backgroundColor }} />) 
})

/*
export default {
    title: "User Photo",
    component: UserPhoto
}
export const Man = () => <UserPhotoMan  />
export const Woman = () => <UserPhotoWoman  />
*/