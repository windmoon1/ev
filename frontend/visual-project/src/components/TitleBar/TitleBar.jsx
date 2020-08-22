import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";
import Person from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AlertDialog from "../Dialog/AlertDialog";
import { pink } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import CustomDropdown from "../CustomDropdown/CustomDropdown";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolBar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  appBarSpacer: theme.mixins.toolbar,
  pink: {
    marginRight: 10,
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

function TitleBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notesNum, setNotesNum] = React.useState(0);
  React.useEffect(() => {
    setNotesNum(parseInt(sessionStorage.getItem("notesNum")));
  }, []);

  const handleClickDrawer = () => {
    props.handleClickMenuButton();
  };

  const handleClickExit = () => {
    setOpen(true);
  };

  const handleIndeedExit = () => {
    sessionStorage.clear();
    props.history.push("/login");
  };

  const handleClickBadge = (event) => {
    setNotesNum(0);
    sessionStorage.setItem("notesNum", "0");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, props.open && classes.appBarShift)}
    >
      <AlertDialog
        open={open}
        title="是否退出登录?"
        content="这意味着未保存的数据将丢失"
        colorLeft="secondary"
        textLeft="退出登录"
        colorRight="primary"
        textRight="取消"
        closeDialog1={handleIndeedExit}
        closeDialog2={() => setOpen(false)}
      />
      {/* <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
        <DialogTitle id="form-dialog-title">更改链头</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请在下方对要更改的链头内容进行编辑
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="链头"
            value="塘沽"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="default">
            取消
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            更改
          </Button>
        </DialogActions>
      </Dialog> */}
      <Toolbar className={classes.toolBar}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClickDrawer}
          className={clsx(
            classes.menuButton,
            props.open && classes.menuButtonHidden
          )}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {props.content}
        </Typography>
        <Avatar className={classes.pink}>
          <Person />
        </Avatar>
        <IconButton color="inherit" onClick={handleClickBadge}>
          <Badge badgeContent={notesNum} color="secondary">
            <NotificationIcon />
          </Badge>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            案件（2015）津刑初字第00015号已加入待处理列表
          </MenuItem>
          <MenuItem onClick={handleClose}>
            案件（2015）津刑初字第00014号已加入待处理列表
          </MenuItem>
          <MenuItem onClick={handleClose}>
            案件（2015）津刑初字第00036号已加入待处理列表
          </MenuItem>
        </Menu>
        <IconButton color="inherit" onClick={handleClickExit}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

TitleBar.propTypes = {
  open: PropTypes.bool,
  content: PropTypes.string,
  handleClickMenuButton: PropTypes.func,
};

export default TitleBar;
