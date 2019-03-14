import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    minHeight: 400,
    flexDirection: "column",
    alignItems: "center",
  },
});

const Main = props => {
  const { classes } = props;

  return (
    <main className={classes.root}>
      <CircularProgress disableShrink />
    </main>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Main);
