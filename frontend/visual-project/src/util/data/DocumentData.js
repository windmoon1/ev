const DocumentData = {};

const createDocumentData = (documentId, type, body, agree) => {
  return { documentId, type, body, agree };
};

const documentDataArray = [
  createDocumentData(0, 0, "单条证据1", false),
  createDocumentData(1, 1, "单条证据2", false),
  createDocumentData(2, 2, "单条证据3", false),
];

const documents = JSON.stringify(documentDataArray);

DocumentData.documents = documents;

const creatHeadData = (documentId, key, label) => {
  return { documentId, key, label };
};

const headData = [
  creatHeadData(0, 0, "时间"),
  creatHeadData(0, 1, "地点"),
  creatHeadData(0, 2, "人物"),
];

const heads = JSON.stringify(headData);

DocumentData.heads = heads;

const createContradictDocs = (documentId, type, body, agree, role) => {
  return { documentId, type, body, agree, role };
};

// 矛盾证据
const contradictDocsArray = [
  {
    contradictId: 0,
    documents: [
      createContradictDocs(0, 0, "矛盾证据第一", false, 0),
      createContradictDocs(1, 1, "矛盾证据第二", true, 1),
      createContradictDocs(2, 2, "矛盾证据第三", false, 1),
    ],
  },
  {
    contradictId: 1,
    documents: [
      createContradictDocs(3, 0, "矛盾证据第三", false, 0),
      createContradictDocs(4, 1, "矛盾证据第四", true, 1),
    ],
  },
  {
    contradictId: 2,
    documents: [
      createContradictDocs(5, 2, "矛盾证据第五", false, 0),
      createContradictDocs(6, 1, "矛盾证据第六", true, 1),
    ],
  },
];

const contradictDocs = JSON.stringify(contradictDocsArray);

DocumentData.contradictDocs = contradictDocs;

const createFactsData = (factId, body, agree) => {
  return { factId, body, agree };
};

const factsDataArray = [
  createFactsData(0, "事实文本第一条", true),
  createFactsData(1, "事实文本第二条", true),
  createFactsData(2, "事实文本第三条", true),
];

const facts = JSON.stringify(factsDataArray);

DocumentData.facts = facts;

// 事实节点
const createFactNode = (id, logicNodeId, text) => {
  return { id, logicNodeId, text };
};

const factNodeArray1 = [
  createFactNode(1, 1, "事实文本一"),
  createFactNode(2, 2, "事实文本二"),
  createFactNode(3, 3, "事实文本三"),
];

const factNodeArray2 = [
  createFactNode(4, 4, "事实文本四"),
  createFactNode(5, 5, "事实文本五"),
  createFactNode(6, 6, "事实文本六"),
];

const getFacts = [
  {
    confirm: 1,
    body: factNodeArray1,
  },
  {
    confirm: 0,
    body: factNodeArray2,
  },
];

DocumentData.getFacts = getFacts;

// 证据节点
const createEvidenceNode = (id, logicNodeId, text, type, role) => {
  return { id, logicNodeId, text, type, role };
};

const evidenceNodeArray1 = [
  createEvidenceNode(
    1,
    7,
    "2012年冬天的一天，王燕给其打电话说塘沽卫生所负责检查非法行医的刘谨钊查到他们诊所了",
    2,
    0
  ),
  createEvidenceNode(
    2,
    8,
    "内容刘林举报证言证实内容基本一致，能互相印证，其证言还证实了 2014年5月21曰、2014年6月间接群众举报对王燕非法行医的地点进行了查处，王燕因涉嫌非法行医被移送到了公安机关。",
    3,
    0
  ),
  createEvidenceNode(
    3,
    9,
    "其是张某行医从2012年开始行医的，在塘沽开办了一个叫天津市塘沽华仁中医药门诊部的个体诊所，诊所有执照，是合法经营。",
    2,
    1
  ),
  createEvidenceNode(
    4,
    10,
    "后来检查刘宏找了一个卫生所姓刘的，那人负责医疗卫生检查，每次都是他带人来查，王燕请他吃了饭并先后一共给了4000元钱，目的是为了不交罚款或少交罚款。",
    4,
    0
  ),
];

