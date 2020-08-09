package com.sanstwy27.reactfb.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanstwy27.reactfb.Service.UserRelationshipService;
import com.sanstwy27.reactfb.Service.UserService;
import com.sanstwy27.reactfb.bean.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class UserController {

    @Autowired
    private ServletContext servletContext;

    @Autowired
    UserService userService;

    @Autowired
    UserRelationshipService userRelationshipService;

    ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/users")
    public Map<String, Object> getUsers(@RequestParam(value = "userIds", required = false) List<Integer> userIds) {
        if(userIds != null) {
            Map<String, Object> map = new HashMap<>();
            map.put("users", userService.getUsers(userIds));
            return map;
        }
        return null;
    }

    @PostMapping("/users/search")
    public Map<Integer, Object> searchUsers(@RequestBody Map<String, Object> payload) {
        Map<Integer, Object> searchRet = userService.searchUsers((String) payload.get("search_text"));
        return searchRet;
    }

    @PatchMapping("/users/{id}")
    public Map<String, Object> updateUser(@PathVariable("id") Integer id, @RequestParam("user[profilePhoto]") MultipartFile file, @RequestParam("currentUser") String currentUser) {
        if(!file.isEmpty()) {
            System.out.println("File Info:");
            System.out.println("getName " + file.getName());
            System.out.println("getOriginalFilename " + file.getOriginalFilename());

            // File target = new File(servletContext.getRealPath("/upload/profile/" + id) + file.getOriginalFilename());
            File target = new File(servletContext.getRealPath("upload/profile/" + id + "/") + file.getOriginalFilename());
            System.out.println("Location: " + target.getPath());
            URI getUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("upload/profile/" + id + "/" + file.getOriginalFilename()).build(true).toUri();
            System.out.println("Uri: " + getUri.toString());
            target.getParentFile().mkdirs();

            Map<String, Object> result = new HashMap<>();
            try {
                file.transferTo(target);
                System.out.println("Upload Success");
                User user = mapper.readValue(currentUser, User.class);
                System.out.println(user);
                user.setProfilePhoto(getUri.toString());
                userService.updateUser(user);
                result.put("user", user);
                result.put("userRelationships", userRelationshipService.getUserRelationship(user.getId()));
            } catch (IOException e) {
                System.out.println("Upload Failed");
                result.put("user", null);
                result.put("userRelationships", null);
            }
            return result;
        }
        return null;
    }

    @PostMapping("/users")
    public User createUser(@RequestBody Map<String, User> payload) {
        User user = payload.get("user");

        if(user.getEmail() == null || user.getPassword() == null || user.getFirstName() == null || user.getLastName() == null ||
            user.getEmail().equals("") || user.getPassword().equals("") || user.getFirstName().equals("") || user.getLastName().equals("")) {
            return null;
        } else {
            // Set Password
            user.setPasswordDigest(user.getPassword());
            // Set Avatar
            user.setProfilePhoto("/images/profile_photos/default.jpg");
            // Create
            userService.createUser(user);
            user.setPassword("");
            user.setPasswordDigest("");
            return user;
        }
    }
}
