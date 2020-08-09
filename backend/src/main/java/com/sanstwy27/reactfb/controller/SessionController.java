package com.sanstwy27.reactfb.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.sanstwy27.reactfb.Service.UserRelationshipService;
import com.sanstwy27.reactfb.Service.UserService;
import com.sanstwy27.reactfb.bean.User;
import com.sanstwy27.reactfb.bean.UserRelationship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class SessionController {

    @Autowired
    UserService userService;

    @Autowired
    UserRelationshipService userRelationshipService;

    @PostMapping("/session")
    public Map<String,Object> login(@RequestBody Map<String, JsonNode> payload) {
        // Initial
        User user = new User();
        user.setEmail(payload.get("user").get("email").toString().replace("\"", ""));
        user.setPasswordDigest(payload.get("user").get("password").toString().replace("\"", ""));

        // Result
        Map<String, Object> map = new HashMap<>();
        user = userService.getUser(user);

        if(user != null && user.getId() != null) {
            // String sessionToken = RequestContextHolder.currentRequestAttributes().getSessionId();
            // user.setSessionToken(sessionToken);
            userService.updateUser(user);
            user.setSessionToken("");
            map.put("user", user);

            Map<Integer, UserRelationship> obj = userRelationshipService.getUserRelationship(user.getId());
            if(!obj.isEmpty()) {
                map.put("userRelationships", obj);
            } else {
                map.put("userRelationships", null);
            }
        } else {
            map.put("user", null);
            map.put("userRelationships", null);
        }

        return map;
    }

    @DeleteMapping("/session")
    public String logout() {
        // TODO
        return "{\"msg\": \"Current user already logout\"}";
    }
}
