import { createMuiTheme } from "@material-ui/core";
import { green, blueGrey, grey } from "@material-ui/core/colors";

export const fabTheme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[500],
          },
      secondary: {
        main: grey[500],
      },
    },
  });
  