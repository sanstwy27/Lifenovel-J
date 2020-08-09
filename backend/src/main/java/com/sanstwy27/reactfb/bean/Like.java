package com.sanstwy27.reactfb.bean;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Like {

    private Integer id;
    private Integer userId;
    private String likeableType;
    private Integer likeableId;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updatedAt;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getLikeableType() {
        return likeableType;
    }

    public void setLikeableType(String likeableType) {
        this.likeableType = likeableType;
    }

    public Integer getLikeableId() {
        return likeableId;
    }

    public void setLikeableId(Integer likeableId) {
        this.likeableId = likeableId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Like{" +
                "id=" + id +
                ", userId=" + userId +
                ", likeableType='" + likeableType + '\'' +
                ", likeableId=" + likeableId +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
