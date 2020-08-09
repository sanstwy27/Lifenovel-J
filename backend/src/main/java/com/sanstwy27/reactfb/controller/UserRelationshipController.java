package com.sanstwy27.reactfb.controller;

import com.sanstwy27.reactfb.Service.UserRelationshipService;
import com.sanstwy27.reactfb.bean.Post;
import com.sanstwy27.reactfb.bean.UserRelationship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class UserRelationshipController {

    @Autowired
    UserRelationshipService userRelationshipService;

    @GetMapping("/user_relationships")
    public Map<Integer, UserRelationship> getUserRelationship(@RequestParam("userId") Integer userId) {
        return userRelationshipService.getUserRelationship(userId);
    }

    @PostMapping("/user_relationships")
    public Map<Integer, UserRelationship> createUserRelationship(@RequestBody Map<String, UserRelationship> payload) {
        UserRelationship userRelationship = payload.get("user_relationship");
        userRelationship.setCreatedAt(new java.util.Date());
        userRelationship.setUpdatedAt(new java.util.Date());
        return userRelationshipService.createUserRelationship(userRelationship);
    }

    @PutMapping("/user_relationships")
    public Map<Integer, UserRelationship> updateUserRelationship(@RequestBody Map<String, UserRelationship> payload) {
        UserRelationship userRelationship = payload.get("user_relationship");
        userRelationship.setUpdatedAt(new java.util.Date());
        return userRelationshipService.updateUserRelationship(userRelationship);
    }

    @DeleteMapping("/user_relationships/{id}")
    public int deleteUserRelationship(@PathVariable("id") Integer userRelationshipId) {
        return userRelationshipService.deleteUserRelationship(userRelationshipId);
    }
}
