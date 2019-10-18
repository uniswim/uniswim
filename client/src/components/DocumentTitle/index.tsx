import React from "react";

type DocumentTitleProps = {
    title: string
}

export default class DocumentTitle extends React.PureComponent<DocumentTitleProps, any>
{
    componentDidMount(){
        document.title = this.props.title;
    }
    render(){
        if(!this.props.children) return null;
        return this.props.children;
    }
}