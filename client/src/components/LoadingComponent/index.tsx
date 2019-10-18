import React from "react"
type props = {
    isLoading: boolean
    error?: Error
}
/**
 * Composant de chargement
 */
export default ({isLoading, error}: props) => {
    if(isLoading){
        return <div>Loading...</div>
    } else if(error){
        return <div>Sorry, there was a problem oading the page.</div>
    } else {
        return null;
    }
}