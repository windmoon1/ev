import JTopo from "jtopo-in-node";

const initCanvas = (canvasRef) => {
  let canvas = canvasRef.current;
  canvas.width = window.innerWidth * 0.55;
  canvas.height = window.innerHeight;
};

const initScene = (canvasRef) => {
  let canvas = canvasRef.current;
  let stage = new JTopo.Stage(canvas);
  stage.eagleEye.visible = null;

  let scene = new JTopo.Scene(stage);
  scene.mode = "select";
  return [stage, scene];
};

// 根据节点数量和画布大小确定节点位置，平均分布
const calculateY = (nodesNum, spacing) => {
  let tooLang;
  let yPosition = 20;
  if (nodesNum * spacing >= window.innerHeight - 20) {
    spacing = (window.innerHeight - 20) / nodesNum;
    tooLang = true;
  } else {
    if (nodesNum > 1) {
      yPosition = (window.innerHeight - (nodesNum - 1) * spacing) / 2;
    } else {
      yPosition = window.innerHeight / 2;
    }
    tooLang = false;
  }
  return [yPosition, spacing, tooLang];
};

const _fixType = (type) => {
  type = type.toLowerCase().replace(/jpg/i, "jpeg");
  const r = type.match(/png|jpeg|bmp|gif/)[0];
  return "image/" + r;
};

const saveFile = (data, filename) => {
  let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  save_link.href = data;
  save_link.download = filename;
  let event = document.createEvent("MouseEvents");
  event.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  save_link.dispatchEvent(event);
};

// 导出图片
const exportToPng = (canvasRef) => {
  let canvas = canvasRef.current;
  const type = "png";
  let imgData = canvas.toDataURL(type);
  imgData = imgData.replace(_fixType(type), "image/octet-stream");
  let filename = "picture." + type;
  saveFile(imgData, filename);
};

// 新建节点
const createNode = (logicNodeId, text, x, y, fillColor, fontColor, shape) => {
  let node;
  if (shape === "circle") {
    node = new JTopo.CircleNode();
  } else {
    node = new JTopo.Node();
  }
  //添加自定义属性
  node.logicNodeId = logicNodeId;
  node.serializedProperties.push("logicNodeId");

  node.text = text.substring(0, 7);
  node.setLocation(x, y);
  node.dragable = true;
  if (!fontColor) fontColor = "0,0,0";
  if (!fillColor) fillColor = "0,255,0";
  node.fontColor = fontColor;
  node.fillColor = fillColor;
  return node;
};

// 创建连线
const createLink = (nodeA, nodeZ, dotted, text) => {
  let link = new JTopo.Link(nodeA, nodeZ, text);
  if (dotted) link.dashedPattern = 5;
  return link;
};

export {
  initCanvas,
  initScene,
  calculateY,
  exportToPng,
  createNode,
  createLink,
};
