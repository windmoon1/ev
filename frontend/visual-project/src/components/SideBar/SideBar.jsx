import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  navLink: {
    textDecoration: "none",
    display: "block",
    color: "black",
  },
}));

export default function SideBar(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleListItemClick = (index) => () => {
    setSelectedIndex(index);
  };

  const handleClickIcon = () => {
    props.handleClickMenuButton();
    // setOpen(!open);
  };

  const array = props.list;
  console.log(array);

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.open && classes.drawerPaperClose
        ),
      }}
      open={props.open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleClickIcon}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {/* 使用NavLink/Link组件对listItem进行包裹，点击item时就会跳转到相应链接 */}
        {array.map((item, index) => (
          <NavLink
            to={item.layout + item.path}
            className={classes.navLink}
            key={item.path}
          >
            <ListItem
              button
              selected={selectedIndex === index}
              onClick={handleListItemClick(index)}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      {/* <List></List> */}
    </Drawer>
  );
}

SideBar.propTypes = {
  open: PropTypes.bool,
  list: PropTypes.array,
  handleClickMenuButton: PropTypes.func,
};
