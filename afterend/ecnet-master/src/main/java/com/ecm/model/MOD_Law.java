package com.ecm.model;

import javax.persistence.*;

@Entity
@Table(name="MOD_LAW")
//@IdClass(MODPK.class)
public class MOD_Law {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
//    @Id
    private int caseID;
    private String name;
    private String content;
    private int x = -1;
    private int y = -1;

    private int logicNodeID = -1; // 关联LogicNode中的id

    private int factId = -1;

    @Override
    public String toString() {
        return "MOD_Law{" +
                "id=" + id +
                ", caseID=" + caseID +
                ", name='" + name + '\'' +
                ", content='" + content + '\'' +
                ", x=" + x +
                ", y=" + y +
                ", logicNodeID=" + logicNodeID +
                ", factId=" + factId +
                '}';
    }

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getLogicNodeID() {
        return logicNodeID;
    }

    public void setLogicNodeID(int logicNodeID) {
        this.logicNodeID = logicNodeID;
    }

    public int getFactId() {
        return factId;
    }

    public void setFactId(int factId) {
        this.factId = factId;
    }
}
