package com.sanstwy27.reactfb.dao;

import com.sanstwy27.reactfb.bean.UserRelationship;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRelationshipDao {

    List<UserRelationship> getUserRelationship(Integer userId);
    int createUserRelationship(UserRelationship userRelationship);
    int updateUserRelationship(UserRelationship userRelationship);
    int deleteUserRelationship(Integer userRelationshipId);
}
