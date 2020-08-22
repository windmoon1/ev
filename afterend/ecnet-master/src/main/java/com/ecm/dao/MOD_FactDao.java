package com.ecm.dao;

import com.ecm.model.MODPK;
import com.ecm.model.MOD_Fact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MOD_FactDao extends JpaRepository<MOD_Fact, Integer> {

    @Query(value = "select f from MOD_Fact f where f.caseID=?1")
    public List<MOD_Fact> getFactsByCaseId(int caseId);

    @Query(value = "select f.caseID from MOD_Fact f where f.caseID=?1 and f.confirm = 0")
    public List<MOD_Fact> getToConfirmByCaseId(int caseId);

    public MOD_Fact save(MOD_Fact fact);

    @Transactional
    @Modifying
    @Query(value = "delete from MOD_Fact f where f.id = ?1")
    public void deleteById(int id);

    @Query(value = "select f.logicNodeID from MOD_Fact f where f.id= ?1 and f.caseID=?2")
    public int getLogicNodeIDByIDAndCaseID(int id,int cid);

//    public void deleteById(int id);

    public void deleteByIdAndCaseID(int id,int cid);

    @Transactional
    @Modifying
    @Query(value = "delete from MOD_Fact f where f.caseID = ?1")
    public void deleteAllByCaseID(int cid);



    public List<MOD_Fact> findAllByCaseID(int caseID);

    public MOD_Fact findById(int id);

    @Query(value = "select f.logicNodeID from MOD_Fact f where f.id=?1")
    public int getLogicNodeIDByID(int id);

    @Transactional
    @Modifying
    @Query(value = "update MOD_Fact f set f.confirm=?2 where f.id=?1")
    public void updateConfirmById(int fid,int confirm);

    @Transactional
    @Modifying
    @Query(value = "update MOD_Fact f set f.content=?2 where f.id=?1")
    public void updateContentById(int fid,String content);
}
