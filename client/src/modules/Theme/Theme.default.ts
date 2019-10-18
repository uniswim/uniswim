import { createMuiTheme } from "@material-ui/core";

let _divider = "rgba(0, 0, 0, 0.12)"
export const theme = createMuiTheme({
  palette: {
    divider: _divider,
    background: {
      default: "#F5F7FB"
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        borderBottom: `1px solid ${_divider}`
      },
      colorDefault: {
        backgroundColor: "#ffffff"
      }
    }
  }
});