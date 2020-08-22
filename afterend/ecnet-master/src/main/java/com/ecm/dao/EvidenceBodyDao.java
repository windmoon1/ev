package com.ecm.dao;


import com.ecm.model.EvidenceEvidenceLink;
import com.ecm.model.Evidence_Body;
import com.ecm.model.Evidence_Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface EvidenceBodyDao extends JpaRepository<Evidence_Body, Integer> {

    @Query(value = "select u from EvidenceEvidenceLink u where u.caseID = ?1")
    public List<EvidenceEvidenceLink> getEvidenceEvidenceLinkByCaseId(int caseId);

    @Query(value = "select u from Evidence_Body u where u.caseID= ?1")
    public List<Evidence_Body> getAllByCaseId(int caseId);

    @Query(value = "select u from Evidence_Body u where u.documentid= ?1")
    public List<Evidence_Body> getAllByDocumentid(int documentid);

    @Query(value = "select u from Evidence_Body u where u.caseID= ?1")
    public List<Evidence_Body> getEvidenceByCaseId(int caseId);

//    @Query(value = "select u from Evidence_Body u where u.documentid= ?1 and u.trust=1")
    public List<Evidence_Body> findAllByDocumentidAndTrust(int documentID,int trust);

    public List<Evidence_Body> findAllByCaseIDAndTrust(int caseID,int trust);

    @Query(value = "select b.body from Evidence_Body b where b.caseID= ?1 and b.trust=?2")
    public List<String> findEvidencesByCaseIDAndTrust(int caseID,int trust);

    public List<Evidence_Body> findAllByCaseID(int caseID);

    public Evidence_Body save(Evidence_Body evi);

    @Query(value = "select b from Evidence_Body b where b.id = ?1")
    public Evidence_Body findById(int id);


    @Query(value = "select b.body from Evidence_Body b where b.id= ?1")
    public String getContentById(int id);

    @Query(value = "select b from Evidence_Body b where b.caseID= ?1 and b.isDefendant = ?2")
    public List<Evidence_Body> getBodysByCaseIdAndType(int caseId, int type);

    public void deleteById(int id);

    @Transactional
    @Modifying
    @Query(value = "delete from Evidence_Body  d where d.documentid = ?1")
    public void deleteAllByDocumentid(int document_id);

    @Transactional
    @Modifying
    @Query(value = "delete from Evidence_Document  d where d.caseID = ?1")
    public void deleteAllByCaseID(int caseID);

    @Transactional
    @Modifying
    @Query(value = "delete from Evidence_Body  d where d.caseID = ?1 and d.isDefendant = ?2")
    public void deleteBodysByCaseIdAndType(int caseId, int type);

    @Transactional
    @Modifying
    @Query("update Evidence_Body c set c.body = ?1 where c.id=?2")
    public void updateBodyById(String body, int id);

    @Transactional
    @Modifying
    @Query("update Evidence_Body c  set c.type = ?1 where c.id=?2")
    public void updateTypeById(int type, int id);

    @Transactional
    @Modifying
    @Query("update Evidence_Body c  set c.trust = ?1 where c.id=?2")
    public void updateTrustById(int trust, int id);

    @Query(value = "select u.logicNodeID from Evidence_Body u where u.id = ?1")
    public int findLogicId(int id);


    @Query(value = "select u.id from Evidence_Body u where u.documentid = ?1")
    public List<Integer> findAllByDocumentid(int id);

}

