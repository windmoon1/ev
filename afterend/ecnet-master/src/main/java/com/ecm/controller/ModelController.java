package com.ecm.controller;

import com.ecm.keyword.model.SplitType_Fact;
import com.ecm.model.*;
import com.ecm.service.LogicService;
import com.ecm.service.ModelManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping(value="/model")
public class ModelController {
    @Autowired
    private ModelManageService modelManageService;
    @Autowired
    private LogicService logicService;

    @RequestMapping(value = "/getFacts")
    public JSONArray getFacts(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");
        List<MOD_Fact> modFactList = modelManageService.getFactsByCaseId(caseId);

        JSONArray confirmJsonArr = new JSONArray();
        JSONArray noConfirmJsonArr = new JSONArray();
        if(modFactList != null){
            for(MOD_Fact modFact: modFactList){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", modFact.getId());
                jsonObject.put("logicNodeId", modFact.getLogicNodeID());
                jsonObject.put("text", modFact.getContent());
                if(modFact.getConfirm() == 0){
                    confirmJsonArr.add(jsonObject);
                }
                else{
                    noConfirmJsonArr.add(jsonObject);
                }
            }
        }

        JSONArray res = new JSONArray();


        JSONObject jsonObject1 = new JSONObject();

        JSONObject jsonObject2 = new JSONObject();

        jsonObject1.put("confirm", 0);
        jsonObject1.put("body", confirmJsonArr);
        res.add(jsonObject1);
        jsonObject2.put("confirm", 1);
        jsonObject2.put("body", noConfirmJsonArr);
        res.add(jsonObject2);



        return res;
    }

    @RequestMapping(value = "getEvidence")
    public JSONArray getEvidence(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");
        List<Evidence_Body> evidenceBodyList = modelManageService.getEvidenceByCaseId(caseId);

        JSONArray confirmJsonArr = new JSONArray();
        JSONArray noConfirmJsonArr = new JSONArray();
        if(evidenceBodyList != null){
            for(Evidence_Body evidenceBody: evidenceBodyList){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", evidenceBody.getId());
                jsonObject.put("logicNodeId", evidenceBody.getLogicNodeID());
                jsonObject.put("text", evidenceBody.getBody());
                jsonObject.put("type", evidenceBody.getType());
                jsonObject.put("role", evidenceBody.getIsDefendant());
                if(evidenceBody.getTrust() == 0){
                    confirmJsonArr.add(jsonObject);
                }
                else{
                    noConfirmJsonArr.add(jsonObject);
                }
            }
        }

        JSONArray res = new JSONArray();

        JSONObject jsonObject1 = new JSONObject();

        JSONObject jsonObject2 = new JSONObject();

        jsonObject1.put("confirm", 0);
        jsonObject1.put("body", confirmJsonArr);
        res.add(jsonObject1);
        jsonObject2.put("confirm", 1);
        jsonObject2.put("body", noConfirmJsonArr);
        res.add(jsonObject2);

        return res;
    }

    @RequestMapping(value = "/getHeads")
    public JSONArray getHeads(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");
        List<Evidence_Head> evidenceHeadList = modelManageService.getHeadsByCaseId(caseId);

        JSONArray jsonArray = new JSONArray();

        if(evidenceHeadList != null){
            for(Evidence_Head evidenceHead: evidenceHeadList){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", evidenceHead.getId());
                jsonObject.put("logicNodeId", evidenceHead.getLogicNodeId());
                jsonObject.put("text", evidenceHead.getHead());
                jsonArray.add(jsonObject);
            }
        }

        return jsonArray;
    }

    @RequestMapping(value = "/getJoints")
    public JSONArray getJoints(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");
        List<MOD_Joint> modJointList = modelManageService.getJointsByCaseId(caseId);

        JSONArray jsonArray = new JSONArray();

        if(modJointList != null){
            for(MOD_Joint modJoint: modJointList){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", modJoint.getId());
                jsonObject.put("logicNodeId", modJoint.getLogicNodeId());
                jsonObject.put("text", modJoint.getContent());
                jsonArray.add(jsonObject);
            }
        }

        return jsonArray;
    }


