import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    width: "80%",
    justifyContent: "center",
    minHeight: 400,
    flexDirection: "column",
    alignItems: "center",
    margin: '0 auto',
    marginTop: 90,
    paddingBottom: 24,
    '@media only screen and (max-width: 767px)':{
      width: "90%"
    },
  },
  listWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
    transform: 'translateZ(0)',
  },
  gridListTile: {
    animation: 'fadeIn 1s ease-in both',
  },
  gridListTileInner: {
    borderRadius: 8,
  },
  '@keyframes fadeIn': {
    'from': {
      opacity: 0,
      transform: 'translate3d(0, -20%, 0)',
    },
    'to' : {
      opacity: 1,
      transform:' translate3d(0, 0, 0)',
    }
  }
});

const Main = props => {
  const { classes, isLoading, items } = props;

  return (
    <main className={classes.root}>
      {isLoading?
        <CircularProgress disableShrink />:
        <div className={classes.listWrapper}>
        <GridList id="masonry" cellHeight={160} className={classes.gridList} cols={3}>
          {items.map(tile => (
            <GridListTile classes={{ root: classes.gridListTile, tile: classes.gridListTileInner}} key={tile.Id} cols={tile.cols || 1}>
              <img src={tile.ImageURLs.Thumb} alt={tile.Title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    }
    </main>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
}

export default withStyles(styles)(Main);
