package com.ecm.controller;

import com.ecm.keyword.manager.TypeCalculator;
import com.ecm.keyword.model.SplitType;
import com.ecm.keyword.reader.FileUtil;
import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;

import com.ecm.model.Evidence_Head;
import com.ecm.service.EvidenceService;
import com.ecm.service.LogicService;
import com.ecm.service.ModelManageService;
import com.ecm.util.ImportXMLUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping(value="/evidence")
public class EvidenceController {

    @Autowired
    private EvidenceService evidenceService;
    @Autowired
    private ModelManageService modelManageService;
    @Autowired
    private LogicService logicService;

    @PostMapping(value = "/document")
    public JSONArray save(@RequestBody JSONObject front){
        int ajxh = front.getInt("caseId");
        int type = front.getInt("type");
        String text = front.getString("text");

        JSONArray res = new JSONArray();
        TypeCalculator typeCalculator=new TypeCalculator();
      Evidence_Document evidence_document=new Evidence_Document();
      evidence_document.setCaseID(ajxh);
      evidence_document.setText(text);
      evidence_document.setType(type);

      evidence_document=evidenceService.saveOrUpdate(evidence_document);

      modelManageService.deleteByDocumentID(evidence_document.getId());
      for(Evidence_Body evidenceBody: evidenceService.findBodysByCaseIdAndType(ajxh, type)){
          if(evidenceBody != null){
              evidenceService.deleteHeadAllByBody(evidenceBody.getId());
          }
      }
      evidenceService.deleteBodysByCaseIdAndType(ajxh, type);
      evidenceService.deleteBodyAllByDocuId(evidence_document.getId());
      evidenceService.deleteHeadByDocumentId(evidence_document.getId());



     // String test="1、test1。2、test2。3、test3";
      if(ajxh != 3){
          String[] tests=text.split(SplitType.getType(text).getRegex());
          for(String str:tests){
              if(!str.isEmpty()){
                  int logicNodeId=logicService.addEvidenceOrFactNode(ajxh,str,0);
                  Evidence_Body evidence_body=new Evidence_Body();
                  evidence_body.setCaseID(ajxh);
                  evidence_body.setDocumentid(evidence_document.getId());
                  evidence_body.setBody(str);
                  evidence_body.setType(typeCalculator.calType(str));
                  evidence_body.setLogicNodeID(logicNodeId);
                  evidence_body.setIsDefendant(type);
                  evidence_body=evidenceService.saveBody(evidence_body);


                  JSONObject jsonObject = new JSONObject();

                  jsonObject.put("bodyId",evidence_body.getId());
                  jsonObject.put("documentId",evidence_body.getDocumentid());
                  jsonObject.put("body",evidence_body.getBody());
                  jsonObject.put("type",evidence_body.getType());

                  //
                  jsonObject.put("confirm",evidence_body.getTrust());
                  //


                  res.add(jsonObject);
              }

          }
      }
      else{
          String content1 = "1、查获经过及案发经过，证实在2015年3月7日3时许，" +
                  "在罗山路进外环高速往浦东机场方向的匝道上一辆沪ARXXXX荣威轿车发生单车事故，王某某称车辆由其儿子王永磊出门驾驶。";
          String content2 = "2、证人沈某某的证言，证实2015年3月6日晚，其召集了老同事王某某等人一起在新友饭店吃饭，" +
                  "王某某喝了酒，大约到晚上10时30分许结束，当天其和王某某一起离开了新友饭店，当天吃饭期间，讲到谁喝酒，谁就不要开车，当时王某某讲已安排好了。";
          String content3 = "3、证人浦某某的证言，证实2015年3月6日晚上10时左右，其在新友饭店参加朋友沈某某的聚餐，" +
                  "沈某某讲喝了酒不要开车叫代驾，王某某讲已安排好人开车了，后来其也看到王某某好像朝车库走，后面好像跟了一个人。";
          String content4 = "1、证人吴秀春在2015年3月7日的证言中陈述到，昨天其丈夫王某某跟其讲不回家吃饭了，其儿子下班后回家了，回家后就再没有出门。";
          String content5 = "2、证人出租车司机，在2015年3月7日凌晨，在外环往浦东机场匝道口有一辆深色的轿车，在车辆边上，车旁就一个人好像没其他人，不像喝过酒的样子。";
          String content6 = "3、道路交通事故现场图及照片、事故现场勘查笔录、当事人血样提取登记表、物损评估意见书、司法鉴定科学技术研究所司法鉴定中心检验报告书，" +
                  "证实车辆事故现场情况、车辆物损情况及被告人王某某血液中乙醇含量为1．69毫克／毫升。";
          String[] content = {content1, content2, content3, content4, content5, content6};

          if(type == 0){
              for(int i = 3; i < content.length; i++){
                  int logicNodeId=logicService.addEvidenceOrFactNode(ajxh,content[i],0);
                  Evidence_Body evidence_body=new Evidence_Body();
                  evidence_body.setCaseID(ajxh);
                  evidence_body.setDocumentid(evidence_document.getId());
                  evidence_body.setBody(content[i]);
                  evidence_body.setType(typeCalculator.calType(content[i]));
                  evidence_body.setLogicNodeID(logicNodeId);
                  evidence_body.setIsDefendant(type);
                  evidence_body=evidenceService.saveBody(evidence_body);


                  JSONObject jsonObject = new JSONObject();

                  jsonObject.put("bodyId",evidence_body.getId());
                  jsonObject.put("documentId",evidence_body.getDocumentid());
                  jsonObject.put("body",evidence_body.getBody());
                  jsonObject.put("type",evidence_body.getType());

                  //
                  jsonObject.put("confirm",evidence_body.getTrust());
                  //


                  res.add(jsonObject);
              }
          }
          else{
              for(int i = 0; i < 3; i++){
                  int logicNodeId=logicService.addEvidenceOrFactNode(ajxh,content[i],0);
                  Evidence_Body evidence_body=new Evidence_Body();
                  evidence_body.setCaseID(ajxh);
                  evidence_body.setDocumentid(evidence_document.getId());
                  evidence_body.setBody(content[i]);
                  evidence_body.setType(typeCalculator.calType(content[i]));
                  evidence_body.setLogicNodeID(logicNodeId);
                  evidence_body.setIsDefendant(type);
                  evidence_body=evidenceService.saveBody(evidence_body);


                  JSONObject jsonObject = new JSONObject();

                  jsonObject.put("bodyId",evidence_body.getId());
                  jsonObject.put("documentId",evidence_body.getDocumentid());
                  jsonObject.put("body",evidence_body.getBody());
                  jsonObject.put("type",evidence_body.getType());

                  //
                  jsonObject.put("confirm",evidence_body.getTrust());
                  //


                  res.add(jsonObject);
              }
          }
      }


        return res;

    }

