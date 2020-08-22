import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import AddToQueue from "@material-ui/icons/AddToQueue";
import Adjust from "@material-ui/icons/Adjust";
import ImageIcon from "@material-ui/icons/Image";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForever from "@material-ui/icons/DeleteForever";
import AccountBalance from "@material-ui/icons/AccountBalance";
import CustomButton from "components/CustomButtons/Button";
import Typography from "@material-ui/core/Typography";
import * as Util from "../../util/Util";
import * as ModelUtil from "../../util/ModelUtil";
import NavPills from "components/NavPills/NavPills.js";
// import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
// import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Notification from "../../components/Notification/Notification";
import PropTypes from "prop-types";
// import DocumentData from "../../util/data/DocumentData";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  canvas: {
    //width:"500px",
    height: "100%",
    border: "solid red 1px",
  },
  paper: {
    padding: theme.spacing(2),
    //textAlign: 'center',
  },
  rightDiv: {
    border: "solid red 1px",
    float: "right",
  },
  button: {
    margin: theme.spacing(1),
  },
  text: {
    marginBottom: 10,
  },
}));

function RulesRecommend(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    let name = event.target.value;
    for (let item of props.laws) {
      if (item.name === name) {
        setContent(item.content);
        props.selectLaw(name);
      }
    }
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <RadioGroup value={value} onChange={handleChange}>
          {props.laws.map((item) => (
            <FormControlLabel
              control={<Radio />}
              label={item.name}
              value={item.name}
              key={item.name}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <TextField
        disabled
        fullWidth
        multiline={content.length > 35}
        rows={content.length / 35 + 1}
        variant="outlined"
        label="详细内容"
        value={content}
      />
    </div>
  );
}

export default function LogicModelView() {
  const classes = useStyles();

  const canvasRef = React.useRef(null);

  const [realEvidences, setRealEvidences] = React.useState([]);

  const [realFacts, setRealFacts] = React.useState([]);

  // 所有法条
  const [laws, setLaws] = React.useState([]);

  // 结论
  const [results, setResults] = React.useState([]);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [ruleDialogOpen, setRuleDialogOpen] = React.useState(false);

  const [solidLines, setSolidLines] = React.useState([]);

  const [values, setValues] = React.useState({
    id: 0,
    logicNodeId: 0,
    name: "",
    nodeText: "", //点击节点信息
    type: "", // 原告被告
    role: "",
    nodeType: "", // 节点类型，证据/事实/法条等
  });

  const [editing, setEditing] = React.useState(false);

  // 发条推荐子组件中选中的法条
  const [selectedLaw, setSelectedLaw] = React.useState("");

  // 可以显示在界面上的法条
  const [citedLaws, setCitedLaws] = React.useState([]);

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

  React.useEffect(() => {
    document.title = "说理逻辑";
    initCanvas();
    initData();
  }, []);

  const initCanvas = () => {
    ModelUtil.initCanvas(canvasRef);
  };

  const initData = () => {
    const url = "/model/getLogicInfo";
    let param = JSON.stringify({
      caseId: 3,
    });
    const succ = (response) => {
      let facts = response.facts;
      for (let part of facts) {
        if (part.confirm === 1) {
          setRealFacts(part.body);
        }
      }
      let evidences = response.evidences;
      for (let part of evidences) {
        if (part.confirm === 1) {
          setRealEvidences(part.body);
        }
      }
      setCitedLaws(response.laws);
      setResults(response.results);
      setSolidLines(response.lines);
    };
    const err = () => {
      setNote({
        show: true,
        color: "error",
        content: "获取数据失败，请稍后重试！",
      });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  const drawCanvas = () => {
    let stageState = ModelUtil.initScene(canvasRef);
    let scene = stageState[1];
    let stage = stageState[0];
    //scene.background= '1.png';

    let xPosition = 100;
    let yPosition = 20;
    let ySpacing = 100;

    [yPosition, ySpacing] = ModelUtil.calculateY(
      realEvidences.length,
      ySpacing
    );
    realEvidences.forEach((item) => {
      let node = createEvidenceNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      let text = item.text;
      // 添加自定义属性
      node.contentId = item.id;
      node.serializedProperties.push("contentId");
      node.nodeType = "evidence";
      node.serializedProperties.push("nodeType");
      node.type = item.type;
      node.serializedProperties.push("type");
      node.role = item.role;
      node.serializedProperties.push("role");
      node.mousedown(() => {
        setValues({
          id: node.contentId,
          logicNodeId: node.logicNodeId,
          nodeText: text,
          nodeType: "evidence",
          type: node.type,
          role: node.role,
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition += 150;
    yPosition = 50;
    [yPosition, ySpacing] = ModelUtil.calculateY(realFacts.length, ySpacing);
    realFacts.forEach((item) => {
      let node = createFactNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      let text = item.text;
      node.contentId = item.id;
      node.serializedProperties.push("contentId");
      node.nodeType = "fact";
      node.serializedProperties.push("nodeType");
      node.mousedown(() => {
        setValues({
          id: node.contentId,
          logicNodeId: node.logicNodeId,
          nodeText: text,
          nodeType: "fact",
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition += 150;
    yPosition = 50;
    [yPosition, ySpacing] = ModelUtil.calculateY(citedLaws.length, ySpacing);
    citedLaws.forEach((item) => {
      let node = createRuleNode(
        item.logicNodeId,
        item.name,
        item.text,
        xPosition,
        yPosition
      );
      node.contentId = item.id;
      node.serializedProperties.push("contentId");
      node.nodeType = "law";
      node.serializedProperties.push("nodeType");
      node.name = item.name;
      node.serializedProperties.push("name");
      node.mousedown(() => {
        setValues({
          id: node.contentId,
          logicNodeId: node.logicNodeId,
          name: node.name,
          nodeText: item.text,
          nodeType: "law",
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    xPosition += 150;
    [yPosition, ySpacing] = ModelUtil.calculateY(results.length, ySpacing);
    results.forEach((item) => {
      let node = createResultNode(
        item.logicNodeId,
        item.text,
        xPosition,
        yPosition
      );
      node.contentId = item.id;
      node.serializedProperties.push("contentId");
      node.nodeType = "result";
      node.serializedProperties.push("nodeType");
      node.mousedown(() => {
        setValues({
          id: node.contentId,
          logicNodeId: node.logicNodeId,
          nodeText: item.text,
          nodeType: "result",
        });
      });
      scene.add(node);
      yPosition += ySpacing;
    });

    let allNode = stage.find("node");
    solidLines.forEach((line) => {
      let node1;
      allNode.forEach((singleNode) => {
        if (line.logicNodeId1 === singleNode.logicNodeId) {
          node1 = singleNode;
        }
      });
      let node2;
      allNode.forEach((singleNode) => {
        if (line.logicNodeId2 === singleNode.logicNodeId) {
          node2 = singleNode;
        }
      });
      if (node1 && node2) {
        let link = ModelUtil.createLink(node1, node2, false);
        scene.add(link);
      }
    });
  };

  const createEvidenceNode = (logicNodeId, text, x, y, fake) => {
    let color = fake ? "149,117,205" : "106,27,154";
    return ModelUtil.createNode(logicNodeId, text, x, y, color);
  };

  const createFactNode = (logicNodeId, text, x, y, fake) => {
    let color = fake ? "236,64,122" : "173,20,87";
    return ModelUtil.createNode(logicNodeId, text, x, y, color);
  };

  const createRuleNode = (logicNodeId, name, text, x, y) => {
    let node = ModelUtil.createNode(logicNodeId, text, x, y, "255,152,0");
    node.title = name;
    return node;
  };

  const createResultNode = (logicNodeId, text, x, y) => {
    return ModelUtil.createNode(logicNodeId, text, x, y, "76,175,80");
  };

  const handleIndeedDelete = () => {
    setDialogOpen(false);
  };

  const updateValueInArray = (id, content, array) => {
    for (let item of array) {
      if (item.id === id) {
        item.text = content;
      }
    }
    return array;
  };

  const handleClickEdit = () => {
    if (editing) {
      let url = "";
      let param = {};
      switch (values.nodeType) {
        case "evidence":
          url = "/evidence/updateBodyById";
          param = JSON.stringify({
            bodyId: values.id,
            body: values.nodeText,
          });
          break;
        case "fact":
          url = "/facts/updateFactById";
          param = JSON.stringify({
            factId: values.id,
            fact: values.nodeText,
          });
          break;
        case "law":
          url = "/model/updateLawById";
          param = JSON.stringify({
            lawId: values.id,
            content: values.nodeText,
          });
          break;
        case "result":
          url = "/model/updateResultById";
          param = JSON.stringify({
            resultId: values.id,
            content: values.nodeText,
          });
          break;
      }
      const succ = () => {
        setNote({ show: true, color: "success", content: "更新节点成功!" });
        switch (values.nodeType) {
          case "evidence":
            setRealEvidences(
              updateValueInArray(values.id, values.nodeText, [...realEvidences])
            );
            break;
          case "fact":
            setRealFacts(
              updateValueInArray(values.id, values.nodeText, [...realFacts])
            );
            break;
          case "law":
            setLaws(updateValueInArray(values.id, values.nodeText, [...laws]));
            break;
          case "result":
            setResults(
              updateValueInArray(values.id, values.nodeText, [...results])
            );
            break;
        }
        drawCanvas();
      };
      const err = () => {
        setNote({ show: true, color: "error", content: "更新节点失败!" });
      };
      Util.asyncHttpPost(url, param, succ, err);
    }
    setEditing(!editing);
  };

  const recommendLaw = () => {
    const url = "/model/recommendLaw";
    let param = JSON.stringify({});
    const succ = (response) => {
      setLaws(response);
      setRuleDialogOpen(true);
    };
    const err = () => {
      setNote({ show: true, color: "error", content: "法条推荐失败!" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  const citeLaw = () => {
    // console.log(selectedLaw);
    let content = "";
    for (let item of laws) {
      if (item.name === selectedLaw) {
        content = item.content;
      }
    }
    const url = "/model/addLaw";
    let param = JSON.stringify({
      caseId: 3,
      factId: values.id,
      name: selectedLaw,
      content,
    });
    const succ = () => {
      setNote({ show: true, color: "success", content: "添加法条成功!" });
      setRuleDialogOpen(false);
      initData();
      initCanvas();
      drawCanvas();
    };
    const err = () => {
      setNote({ show: true, color: "error", content: "添加法条失败!" });
    };
    Util.asyncHttpPost(url, param, succ, err);
  };

  return (
    <div>
      <Notification
        color={note.color}
        content={note.content}
        open={note.show}
        autoHide={3000}
        onClose={handleCloseNote}
      />
      <Dialog
        maxWidth="sm"
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <DialogTitle id="alert-dialog-title">{"是否删除该节点?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography color="primary">LogicNodeId:</Typography>
            {values.logicNodeId}
            <Typography color="primary">详细信息:</Typography>
            {values.nodeText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIndeedDelete} color="secondary">
            删除节点及子节点
          </Button>
          <Button
            onClick={() => setDialogOpen(false)}
            color="primary"
            autoFocus
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={ruleDialogOpen}
        maxWidth="sm"
        fullWidth
        onClose={() => setRuleDialogOpen(false)}
      >
        <DialogTitle>推荐法条</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="ID"
            value={values.id}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="事实详细信息"
            value={values.nodeText}
            fullWidth
            multiline={values.nodeText.length > 35}
            rows={values.nodeText.length / 35 + 1}
            margin="normal"
          />
          <NavPills
            color="rose"
            tabs={[
              {
                tabButton: "法条推荐",
                tabContent: (
                  <RulesRecommend
                    laws={laws}
                    selectLaw={(name) => {
                      setSelectedLaw(name);
                    }}
                  />
                ),
              },
              {
                tabButton: "类案推荐",
                tabContent: (
                  <RulesRecommend
                    laws={laws}
                    selectLaw={(name) => {
                      setSelectedLaw(name);
                    }}
                  />
                ),
              },
              // {
              //   tabButton: "频次推荐",
              //   tabContent: <RulesRecommend />,
              // },
            ]}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={citeLaw} color="primary">
            引用
          </Button>
          <Button onClick={() => setRuleDialogOpen(false)} color="default">
            取消
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<AddToQueue />}
              style={{
                backgroundColor: "#4caf50",
                color: "#fff",
              }}
              onClick={initCanvas}
            >
              初始化Canvas
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<Adjust />}
              color="primary"
              onClick={drawCanvas}
            >
              显示节点
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<ImageIcon />}
              color="default"
              onClick={() => ModelUtil.exportToPng(canvasRef)}
            >
              导出图片
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <canvas id="canvas" ref={canvasRef} className={classes.canvas} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <TextField
              fullWidth
              label="节点图形ID"
              disabled
              value={values.logicNodeId}
              className={classes.text}
            />
            <FormControl className={classes.text} fullWidth disabled>
              <InputLabel>节点类型</InputLabel>
              <Select value={values.nodeType}>
                <MenuItem value={"evidence"}>证据</MenuItem>
                <MenuItem value={"fact"}>事实</MenuItem>
                <MenuItem value={"law"}>法条</MenuItem>
                <MenuItem value={"result"}>结论</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="节点信息:"
              value={values.nodeText}
              className={classes.text}
              multiline={values.nodeText.length > 14}
              rows={values.nodeText.length / 14 + 1}
              disabled={!editing}
              onChange={(event) =>
                setValues({ ...values, nodeText: event.target.value })
              }
            />
            {values.logicNodeId ? (
              <CustomButton
                color={editing ? "success" : "info"}
                fullWidth
                // onClick={() => setDialogOpen(true)}
                onClick={handleClickEdit}
              >
                {editing ? <SaveIcon /> : <EditIcon />}
                {editing ? "保存节点" : "编辑节点"}
              </CustomButton>
            ) : null}
            {/*{values.logicNodeId ? (*/}
            {/*  <CustomButton*/}
            {/*    color="success"*/}
            {/*    fullWidth*/}
            {/*    // onClick={() => setRuleDialogOpen(true)}*/}
            {/*  >*/}
            {/*    <AddCircleOutline />*/}
            {/*    添加节点*/}
            {/*  </CustomButton>*/}
            {/*) : null}*/}
            {values.nodeType === "fact" ? (
              <CustomButton color="warning" fullWidth onClick={recommendLaw}>
                <AccountBalance />
                法条推荐
              </CustomButton>
            ) : null}
            {values.logicNodeId ? (
              <CustomButton
                color="danger"
                fullWidth
                onClick={() => setDialogOpen(true)}
              >
                <DeleteForever />
                删除节点
              </CustomButton>
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

RulesRecommend.propTypes = {
  laws: PropTypes.array,
  selectLaw: PropTypes.func,
};
