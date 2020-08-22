package com.ecm.dao;

import com.ecm.model.EvidenceFactLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by deng on 2018/4/3.
 */
public interface EvidenceFactLinkDao extends JpaRepository<EvidenceFactLink, Integer> {
    EvidenceFactLink save(EvidenceFactLink evidenceFactLink);

    @Query(value = "select d from EvidenceFactLink  d where d.caseID = ?1 and d.initEviID = ?2 and d.factID = ?3")
    EvidenceFactLink findByCaseIDAndInitEviIDAndFactID(int caseID, int initEviID, int factID);

    @Query(value = "select d from EvidenceFactLink  d where d.caseID = ?1")
    List<EvidenceFactLink> findByCaseID(int caseID);

    @Transactional
    @Modifying
    @Query(value = "delete from EvidenceFactLink  d where d.caseID = ?1")
    void deleteByCaseID(int caseID);
}
