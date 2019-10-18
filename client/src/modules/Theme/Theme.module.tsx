import React from "react"
import { MuiThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core"
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { theme } from "./Theme.default"

type ThemeModuleProps = {
    theme?: ThemeOptions
    notUseBaseCss?: boolean
}

export default class ThemeModule extends React.PureComponent<ThemeModuleProps, any> { 
    static forRoot(options: ThemeModuleProps){
      return class ThemeModuleForRoot extends ThemeModule {
          static defaultProps: ThemeModuleProps = options;
        } 
    }

    static defaultProps: ThemeModuleProps = {
      notUseBaseCss: false,
      theme: theme
    }
    
    render(){
        return (
            <MuiThemeProvider theme={createMuiTheme(this.props.theme)}>
                {!this.props.notUseBaseCss && <CssBaseline />}
                {this.props.children}
            </MuiThemeProvider>
        )
    }
}
