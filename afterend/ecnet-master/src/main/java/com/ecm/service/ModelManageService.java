package com.ecm.service;

import com.ecm.model.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.HashMap;
import java.util.List;

public interface ModelManageService {

    public List<EvidenceFactLink> getEvidenceFactLinkByCaseId(int caseId);

    public EvidenceFactLink saveEvidenceFactLink(EvidenceFactLink evidenceFactLink);

    public void deleteEvidenceFactLinkByCaseId(int caseId);

    public void updateJointById(int id, String content);

    public List<MOD_Joint> getJointsByCaseId(int caseId);

    public MOD_Joint getJointById(int jointId);

    public void deleteJointsByFactId(int factId);

    public List<Evidence_Body> getEvidenceByCaseId(int caseId);

    public List<Evidence_Head> getHeadsByCaseId(int caseId);

    public List<MOD_Law> getLawsByCaseId(int caseId);

    public List<MOD_Result> getResultsByCaseId(int caseId);

    public MOD_Law getLawById(int id);

    public MOD_Result getResultById(int id);

    public JSONObject getEvidences(int cid);

    public MOD_Law saveLaw(MOD_Law modLaw);

    public MOD_Result saveResult(MOD_Result modResult);

    public EvidenceFactLink findEvidenceFactLinkByCaseIdAndEviIdAndFactId(int caseId, int eviId, int factId);

    public String getEvidencesList(int cid);

    public String getFactList(int cid);

    public JSONObject getHeadersByBodyID(int bid);

    public Evidence_Head saveHeader(Evidence_Head header);

    public void saveHeaders(List<Evidence_Head> headers);

    public void deleteHeaderById(int id);

//    public void deleteHeadersByCid(int cid);

    public Evidence_Body saveBody(Evidence_Body body);

    public void saveBodies(List<Evidence_Body> bodies);

    public int getLogicNodeIDofBody(int bid);

    public void deleteBodyById(int id);

    public void deleteResultById(int id);

    public void deleteLawById(int id);

    public void updateResultById(int id, String content);

    public void updateLawById(int id, String content);

//    public void deleteBodiesByCid(int cid);

    public MOD_Joint saveJoint(MOD_Joint joint);

    public void saveJoints(List<MOD_Joint> joints);

    public void deleteJointById(int id);

    public MOD_Fact saveFact(MOD_Fact fact);

    public List<MOD_Fact> getToConfirmByCaseId(int caseId);

    public void saveFacts(List<MOD_Fact> facts);

//    public int getLogicNodeIDofFact(int fid,int cid);

    public MOD_Fact_Doc getFactDocByCaseId(int caseId);

    public int getLogicNodeIDofFact(int fid);

    public MOD_Fact getFactByID(int id);

    public void deleteFactById(int id);

    public void deleteFactByCid(int cid);

    public void deleteJointsByCid(int cid);

    public MOD_Arrow saveArrow(MOD_Arrow arrow);

    public void saveArrows(List<MOD_Arrow> arrows);

    public void deleteArrowsByCid(int cid);

    public void deleteAll(int cid);

    public void deleteByDocumentID(int did);

    public void writeToExcel(int cid,String filePath);

    public void writeToXML(int cid,String filePath);

    public void writeToXMLBySchema(int cid,String filePath);

    public void saveLogicLinks(HashMap<Integer,List<Integer>> list, int cid);

    public MOD_Fact_Doc saveFactDoc(MOD_Fact_Doc factDoc);

    public JSONObject getFactLinkpoints(int cid,JSONArray facts, JSONArray bodies);

    public void updateBodyTrustById(int bid);

    public void updateFactConfirmById(int fid,int confirm);

    //public List<MOD_Joint> extractJoints(List<MOD_Fact> facts);
    public HashMap<Integer, List<MOD_Joint>> extractJoints(List<MOD_Fact> facts);

    public List<MOD_Fact> getFactsByCaseId(int caseId);

    public void saveSketch(List<MOD_Sketch> sketchList);

    public void deleteSketchListByCaseID(int caseID);

    public void updateFactById(int factId, String fact);

    public List<MOD_Joint> findJointByFactId(int factId);

    public Evidence_Body findBodyById(int bodyId);

    public List<EvidenceEvidenceLink> getEvidenceEvidenceLinkByCaseId(int caseId);
}
