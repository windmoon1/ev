package com.ecm.dao;

import com.ecm.model.MOD_Fact;
import com.ecm.model.MOD_Law;
import com.ecm.model.MOD_Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface MOD_LawDao extends JpaRepository<MOD_Law, Integer> {

    public MOD_Law save(MOD_Law law);


    public MOD_Law findById(int id);

    @Query(value = "select f from MOD_Law f where f.caseID=?1")
    public MOD_Law findByCaseID(int cid);

    @Transactional
    @Modifying
    @Query(value = "update MOD_Law f set f.content=?2 where f.id=?1")
    public void updateLawById(int lawId, String content);

    @Transactional
    @Modifying
    @Query(value = "delete from MOD_Law f where f.id = ?1")
    public void deleteById(int id);

    @Query(value = "select f from MOD_Law f where f.caseID=?1")
    public List<MOD_Law> getLawsByCaseId(int caseId);
}
