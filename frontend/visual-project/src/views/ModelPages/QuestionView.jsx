import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CustomButton from "components/CustomButtons/Button.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import PersonIcon from "@material-ui/icons/Person";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../../components/Notification/Notification";
import * as Util from "../../util/Util";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonAlign: {
    textAlign: "center",
  },
  headPaper: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  contradictPaper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
  },
}));

// 证据类型选择
function SelectEvidenceType(props) {
  const [type, setType] = React.useState(props.evidenceType);

  const handleSelectType = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl fullWidth disabled={props.disabled}>
      <InputLabel>类型</InputLabel>
      <Select value={type} onChange={handleSelectType}>
        <MenuItem value={0}>书证</MenuItem>
        <MenuItem value={1}>物证</MenuItem>
        <MenuItem value={2}>证言</MenuItem>
      </Select>
    </FormControl>
  );
}

// 链头，使用paper与chips实现
function EvidenceHeads(props) {
  const classes = useStyles();

  const array = props.heads;

  let hasContent = true;
  if (array == null) {
    hasContent = false;
  } else {
    if (array.length === 0) {
      hasContent = false;
    }
  }

  if (hasContent) {
    return (
      <Paper component="ul" variant="outlined" className={classes.headPaper}>
        {array.map((data, index) => (
          <li key={index}>
            <Chip
              label={data.head}
              variant="outlined"
              color="primary"
              className={classes.chip}
            />
          </li>
        ))}
      </Paper>
    );
  } else {
    return null;
  }
}

