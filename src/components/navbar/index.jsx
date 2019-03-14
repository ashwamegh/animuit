import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appbarRoot:{
    backgroundColor: theme.palette.colors.white,
    boxShadow: 'none',
  },
  tabsRoot: {
    borderBottom: "none"
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main
  },
  tabRoot: {
    textTransform: "initial",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      color: theme.palette.primary.light,
      opacity: 1
    },
    "&$tabSelected": {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: theme.palette.primary.light
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3
  }
});

const Navbar = (props) => {
  const { classes } = props;
  const [value, setValue] = useState(0);

  return (
    <div className={classes.root}>
      <AppBar classes={{ root: classes.appbarRoot} }position="static" color="default">
        <Toolbar>
          <Grid container spacing={24} alignItems="baseline">
            <Grid item xs={12} className={classes.flex}>
              <Tabs
                value={value}
                onChange={(event, value) => setValue(value)}
                classes={{
                  root: classes.tabsRoot,
                  indicator: classes.tabsIndicator
                }}
              >
                <Tab
                  disableRipple
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.tabSelected
                  }}
                  label="ANIMALS"
                />
                <Tab
                  disableRipple
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.tabSelected
                  }}
                  label="FRUITS & VEG"
                />
              </Tabs>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