    public JSONArray getResults(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");
        List<MOD_Result> modResultList = modelManageService.getResultsByCaseId(caseId);

        JSONArray jsonArray = new JSONArray();

        if(modResultList != null){
            //delete result
            for(int i = 0; i < modResultList.size(); i++){
                MOD_Law modLaw = modelManageService.getLawById(modResultList.get(i).getLawId());
                if(modLaw == null){
                    modelManageService.deleteResultById(modResultList.get(i).getId());
                    modResultList.remove(i);

                }
            }
            for(MOD_Result modResult: modResultList){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", modResult.getId());
                jsonObject.put("logicNodeId", modResult.getLogicNodeID());
                jsonObject.put("text", modResult.getContent());
                jsonArray.add(jsonObject);
            }

        }
        return jsonArray;
    }

    public JSONArray getLaws(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");
        List<MOD_Law> modLawList = modelManageService.getLawsByCaseId(caseId);

        JSONArray jsonArray = new JSONArray();

        if(modLawList != null){
            //delete law
            for(int i = 0; i < modLawList.size(); i++){
                MOD_Fact modFact = modelManageService.getFactByID(modLawList.get(i).getFactId());
                if(modFact == null){
                    modelManageService.deleteLawById(modLawList.get(i).getId());
                    modLawList.remove(i);

                }
            }

            for(MOD_Law modLaw: modLawList){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", modLaw.getId());
                jsonObject.put("logicNodeId", modLaw.getLogicNodeID());
                jsonObject.put("text", modLaw.getContent());
                jsonArray.add(jsonObject);
            }

        }
        return jsonArray;
    }

    @RequestMapping(value = "/getDottedLines")
    public JSONArray getDottedLines(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");


        return getLines(caseId, 0);
    }

    @RequestMapping(value = "/getSolideLines")
    public JSONArray getSolideLines(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");


        return getLines(caseId, 1);
    }