// 非矛盾证据
function EvidenceTabContent(props) {
  const classes = useStyles();

  const item = props.item;

  const [heads, setHeads] = React.useState([]);

  React.useEffect(() => {
    // setHeads(JSON.parse(DocumentData.heads));
    const url = "/evidence/createHeadByBodyId";
    let param = JSON.stringify({
      bodyId: item.bodyId,
    });
    const succ = (response) => {
      setHeads(response);
    };
    const err = () => {
      console.log("headErr");
    };
    Util.asyncHttpPost(url, param, succ, err);
  }, []);

  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <TextField label="单条证据" value={item.body} fullWidth disabled />
        </Grid>
        <Grid item xs={3}>
          <SelectEvidenceType evidenceType={item.type} disabled />
        </Grid>
        <Grid item xs={2} className={classes.buttonAlign}>
          <CustomButton
            color={item.confirm ? "success" : "danger"}
            onClick={() =>
              props.handleClickAgree(item.bodyId, props.prosecutor)
            }
          >
            {item.confirm ? <Check /> : <Close />}
            {item.confirm ? "已认定" : "未认定"}
          </CustomButton>
        </Grid>
        <Grid item xs={12}>
          <EvidenceHeads heads={heads} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

// 矛盾证据
// item.bodyId, item.type, item.confirm, item.body, item.role
function ContradictItem(props) {
  const classes = useStyles();

  const item = props.item;

  const [confirm, setConfirm] = React.useState(item.confirm);

  const [heads, setHeads] = React.useState([]);

  let label;
  if (item.role) {
    label = "被告证据";
  } else {
    label = "原告证据";
  }

  const handleClickAgree = () => {
    let tempConfirm = confirm;
    if (confirm === 0) {
      tempConfirm = 1;
    } else {
      tempConfirm = 0;
    }
    console.log(tempConfirm);
    const url = "/evidence/updateTrustById";
    let param = JSON.stringify({
      bodyId: item.bodyId,
      confirm: tempConfirm,
    });
    const succ = (response) => {
      console.log(response);
      setConfirm(tempConfirm);
    };
    const err = () => {
      console.log("bodyId: " + item.bodyId);
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  React.useEffect(() => {
    const url = "/evidence/createHeadByBodyId";
    let param = JSON.stringify({
      bodyId: item.bodyId,
    });
    const succ = (response) => {
      setHeads(response);
    };
    const err = () => {
      console.log("headErr");
    };
    Util.asyncHttpPost(url, param, succ, err);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <TextField label={label} value={item.body} fullWidth disabled />
      </Grid>
      <Grid item xs={3}>
        <SelectEvidenceType evidenceType={item.type} disabled />
      </Grid>
      <Grid item xs={2} className={classes.buttonAlign}>
        <CustomButton
          color={confirm ? "success" : "danger"}
          onClick={handleClickAgree}
        >
          {confirm ? <Check /> : <Close />}
          {confirm ? "已认定" : "未认定"}
        </CustomButton>
      </Grid>
      <Grid item xs={12}>
        <EvidenceHeads heads={heads} />
      </Grid>
    </Grid>
  );
}

// 矛盾证据组
function ContradictGroup(props) {
  const classes = useStyles();

  const itemArray = props.item;

  return (
    <ListItem>
      <Paper className={classes.contradictPaper} elevation={5}>
        <Grid container spacing={1}>
          {itemArray.map((item, index) => (
            <Grid item xs={12} key={index}>
              <ContradictItem item={item} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </ListItem>
  );
}

// 主界面
export default function QuestionView() {
  const classes = useStyles();
  // 原告证据
  const [prosecutorDoc, setProsecutorDoc] = React.useState([]);
  // 被告证据
  const [defendantDoc, setDefendantDoc] = React.useState([]);

  const [contradiction, setContradiction] = React.useState([]);

  const [editing, setEditing] = React.useState(-1);

  const [note, setNote] = React.useState({
    show: false,
    color: "",
    content: "",
  });

  const handleCloseNote = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNote({ ...note, show: false });
  };

  const handleClickEdit = (id) => {
    if (id === editing) {
      setEditing(-1);
    } else {
      setEditing(id);
    }
  };

  // 是handleClickAgree的一部分
  const updateConfirmById = (id, confirm) => {
    const url = "/evidence/updateTrustById";
    let param = JSON.stringify({
      bodyId: id,
      confirm,
    });
    const succ = (response) => {
      console.log(response);
      setNote({ show: true, content: "认证成功", color: "success" });
    };
    const err = () => {
      setNote({ show: true, content: "认证失败", color: "error" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  // 是handleClickAgree的一部分
  const changeConfirmInArray = (id, tempArray, isProsecutor) => {
    let confirm = 0;
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].bodyId === id) {
        if (tempArray[i].confirm) {
          tempArray[i].confirm--;
        } else {
          tempArray[i].confirm++;
        }
        confirm = tempArray[i].confirm;
      }
    }
    if (isProsecutor) {
      setProsecutorDoc(tempArray);
    } else {
      setDefendantDoc(tempArray);
    }
    return confirm;
  };

  // 点击认定按钮
  const handleClickAgree = (bodyId, isProsecutor) => {
    let array;
    let confirm;
    if (isProsecutor) {
      array = [...prosecutorDoc];
      confirm = changeConfirmInArray(bodyId, array, isProsecutor);
      updateConfirmById(bodyId, confirm);
    } else {
      array = [...defendantDoc];
      confirm = changeConfirmInArray(bodyId, array, isProsecutor);
      updateConfirmById(bodyId, confirm);
    }
  };
  // const handleProDocChange =

  // 原告方非矛盾证据
  const setProNoContradictData = () => {
    const url = "/evidence/getNoContradictByDocumentId";
    let param = JSON.stringify({
      documentId: sessionStorage.getItem("proDocumentId"),
    });
    const succ = (response) => {
      setProsecutorDoc(response);
    };
    const err = () => {
      setNote({
        show: true,
        color: "error",
        content: "原告非矛盾证据加载失败",
      });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  // 被告方非矛盾证据
  const setDefNoContradictData = () => {
    const url = "/evidence/getNoContradictByDocumentId";
    let param = JSON.stringify({
      documentId: sessionStorage.getItem("defDocumentId"),
    });
    const succ = (response) => {
      setDefendantDoc(response);
    };
    const err = () => {
      setNote({
        show: true,
        color: "error",
        content: "被告非矛盾证据加载失败",
      });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  // 加载矛盾证据
  const setContradictData = () => {
    const url = "/evidence/getContradictByDocumentId";
    let param = JSON.stringify({
      caseId: sessionStorage.getItem("caseId"),
    });
    const succ = (response) => {
      setContradiction(response);
      setNote({ show: true, color: "success", content: "矛盾证据加载成功" });
    };
    const err = () => {
      setNote({ show: true, color: "error", content: "非矛盾证据加载失败" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  React.useEffect(() => {
    document.title = "质证采信";
    setProNoContradictData();
    setDefNoContradictData();
    setContradictData();
  }, []);

  return (
    <div className={classes.root}>
      <Notification
        color={note.color}
        content={note.content}
        open={note.show}
        autoHide={1500}
        onClose={handleCloseNote}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTabs
            title="非矛盾证据"
            headerColor="success"
            tabs={[
              {
                tabName: "原告",
                tabIcon: PersonIcon,
                tabContent: (
                  <List>
                    {prosecutorDoc.map((item, index) => (
                      <EvidenceTabContent
                        key={index}
                        position={index}
                        item={item}
                        editing={editing}
                        prosecutor
                        handleClickEdit={handleClickEdit}
                        handleClickAgree={handleClickAgree}
                      />
                    ))}
                  </List>
                ),
              },
              {
                tabName: "被告",
                tabIcon: PersonOutlineIcon,
                tabContent: (
                  <List>
                    {defendantDoc.map((item, index) => (
                      <EvidenceTabContent
                        key={index}
                        position={index}
                        item={item}
                        editing={editing}
                        prosecutor={false}
                        handleClickEdit={handleClickEdit}
                        handleClickAgree={handleClickAgree}
                      />
                    ))}
                  </List>
                ),
              },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader color="danger">矛盾证据</CardHeader>
            <CardBody>
              <List>
                {contradiction.map((item) => (
                  <ContradictGroup item={item.bodys} key={item.contradictId} />
                ))}
              </List>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

SelectEvidenceType.propTypes = {
  disabled: PropTypes.bool,
  evidenceType: PropTypes.number,
};

EvidenceHeads.propTypes = {
  heads: PropTypes.array,
};

EvidenceTabContent.propTypes = {
  position: PropTypes.number,
  item: PropTypes.object,
  agree: PropTypes.bool,
  editing: PropTypes.number,
  prosecutor: PropTypes.bool,
  handleClickEdit: PropTypes.func,
  handleClickAgree: PropTypes.func,
};

ContradictItem.propTypes = {
  item: PropTypes.object,
};

ContradictGroup.propTypes = {
  item: PropTypes.array,
};
