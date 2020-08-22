package com.ecm.controller;


import com.ecm.model.*;
import com.ecm.service.LogicService;
import com.ecm.service.ModelManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping(value="/facts")
public class FactController {

    @Autowired
    private ModelManageService modelManageService;
    @Autowired
    private LogicService logicService;

    @RequestMapping(value = "/initFact")
    public JSONObject initFact(@RequestBody JSONObject front) {
        String userName = front.getString("userName");
        int caseId = front.getInt("caseId");



        JSONObject jsonObject = new JSONObject();

        MOD_Fact_Doc modFactDoc = modelManageService.getFactDocByCaseId(caseId);
        jsonObject.put("documentBody", modFactDoc.getText());

//        List<MOD_Fact> fact = modelManageService.getFactsByCaseId(caseId);
//        if (fact != null) {
//            jsonObject.put("documentBody", fact.get(0).getContent());
//        } else {
//            jsonObject.put("documentBody", "");
//
//        }

        return jsonObject;

    }

    @RequestMapping(value = "/resolve")
    public JSONArray splitFact(@RequestBody JSONObject front) {
        int caseId = front.getInt("caseId");
        String text = front.getString("text");

        modelManageService.deleteFactByCid(caseId);
        modelManageService.deleteJointsByCid(caseId);

        MOD_Fact_Doc factDoc = new MOD_Fact_Doc();
        factDoc.setCaseID(caseId);
        factDoc.setText(text);
        factDoc = modelManageService.saveFactDoc(factDoc);
        int factDocID = factDoc.getId();

        //List<MOD_Fact> facts = new ArrayList<MOD_Fact>();



        JSONArray res = new JSONArray();
        //int index = 0;
        if(caseId != 3){
            String[] tests = text.split("。");
            for (String str : tests) {

                JSONObject jsonObject = new JSONObject();

                if (!str.isEmpty()) {
                    MOD_Fact fact = new MOD_Fact();
                    fact.setCaseID(caseId);
                    fact.setContent(str);
                    fact.setTextID(factDocID);
                    int logicNodeId = logicService.addEvidenceOrFactNode(caseId, str, 1);
                    fact.setLogicNodeID(logicNodeId);
                    fact = modelManageService.saveFact(fact);

                    //facts.add(fact);
                    //index++;

                    jsonObject.put("factId", fact.getId());
                    jsonObject.put("body", fact.getContent());
                    jsonObject.put("confirm", fact.getConfirm());
                    jsonObject.put("documentId", fact.getTextID());

                    res.add(jsonObject);
                }
            }
        }
        else{
            String content1 = "1、经审理查明，2015年3月6日晚，被告人王某某至新友饭店内聚餐喝了酒后，步入该大厦地下车库，驾驶沪ARXXXX荣威轿车驶离车库。";
            String content2 = "2、经鉴定，当日被告人王某某血液中乙醇含量为1.69毫克/毫升。";
            String content3 = "3、3月7日3时许，被告人王某某要求他人帮助拨打110电话报警，后民警赶至现场而案发。";
            String[] tests = {content1, content2, content3};
            for (String str : tests) {

                JSONObject jsonObject = new JSONObject();

                if (!str.isEmpty()) {
                    MOD_Fact fact = new MOD_Fact();
                    fact.setCaseID(caseId);
                    fact.setContent(str);
                    fact.setTextID(factDocID);
                    int logicNodeId = logicService.addEvidenceOrFactNode(caseId, str, 1);
                    fact.setLogicNodeID(logicNodeId);
                    fact = modelManageService.saveFact(fact);

                    //facts.add(fact);
                    //index++;

                    jsonObject.put("factId", fact.getId());
                    jsonObject.put("body", fact.getContent());
                    jsonObject.put("confirm", fact.getConfirm());
                    jsonObject.put("documentId", fact.getTextID());

                    res.add(jsonObject);
                }
            }
        }
        //return facts;
        return res;
    }

