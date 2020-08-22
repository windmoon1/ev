import React from "react";
import JTopo from "jtopo-in-node";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  canvas: {
    height: 500,
  },
}));

export default function DevelopView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

    </div>
  );
}
