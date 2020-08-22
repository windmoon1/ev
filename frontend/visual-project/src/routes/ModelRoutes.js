import LooksOneIcon from "@material-ui/icons/LooksOne";
import LooksTwoIcon from "@material-ui/icons/LooksTwo";
import Looks3Icon from "@material-ui/icons/Looks3";
import Looks4Icon from "@material-ui/icons/Looks4";
import Looks5Icon from "@material-ui/icons/Looks5";
// import Looks6Icon from '@material-ui/icons/Looks6';
// import DeveloperMode from "@material-ui/icons/DeveloperMode";

import Resolve from "../views/ModelPages/ResolveView";
import Question from "../views/ModelPages/QuestionView";
// import Develop from "../views/ModelPages/DevelopView";
import Model from "../views/ModelPages/ModelView";
import Fact from "../views/ModelPages/FactView";
import LogicModelView from "../views/ModelPages/LogicModelView";

let modelRoutes = [
  {
    path: "/resolve",
    name: "证据分解",
    icon: LooksOneIcon,
    layout: "/model",
    component: Resolve,
  },
  {
    path: "/question",
    name: "质证采信",
    icon: LooksTwoIcon,
    layout: "/model",
    component: Question,
  },
  {
    path: "/fact",
    name: "事实分解与认定",
    icon: Looks3Icon,
    layout: "/model",
    component: Fact,
  },
  {
    path: "/createModel",
    name: "建模",
    icon: Looks4Icon,
    layout: "/model",
    component: Model,
  },
  {
    path: "/logicModel",
    name: "说理逻辑",
    icon: Looks5Icon,
    layout: "/model",
    component: LogicModelView,
  },
  // {
  //   path: "/developing",
  //   name: "测试界面",
  //   icon: DeveloperMode,
  //   layout: "/model",
  //   component: Develop,
  // },
];

export default modelRoutes;