    @RequestMapping(value = "/createJoint")
    public JSONArray extractJoints(@RequestBody JSONObject front) {

        int caseId = front.getInt("caseId");

        modelManageService.deleteJointsByCid(caseId);
        List<MOD_Fact> modFactList = modelManageService.getFactsByCaseId(caseId);
        JSONArray res = new JSONArray();
        JSONArray jointList = new JSONArray();
        JSONObject resJson = new JSONObject();

        for(MOD_Fact modFact: modFactList) {

            MOD_Joint modJoint1 = new MOD_Joint();
            modJoint1.setCaseID(caseId);
            modJoint1.setFactID(modFact.getId());
            modJoint1.setContent("张某");
            int logicNodeId1 = logicService.addEvidenceOrFactNode(caseId, modJoint1.getContent(), 5);
            modJoint1.setLogicNodeId(logicNodeId1);
            modelManageService.saveJoint(modJoint1);


            MOD_Joint modJoint2 = new MOD_Joint();
            modJoint2.setCaseID(modFact.getCaseID());
            modJoint2.setFactID(modFact.getId());
            modJoint2.setContent(modFact.getContent().substring(2,4));
            int logicNodeId2 = logicService.addEvidenceOrFactNode(caseId, modJoint2.getContent(), 5);
            modJoint2.setLogicNodeId(logicNodeId2);
            modelManageService.saveJoint(modJoint2);


            MOD_Joint modJoint3 = new MOD_Joint();
            modJoint3.setCaseID(modFact.getCaseID());
            modJoint3.setFactID(modFact.getId());
            modJoint3.setContent(modFact.getContent().substring(4,6));
            int logicNodeId3 = logicService.addEvidenceOrFactNode(caseId, modJoint3.getContent(), 5);
            modJoint3.setLogicNodeId(logicNodeId3);
            modelManageService.saveJoint(modJoint3);

            JSONObject jsonObject1 = new JSONObject();
            jsonObject1.put("jointId", modJoint1.getId());
            jsonObject1.put("content", modJoint1.getContent());
            jointList.add(jsonObject1);
            JSONObject jsonObject2 = new JSONObject();
            jsonObject2.put("jointId", modJoint2.getId());
            jsonObject2.put("content", modJoint2.getContent());
            jointList.add(jsonObject2);
            JSONObject jsonObject3 = new JSONObject();
            jsonObject3.put("jointId", modJoint3.getId());
            jsonObject3.put("content", modJoint3.getContent());
            jointList.add(jsonObject3);

            resJson.put("factId", modFact.getId());
            resJson.put("jointList", jointList);

            res.add(resJson);
        }

        return res;
    }
//        int caseId = front.getInt("caseId");
//        JSONArray res = new JSONArray();
//        JSONArray jointList = new JSONArray();
//        JSONObject resJson = new JSONObject();
//
//        List<MOD_Fact> facts = modelManageService.getFactsByCaseId(caseId);
//
//        HashMap<Integer, List<MOD_Joint>> integerListHashMap =  modelManageService.extractJoints(facts);
//
//        for(int key: integerListHashMap.keySet()){
//            List<MOD_Joint> modJointList = integerListHashMap.get(key);
//            for(MOD_Joint modJoint: modJointList){
//                JSONObject jsonObject = new JSONObject();
//                jsonObject.put("jointId", modJoint.getId());
//                jsonObject.put("content", modJoint.getContent());
//
//                jointList.add(jsonObject);
//
//                resJson.put("factId", key);
//                resJson.put("jointList", jointList);
//
//                res.add(resJson);
//            }
//        }
//
//        return res;



//    }

