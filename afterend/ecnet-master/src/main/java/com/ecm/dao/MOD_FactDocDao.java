package com.ecm.dao;

import com.ecm.model.MOD_Fact_Doc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface MOD_FactDocDao extends JpaRepository<MOD_Fact_Doc, Integer> {

    public MOD_Fact_Doc save(MOD_Fact_Doc factDoc);


    public MOD_Fact_Doc findById(int id);

    @Query(value = "select f from MOD_Fact_Doc f where f.caseID=?1")
    public MOD_Fact_Doc findByCaseID(int cid);

    @Transactional
    @Modifying
    @Query(value = "update MOD_Fact f set f.content=?2 where f.id=?1")
    public void updateFactById(int factId, String content);
}
