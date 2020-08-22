package com.ecm.dao;

import com.ecm.model.MODPK;
import com.ecm.model.MOD_Joint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MOD_JointDao extends JpaRepository<MOD_Joint, Integer> {

    public MOD_Joint save(MOD_Joint joint);

    public void deleteById(int id);

    public void deleteByIdAndCaseID(int id,int cid);

    public void deleteAllByCaseID(int cid);



//    public void deleteById(int id);

    public void deleteAllByFactIDAndCaseID(int factID,int cid);

    @Transactional
    @Modifying
    @Query(value = "delete from MOD_Joint f where f.factID = ?1")
    public void deleteJointByFactID(int factId);

    public List<MOD_Joint> findAllByFactIDAndCaseID(int factID,int cid);

    @Query(value = "select j from MOD_Joint j where j.factID = ?1")
    public List<MOD_Joint> findAllByFactID(int fid);

    @Query(value = "select j from MOD_Joint j where j.caseID = ?1")
    public List<MOD_Joint> findAllByCaseID(int caseId);

    public MOD_Joint findByIdAndCaseID(int id,int cid);

    @Query(value = "select j from MOD_Joint j where j.id = ?1")
    public MOD_Joint findById(int id);

    @Transactional
    @Modifying
    @Query(value = "update MOD_Joint j set j.factID=-1 where j.factID=?1")
    public void updateFactID(int fid);

    @Transactional
    @Modifying
    @Query(value = "update MOD_Joint j set j.content=?2 where j.id=?1")
    public void updateContentById(int id,String content);
}
