import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }
}));

export default function WaitToDealCasesView(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    cases: [{ id: 1, caseName: 'xxx法院', judgeName: 'xxx', time: '2012-5-8' }]
  });
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //点击案件待处理表格
  const handleTableClick = index => event => {

    alert(index)

  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper}>
            {/* <Chart /> */}
            <TableContainer component={Paper} style={{ float: 'left' }}>
              <Table style={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>序号&nbsp;</TableCell>
                    <TableCell >案号&nbsp;</TableCell>
                    <TableCell >名称&nbsp;</TableCell>
                    <TableCell >立案日期&nbsp;</TableCell>
                    <TableCell >承办人&nbsp;</TableCell>
                    <TableCell >操作&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values.cases.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell >{row.id}</TableCell>
                      <TableCell >{row.caseName}</TableCell>
                      <TableCell >{row.time}</TableCell>
                      <TableCell >{row.judgeName}</TableCell>
                      <TableCell >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleTableClick(index)}>
                          证据链建模
                        </Button>
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
  )
}