import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PhotoLibrary from "@material-ui/icons/PhotoLibraryRounded";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withSize } from "react-sizeme";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appbarRoot: {
    backgroundColor: theme.palette.colors.white,
    boxShadow: "none",
    borderBottom: "1px solid #efefef"
  },
  logoButton: {
    "&:hover": {
      backgroundColor: "inherit"
    }
  },
  logoButtonIcon: {
    fill: theme.palette.primary.main,
    marginTop: 4,
    marginLeft: 16,
    marginRight: -16
  },
  gridWrapper: {
    padding: "0 60px",
    height: "100%"
  },
  tabsRoot: {
    borderBottom: "none"
  },
  tabsIndicator: {
    backgroundColor: theme.palette.primary.main,
    bottom: 4
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
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  drawerToolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  drawerListItem: {
    color: theme.palette.primary.main,
    cursor: "pointer",

    "&:hover": {
      color: theme.palette.primary.light,
      opacity: 1
    },
    "&:focus": {
      color: theme.palette.primary.light
    }
  },
  typography: {
    padding: theme.spacing.unit * 3
  }
});

const Navbar = props => {
  const { classes, loadItems, size, theme } = props;
  const [value, setValue] = useState(0);
  const [open, setDrawerStatus] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar
        classes={{ root: classes.appbarRoot }}
        position="fixed"
        color="default"
      >
        <Toolbar
          classes={{ root: size.width <= 612 && classes.drawerToolbar }}
          disableGutters={!open}
        >
          <a href="/">
            <IconButton className={classes.logoButton}>
              <PhotoLibrary className={classes.logoButtonIcon} />
            </IconButton>
          </a>
          {size.width > 612 ? (
            <Grid
              container
              className={classes.gridWrapper}
              spacing={24}
              alignItems="baseline"
            >
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
                    onClick={() => loadItems("animals")}
                  />
                  <Tab
                    disableRipple
                    classes={{
                      root: classes.tabRoot,
                      selected: classes.tabSelected
                    }}
                    label="FRUITS & VEG"
                    onClick={() => loadItems("fruits&veg")}
                  />
                </Tabs>
              </Grid>
            </Grid>
          ) : (
            <IconButton
              color="primary"
              aria-label="Open drawer"
              onClick={() => setDrawerStatus(true)}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setDrawerStatus(false)} color="primary">
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem disableRipple onClick={() => loadItems("animals")}>
            <ListItemText
              classes={{ primary: classes.drawerListItem }}
              primary={"ANIMALS"}
            />
          </ListItem>
          <ListItem disableRipple onClick={() => loadItems("fruits&veg")}>
            <ListItemText
              classes={{ primary: classes.drawerListItem }}
              primary={"FRUITS & VEG"}
            />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  loadItems: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired
};

export default withSize()(withStyles(styles, { withTheme: true })(Navbar));
