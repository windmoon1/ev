import CheckBoxOutlined from "@material-ui/icons/CheckBoxOutlined";
import CheckBox from "@material-ui/icons/CheckBox";
import CollectionsBookmark from "@material-ui/icons/CollectionsBookmark";
import DealingCasesView from "../views/CasesPages/DealingCasesView";
import WaitToDealCasesView from "../views/CasesPages/WaitToDealCasesView";

let casesRoutes = [
  {
    path: "/waitToDeal",
    name: "待处理案件",
    icon: CheckBoxOutlined,
    layout: "/cases",
    component: WaitToDealCasesView,
  },
  {
    path: "/alreadyDealed",
    name: "已结案件",
    icon: CheckBox,
    layout: "/cases",
    component: DealingCasesView,
  },
  {
    path: "/dealing",
    name: "待结案件",
    icon: CollectionsBookmark,
    layout: "/cases",
    component: DealingCasesView,
  },
];

export default casesRoutes;