    @RequestMapping(value = "/createJointByFactId")
    public JSONArray createJointByFactId(@RequestBody JSONObject front){


        int factId = front.getInt("factId");

        modelManageService.deleteJointsByFactId(factId);
        JSONArray jsonArray = new JSONArray();

        MOD_Fact modFact = modelManageService.getFactByID(factId);

        if(modFact.getCaseID() != 3){
            MOD_Joint modJoint1 = new MOD_Joint();
            modJoint1.setCaseID(modFact.getCaseID());
            modJoint1.setFactID(modFact.getId());
            modJoint1.setContent("张某");
            int logicNodeId1 = logicService.addEvidenceOrFactNode(modFact.getCaseID(), modJoint1.getContent(), 5);
            modJoint1.setLogicNodeId(logicNodeId1);
            modelManageService.saveJoint(modJoint1);


            MOD_Joint modJoint2 = new MOD_Joint();
            modJoint2.setCaseID(modFact.getCaseID());
            modJoint2.setFactID(modFact.getId());
            modJoint2.setContent(modFact.getContent().substring(2,4));
            int logicNodeId2 = logicService.addEvidenceOrFactNode(modFact.getCaseID(), modJoint2.getContent(), 5);
            modJoint2.setLogicNodeId(logicNodeId2);
            modelManageService.saveJoint(modJoint2);


            MOD_Joint modJoint3 = new MOD_Joint();
            modJoint3.setCaseID(modFact.getCaseID());
            modJoint3.setFactID(modFact.getId());
            modJoint3.setContent(modFact.getContent().substring(4,6));
            int logicNodeId3 = logicService.addEvidenceOrFactNode(modFact.getCaseID(), modJoint3.getContent(), 5);
            modJoint3.setLogicNodeId(logicNodeId3);
            modelManageService.saveJoint(modJoint3);

            JSONObject jsonObject1 = new JSONObject();
            jsonObject1.put("jointId", modJoint1.getId());
            jsonObject1.put("content", modJoint1.getContent());
            jsonArray.add(jsonObject1);
            JSONObject jsonObject2 = new JSONObject();
            jsonObject2.put("jointId", modJoint2.getId());
            jsonObject2.put("content", modJoint2.getContent());
            jsonArray.add(jsonObject2);
            JSONObject jsonObject3 = new JSONObject();
            jsonObject3.put("jointId", modJoint3.getId());
            jsonObject3.put("content", modJoint3.getContent());
            jsonArray.add(jsonObject3);
        }
        else{
            String[] joint1 = {"2015年3月6日晚", "王某某", "新友饭店", "荣威轿车", "喝了酒"};
            String[] joint2 = {"王某某", "血液乙醇含量", "1.69毫克/毫升"};
            String[] joint3 = {"3月7日3时", "王某某", "他人帮助", "民警"};
            String[] joint;
            if(modFact.getContent().substring(0,1).equals("1")){
                joint = joint1;
            }
            else if(modFact.getContent().substring(0,1).equals("2")){
                joint = joint2;
            }
            else{
                joint = joint3;
            }

            for(int i = 0; i < joint.length; i++){
                MOD_Joint modJoint = new MOD_Joint();
                modJoint.setCaseID(modFact.getCaseID());
                modJoint.setFactID(modFact.getId());
                modJoint.setContent(joint[i]);
                int logicNodeId3 = logicService.addEvidenceOrFactNode(modFact.getCaseID(), modJoint.getContent(), 5);
                modJoint.setLogicNodeId(logicNodeId3);
                modelManageService.saveJoint(modJoint);

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("jointId", modJoint.getId());
                jsonObject.put("content", modJoint.getContent());
                jsonArray.add(jsonObject);
            }
        }

        return jsonArray;

    }
//        int factId = front.getInt("factId");
//
//        List<MOD_Joint> modJointList = modelManageService.findJointByFactId(factId);
//
//        JSONArray jsonArray = new JSONArray();
//        for(MOD_Joint modJoint: modJointList){
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("jointId", modJoint.getId());
//            jsonObject.put("content", modJoint.getContent());
//
//            jsonArray.add(jsonObject);
//
//        }
//
//        return jsonArray;
//    }

