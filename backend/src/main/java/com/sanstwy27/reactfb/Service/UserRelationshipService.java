package com.sanstwy27.reactfb.Service;

import com.sanstwy27.reactfb.bean.Like;
import com.sanstwy27.reactfb.bean.Post;
import com.sanstwy27.reactfb.bean.UserRelationship;
import com.sanstwy27.reactfb.dao.UserRelationshipDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserRelationshipService {

    @Autowired
    UserRelationshipDao userRelationshipDao;

    public Map<Integer, UserRelationship> getUserRelationship(Integer userId) {
        List<UserRelationship> relations = userRelationshipDao.getUserRelationship(userId);
        Map<Integer, UserRelationship> result = new HashMap<>();
        for (UserRelationship relation: relations ) {
            result.put(relation.getId(), relation);
        }
        return result;
    }

    public Map<Integer, UserRelationship> createUserRelationship(UserRelationship userRelationship) {
        userRelationshipDao.createUserRelationship(userRelationship);
        Map<Integer, UserRelationship> result = new HashMap<>();
        result.put(userRelationship.getId(), userRelationship);
        return result;
    }

    public Map<Integer, UserRelationship> updateUserRelationship(UserRelationship userRelationship) {
        userRelationshipDao.updateUserRelationship(userRelationship);
        Map<Integer, UserRelationship> result = new HashMap<>();
        result.put(userRelationship.getId(), userRelationship);
        return result;
    }

    public int deleteUserRelationship(Integer userRelationshipId) {
        return userRelationshipDao.deleteUserRelationship(userRelationshipId);
    }
}
