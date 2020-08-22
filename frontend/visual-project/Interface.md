# 接口

## 登录

1.登录

```json
path = "/login"
data = {
    "username": "string",
    "password": "string"
}
```

## 案件列表

```json
baseUrl = "/case"
```

1.得到所有案件

```json
path = "/getAll"
data = {
    "username": "username"
}
```

2.得到已完成案件

```json
path = "/getFinishedCases"
data = {
    "username": "username"
}
```

3.得到正在处理的案件

```json
path = "/getProcessingCases"
param = {
    "username": "username"
}
return = [
  {
    "cid": 0,
    "cname": "string",
    "type": "string",
    "fillingDate": "string",
    "manageJudge": "string"
  }
]
```

4.搜索

```json
path = "/search"
data = {
    "username": "casename",
    "casename": "casename"
}
```

5.得到案件的基本信息 （案号 案件名称 承办人）初始化证据

```json
path = "/getCaseDetail"
param = {
     "username" : "xxx",
     "caseId": 1
}
return = {
    "caseNum": "(2015)浦刑",
    "caseName": "string"
}

path = "/initEvidenceByType"
param = {
    "username": "string",
    "caseId": 1,
    "type": 0 //原告被告
}
return = {
    "documentBody": "string"
}
```

## 证据分解

```json
baseUrl = "/evidence"
```

1.分解证据

```json
path = "/document"
param = {
    "caseId": 0,
    "type": 0,
    "text": "string"
}
return = [
    {
        "documentId": 0,//这是要分解id
        "bodyId": 0,//这是单个证据的id
        "type": 0,
        "body": "string",
        "confirm": 0
    },
    ...
]
```

2.提取链头

```json
path = "/createHead"
param = {
    "documentId": 0
}
return = [
    {
        "bodyId": 0,
        "headList": [
            {
                "headId": 0,
                "head": "string"
            },...
         ]
    }
    ...
]

path = "/createHeadByBodyId"
param = {
    "bodyId": 0
}
return = [
    {
        "headId": 0,
        "head": "string"
    },...
]
```

3.新增删除单条证据

```json
path = "/addBody"
param = {
    "caseId": 0,
    "type": 0,
    "body": "string",
    "documentId": 0
}
return = {
     "bodyId": 0
}

path = "/deleteBody"
param = {
    "caseId": 0,
    "bodyId": 0
}
return = {
    "success": true
}
```

4.新增链头 更新链头

```json
path = "/addHead"
param = {
    "caseId": 0,
    "head": "string",
    "documentId": 0,
    "bodyId": 0
}
return = {
    "headId": 0
}

path = "/updateHead"
param = {
    "id": 0,
    "head": "string"
}
return = {
    "success": true
}
```

5.更新整段证据

```json
path = "/updateBodyById"
data = {
    "bodyId": 0,
    "body": "string"
}

```

6.更换证据类型

```json
path = "/updateTypeById"
data = {
    "bodyId": 0,
    "type": 0
}
```

```json
path = "/addHead"
param = {
    "caseId": 0,
    "head": "string",
    "documentId": 0,
    "bodyId": 0
}
return = {
    "headId": 0
}
```

```json
path = "/deleteHead"
param = {
    "headId": 0
}
return = {
    "success": true
}
```

7.获取非矛盾证据

```json
path = "/getNoContradictByDocumentId"
param = {
    "documentId": 0
}
return = [
    {
        "bodyId": 0,
        "type": 0,
        "body": "string",
        "confirm": 0
    },
    ...
]
```

8.获取矛盾证据

```json
path = "/getContradictByDocumentId"
param = {
    "caseId": 0
}
return = [
    {
        "contradictId": 0,
        "bodys": [
            {
                "bodyId": 0,
                "type": 0,
                "body": "string",
                "confirm": 0,
                "role": 0
            }
        ]
    },...
]
```

9.认定证据

```json
path = "/updateTrustById"
data = {
    "bodyId": 0,
    "confirm": 0
}
```

10.删除单条证据

```json
path = "/deleteBody"
data = {
    "bodyId": 0,
}
return = {
    "success": true
    }
```

## 事实认定

```json
baseUrl = "/facts"
```

0.预加载事实

```json
path = "/initFact"
param = {
    "username": "string",
    "caseId": 1
}
return = {
    "documentBody": "string"
}
```

1.分解事实

```json
path = "/resolve"
param = {
    "caseId": 0,
    "text": "string"
}
return = [
    {
        "documentId": 0, //事实文本id
        "factId": 0, //单条事实文本id
        "body": "string",
        "confirm": 0
    },
    ...
]
```

2.提取联结点

