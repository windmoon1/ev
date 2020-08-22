import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AccountTree from "@material-ui/icons/AccountTree";
import Notification from "../../components/Notification/Notification";
import * as Util from "../../util/Util";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 800,
  },
}));

export default function WaitToDealCasesView(props) {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [values, setValues] = React.useState({
    cases: [
      {
        cid: 1,
        cname: "xxx法院",
        manageJudge: "xxx",
        fillingDate: "2012-5-8",
        type: "交通肇事案",
      },
    ],
  });
  const [note, setNote] = React.useState({
    show: false,
    color: "",
    content: "",
  });
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  React.useEffect(() => {
    const url = "/case/getProcessingCases";
    let param = JSON.stringify({
      username: sessionStorage.getItem("username"),
    });
    const succ = (response) => {
      setValues({
        cases: response,
      });
      showNote(true);
    };
    const err = () => {
      showNote(false);
    };
    Util.asyncHttpPost(url, param, succ, err);
  }, []);

  //点击案件待处理表格
  const handleTableClick = (id) => () => {
    sessionStorage.setItem("caseId", id);
    props.history.push("/model/resolve");
  };

  const showNote = (success) => {
    if (success) {
      setNote({
        show: true,
        color: "success",
        content: "加载待处理案件列表成功",
      });
    } else {
      setNote({
        show: true,
        color: "error",
        content: "获取数据失败, 请稍后再试!",
      });
    }
  };

  const handleCloseNote = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNote({ ...note, show: false });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Notification
        color={note.color}
        content={note.content}
        open={note.show}
        autoHide={3000}
        onClose={handleCloseNote}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            {/* <Chart /> */}
            <TableContainer component={Paper} style={{ float: "left" }}>
              <Table style={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>序号&nbsp;</TableCell>
                    <TableCell>案号&nbsp;</TableCell>
                    <TableCell>案件类型&nbsp;</TableCell>
                    <TableCell>名称&nbsp;</TableCell>
                    <TableCell>立案日期&nbsp;</TableCell>
                    <TableCell>承办人&nbsp;</TableCell>
                    <TableCell>操作&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.cases.map((row) => (
                    <TableRow key={row.cid}>
                      <TableCell component="th" scope="row">
                        {row.cid}
                      </TableCell>
                      <TableCell>{row.cid}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.cname}</TableCell>
                      <TableCell>{row.fillingDate}</TableCell>
                      <TableCell>
                        {sessionStorage.getItem("realName")}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="证据链建模" placement="right">
                          <IconButton
                            color="primary"
                            onClick={handleTableClick(row.cid)}
                          >
                            <AccountTree />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
