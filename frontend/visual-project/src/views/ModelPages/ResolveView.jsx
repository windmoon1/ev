import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Grid from "@material-ui/core/Grid";
import CustomButton from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CropIcon from "@material-ui/icons/Crop";
// import EditIcon from "@material-ui/icons/Edit";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Check from "@material-ui/icons/Check";
// import Close from "@material-ui/icons/Close";
import LowPriority from "@material-ui/icons/LowPriority";
import DeleteIcon from "@material-ui/icons/HighlightOff";
import PersonIcon from "@material-ui/icons/Person";
import List from "@material-ui/core/List";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Add from "@material-ui/icons/Add";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
// import { CardTitle } from "assets/jss/material-kit-react.js";
import Notification from "../../components/Notification/Notification";
import * as Util from "../../util/Util";
import CssBaseLine from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    // height: 120
  },
  paper2: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 200,
  },
  paper3: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 500,
  },
  text: {
    float: "left",
    display: "block",
  },
  textarea: {
    height: "80%",
  },
  textFieldBlock: {
    marginBottom: 10,
  },
  evidenceItem: {
    marginTop: "10px",
    height: "40",
    width: "80%",
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
  addButton: {
    padding: theme.spacing(2),
    textAlign: "right",
  },
}));

function SelectEvidenceType(props) {
  // const [type, setType] = React.useState(props.evidenceType);

  const handleSelectType = (event) => {
    props.handleChangeType(event.target.value);
  };

  return (
    <FormControl fullWidth disabled={props.disabled}>
      <InputLabel>类型</InputLabel>
      <Select value={props.evidenceType} onChange={handleSelectType}>
        <MenuItem value={0}>证人证言</MenuItem>
        <MenuItem value={1}>被告人供述和辩解</MenuItem>
        <MenuItem value={2}>书证</MenuItem>
        <MenuItem value={3}>勘验</MenuItem>
        <MenuItem value={4}>检查笔录</MenuItem>
        <MenuItem value={5}>其他</MenuItem>
      </Select>
    </FormControl>
  );
}

// 链头，使用paper与chips实现
function EvidenceHeads(props) {
  const classes = useStyles();

  const array = props.heads;

  // 控制对话框开关
  const [open, setOpen] = React.useState(false);

  // 点击chip组件选中的chip
  const [selectedChip, setSelectedChip] = React.useState({
    headId: 0,
    head: "",
  });

  const handleDeleteChip = (chip) => {
    props.deleteHead(chip.headId);
  };

  // 点击chip
  const handleClick = (chip) => {
    setSelectedChip(chip);
    setOpen(true);
  };

  // 对话框关闭
  const handleClose = () => {
    setOpen(false);
  };

  // 对话框里的文本框
  const handleChange = (event) => {
    setSelectedChip({
      ...selectedChip,
      head: event.target.value,
    });
  };

  // 从上一级更新数据
  const handleUpdate = () => {
    props.updateHead(selectedChip.headId, selectedChip.head);
    setOpen(false);
  };

  // 链头为空不渲染
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
      <div>
        <Paper component="ul" variant="outlined" className={classes.headPaper}>
          {array.map((data, index) => (
            <li key={index + data.headId}>
              <Chip
                label={data.head}
                variant="outlined"
                color="primary"
                className={classes.chip}
                onDelete={() => handleDeleteChip(data)}
                clickable
                onClick={() => handleClick(data)}
              />
            </li>
          ))}
        </Paper>
        {/*添加对话框组件*/}
        <Dialog open={open} onClose={handleClose} maxWidth="sm">
          <DialogTitle>修改链头</DialogTitle>
          <DialogContent>
            <DialogContentText>
              请在下方对要更改的链头内容进行编辑
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="链头"
              value={selectedChip.head}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              取消
            </Button>
            <Button onClick={handleUpdate} color="primary">
              确认
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
}

