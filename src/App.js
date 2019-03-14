import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import "./App.css";
import { Navbar } from "./components";

const styles = theme => ({
  container:{
    padding: '0 60px',
    height: '100%'
  }
})

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
        <div className={classes.container}>
          <Navbar />
        </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(App);