const evidenceNodeArray2 = [
  createEvidenceNode(5, 11, "证据文本五", 1, 1),
  createEvidenceNode(6, 12, "证据文本六", 3, 0),
  createEvidenceNode(7, 13, "证据文本七", 2, 1),
];

const getEvidences = [
  {
    confirm: 0,
    body: evidenceNodeArray1,
  },
  {
    confirm: 1,
    body: evidenceNodeArray2,
  },
];
DocumentData.getEvidences = getEvidences;

// 链头节点
const createHeadNode = (id, logicNodeId, text) => {
  return { id, logicNodeId, text };
};

const headNodeArray1 = [
  createHeadNode(1, 14, "链头一"),
  createHeadNode(2, 15, "链头二"),
  createHeadNode(3, 16, "链头三"),
];

DocumentData.getHeads = headNodeArray1;

// 联结点节点
const createJointNode = (id, logicNodeId, text) => {
  return { id, logicNodeId, text };
};

const JointNodeArray1 = [
  createJointNode(1, 17, "联结点一"),
  createJointNode(2, 18, "联结点二"),
  createJointNode(3, 19, "联结点三"),
];

DocumentData.getJoint = JointNodeArray1;

// 法条
const createRuleNode = (id, logicNodeId, name, text, referLogicNodeId) => {
  return { id, logicNodeId, name, text, referLogicNodeId };
};

const rulesNodeArray = [
  createRuleNode(1, 20, "法条一", "法条一具体内容", 22),
  createRuleNode(2, 21, "法条二", "法条二具体内容", 22),
];

DocumentData.rulesNodeArray = rulesNodeArray;

// 结论
const createResultNode = (id, logicNodeId, text) => {
  return { id, logicNodeId, text };
};

DocumentData.getResult = createResultNode(1, 22, "结论");

// 虚线
const createDottedLine = (logicNodeId1, logicNodeId2) => {
  return { logicNodeId1, logicNodeId2 };
};

const getDottedLines = [
  createDottedLine(1, 4),
  createDottedLine(1, 5),
  createDottedLine(2, 6),
  createDottedLine(7, 11),
  createDottedLine(8, 11),
  createDottedLine(9, 12),
  createDottedLine(10, 13),
];

DocumentData.getDottedLines = getDottedLines;

// 实线
const createSolidLine = (logicNodeId1, logicNodeId2) => {
  return { logicNodeId1, logicNodeId2 };
};

const getSolidLines = [
  // createSolidLine(1, 17),
  // createSolidLine(1, 707),
  createSolidLine(1, 7),
  createSolidLine(2, 8),
  createSolidLine(2, 9),
  createSolidLine(3, 9),
  createSolidLine(3, 10),
  createDottedLine(1, 22),
  createDottedLine(2, 22),
  createDottedLine(3, 22),
  // createSolidLine(19, 15),
  // createSolidLine(14, 7),
  // createSolidLine(15, 8),
  // createSolidLine(15, 9),
  // createSolidLine(16, 10),
];

DocumentData.getSolidLines = getSolidLines;

const createRules = (name, content) => {
  return { name, content };
};

const getRules = [
  createRules(
    "中华人民共和国刑事诉讼法第一条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第二条",
    "中华人民共和国刑法的任务，是用刑罚同一切犯罪行为作斗争，以保卫国家安全，保卫人民民主专政的政权和社会主义制度，保护国有财产和劳动群众集体所有的财产，保护公民私人所有的财产，保护公民的人身权利、民主权利和其他权利，维护社会秩序、经济秩序，保障社会主义建设事业的顺利进行。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第三条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第四条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第五条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第六条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第七条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第八条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第九条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第十条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第十一条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第十二条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第十三条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第十四条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第十五条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
  createRules(
    "中华人民共和国刑事诉讼法第十六条",
    "为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。"
  ),
];

DocumentData.getRules = getRules;

export default DocumentData;
