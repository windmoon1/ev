package com.ecm.dao;

import com.ecm.model.MOD_Fact_Doc;
import com.ecm.model.MOD_Law;
import com.ecm.model.MOD_Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface MOD_ResultDao extends JpaRepository<MOD_Result, Integer> {

    public MOD_Result save(MOD_Result result);


    public MOD_Result findById(int id);

    @Query(value = "select f from MOD_Result f where f.caseID=?1")
    public MOD_Result findByCaseID(int cid);

    @Transactional
    @Modifying
    @Query(value = "update MOD_Result f set f.content=?2 where f.id=?1")
    public void updateResultById(int resultId, String content);

    @Transactional
    @Modifying
    @Query(value = "delete from MOD_Result f where f.id = ?1")
    public void deleteById(int id);

    @Query(value = "select f from MOD_Result f where f.caseID=?1")
    public List<MOD_Result> getResultsByCaseId(int caseId);
}
