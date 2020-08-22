package com.ecm.controller;

import com.ecm.model.Case;
import com.ecm.model.Evidence_Document;
import com.ecm.model.Judgment;
import com.ecm.service.CaseManageService;
import com.ecm.service.EvidenceService;
import com.ecm.service.UserManageService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
@RequestMapping(value="/case")
public class CaseController {

    @Autowired
    private CaseManageService caseManageService;
    @Autowired
    private UserManageService userManageService;

    @Autowired
    private EvidenceService evidenceService;

    @RequestMapping(value="/getAll")
    public JSONArray getAllCases(@RequestBody JSONObject jsonObject){
        String username = jsonObject.getString("username");
        return caseManageService.getAllCases(username);
    }

    @RequestMapping(value="/getFinishedCases")
    public JSONArray getFinishedCases(@RequestBody JSONObject jsonObject){
        String username = jsonObject.getString("username");
        return caseManageService.getFinishedCases(username);
    }

    @RequestMapping(value="/getProcessingCases")
    public JSONArray getProcessingCases(@RequestBody JSONObject jsonObject){
        String username = jsonObject.getString("username");
        return caseManageService.getProcessingCases(username);
    }

    @RequestMapping(value="/search")
    public JSONArray searchCasesByName(@RequestBody JSONObject jsonObject){
        String username = jsonObject.getString("username");
        String casename = jsonObject.getString("casename");
        return caseManageService.findCasesByName(username, casename);
    }

    @RequestMapping(value="/save")
    public int saveCase(@RequestBody JSONObject data){
        JSONObject c = data.getJSONObject("case");
        JSONArray jList = data.getJSONArray("judgeList");
        boolean isCaseNumExisted = caseManageService.isCaseNumExisted(c.getString("caseNum"));
        boolean isJListRight = true;

        for(int i = 0;i<jList.size();i++){
            if(!userManageService.isRealNameExisted(jList.getString(i))){
                isJListRight = false;
                break;
            }
        }
        if(isCaseNumExisted&&(!isJListRight)){
            return -3;
        }else if((!isCaseNumExisted)&&(!isJListRight)){
            return -2;
        }else if(isCaseNumExisted&&isJListRight){
            return -1;
        }else{
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            Case c_new = new Case();
            c_new.setId(-1);
            c_new.setCaseNum(c.getString("caseNum"));
            c_new.setName(c.getString("name"));
            c_new.setType(c.getInt("type")+"");

            try {
                c_new.setFillingDate(Timestamp.valueOf(format2.format(df.parse(c.getString("fillingDate")))));
                if(!c.getString("closingDate").isEmpty())
                    c_new.setClosingDate(Timestamp.valueOf(format2.format(df.parse(c.getString("closingDate")))));
            } catch (ParseException e) {
                e.printStackTrace();
            }

            int cid = caseManageService.saveCase(c_new).getId();

            for(int i = 0;i<jList.size();i++){
                Judgment j = new Judgment();
                j.setCid(cid+"");
                j.setIsJudge("0");
                j.setIsUndertaker("Y");
                j.setJid((i+1)+"");
                j.setRealName(jList.getString(i));
                caseManageService.saveJudgment(j);
            }
            return cid;
        }
    }

    @RequestMapping(value="/update")
    public String updateCase(@RequestBody Case c){
        if(caseManageService.isCaseNumExisted(c.getId(),c.getCaseNum())){
          return "caseNum exists";
        }else{
            Case c_origin = caseManageService.getCaseById(c.getId());
            c_origin.setCaseNum(c.getCaseNum());
            c_origin.setName(c.getName());
            c_origin.setType(c.getType());
            c_origin.setFillingDate(c.getFillingDate());
            c_origin.setClosingDate(c.getClosingDate());
            caseManageService.updateCase(c_origin);
            return "success";
        }
    }

    @RequestMapping(value="/delete")
    public void deleteCases(@RequestBody List<Integer> cases){
        caseManageService.deleteCases(cases);
    }

    @RequestMapping(value="/getCaseDetail")
    public JSONObject getCaseById(@RequestBody JSONObject front){

        int caseId = front.getInt("caseId");

        Case temp = caseManageService.getCaseById(caseId);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("caseNum", temp.getCaseNum());
        jsonObject.put("caseName", temp.getName());

        return jsonObject;
    }

    @RequestMapping(value = "/initEvidenceByType")
    public JSONObject initEvidenceByType(@RequestBody JSONObject front){
        String userName = front.getString("username");
        int caseId = front.getInt("caseId");
        int type = front.getInt("type");

        Evidence_Document evidenceDocument = evidenceService.findDocuByAjxhAndType(caseId, type);
        String documentBody = "";
        if(evidenceDocument != null){
            documentBody = evidenceDocument.getText();
        }


        JSONObject jsonObject = new JSONObject();
        jsonObject.put("documentBody", documentBody);

        return jsonObject;
    }
}