function EvidenceTabContent(props) {
  const classes = useStyles();

  const item = props.item;

  const notEditing = item.bodyId !== props.editing;

  const [text, setText] = React.useState(item.body);

  const [type, setType] = React.useState(item.type);

  const [heads, setHeads] = React.useState([]);

  React.useEffect(() => {
    setHeads(null);
    setType(item.type);
  }, []);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const handleChangeType = (type) => {
    setType(type);
  };

  const clickDelete = () => {
    props.handleClickDelete(item.bodyId, props.prosecutor);
    console.log(item.bodyId);
  };

  const createHeads = () => {
    const url = "/evidence/createHeadByBodyId";
    let param = JSON.stringify({
      bodyId: item.bodyId,
    });
    const succ = (response) => {
      setHeads(response);
    };
    const err = () => {
      console.log("createHeads error");
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  // 更新链头
  const updateHead = (headId, headText) => {
    let tempHead = [...heads];
    for (let head of tempHead) {
      if (head.headId === headId) {
        head.head = headText;
      }
    }

    const url = "/evidence/updateHead";
    let param = JSON.stringify({
      id: headId,
      head: headText,
    });
    const succ = () => {};
    const err = () => {
      console.log("updateHead error");
    };
    Util.asyncHttpPost(url, param, succ, err);
    setHeads(tempHead);
  };

  const deleteHead = (headId) => {
    setHeads((list) => list.filter((head) => head.headId !== headId));
    const url = "/evidence/deleteHead";
    let param = JSON.stringify({
      headId,
    });
    const succ = (response) => {
      console.log(response);
    };
    const err = () => {
      console.log("deleteHead Err");
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="单条证据"
            value={text}
            fullWidth
            disabled={notEditing}
            onChange={handleChangeText}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectEvidenceType
            evidenceType={type}
            disabled={notEditing}
            handleChangeType={handleChangeType}
          />
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <Tooltip title="分解链头" placement="right">
            <CustomButton color="warning" simple onClick={createHeads}>
              <LowPriority />
            </CustomButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <Tooltip title={notEditing ? "编辑" : "保存"} placement="right">
            <CustomButton
              color={notEditing ? "info" : "success"}
              simple
              onClick={() =>
                props.handleClickEdit(item.bodyId, text, type, props.prosecutor)
              }
            >
              {notEditing ? <Edit /> : <Save />}
            </CustomButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <Tooltip title="删除" placement="right">
            <CustomButton color="danger" simple onClick={clickDelete}>
              <DeleteIcon />
            </CustomButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          {/*添加更新链头的回调函数*/}
          <EvidenceHeads
            heads={heads}
            deleteHead={deleteHead}
            updateHead={updateHead}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

// 函数式写法，无class
export default function ResolveView() {
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
  // 原告证据
  const [prosecutorDoc, setProsecutorDoc] = React.useState([]);
  // 被告证据
  const [defendantDoc, setDefendantDoc] = React.useState([]);

  const [caseDetail, setCaseDetail] = React.useState({
    caseNum: "（2015）浦刑初字第2978号",
    caseName:
      "上海市浦东新区人民检察院以沪浦检刑诉（2015）2315号起诉书指控被告人王某某犯危险驾驶罪案",
    userName: "孙志刚",
  });

  const [editing, setEditing] = React.useState(-1);
  //原告证据
  const [prosecutorEvidence, setProsecutorEvidence] = React.useState("");
  //被告证据
  const [defendantEvidence, setDefendantEvidence] = React.useState("");

  const setCaseBaseInfo = () => {
    //初始化得到案件的基本信息（案号，案件名称，承办人）
    const url = "/case/getCaseDetail";
    let param = JSON.stringify({
      username: sessionStorage.getItem("username"),
      caseId: sessionStorage.getItem("caseId"),
    });

    const succ = (response) => {
      setCaseDetail({
        caseNum: response.caseNum,
        caseName: response.caseName,
        userName: sessionStorage.getItem("realName"),
      });
    };

    const err = () => {
      console.log("证据分解界面数据初始化异常");
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  const initProsecutor = () => {
    const url = "/case/initEvidenceByType";
    let param = JSON.stringify({
      username: sessionStorage.getItem("username"),
      caseId: sessionStorage.getItem("caseId"),
      type: 0,
    });
    const succ = (response) => {
      setProsecutorEvidence(response.documentBody);
    };
    const err = () => {
      setNote({ show: true, color: "error", content: "原告证据初始化失败" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  const initDefendant = () => {
    const url = "/case/initEvidenceByType";
    let param = JSON.stringify({
      username: sessionStorage.getItem("username"),
      caseId: sessionStorage.getItem("caseId"),
      type: 1,
    });
    const succ = (response) => {
      setDefendantEvidence(response.documentBody);
    };
    const err = () => {
      setNote({ show: true, color: "error", content: "被告证据初始化失败" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  React.useEffect(() => {
    document.title = "证据分解";
    setCaseBaseInfo();
    initProsecutor();
    initDefendant();
  }, []);

  //分解原告证据
  const handleProsecutorResolve = () => {
    // alert(prosecutorEvidence);
    const url = "/evidence/document";
    let param = JSON.stringify({
      caseId: sessionStorage.getItem("caseId"),
      type: 0,
      text: prosecutorEvidence,
    });

    const succ = (response) => {
      //设置原告分解完证据列表
      setProsecutorDoc(response);
      console.log(response);
      sessionStorage.setItem("proDocumentId", response[0].documentId);
    };

    const err = () => {
      setNote({ show: true, content: "分解原告证据出现异常", color: "error" });
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  //分解被告证据
  const handleDefendantResolve = () => {
    // alert(defendantEvidence);
    const url = "/evidence/document";
    let param = JSON.stringify({
      caseId: sessionStorage.getItem("caseId"),
      type: 1,
      text: defendantEvidence,
    });

    const succ = (response) => {
      //设置被告分解完证据列表
      setDefendantDoc(response);
      sessionStorage.setItem("defDocumentId", response[0].documentId);
    };

    const err = () => {
      setNote({ show: true, content: "分解被告证据出现异常", color: "error" });
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  const handleEvidenceChange = (field) => (event) => {
    if (field === "prosecutor") {
      setProsecutorEvidence(event.target.value);
    } else {
      setDefendantEvidence(event.target.value);
    }
  };

  // 更新单条证据文本
  const updateBodyById = (id, text) => {
    console.log(id);
    const url = "/evidence/updateBodyById";
    let param = JSON.stringify({
      bodyId: id,
      body: text,
    });
    const succ = () => {
      setNote({
        show: true,
        content: "更新单条证据文本成功",
        color: "success",
      });
    };
    const err = () => {
      setNote({ show: true, content: "更新单条证据失败", color: "error" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  // 更新单条证据类型
  const updateTypeById = (id, type) => {
    const url = "/evidence/updateTypeById";
    let param = JSON.stringify({
      bodyId: id,
      type: type,
    });
    const succ = () => {
      setNote({
        show: true,
        content: "更新单条证据成功",
        color: "success",
      });
    };
    const err = () => {
      setNote({ show: true, content: "更新单条证据失败", color: "error" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  const handleClickEdit = (id, text, type, isProsecutor) => {
    console.log(id);
    if (id === editing) {
      setEditing(-1);
      updateBodyById(id, text);
      updateTypeById(id, type);
      let tempArray;
      if (isProsecutor) {
        tempArray = [...prosecutorDoc];
        for (let i = 0; i < tempArray.length; i++) {
          if (tempArray[i].bodyId === id) {
            tempArray[i].body = text;
            tempArray[i].type = type;
          }
        }
        // console.log(tempArray);
        setProsecutorDoc(tempArray);
      } else {
        tempArray = [...defendantDoc];
        for (let i = 0; i < tempArray.length; i++) {
          if (tempArray[i].bodyId === id) {
            tempArray[i].body = text;
            tempArray[i].type = type;
          }
        }
        setDefendantDoc(tempArray);
      }
    } else {
      setEditing(id);
    }
  };

  // 删除单条证据
  const handleClickDelete = (id, prosecutor) => {
    // let documentId;
    if (prosecutor) {
      setProsecutorDoc((list) => list.filter((item) => item.bodyId !== id));
    } else {
      setDefendantDoc((list) => list.filter((item) => item.bodyId !== id));
    }
    const url = "/evidence/deleteBody";
    let param = JSON.stringify({
      caseId: parseInt(sessionStorage.getItem("caseId")),
      bodyId: id,
    });
    console.log(param);
    const succ = () => {
      // forceUpdate();
      setNote({ show: true, color: "success", content: "删除单条证据成功" });
    };
    const err = () => {
      setNote({ show: true, color: "error", content: "删除单条证据失败" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  const addNewToState = (isProsecutor, documentId, bodyId) => {
    if (isProsecutor) {
      let tempArray = [...prosecutorDoc];
      tempArray.push({
        documentId,
        bodyId,
        type: 0,
        body: "",
        confirm: 0,
      });
      setProsecutorDoc(tempArray);
    } else {
      let tempArray = [...defendantDoc];
      tempArray.push({
        documentId,
        bodyId,
        type: 0,
        body: "",
        confirm: 0,
      });
      setDefendantDoc(tempArray);
    }
  };

  //新增单条证据
  const addNewEvidence = (isProsecutor) => {
    let documentId = isProsecutor
      ? sessionStorage.getItem("proDocumentId")
      : sessionStorage.getItem("defDocumentId");
    const url = "/evidence/addBody";
    let param = JSON.stringify({
      documentId,
      caseId: sessionStorage.getItem("caseId"),
      type: 0,
      body: "",
    });
    // 必须先发请求，从后端获取bodyId，一并添加进去，否则编辑会出问题
    const succ = (response) => {
      console.log(response);
      addNewToState(isProsecutor, documentId, response.bodyId);
      setNote({ show: true, color: "success", content: "添加单条证据成功" });
    };
    const err = () => {
      setNote({ show: true, color: "error", content: "添加单条证据失败" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseLine />
      <Notification
        color={note.color}
        content={note.content}
        open={note.show}
        autoHide={1500}
        onClose={handleCloseNote}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader color="primary">案件信息</CardHeader>
            <CardBody>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>案件号</TableCell>
                    <TableCell>{caseDetail.caseNum}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>案件名称</TableCell>
                    <TableCell>{caseDetail.caseName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>承办人</TableCell>
                    <TableCell>{caseDetail.userName}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader color="warning">原告证据</CardHeader>
            <CardBody>
              <TextField
                fullWidth
                label="请在此输入"
                multiline
                rows={7}
                variant="outlined"
                className={classes.textFieldBlock}
                value={prosecutorEvidence}
                onChange={handleEvidenceChange("prosecutor")}
              />
              <CustomButton
                type="button"
                color="success"
                style={{ marginRight: 10 }}
                round
                onClick={handleProsecutorResolve}
              >
                <CropIcon />
                分解证据
              </CustomButton>
              {/*<CustomButton type="button" color="info" round>*/}
              {/*  <EditIcon />*/}
              {/*  编辑证据*/}
              {/*</CustomButton>*/}
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader color="warning">被告证据</CardHeader>
            <CardBody>
              <TextField
                fullWidth
                label="请在此输入"
                multiline
                rows={7}
                variant="outlined"
                className={classes.textFieldBlock}
                value={defendantEvidence}
                onChange={handleEvidenceChange("defendant")}
              />
              <CustomButton
                type="button"
                color="success"
                style={{ marginRight: 10 }}
                round
                onClick={handleDefendantResolve}
              >
                <CropIcon />
                分解证据
              </CustomButton>
              {/*<CustomButton type="button" color="info" round>*/}
              {/*  <EditIcon />*/}
              {/*  编辑证据*/}
              {/*</CustomButton>*/}
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <CustomTabs
            title="证据分解结果"
            headerColor="info"
            tabs={[
              {
                tabName: "原告",
                tabIcon: PersonIcon,
                tabContent: (
                  <div className={classes.root}>
                    <List>
                      {prosecutorDoc.map((item, index) => (
                        <EvidenceTabContent
                          key={item.bodyId}
                          position={index}
                          item={item}
                          editing={editing}
                          prosecutor={true}
                          handleClickEdit={handleClickEdit}
                          handleClickDelete={handleClickDelete}
                        />
                      ))}
                    </List>
                    <Paper elevation={0} className={classes.addButton}>
                      <CustomButton
                        color="success"
                        onClick={() => addNewEvidence(true)}
                      >
                        <Add />
                        添加原告证据
                      </CustomButton>
                      {/*<CustomButton color="danger" onClick={() => handleClickDelete(209, true)}>删除2</CustomButton>*/}
                    </Paper>
                  </div>
                ),
              },
              {
                tabName: "被告",
                tabIcon: PersonOutlineIcon,
                tabContent: (
                  <div className={classes.root}>
                    <List>
                      {defendantDoc.map((item, index) => (
                        <EvidenceTabContent
                          key={item.bodyId}
                          position={index}
                          item={item}
                          editing={editing}
                          prosecutor={false}
                          handleClickEdit={handleClickEdit}
                          handleClickDelete={handleClickDelete}
                        />
                      ))}
                    </List>
                    <Paper elevation={0} className={classes.addButton}>
                      <CustomButton
                        color="success"
                        onClick={() => addNewEvidence(false)}
                      >
                        <Add />
                        添加被告证据
                      </CustomButton>
                    </Paper>
                  </div>
                ),
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}

SelectEvidenceType.propTypes = {
  disabled: PropTypes.bool,
  evidenceType: PropTypes.number,
  handleChangeType: PropTypes.func,
};

EvidenceHeads.propTypes = {
  heads: PropTypes.array,
  deleteHead: PropTypes.func,
};

EvidenceTabContent.propTypes = {
  position: PropTypes.number,
  item: PropTypes.object,
  agree: PropTypes.bool,
  editing: PropTypes.number,
  prosecutor: PropTypes.bool,
  handleClickEdit: PropTypes.func,
  handleClickDelete: PropTypes.func,
};
