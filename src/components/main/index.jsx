import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { withSize } from "react-sizeme";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";

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
    position: "relative",
    "&:first-child": {
      padding: 0,
      overflow: "hidden",
      marginBottom: -12
    }
  },
  dialogContentText: {
    position: "absolute",
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    padding: 12
  },
  dialogContentTextMobile: {
    position: "static",
    marginTop: -12
  },
  dialogContentTextTypo: {
    color: theme.palette.colors.white
  },
  dialogPaper: {
    width: "auto",
    margin: 24,
    maxWidth: "90%",
    animation: "zoom 0.6s",
    overflow: 'hidden'
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
    transform: "translateZ(0)",
    overflow: 'hidden'
  },
  gridListTile: {
    animation: "fadeIn 1s ease-in both"
  },
  gridListTileInner: {
    borderRadius: 0
  },
  "@keyframes zoom": {
    from: {
      transform: "scale(0)"
    },
    to: {
      transform: "scale(1)"
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
  const [selectedImage, updateSelectedImage] = useState({});
  const [open, setDialogStatus] = useState(false);
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
          <img
            className={classes.dialogImage}
            src={open && selectedImage.ImageURLs.FullSize}
            alt="Zoomed"
          />
          <DialogContentText
            classes={{
              root: classNames(
                classes.dialogContentText,
                size.width < 512 && classes.dialogContentTextMobile
              )
            }}
          >
            <Typography
              classes={{ body1: classes.dialogContentTextTypo }}
              variant="body1"
            >
              {selectedImage.Title}
            </Typography>
            <Typography
              classes={{ body2: classes.dialogContentTextTypo }}
              variant="body2"
            >
              {`Family: ${selectedImage.Family}`}
            </Typography>
            <Typography
              classes={{ body2: classes.dialogContentTextTypo }}
              variant="body2"
            >
              {selectedImage.CollectiveNoun &&
                `Collective Noun: ${selectedImage.CollectiveNoun}`}
              {selectedImage.Genus && `Genus: ${selectedImage.Genus}`}
            </Typography>
            <Typography
              classes={{ caption: classes.dialogContentTextTypo }}
              variant="caption"
            >
              {selectedImage.Description}
            </Typography>
          </DialogContentText>
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
                  updateSelectedImage(tile);
                  setDialogStatus(true);
                }}
              >
                <img src={tile.ImageURLs.Thumb} alt={tile.Title} />
                <GridListTileBar
                  title={tile.Title}
                  subtitle={<span>Family: {tile.Family}</span>}
                />
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
  size: PropTypes.object.isRequired
};

export default withSize()(withStyles(styles)(Main));
