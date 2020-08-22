import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";
import TitleBar from "../components/TitleBar/TitleBar";
import SideBar from "../components/SideBar/SideBar";
import Routes from "../routes/CasesRoutes";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
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
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const switchRoutes = (
  <Switch>
    {Routes.map((item) => {
      if (item.layout === "/cases") {
        return (
          <Route
            path={item.layout + item.path}
            component={item.component}
            key={item.path}
          />
        );
      } else {
        return null;
      }
    })}
  </Switch>
);

export default function CaseListLayout(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClickMenuButton = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* 顶部状态栏 */}
      <TitleBar
        open={open}
        content={"案件列表"}
        handleClickMenuButton={handleClickMenuButton}
        {...props}
      />
      {/* 左侧侧边栏 */}
      <SideBar
        open={open}
        list={Routes}
        handleClickMenuButton={handleClickMenuButton}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* 通过switchRoutes将Routes.js中所有项展开，当页面地址与Routes.js中某项元素的layout + path符合时，加载该元素的component */}
          {switchRoutes}
        </Container>
      </main>
    </div>
  );
}