    @PostMapping(value = "/deleteBody")
    public JSONObject deleteBody(@RequestBody JSONObject front){
       // System.out.println(id);

        int bodyId = front.getInt("bodyId");

        logicService.deleteNode(evidenceService.findLogicId(bodyId));
        evidenceService.deleteBodyById(bodyId);
        evidenceService.deleteHeadAllByBody(bodyId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }


    @RequestMapping(value = "/addBody")
//    public Evidence_Body addBody(@RequestParam("ajxh") int ajxh, @RequestParam("type") int type, @RequestParam("body") String body,@RequestParam("document_id") int document_id){
    public JSONObject addBody(@RequestBody JSONObject front){

        int ajxh = front.getInt("caseId");
        int type = front.getInt("type");
        String body = front.getString("body");
        int documentId = front.getInt("documentId");

        int logicNodeId=logicService.addEvidenceOrFactNode(ajxh,body,0);


        Evidence_Body evidence_body=new Evidence_Body();
        evidence_body.setCaseID(ajxh);
        evidence_body.setDocumentid(documentId);
        evidence_body.setType(type);
        evidence_body.setBody(body);
        evidence_body.setLogicNodeID(logicNodeId);
        evidenceService.saveBody(evidence_body);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("bodyId", evidence_body.getId());
        return jsonObject;
    }


    @PostMapping(value = "/updateBodyById")
    public JSONObject updateBodyById(@RequestBody JSONObject front){

        int id  = front.getInt("bodyId");
        String body = front.getString("body");
        logicService.modEvidenceOrFactNode(evidenceService.findLogicId(id),body);
         evidenceService.updateBodyById(body,id);

         JSONObject jsonObject = new JSONObject();
         jsonObject.put("success", true);
         return jsonObject;

    }


    @PostMapping(value = "/updateTypeById")
    public JSONObject updateTypeById(@RequestBody JSONObject front){
        int id  = front.getInt("bodyId");
        int type = front.getInt("type");
        evidenceService.updateTypeById(type,id);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;

    }


    @PostMapping(value = "/updateTrustById")
    public JSONObject updateTrustById(@RequestBody JSONObject front){
        int id  = front.getInt("bodyId");
        int trust = front.getInt("confirm");
        evidenceService.updateTrustById(trust,id);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;

    }


//    @RequestMapping(value="/getContent")
//    public JSONArray getAllCases(@RequestParam("ajxh") int ajxh){
//        JSONArray res=new JSONArray();
//        for(int i=0;i<=1;i++) {
//            Evidence_Document evidence_document = evidenceService.findDocuByAjxhAndType(ajxh, i);
//            if (evidence_document != null) {
//                JSONObject jsonObject = new JSONObject();
//
//                jsonObject.put("id", evidence_document.getId());
//                jsonObject.put("text", evidence_document.getText());
//                jsonObject.put("type", evidence_document.getType());
//                List<Evidence_Body> evidence_bodies = evidenceService.findBodyByDocu(evidence_document.getId());
//                JSONArray bodylist = new JSONArray();
//                for (Evidence_Body evidence_body : evidence_bodies) {
//                    evidence_body.setHeadList(evidenceService.findHeadByBody(evidence_body.getId()));
//                    JSONObject temp = new JSONObject();
//                    temp.put("id", evidence_body.getId());
//                    temp.put("body", evidence_body.getBody());
//                    temp.put("type", evidence_body.getType());
//                    temp.put("trust", evidence_body.getTrust());
//                    temp.put("headList", evidence_body.getHeadList());
//                    bodylist.add(temp);
//                }
//                jsonObject.put("bodylist", bodylist);
//                res.add(jsonObject);
//            }
//        }
//            return res;
//
//    }


    @PostMapping(value = "/createHead")
    public JSONArray createHead(@RequestBody JSONObject front){
//        int documentId = front.getInt("documentId");
//
//        List<Evidence_Body> headList=evidenceService.createHead(documentId);
//        JSONArray res = new JSONArray();
//
//        for(Evidence_Body evidenceBody: headList){
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("bodyId", evidenceBody.getId());
//            jsonObject.put("headList", evidenceBody.getHeadList());
//
//            res.add(jsonObject);
//        }
//
//        return res;

        int documentId = front.getInt("documentId");

        evidenceService.deleteHeadByDocumentId(documentId);

        List<Evidence_Body> evidenceBodyList = evidenceService.findBodyByDocu(documentId);
        JSONArray res = new JSONArray();

        for(Evidence_Body evidenceBody: evidenceBodyList){
            List<Evidence_Head> evidenceHeadList = new ArrayList<>();
            JSONObject jsonObject = new JSONObject();

            int caseId = evidenceBody.getCaseID();
            Evidence_Head evidenceHead1 = new Evidence_Head();
            evidenceHead1.setCaseID(caseId);
            evidenceHead1.setDocumentid(documentId);
            evidenceHead1.setBodyid(evidenceBody.getId());
            evidenceHead1.setHead("张某");
            int logicNodeId1=logicService.addEvidenceOrFactNode(caseId,evidenceHead1.getHead(),4);
            evidenceHead1.setLogicNodeId(logicNodeId1);
            evidenceService.saveHead(evidenceHead1);


            Evidence_Head evidenceHead2 = new Evidence_Head();
            evidenceHead2.setCaseID(caseId);
            evidenceHead2.setDocumentid(documentId);
            evidenceHead2.setBodyid(evidenceBody.getId());
            evidenceHead2.setHead(evidenceBody.getBody().substring(2,4));
            int logicNodeId2=logicService.addEvidenceOrFactNode(caseId,evidenceHead2.getHead(),4);
            evidenceHead2.setLogicNodeId(logicNodeId2);
            evidenceService.saveHead(evidenceHead2);


            Evidence_Head evidenceHead3 = new Evidence_Head();
            evidenceHead3.setCaseID(caseId);
            evidenceHead3.setDocumentid(documentId);
            evidenceHead3.setBodyid(evidenceBody.getId());
            evidenceHead3.setHead(evidenceBody.getBody().substring(4,6));
            int logicNodeId3=logicService.addEvidenceOrFactNode(caseId,evidenceHead3.getHead(),4);
            evidenceHead3.setLogicNodeId(logicNodeId3);
            evidenceService.saveHead(evidenceHead3);


            evidenceHeadList.add(evidenceHead1);
            evidenceHeadList.add(evidenceHead2);
            evidenceHeadList.add(evidenceHead3);
            jsonObject.put("bodyId", evidenceBody.getId());

            jsonObject.put("headList", evidenceHeadList);

            res.add(jsonObject);
        }
        return res;
    }


    @RequestMapping(value = "/createHeadByBodyId")
    public JSONArray createHeadByBodyId(@RequestBody JSONObject front) {

        int bodyId = front.getInt("bodyId");

        evidenceService.deleteHeadAllByBody(bodyId);

        Evidence_Body evidenceBody = evidenceService.findBodyById(bodyId);
        int caseId = evidenceBody.getCaseID();
        int type = evidenceBody.getIsDefendant();
        JSONArray jsonArray = new JSONArray();
        if(caseId != 3){

            Evidence_Head evidenceHead1 = new Evidence_Head();
            evidenceHead1.setCaseID(caseId);
            evidenceHead1.setDocumentid(evidenceBody.getDocumentid());
            evidenceHead1.setBodyid(evidenceBody.getId());
            evidenceHead1.setHead("张某");
            int logicNodeId1=logicService.addEvidenceOrFactNode(caseId,evidenceHead1.getHead(),4);
            evidenceHead1.setLogicNodeId(logicNodeId1);
            evidenceHead1 = evidenceService.saveHead(evidenceHead1);


            Evidence_Head evidenceHead2 = new Evidence_Head();
            evidenceHead2.setCaseID(caseId);
            evidenceHead2.setDocumentid(evidenceBody.getDocumentid());
            evidenceHead2.setBodyid(evidenceBody.getId());
            evidenceHead2.setHead(evidenceBody.getBody().substring(2,4));
            int logicNodeId2=logicService.addEvidenceOrFactNode(caseId,evidenceHead2.getHead(),4);
            evidenceHead2.setLogicNodeId(logicNodeId2);
            evidenceHead2 = evidenceService.saveHead(evidenceHead2);


            Evidence_Head evidenceHead3 = new Evidence_Head();
            evidenceHead3.setCaseID(caseId);
            evidenceHead3.setDocumentid(evidenceBody.getDocumentid());
            evidenceHead3.setBodyid(evidenceBody.getId());
            evidenceHead3.setHead(evidenceBody.getBody().substring(4,6));
            int logicNodeId3=logicService.addEvidenceOrFactNode(caseId,evidenceHead3.getHead(),4);
            evidenceHead3.setLogicNodeId(logicNodeId3);
            evidenceHead3 = evidenceService.saveHead(evidenceHead3);



            JSONObject jsonObject1 = new JSONObject();
            jsonObject1.put("headId", evidenceHead1.getId());
            jsonObject1.put("head", evidenceHead1.getHead());

            jsonArray.add(jsonObject1);
            JSONObject jsonObject2 = new JSONObject();
            jsonObject2.put("headId", evidenceHead2.getId());
            jsonObject2.put("head", evidenceHead2.getHead());

            jsonArray.add(jsonObject2);
            JSONObject jsonObject3 = new JSONObject();
            jsonObject3.put("headId", evidenceHead3.getId());
            jsonObject3.put("head", evidenceHead3.getHead());

            jsonArray.add(jsonObject3);
        }
        else{
            String[] head1 = {"2015年3月7日3时", "王某某",  "儿子", "出门", "驾驶", "荣威轿车"};
            String[] head2 = {"沈某某", "王某某", "新友饭店", "2015年3月6日晚10时30分", "已安排好", "喝了酒"};
            String[] head3 = {"浦某某", "2015年3月6日晚上10时左右", "王某某", "新友饭店", "沈某某", "后面跟人"};
            String[] head4 = {"吴秀春", "王某某", "儿子", "2015年3月7日", "没有出门"};
            String[] head5 = {"出租车司机", "2015年3月7日凌晨", "外环往浦东机场匝道口", "深色的轿车", "一个人", "不像喝过酒的样子"};
            String[] head6 = {"检验报告书", "王某某", "1.69毫克/毫升", "血液乙醇含量"};

            String[] head;
            if(type == 0){
                if(evidenceBody.getBody().substring(0,1).equals("1")){
                    head = head4;
                }
                else if(evidenceBody.getBody().substring(0,1).equals("2")){
                    head = head5;
                }
                else{
                    head = head6;
                }
            }
            else{
                if(evidenceBody.getBody().substring(0,1).equals("1")){
                    head = head1;
                }
                else if(evidenceBody.getBody().substring(0,1).equals("2")){
                    head = head2;
                }
                else{
                    head = head3;
                }
            }

            for(int i = 0; i < head.length; i++){
                Evidence_Head evidenceHead = new Evidence_Head();
                evidenceHead.setCaseID(caseId);
                evidenceHead.setDocumentid(evidenceBody.getDocumentid());
                evidenceHead.setBodyid(evidenceBody.getId());
                evidenceHead.setHead(head[i]);
                int logicNodeId3=logicService.addEvidenceOrFactNode(caseId,evidenceHead.getHead(),4);
                evidenceHead.setLogicNodeId(logicNodeId3);
                evidenceHead = evidenceService.saveHead(evidenceHead);

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("headId", evidenceHead.getId());
                jsonObject.put("head", evidenceHead.getHead());

                jsonArray.add(jsonObject);
            }
        }

        return jsonArray;
    }

//        int bodyId = front.getInt("bodyId");
//
//        List<Evidence_Head> evidenceHeadList = evidenceService.getHeadByBodyId(bodyId);
//
//        JSONArray jsonArray = new JSONArray();
//        for(Evidence_Head evidenceHead: evidenceHeadList){
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("headId", evidenceHead.getId());
//            jsonObject.put("head", evidenceHead.getHead());
//
//            jsonArray.add(jsonObject);
//
//        }
//
//        return jsonArray;
//    }

    @PostMapping(value = "/deleteHead")
    public JSONObject deleteHead(@RequestBody JSONObject front){
        int headId = front.getInt("headId");

        logicService.deleteNode(evidenceService.findHeadById(headId).getLogicNodeId());
        evidenceService.deleteHeadById(headId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }

    @PostMapping(value = "/addHead")
    public JSONObject addHead(@RequestBody JSONObject front){

        String head = front.getString("head");
        int documentId = front.getInt("documentId");
        int caseId = front.getInt("caseId");
        int bodyId = front.getInt("bodyId");
        Evidence_Head evidence_head=new Evidence_Head();
        evidence_head.setHead(head);
        evidence_head.setDocumentid(documentId);
        evidence_head.setCaseID(caseId);
        evidence_head.setBodyid(bodyId);
        int logicNodeId=logicService.addEvidenceOrFactNode(caseId,head,0);
        evidence_head.setLogicNodeId(logicNodeId);
        evidence_head=evidenceService.saveHead(evidence_head);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("headId", evidence_head.getId());
        return jsonObject;
    }
//    public Evidence_Head addHead(@RequestParam("head") String head,@RequestParam("document_id") int document_id,@RequestParam("ajxh") int ajxh,@RequestParam("body_id") int bodyid){
//
//        Evidence_Head evidence_head=new Evidence_Head();
//        evidence_head.setHead(head);
//        evidence_head.setDocumentid(document_id);
//        evidence_head.setCaseID(ajxh);
//        evidence_head.setBodyid(bodyid);
//        evidence_head=evidenceService.saveHead(evidence_head);
//        return evidence_head;
//    }
    @PostMapping(value = "/updateHead")
    public JSONObject updateHeadById(@RequestBody JSONObject front){

        int headId = front.getInt("id");
        String head = front.getString("head");

        Evidence_Head evidenceHead = evidenceService.findHeadById(headId);
        logicService.modEvidenceOrFactNode(evidenceHead.getLogicNodeId(), head);
        evidenceService.updateHeadById(head,headId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("success", true);
        return jsonObject;
    }


    @PostMapping(value = "/importExcel")
    public void importExcel(@RequestParam("file") MultipartFile file,@RequestParam("ajxh") int ajxh,HttpServletResponse response) throws IOException {
        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();
        /*System.out.println("fileName-->" + fileName);
        System.out.println("getContentType-->" + contentType);*/
         String sepa = java.io.File.separator;
        String filePath = System.getProperty("user.dir")+sepa+"src"+sepa+"main"+sepa+"resources"+sepa+"upload"+sepa;
        try {
            FileUtil.uploadFile(file.getBytes(), filePath, fileName);
        } catch (Exception e) {
            // TODO: handle exception
        }

        if(fileName.contains("xml")){

            ImportXMLUtil xmlUtil=new ImportXMLUtil(filePath+sepa+fileName,ajxh);

            evidenceService.importDocumentByXML(xmlUtil);
            evidenceService.importLogicByXML(xmlUtil);
            evidenceService.importEviByXML(xmlUtil);
            evidenceService.importFactByXML(xmlUtil);
            evidenceService.importArrowByXML(xmlUtil);

        }
        if(fileName.contains("xls")){

            List<Evidence_Document> documentList=evidenceService.importDocumentByExcel(filePath+sepa+fileName,ajxh);
            List<Evidence_Body> bodylist=evidenceService.importEviByExcel(filePath+sepa+fileName,ajxh,documentList);
            evidenceService.importFactByExcel(filePath+sepa+fileName,ajxh,bodylist);
            evidenceService.importLogicByExcel(filePath+sepa+fileName,ajxh,bodylist);
        }
        response.sendRedirect("/ecm/upload");

    }

    @RequestMapping(value = "/getNoContradictByDocumentId")
    public JSONArray getNoContradictByCaseId(@RequestBody JSONObject front){

        int documentId = front.getInt("documentId");
        JSONArray res = new JSONArray();

        List<Evidence_Body> evidenceBodyList = evidenceService.findBodyByDocu(documentId);

        int from = 1;
        int to = 1;

        JSONArray defendantArr = new JSONArray();
        JSONArray noDefendantArr = new JSONArray();
        for(Evidence_Body evidenceBody: evidenceBodyList){
            JSONObject jsonObject = new JSONObject();
            if(evidenceBody.getIsDefendant() == 0){
                if(from <= 0 ){
                    jsonObject.put("bodyId", evidenceBody.getId());
                    jsonObject.put("type", evidenceBody.getIsDefendant());
                    jsonObject.put("body", evidenceBody.getBody());
                    jsonObject.put("confirm", evidenceBody.getTrust());
                    noDefendantArr.add(jsonObject);
                    from--;
                }
                else{
                    from--;
                }
            }
            else{
                if(to <= 0){
                    jsonObject.put("bodyId", evidenceBody.getId());
                    jsonObject.put("type", evidenceBody.getIsDefendant());
                    jsonObject.put("body", evidenceBody.getBody());
                    jsonObject.put("confirm", evidenceBody.getTrust());
                    noDefendantArr.add(jsonObject);
                    to--;
                }
                else{
                    to--;
                }
            }

        }

        return noDefendantArr;
    }

    @RequestMapping(value = "/getContradictByDocumentId")
    public JSONArray getContradictByCaseId(@RequestBody JSONObject front){
        int caseId = front.getInt("caseId");
        JSONArray res = new JSONArray();

        List<Evidence_Body> evidenceBodyList = evidenceService.findBodyByCaseId(caseId);

        int from = 1;
        int to = 1;

        JSONArray contradictJsonArr = new JSONArray();

        for(Evidence_Body evidenceBody: evidenceBodyList){
            JSONObject jsonObject = new JSONObject();
            if(evidenceBody.getIsDefendant() == 0){
                if(from == 1){
                    jsonObject.put("bodyId", evidenceBody.getId());
                    jsonObject.put("type", evidenceBody.getIsDefendant());
                    jsonObject.put("body", evidenceBody.getBody());
                    jsonObject.put("confirm", evidenceBody.getTrust());
                    jsonObject.put("role", 0);
                    contradictJsonArr.add(jsonObject);
                    from--;
                }
                else{
                    from--;
                }
            }
            else{
                if(to == 1){
                    jsonObject.put("bodyId", evidenceBody.getId());
                    jsonObject.put("type", evidenceBody.getIsDefendant());
                    jsonObject.put("body", evidenceBody.getBody());
                    jsonObject.put("confirm", evidenceBody.getTrust());
                    jsonObject.put("role", 1);
                    contradictJsonArr.add(jsonObject);
                    to--;
                }
                else{
                    to--;
                }
            }


        }

        JSONObject contradictJson = new JSONObject();
        contradictJson.put("contradictId", 0);
        contradictJson.put("bodys", contradictJsonArr);

        res.add(contradictJson);

        return res;
    }


}
