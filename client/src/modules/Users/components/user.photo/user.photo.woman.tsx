import React from "react"
import { ReactComponent as WomanDefault } from "./woman.default.svg"
import UserPhoto, { UserPhotoProps } from "./user.photo"


export const UserPhotoWoman: React.FC<UserPhotoProps> = (props) => {
    return (
        <UserPhoto {...props}><WomanDefault /></UserPhoto>
    )
}

export default UserPhotoWoman;