import React from "react"
import Avatar, { AvatarProps } from "@material-ui/core/Avatar"

export type UserPhotoProps = {
} & AvatarProps

const UserPhoto: React.FC<UserPhotoProps> = (props) => {
    return (
        <Avatar {...props} />
    )
}

export default UserPhoto;