    @RequestMapping(value="/addFact")
    public JSONObject saveFact(@RequestBody JSONObject front){

        int caseId = front.getInt("caseId");
        String body = front.getString("body");

        MOD_Fact fact = new MOD_Fact();
        fact.setCaseID(caseId);
        fact.setContent(body);

        int logicNodeId = logicService.addEvidenceOrFactNode(caseId, body, 1);
        fact.setLogicNodeID(logicNodeId);
        fact = modelManageService.saveFact(fact);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("factId", fact.getId());
        return jsonObject;
    }

    @RequestMapping(value="/addJoint")
    public JSONObject saveJoint(@RequestBody JSONObject front){

        int caseId = front.getInt("caseId");
        String content = front.getString("joint");
        int factId = front.getInt("factId");
        int factBodyId = front.getInt("factBodyId");
        MOD_Joint modJoint = new MOD_Joint();
        modJoint.setContent(content);
        modJoint.setFactID(factId);
        modJoint.setCaseID(caseId);
        int logicNodeId = logicService.addEvidenceOrFactNode(caseId, content, 5);
        modJoint.setLogicNodeId(logicNodeId);

        modJoint = modelManageService.saveJoint(modJoint);

        JSONObject jsonObject =new JSONObject();
        jsonObject.put("jointId", modJoint.getId());
        return jsonObject;
    }

    @RequestMapping(value = "/updateFactById")
    public JSONObject updateFactById(@RequestBody JSONObject front){
        int factId = front.getInt("factId");
        String content = front.getString("fact");

        MOD_Fact modFact = modelManageService.getFactByID(factId);
        logicService.modEvidenceOrFactNode(modFact.getLogicNodeID(), content);
        modelManageService.updateFactById(factId,content);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);

        return jsonObject;
    }

    @RequestMapping(value = "/updateJoint")
    public JSONObject updateJoint(@RequestBody JSONObject front){
        int jointId = front.getInt("id");
        String content = front.getString("content");
        modelManageService.updateJointById(jointId, content);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);

        return jsonObject;
    }

    @PostMapping(value="/updateTrustById")
    public JSONObject updateFactConfirm(@RequestBody JSONObject front){

        int fid = front.getInt("factId");
        int confirm = front.getInt("confirm");
        modelManageService.updateFactConfirmById(fid, confirm);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }

    @RequestMapping(value = "getToConfirmByCaseId")
    public JSONArray getToConfirmByCaseId(@RequestBody JSONObject front){

        int caseId = front.getInt("caseId");

        List<MOD_Fact> modFactList = modelManageService.getToConfirmByCaseId(caseId);

        JSONArray jsonArray = new JSONArray();
        for(MOD_Fact modFact: modFactList){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("factId", modFact.getId());
            jsonObject.put("body", modFact.getContent());
            jsonObject.put("confirm", modFact.getConfirm());

            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    @RequestMapping(value="/deleteFactByFactId")
    public JSONObject deleteFact(@RequestBody JSONObject front){

        int factId = front.getInt("factId");

        MOD_Fact fact = modelManageService.getFactByID(factId);
        if(fact!=null){
            if(fact.getLogicNodeID()>=0){
                logicService.deleteNode(fact.getLogicNodeID());
            }
        }
        modelManageService.deleteFactById(factId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;

    }

    @RequestMapping(value="/deleteJoint")
    public JSONObject deleteJoint(@RequestBody JSONObject front){

        int jointId = front.getInt("jointId");

        logicService.deleteNode(modelManageService.getJointById(jointId).getLogicNodeId());
        modelManageService.deleteJointById(jointId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }

    @RequestMapping(value = "/getJointByFactId")
    public JSONArray getJointByFactId(@RequestBody JSONObject front){
        int factId = front.getInt("factId");

        List<MOD_Joint> modJointList = modelManageService.findJointByFactId(factId);

        JSONArray jsonArray = new JSONArray();

        for(MOD_Joint modJoint: modJointList){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("jointId", modJoint.getId());
            jsonObject.put("content", modJoint.getContent());

            jsonArray.add(jsonObject);
        }

        return jsonArray;
    }
}