    public JSONArray getLines(int caseId, int type){
        List<MOD_Fact> modFactList = modelManageService.getFactsByCaseId(caseId);
        List<Evidence_Body> evidenceBodyList = modelManageService.getEvidenceByCaseId(caseId);
        List<Evidence_Head> evidenceHeadList = modelManageService.getHeadsByCaseId(caseId);
        List<MOD_Joint> modJointList = modelManageService.getJointsByCaseId(caseId);


        JSONArray DottedJsonArr = new JSONArray();
        JSONArray SolidJsonArr = new JSONArray();

        //evidence to head
        for(Evidence_Head evidenceHead: evidenceHeadList){
            Evidence_Body evidenceBody = modelManageService.findBodyById(evidenceHead.getBodyid());
            if(evidenceBody != null){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("logicNodeId1", evidenceBody.getLogicNodeID());
                jsonObject.put("logicNodeId2", evidenceHead.getLogicNodeId());

                if(evidenceBody.getTrust() == 0){
                    DottedJsonArr.add(jsonObject);
                }
                else{
                    SolidJsonArr.add(jsonObject);
                }
            }

        }

        //fact to joint
        for(MOD_Joint modJoint: modJointList){
            MOD_Fact modFact = modelManageService.getFactByID(modJoint.getFactID());
            if(modFact != null){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("logicNodeId1", modFact.getLogicNodeID());
                jsonObject.put("logicNodeId2", modJoint.getLogicNodeId());

                if(modFact.getConfirm() == 0){
                    DottedJsonArr.add(jsonObject);
                }
                else{
                    SolidJsonArr.add(jsonObject);
                }
            }
        }

        //evidence to evidence
        List<EvidenceEvidenceLink> evidenceEvidenceLinks = modelManageService.getEvidenceEvidenceLinkByCaseId(caseId);
        for(EvidenceEvidenceLink evidenceEvidenceLink: evidenceEvidenceLinks){
            int evidenceId1 = evidenceEvidenceLink.getEvidenceId1();
            int evidenceId2 = evidenceEvidenceLink.getEvidenceId2();

            Evidence_Body evidenceBody1 = modelManageService.findBodyById(evidenceId1);
            Evidence_Body evidenceBody2 = modelManageService.findBodyById(evidenceId2);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("logicNodeId1", evidenceBody1.getLogicNodeID());
            jsonObject.put("logicNodeId2", evidenceBody2.getLogicNodeID());

            if(evidenceBody1.getTrust() == 1 && evidenceBody2.getTrust() == 1 ){
                SolidJsonArr.add(jsonObject);
            }
            else{
                DottedJsonArr.add(jsonObject);
            }
        }

        //head to joint
        for(MOD_Joint modJoint: modJointList){
            for(Evidence_Head evidenceHead: evidenceHeadList){
                String test1 = modJoint.getContent();
                String test2 = evidenceHead.getHead();

                Matcher matcher = Pattern.compile(test1).matcher(test2);

                if(matcher.find()){
                    EvidenceFactLink evidenceFactLink1 = modelManageService.findEvidenceFactLinkByCaseIdAndEviIdAndFactId(caseId, evidenceHead.getBodyid(), modJoint.getFactID());
                    if(evidenceFactLink1 == null){
                        EvidenceFactLink evidenceFactLink = new EvidenceFactLink();
                        evidenceFactLink.setCaseID(caseId);
                        evidenceFactLink.setInitEviID(evidenceHead.getBodyid());
                        evidenceFactLink.setFactID(modJoint.getFactID());
                        modelManageService.saveEvidenceFactLink(evidenceFactLink);
                    }


                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("logicNodeId1", modJoint.getLogicNodeId());
                    jsonObject.put("logicNodeId2", evidenceHead.getLogicNodeId());

                    SolidJsonArr.add(jsonObject);
                }
            }
        }


        if(type == 0){
            return DottedJsonArr;
        }
        else{
            return SolidJsonArr;
        }


    }

//    @RequestMapping(value="/getEvidences")
//    public JSONObject getEvidences(@RequestParam("cid") int cid){
//
//        return modelManageService.getEvidences(cid);
//    }
//
//    @RequestMapping(value="/getHeaders")
//    public JSONObject getHeaders(@RequestParam("bid") int bid){
//
//        return modelManageService.getHeadersByBodyID(bid);
//    }

    @RequestMapping(value="/saveHead")
    public int saveHead(@RequestBody Evidence_Head head){

        return modelManageService.saveHeader(head).getId();
    }

    @RequestMapping(value="/deleteHead")
    public void deleteHead(@RequestParam("id") int id){

        modelManageService.deleteHeaderById(id);
    }

    @RequestMapping(value="/saveHeaders")
    public void saveHeaders(@RequestBody List<Evidence_Head> heads){

        modelManageService.saveHeaders(heads);
    }

    @RequestMapping(value="/saveBody")
    public Evidence_Body saveBody(@RequestBody Evidence_Body body){

        if(body.getLogicNodeID()>=0){
            logicService.modEvidenceOrFactNode(body.getLogicNodeID(),body.getBody());
        }else{
            int lid = logicService.addEvidenceOrFactNode(body.getCaseID(),body.getBody(),0);
            body.setLogicNodeID(lid);
        }

        return modelManageService.saveBody(body);
    }

    @RequestMapping(value="/deleteBody")
    public void deleteBody(@RequestParam("id") int id){

        int lid = modelManageService.getLogicNodeIDofBody(id);
        if(lid>=0)
            logicService.deleteNode(lid);
        modelManageService.deleteBodyById(id);
    }

    @RequestMapping(value="/updateBodyTrust")
    public void updateBodyTrust(@RequestParam("bid") int bid){

       modelManageService.updateBodyTrustById(bid);
    }

    @RequestMapping(value="/saveJoint")
    public int saveJoint(@RequestBody MOD_Joint joint){
        return modelManageService.saveJoint(joint).getId();
    }

    @RequestMapping(value="/deleteJoint")
    public void deleteJoint(@RequestParam("id") int id){

        modelManageService.deleteJointById(id);
    }

