package com.ecm.model;

import javax.persistence.*;

@Entity
@Table(name = "evidence_evidence_link")
public class EvidenceEvidenceLink {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int caseID;
    private int evidenceId1;
    private int evidenceId2;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCaseID() {
        return caseID;
    }

    public void setCaseID(int caseID) {
        this.caseID = caseID;
    }

    public int getEvidenceId1() {
        return evidenceId1;
    }

    public void setEvidenceId1(int evidenceId1) {
        this.evidenceId1 = evidenceId1;
    }

    public int getEvidenceId2() {
        return evidenceId2;
    }

    public void setEvidenceId2(int evidenceId2) {
        this.evidenceId2 = evidenceId2;
    }

    @Override
    public String toString() {
        return "EvidenceEvidenceLink{" +
                "id=" + id +
                ", caseID=" + caseID +
                ", evidenceId1=" + evidenceId1 +
                ", evidenceId2=" + evidenceId2 +
                '}';
    }
}
