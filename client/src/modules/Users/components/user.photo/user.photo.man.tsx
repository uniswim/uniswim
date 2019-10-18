import React from "react"
import { ReactComponent as ManDefault } from "./man.default.svg"
import UserPhoto, { UserPhotoProps } from "./user.photo"


export const UserPhotoMan: React.FC<UserPhotoProps> = (props) => {
    return (
        <UserPhoto {...props}><ManDefault /></UserPhoto>
    )
}

export default UserPhotoMan;