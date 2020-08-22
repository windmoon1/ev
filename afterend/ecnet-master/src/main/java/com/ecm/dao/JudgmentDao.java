package com.ecm.dao;

import com.ecm.model.Judgment;
import com.ecm.model.JudgmentPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JudgmentDao extends JpaRepository<Judgment, JudgmentPK> {

    @Query(value = "select j from Judgment j where j.realName = ?1 and (j.isUndertaker= 'Y' OR j.isJudge='0')")
    public List<Judgment> getAllByName(String name);

    @Query(value = "select j.realName from Judgment j where j.cid = ?1")
    public List<String> getNameByCid(String cid);

    public void deleteByCid(String cid);

    public Judgment save(Judgment judgment);
}
