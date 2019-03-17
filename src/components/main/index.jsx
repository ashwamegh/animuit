import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { withSize } from "react-sizeme";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    width: "80%",
    justifyContent: "center",
    minHeight: 400,
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    marginTop: 90,
    paddingBottom: 24,
    "@media only screen and (max-width: 767px)": {
      width: "90%"
    }
  },
  dialogContent: {
    padding: 0,
    "&:first-child": {
      padding: 0,
      overflow: "hidden",
      marginBottom: -12
    }
  },
  dialogPaper: {
    width: "auto",
    margin: 24,
    maxWidth: "90%",
    animation: 'zoom 0.6s',
  },
  dialogImage: {
    width: "100%"
  },
  listWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%",
    transform: "translateZ(0)"
  },
  gridListTile: {
    animation: "fadeIn 1s ease-in both"
  },
  gridListTileInner: {
    borderRadius: 0
  },
  '@keyframes zoom': {
    'from': {
      transform: 'scale(0)'
    },
    'to': {
      transform: 'scale(1)'
    }
  },

  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translate3d(0, -20%, 0)"
    },
    to: {
      opacity: 1,
      transform: " translate3d(0, 0, 0)"
    }
  }
});

const Main = props => {
  const { classes, isLoading, items, size } = props;
  const [ selectedImage, updateSelectedImage ] = useState("");
  const [ open, setDialogStatus ] = useState(false);
  const deviceWidth = size.width;
  let cols = 3;

  if (deviceWidth >= 1192) {
    cols = 5;
  } else if (deviceWidth >= 767) {
    cols = 4;
  } else if (deviceWidth >= 612) {
    cols = 3;
  } else if (deviceWidth >= 392) {
    cols = 2;
  } else if (deviceWidth < 392) {
    cols = 1;
  }

  return (
    <main className={classes.root}>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        onClose={() => setDialogStatus(false)}
        open={open}
      >
        <DialogContent className={classes.dialogContent}>
          <img className={classes.dialogImage} src={selectedImage} />
        </DialogContent>
      </Dialog>
      {isLoading ? (
        <CircularProgress disableShrink />
      ) : (
        <div className={classes.listWrapper}>
          <GridList
            id="masonry"
            cellHeight={160}
            className={classes.gridList}
            cols={cols}
          >
            {items.map(tile => (
              <GridListTile
                classes={{
                  root: classes.gridListTile,
                  tile: classes.gridListTileInner
                }}
                key={tile.Id}
                cols={tile.cols || 1}
                onClick={() => {
                  updateSelectedImage(tile.ImageURLs.FullSize);
                  setDialogStatus(true);
                }}
              >
                <img src={tile.ImageURLs.FullSize} alt={tile.Title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )}
    </main>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  size: PropTypes.object.isRequired,
};

export default withSize()(withStyles(styles)(Main));
