// Generic
import React from "react";
import classNames from "classnames";
import { compose, withProps, branch, renderComponent, pure } from "recompose";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";

import MusicIcon from "@material-ui/icons/MusicNote";
import ComedyIcon from "@material-ui/icons/TagFaces";
import LearningIcon from "@material-ui/icons/School";
import FamilyKidsIcon from "@material-ui/icons/ChildFriendly";
import FestivalsIcon from "@material-ui/icons/LocalBar";
import MoviesIcon from "@material-ui/icons/LocalMovies";
import FoodIcon from "@material-ui/icons/Fastfood";
import ArtIcon from "@material-ui/icons/Image";
import HolidayIcon from "@material-ui/icons/Today";
import BusinessIcon from "@material-ui/icons/AttachMoney";
import OutdoorsIcon from "@material-ui/icons/Landscape";
import SportsIcon from "@material-ui/icons/DirectionsRun";
import OtherIcon from "@material-ui/icons/Place";

const icons = {
  music: MusicIcon,
  comedy: ComedyIcon,
  learning_education: LearningIcon,
  family_fun_kids: FamilyKidsIcon,
  festivals: FestivalsIcon,
  movies_film: MoviesIcon,
  food: FoodIcon,
  art: ArtIcon,
  performing_arts: ArtIcon,
  holiday: HolidayIcon,
  business: BusinessIcon,
  outdoors_recreation: OutdoorsIcon,
  sports: SportsIcon,
  other: OtherIcon
};

const iconSize = 36;

const freeColors = {
  normal: "#1e7d01",
  hover: "#30cc00",
  selected: "#30cc00"
};

const paidColors = {
  normal: "#ab4b02",
  hover: "#fd4a00",
  selected: "#fd4a00"
};

// JS styles
const styles = {
  root: {
    cursor: "pointer",
    height: iconSize,
    width: iconSize,
    backgroundColor: "white",
    border: "1pt solid",
    marginTop: -iconSize / 2,
    marginLeft: -iconSize / 2
  },
  free: {
    color: freeColors.normal,
    borderColor: freeColors.normal,
    "&:hover": {
      color: freeColors.hover,
      borderColor: freeColors.hover
    }
  },
  freeSelected: {
    color: freeColors.selected,
    borderColor: freeColors.selected
  },
  paid: {
    color: paidColors.normal,
    borderColor: paidColors.normal,
    "&:hover": {
      color: paidColors.hover,
      borderColor: paidColors.hover
    }
  },
  paidSelected: {
    color: paidColors.selected,
    borderColor: paidColors.selected
  }
};

const Info = ({ text, anchor, open }) => (
  <Popover
    id="simple-popper"
    open={open}
    anchorEl={anchor}
    //onClose={this.handleClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
  >
    Hello
  </Popover>
);

// Component definition, not selected
const ComponentFree = ({ classes, id, Icon, text, selected, onClick }) => (
  <Tooltip title={text}>
    <Icon
      className={classNames(classes.root, classes.free, {
        [classes.freeSelected]: selected
      })}
      onClick={() => onClick(id)}
    />
  </Tooltip>
);

const ComponentPaid = ({ classes, id, Icon, text, selected, onClick }) => (
  <div>
    <Icon
      className={classNames(classes.root, classes.paid, {
        [classes.paidSelected]: selected
      })}
      onClick={() => onClick(id)}
    />
    
  </div>
);

// Enhance and export
export default compose(
  withProps(props => ({
    Icon:
      props.categoryValue && icons[props.categoryValue]
        ? icons[props.categoryValue]
        : icons["other"]
  })),
  withStyles(styles),
  branch(
    ({ free }) => free,
    renderComponent(ComponentFree),
    renderComponent(ComponentPaid)
  ),
  pure
)();
