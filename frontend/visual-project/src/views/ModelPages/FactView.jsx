import React from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Grid from "@material-ui/core/Grid";
import CustomButton from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import CropIcon from "@material-ui/icons/Crop";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import ListItem from "@material-ui/core/ListItem";
import Edit from "@material-ui/icons/Edit";
import Save from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/HighlightOff";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import * as Util from "../../util/Util";
import Tooltip from "@material-ui/core/Tooltip";
import LowPriority from "@material-ui/icons/LowPriority";
import Add from "@material-ui/icons/Add";
import Notification from "../../components/Notification/Notification";
import CssBaseLine from "@material-ui/core/CssBaseline";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textFieldBlock: {
    marginBottom: 10,
  },
  buttonAlign: {
    textAlign: "center",
  },
  headPaper: {
    width: "100%",
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

function FactHeads(props) {
  const classes = useStyles();

  const array = props.heads;

  const handleDeleteChip = (chip) => {
    props.deleteJoint(chip.jointId);
  };

  // 控制对话框开关
  const [open, setOpen] = React.useState(false);

  // 点击chip组件选中的chip
  const [selectedChip, setSelectedChip] = React.useState({
    jointId: 0,
    content: "",
  });

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
      content: event.target.value,
    });
  };

  // 从上一级更新数据
  const handleUpdate = () => {
    props.updateJoint(selectedChip.jointId, selectedChip.content);
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
          {array.map((data) => (
            <li key={data.jointId}>
              <Chip
                label={data.content}
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
          <DialogTitle>修改联结点</DialogTitle>
          <DialogContent>
            <DialogContentText>
              请在下方对要更改的联结点内容进行编辑
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="联结点"
              value={selectedChip.content}
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

function FactsCardContent(props) {
  const classes = useStyles();
  const item = props.item;
  const notEditing = item.factId !== props.editing;
  const [heads, setHeads] = React.useState([]);

  const [text, setText] = React.useState(item.body);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  React.useEffect(() => {
    //setHeads(JSON.parse(DocumentData.heads));
    //console.log(item);
  }, []);

  //根据factId提取联结点
  const createHeads = () => {
    const url = "/facts/createJointByFactId";

    let param = JSON.stringify({
      factId: item.factId,
    });

    const succ = (response) => {
      setHeads(response);
    };

    const err = () => {
      console.log("提取联结点出现异常");
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  //更新联结点
  const updateJoint = (jointId, content) => {
    let tempHead = [...heads];
    for (let head of tempHead) {
      if (head.jointId === jointId) {
        head.content = content;
      }
    }

    const url = "/facts/updateJoint";
    let param = JSON.stringify({
      id: jointId,
      content: content,
    });
    const succ = () => {};
    const err = () => {
      console.log("updateJoint error");
    };
    Util.asyncHttpPost(url, param, succ, err);
    setHeads(tempHead);
  };

  const deleteJoint = (jointId) => {
    setHeads((list) => list.filter((head) => head.jointId !== jointId));

    const url = "/facts/deleteJoint";

    let param = JSON.stringify({
      jointId: jointId,
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
        <Grid item xs={9}>
          <TextField
            label="单条事实"
            value={text}
            fullWidth
            disabled={notEditing}
            onChange={handleChangeText}
          />
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <Tooltip title="提取联结点" placement="right">
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
              onClick={() => props.handleClickEdit(item.factId, text)}
            >
              {notEditing ? <Edit /> : <Save />}
            </CustomButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1} className={classes.buttonAlign}>
          <Tooltip title="删除" placement="right">
            <CustomButton
              color="danger"
              simple
              onClick={() => props.handleClickDelete(item.factId)}
            >
              <DeleteIcon />
            </CustomButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <FactHeads
            heads={heads}
            deleteJoint={deleteJoint}
            updateJoint={updateJoint}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

function FactsJudgeContent(props) {
  const classes = useStyles();
  const item = props.item;
  // const [heads, setHeads] = React.useState([]);

  React.useEffect(() => {
    //setHeads(JSON.parse(DocumentData.heads));
  }, []);

  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField label="单条事实" value={item.body} fullWidth disabled />
        </Grid>
        <Grid item xs={2} className={classes.buttonAlign}>
          <CustomButton
            color={item.confirm ? "success" : "danger"}
            onClick={() => props.handleClickAgree(props.position)}
          >
            {item.confirm ? <Check /> : <Close />}
            {item.confirm ? "已认定" : "未认定"}
          </CustomButton>
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*<FactHeads heads={heads} noDelete />*/}
        {/*</Grid>*/}
      </Grid>
    </ListItem>
  );
}

FactsJudgeContent.propTypes = {
  item: PropTypes.object,
  position: PropTypes.number,
  handleClickAgree: PropTypes.func,
};

export default function FactView() {
  const classes = useStyles();

  const [note, setNote] = React.useState({
    show: false,
    color: "",
    content: "",
  });

  const [facts, setFacts] = React.useState([]);
  const [editing, setEditing] = React.useState(-1);

  const [factText, setFactText] = React.useState("");

  React.useEffect(() => {
    document.title = "事实分解与认定";
    //初始化事实文本
    initFactText();
    //setFacts(JSON.parse(DocumentData.facts));
  }, []);

  const handleCloseNote = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNote({ ...note, show: false });
  };

  const handleFactTextChange = (event) => {
    setFactText(event.target.value);
  };

  const initFactText = () => {
    const url = "/facts/initFact";

    let param = JSON.stringify({
      caseId: sessionStorage.getItem("caseId"),
      userName: sessionStorage.getItem("username"),
    });

    const succ = (response) => {
      console.log(response);
      setFactText(response.documentBody);
    };

    const err = () => {
      setNote({ show: true, content: "分解事实出现异常", color: "error" });
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  //分解事实
  const handleFactResolve = () => {
    const url = "/facts/resolve";

    let param = JSON.stringify({
      caseId: sessionStorage.getItem("caseId"),
      text: factText,
    });

    const succ = (response) => {
      console.log(response);
      //设置分解完的事实列表
      setFacts(response);
      sessionStorage.setItem("documentId", response[0].documentId);
    };

    const err = () => {
      setNote({ show: true, content: "分解事实出现异常", color: "error" });
    };

    console.log("caseId" + sessionStorage.getItem("caseId"));
    Util.asyncHttpPost(url, param, succ, err);
  };

  // const handleClickSingleEdit = (id) => {
  //   console.log(id);
  //   if (id === editing) {
  //     setEditing(-1);
  //   } else {
  //     setEditing(id);
  //   }
  // };

  //更新单条事实的body
  const updateBodyById = (id, text) => {
    const url = "/facts/updateFactById";

    let param = JSON.stringify({
      factId: id,
      fact: text,
    });

    const succ = () => {
      setNote({ show: true, content: "更新证据成功", color: "success" });
    };
    const err = () => {
      setNote({ show: true, content: "更新证据出现异常", color: "error" });
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  //编辑证据
  const handleClickEdit = (id, text) => {
    if (id === editing) {
      setEditing(-1);
      updateBodyById(id, text);
      let tempArray;
      tempArray = [...facts];
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].factId === id) {
          tempArray[i].body = text;
        }
      }
      // console.log(tempArray);
      setFacts(tempArray);
    } else {
      setEditing(id);
    }
  };

  React.useEffect(() => {
    console.log(facts);
  }, [facts]);

  //删除单条证据
  const handleClickDelete = (id) => {
    setFacts((list) => list.filter((item) => item.factId !== id));
    // setFacts(tempArray);
    console.log(facts);

    const url = "/facts/deleteFactByFactId";

    let param = JSON.stringify({
      factId: id,
    });

    const succ = (response) => {
      setNote({ show: true, content: "删除成功", color: "success" });
    };

    const err = () => {
      setNote({ show: true, content: "删除出现异常", color: "error" });
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  //对单条事实进行认定不认定
  const handleClickAgree = (index) => {
    let array = [...facts];
    array[index].confirm = !array[index].confirm;
    setFacts(array);
    let confirm = array[index].confirm;
    let factId = array[index].factId;

    const url = "/facts/updateTrustById";

    let param = JSON.stringify({
      factId: factId,
      confirm: confirm === false ? 0 : 1,
    });

    const succ = () => {
      setNote({ show: true, content: "更改事实状态成功", color: "success" });
    };

    const err = () => {
      setNote({ show: true, content: "认定事实出现异常", color: "error" });
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  //增加新的事实
  const addNewFact = () => {
    const url = "/facts/addFact";

    let param = JSON.stringify({
      caseId: sessionStorage.getItem("caseId"),
      body: "",
    });

    const succ = (response) => {
      let documentId = sessionStorage.getItem("documentId");
      addNewToState(response.factId, "", documentId, 0);
    };

    const err = () => {
      setNote({ show: true, content: "新增证据出现异常", color: "error" });
    };

    Util.asyncHttpPost(url, param, succ, err);
  };

  //往事实集合里面添加新的事实
  const addNewToState = (factId, body, documentId, confirm) => {
    let tempArray = [...facts];
    tempArray.push({
      factId: 5,
      body: body,
      confirm: confirm,
      documentId: documentId,
    });
    setFacts(tempArray);
  };

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
            <CardHeader color="warning">事实文本</CardHeader>
            <CardBody>
              <TextField
                fullWidth
                label="请在此输入"
                multiline
                rows={7}
                value={factText}
                variant="outlined"
                className={classes.textFieldBlock}
                onChange={handleFactTextChange}
              />
              <CustomButton
                color="success"
                style={{ marginRight: 10 }}
                round
                onClick={handleFactResolve}
              >
                <CropIcon />
                分解事实
              </CustomButton>
              {/*<CustomButton color="info" round>*/}
              {/*<EditIcon />*/}
              {/*编辑事实*/}
              {/*</CustomButton>*/}
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader color="info">事实分解结果</CardHeader>
            <CardBody>
              <List>
                {facts.map((item) => (
                  <FactsCardContent
                    key={item.factId}
                    item={item}
                    editing={editing}
                    handleClickEdit={handleClickEdit}
                    handleClickDelete={handleClickDelete}
                  />
                ))}
              </List>
              <Paper elevation={0} className={classes.addButton}>
                <CustomButton color="success" onClick={addNewFact}>
                  <Add />
                  新增单条事实
                </CustomButton>
              </Paper>
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader color="danger">事实认定</CardHeader>
            <CardBody>
              <List>
                {facts.map((item, index) => (
                  <FactsJudgeContent
                    key={item.factId}
                    item={item}
                    position={index}
                    handleClickAgree={handleClickAgree}
                  />
                ))}
              </List>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

FactHeads.propTypes = {
  heads: PropTypes.array,
  noDelete: PropTypes.bool,
};

FactsCardContent.propTypes = {
  heads: PropTypes.array,
  item: PropTypes.object,
  editing: PropTypes.number,
  handleClickEdit: PropTypes.func,
  handleClickDelete: PropTypes.func,
};