```json
path = "/createJoint"
param = {
    "caseId": 0
}
return = [
    {
        "factId": 0,
        "jointList": [
            "jointId": 0,
            "content": "string"
            ],
            ...
    },
    ...
]

path = "/createJointByFactId"
param = {
    "facttId": 0
}
return = [
    {
        "jointId": 0,
        "content": "string"
    },...
]
```

3.新增单条事实

```json
path = "/addFact"
param = {
    "caseId": 0,
    "body": "string"
}
return = {
    "factId": 0
}
```

4.新增联结点 修改联结点

```json
path = "/addJoint"
param = {
    "caseId": 0,
    "joint": "string",
    "factId": 0
    "documentId": 0
}
return = {
    "jointId": 0
}
```

```json
path = "/updateJoint"
param = {
    "jointId": 0,
    "content": "string"
}
return = {
    "success": true
}
```

5.更新整段事实

```json
path = "/updateFactById"
param = {
    "factId": 0,
    "fact": "string"
}
```

6.认定事实

```json
path = "/updateTrustById"
data = {
    "factId": 0,
    "confirm": 0
}
```

7.获取待认定事实

```json
path = "/getToConfirmByCaseId"
param = {
    "caseId": 0
}
return = [
    {
         "factId": 0,
         "body": "string",
         "confirm": 0
     },
]
```

8.删除单条事实

```json
path = "/deleteFactByFactId"
param = {
    "factId": 0
}
return = {
    "success": true
    }
```

9.删除单个联结点

```json
path = "/deleteJoint"
param = {
    "jointId": 0
}
return = {
    "success": true
    }
```

10.根据factId得到联结点

```json
path = "/getJointByFactId"
param = {
    "factId": 0
}
return = [
    {
       "jointId": 0,
       "content": "string"  
    },
    ...
]
```

## 证据链建模

```json
baseUrl = "/model"
```

0.得到所有信息

```json
url = "/getInfo"
param = {
    "caseId": 1
}
return = {
    "facts": [
        {
            "confirm": 0, // 认定与否
            "body": [
                {
                    "id": 1,
                    "logicNodeId": 2,
                    "text": "xxx"
                },...
            ]
        },...
    ],
    "evidences": [
        {
            "confirm": 0,
            "body": [
                {
                    "id": 1,
                    "logicNodeId": 2,
                    "text": "xxx",
                    "type": "xxx",
                    "role": "xxx",
                },...
           ]
        },...
    ],
    "heads": [
        {
            "id": 1,
            "logicNodeId": 1,
            "text": "xxx",
        },...
    ],
    "joints": [
        {
            "id": 1,
            "logicNodeId": 1,
            "text": "xxx",
        },...
    ],
    "dottedLines": [
        {
            "logicNodeId1": 1,
            "logicNodeId2": 2
        },...
    ],
    "solidLines": [
        {
            "logicNodeId1": 1,
            "logicNodeId2": 2
        },...
    ]
}
```

## 说理逻辑

```json
baseUrl = "/model"
```

1.展示说理界面

```json
url = "/getLogicInfo"
param = {
    "caseId": 1
}
return = {
    "facts": [
        {
            "confirm": 0,
            "body": [
                {
                    "id": 1,
                    "logicNodeId": 2,
                    "text": "string"
                },...
            ]
        },...
    ],
    "evidences": [
        {
            "confirm": 0,
            "body": [
                {
                    "id": 1,
                    "logicNodeId": 2,
                    "text": "xxx",
                    "type": "xxx",
                    "role": "xxx",
                },...
           ]
        },...
    ],
    "results": [
        {
            "id": 1,
            "logicNodeId": 1,
            "text": "xxx",
        },...
    ],
    "laws": [
        {
            "id": 1,
            "logicNodeId": 1,
            "text": "xxx",
        },...
    ],
    "lines": [
        {
            "logicNodeId1": 1,
            "logicNodeId2": 2
        },...
    ]
}
```

2.删除结论

```json
path = "/deleteResult"
param = {
    "resultId": 0
}
return = {
    "success": true
}
```

3.修改结论

```json
path = "/updateResultById"
param = {
    "resultId": 0,
    "content": "string"
}
return = {
    "success": true
}
```

4.删除法条

```json
path = "/deleteLawById"
param = {
    "lawId": 0
}
return = {
    "success": true
}
```

5.修改法条

```json
path = "/updateLawById"
param = {
    "lawId": 0,
    "content": "string"
}
return = {
    "success": true
}
```

6.法条推荐

```json
path = "/recommendLaw"
method = "GET"
return = [
    {
        "name":"第一百条",
        "content": "string"
    },...
]
```

7.保存法条

```json
path = "/addLaw"
param = {
    "caseId":0,
    "factId":0,
    "name":"第一百条",
    "content":"string"
}
return = {
    "success": true
}
```