    @RequestMapping(value="/saveFact")
    public MOD_Fact saveFact(@RequestBody MOD_Fact fact){

        if(logicService.getNode(fact.getLogicNodeID())!=null){
            logicService.modEvidenceOrFactNode(fact.getLogicNodeID(),fact.getContent());
        }else{
            int lid = logicService.addEvidenceOrFactNode(fact.getCaseID(),fact.getContent(),1);
            fact.setLogicNodeID(lid);
        }
        return modelManageService.saveFact(fact);
    }

    @RequestMapping(value="/deleteFact")
    public void deleteFact(@RequestParam("id") int id){

        MOD_Fact fact = modelManageService.getFactByID(id);
        if(fact!=null){
            if(fact.getLogicNodeID()>=0){
                logicService.deleteNode(fact.getLogicNodeID());
            }
        }
        modelManageService.deleteFactById(id);

    }

    @RequestMapping(value="/updateFactConfirm")
    public void updateFactConfirm(@RequestParam("fid") int fid,@RequestParam("confirm") int confirm){

        modelManageService.updateFactConfirmById(fid, confirm);
    }

    @RequestMapping(value="/saveAll")
    public void saveAll(@RequestBody Evidence_Data all){

//        modelManageService.deleteAll(all.getCaseID());
        modelManageService.saveHeaders(all.getHeaders());
        modelManageService.saveBodies(all.getBodies());
        modelManageService.saveJoints(all.getJoints());
        modelManageService.saveFacts(all.getFacts());
        modelManageService.deleteArrowsByCid(all.getCaseID());
        modelManageService.saveArrows(all.getArrows());
        saveInLogic(all.getLinks(),all.getCaseID());
        modelManageService.deleteSketchListByCaseID(all.getCaseID());
        modelManageService.saveSketch(all.getSketches());
    }

    public void saveInLogic(HashMap<Integer,List<Integer>> list, int cid){
        logicService.deleteAllLinksBetweenEvidenceAndFactNode(cid);
        modelManageService.saveLogicLinks(list,cid);
    }

    @RequestMapping(value="/exportExcel")
    public ResponseEntity<InputStreamResource> exportExcel(HttpServletRequest request)
            throws IOException {
        String filePath = System.getProperty("user.dir")+"\\src\\main\\resources\\download\\证据链.xls";
        int cid = Integer.parseInt(request.getParameter("cid"));
        modelManageService.writeToExcel(cid,filePath);

        return exportFile(filePath);
    }

    @RequestMapping(value="/exportXML")
    public ResponseEntity<InputStreamResource> exportXML(HttpServletRequest request)
            throws IOException {
        String filePath = System.getProperty("user.dir")+"\\src\\main\\resources\\download\\证据链.xml";
        int cid = Integer.parseInt(request.getParameter("cid"));
        modelManageService.writeToXMLBySchema(cid,filePath);
        return exportFile(filePath);
    }

    private ResponseEntity<InputStreamResource> exportFile(String filePath)
            throws IOException{
        FileSystemResource fileSystemResource = new FileSystemResource(filePath);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", new String( fileSystemResource.getFilename().getBytes("utf-8"), "ISO8859-1" )));
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentLength(fileSystemResource.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .body(new InputStreamResource(fileSystemResource.getInputStream()));
    }

    @RequestMapping(value="/splitFact")
    public List<MOD_Fact> splitFact(@RequestParam("caseID") int caseID,@RequestParam("text") String text){
        MOD_Fact_Doc factDoc = new MOD_Fact_Doc();
        factDoc.setCaseID(caseID);
        factDoc.setText(text);
        factDoc = modelManageService.saveFactDoc(factDoc);
        int factDocID = factDoc.getId();

        List<MOD_Fact> facts = new ArrayList<MOD_Fact>();

        int index = 0;
        String[] tests=text.split("。");
        for(String str:tests) {
            if (!str.isEmpty()) {
                MOD_Fact fact = new MOD_Fact();
                fact.setId(index);
                fact.setCaseID(caseID);
                fact.setContent(str);
                fact.setTextID(factDocID);
//                fact = modelManageService.saveFact(fact);
                facts.add(fact);
                index++;
            }
        }
        return facts;
    }

//    @RequestMapping(value="/extractJoints")
//    public List<MOD_Joint> extractJoints(@RequestBody List<MOD_Fact> facts){
//
//        return modelManageService.extractJoints(facts);
//    }

    @RequestMapping(value="/exportJoints")
    public JSONObject exportJoints(@RequestBody JSONObject data){

        return modelManageService.getFactLinkpoints(data.getInt("caseID"),data.getJSONArray("facts"),data.getJSONArray("bodies"));
    }

    @RequestMapping(value="/getEvidenceContents")
    public String getEvidenceContents(@RequestParam("caseID") int caseID){
        return modelManageService.getEvidencesList(caseID);
    }
    @RequestMapping(value="/getFactContents")
    public String getFactContents(@RequestParam("caseID") int caseID){
        return modelManageService.getEvidencesList(caseID);
    }

    @RequestMapping(value="/saveSketchList")
    public void saveSketchList(@RequestBody List<MOD_Sketch> sketchList){
        modelManageService.deleteSketchListByCaseID(sketchList.get(0).getCaseID());
        modelManageService.saveSketch(sketchList);
    }

    @RequestMapping(value = "/getInfo")
    public JSONObject getInfo(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("facts", getFacts(front));
        jsonObject.put("evidences", getEvidence(front));
        jsonObject.put("heads", getHeads(front));
        jsonObject.put("joints", getJoints(front));
        modelManageService.deleteEvidenceFactLinkByCaseId(caseId);
        jsonObject.put("dottedLines", getDottedLines(front));
        jsonObject.put("solideLines", getSolideLines(front));

        return jsonObject;
    }

    @RequestMapping(value = "/getLogicInfo")
    public JSONObject getLogicInfo(@RequestBody JSONObject front){

        int caseId = front.getInt("caseId");

        JSONObject jsonObject = new JSONObject();

        jsonObject.put("facts", getFacts(front));
        jsonObject.put("evidences", getEvidence(front));
        jsonObject.put("results", getResults(front));
        jsonObject.put("laws", getLaws(front));
        jsonObject.put("lines", getLogicLine(caseId));

        return jsonObject;
    }

    public JSONArray getLogicLine(int caseId){
        List<MOD_Fact> modFactList = modelManageService.getFactsByCaseId(caseId);
        List<Evidence_Body> evidenceBodyList = modelManageService.getEvidenceByCaseId(caseId);
        List<MOD_Law> modLawList = modelManageService.getLawsByCaseId(caseId);
        List<MOD_Result> modResultList = modelManageService.getResultsByCaseId(caseId);
        List<EvidenceFactLink> evidenceFactLinkList = modelManageService.getEvidenceFactLinkByCaseId(caseId);

        JSONArray res = new JSONArray();




        //evidence to fact
        for(EvidenceFactLink evidenceFactLink: evidenceFactLinkList){
            Evidence_Body evidenceBody = modelManageService.findBodyById(evidenceFactLink.getInitEviID());
            MOD_Fact modFact = modelManageService.getFactByID(evidenceFactLink.getFactID());
            if(evidenceBody != null && modFact != null){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("logicNodeId1", evidenceBody.getLogicNodeID());
                jsonObject.put("logicNodeId2", modFact.getLogicNodeID());
                res.add(jsonObject);
            }
        }

        //fact to law
        for(MOD_Law modLaw: modLawList){
            MOD_Fact modFact = modelManageService.getFactByID(modLaw.getFactId());
            if(modFact != null){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("logicNodeId1", modFact.getLogicNodeID());
                jsonObject.put("logicNodeId2", modLaw.getLogicNodeID());
                res.add(jsonObject);
            }
        }

        //law to result
        for(MOD_Result modResult: modResultList){
            MOD_Law modLaw = modelManageService.getLawById(modResult.getLawId());
            if(modLaw != null){
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("logicNodeId1", modLaw.getLogicNodeID());
                jsonObject.put("logicNodeId2", modResult.getLogicNodeID());
                res.add(jsonObject);
            }
        }

        return res;
    }

    @RequestMapping(value = "/deleteResult")
    public JSONObject deleteResult(@RequestBody JSONObject front){

        int id = front.getInt("resultId");
        modelManageService.deleteResultById(id);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }

    @RequestMapping(value = "/updateResultById")
    public JSONObject updateResultById(@RequestBody JSONObject front){
        int id = front.getInt("resultId");
        String content = front.getString("content");
        modelManageService.updateResultById(id, content);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }

    @RequestMapping(value = "/deleteLawById")
    public JSONObject deleteLawById(@RequestBody JSONObject front){
        int id = front.getInt("lawId");
        modelManageService.deleteLawById(id);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }

    @RequestMapping(value = "/updateLawById")
    public JSONObject updateLawById(@RequestBody JSONObject front){
        int id = front.getInt("lawId");
        String content = front.getString("content");
        modelManageService.updateLawById(id, content);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }

    @RequestMapping(value = "/recommendLaw")
    public JSONArray recommendLaw(@RequestBody JSONObject front){
        JSONArray jsonArray = new JSONArray();

        JSONObject jsonObject1 = new JSONObject();
        String name1 = "《刑法》第一百三十三条之一 ";
        String content1 = "在道路上驾驶机动车追逐竞驶，情节恶劣的，或者在道路上醉酒驾驶机动车的，处拘役，并处罚金。";
        jsonObject1.put("name", name1);
        jsonObject1.put("content", content1);
        jsonArray.add(jsonObject1);

        JSONObject jsonObject2 = new JSONObject();
        String name2 = "道路交通安全法第九十一条 ";
        String content2 = "饮酒后驾驶机动车的，处暂扣六个月机动车驾驶证，并处一千元以上二千元以下罚款。" +
                "因饮酒后驾驶机动车被处罚，再次饮酒后驾驶机动车的，处十日以下拘留，并处一千元以上二千元以下罚款，吊销机动车驾驶证。";
        jsonObject2.put("name", name2);
        jsonObject2.put("content", content2);
        jsonArray.add(jsonObject2);

        JSONObject jsonObject3 = new JSONObject();
        String name3 = "刑法第五十二条 ";
        String content3 = "无论是刑法分则明确规定了罚金刑幅度的，还是没有明确规定罚金刑幅度的，判处罚金刑时都应当根据犯罪情节决定罚金数额。" +
                "主要看犯罪分子罪行的危害程度，主观恶性的大小，手段是否恶劣，非法所得的多少，后果是否严重等等。一般说来，情节严重的，" +
                "罚金数额应当多些，情节较轻的，罚金数额应当少些，以做到罪刑相适应，使犯罪分子不在经济上占到便宜。同时犯罪分子经济负担能力也是一个考虑的因素。";
        jsonObject3.put("name", name3);
        jsonObject3.put("content", content3);
        jsonArray.add(jsonObject3);
        return jsonArray;
    }

    @RequestMapping(value = "/addLaw")
    public JSONObject addLaw(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");
        int factId = front.getInt("factId");
        String name = front.getString("name");
        String content = front.getString("content");

        MOD_Law modLaw = new MOD_Law();
        modLaw.setCaseID(caseId);
        modLaw.setContent(content);
        modLaw.setFactId(factId);
        modLaw.setName(name);
        int logicNodeId=logicService.addEvidenceOrFactNode(caseId,name,2);
        modLaw.setLogicNodeID(logicNodeId);
        modelManageService.saveLaw(modLaw);

        MOD_Result modResult = new MOD_Result();


        String resultContent = "根据事实——"+ content + "，依据" + modLaw.getName() + "所述：" + modLaw.getContent() + "作出判决";

        modResult.setCaseID(caseId);
        modResult.setContent(resultContent);
        modResult.setLawId(modLaw.getId());


        int resultLogicNodeId=logicService.addEvidenceOrFactNode(caseId,"结论",3);
        modResult.setLogicNodeID(resultLogicNodeId);
        modelManageService.saveResult(modResult);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }
}
