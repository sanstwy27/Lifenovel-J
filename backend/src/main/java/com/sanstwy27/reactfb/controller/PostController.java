package com.sanstwy27.reactfb.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanstwy27.reactfb.Service.CommentService;
import com.sanstwy27.reactfb.Service.LikeService;
import com.sanstwy27.reactfb.Service.PostService;
import com.sanstwy27.reactfb.Service.UserService;
import com.sanstwy27.reactfb.bean.Comment;
import com.sanstwy27.reactfb.bean.Like;
import com.sanstwy27.reactfb.bean.Post;
import com.sanstwy27.reactfb.bean.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class PostController {

    @Autowired
    private ServletContext servletContext;

    @Autowired
    PostService postService;

    @Autowired
    CommentService commentService;

    @Autowired
    LikeService likeService;

    @Autowired
    UserService userService;

    ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/posts")
    public Map<String, Object> getPosts(@RequestParam("userIds") List<Integer> userIds, @RequestParam("offset") Integer offset, @RequestParam("limit") Integer limit) {

        Map<Integer, Post> posts = postService.getPosts(userIds, offset, limit);
        Map<String, Object> result = new HashMap<>();
        result.put("posts", posts);

        List<Integer> postIds = new ArrayList<>(posts.keySet());
        if(postIds.size() > 0) {
            Map<Integer, Comment> comments = commentService.getComments(postIds);
            Map<Integer, Like> likes = likeService.getLikes(postIds, "Post");
            result.put("comments", comments);
            result.put("likes", likes);
            return result;
        } else {
            result.put("comments", null);
            result.put("likes", null);
            return result;
        }

    }

    @PostMapping(value = "/posts", consumes="application/json")
    public Post createPost(@RequestBody Map<String, Post> payload) {
        Post obj = payload.get("post");
        obj.setCreatedAt(new java.util.Date());
        obj.setUpdatedAt(new java.util.Date());
        postService.createPost(obj);
        return obj;
    }

    @PostMapping(value = "/posts", consumes="multipart/form-data")
    public Map<Integer, Post> createPhotoPost(@RequestPart(value = "post[photos][]") MultipartFile[] files,
                           @RequestParam("post[authorId]") Integer authorId,
                           @RequestParam("post[body]") String body,
                           @RequestParam("post[pageId]") Integer pageId) {
        Post post = new Post();
        post.setAuthorId(authorId);
        post.setBody(body);
        post.setPageId(pageId);
        post.setCreatedAt(new java.util.Date());
        post.setUpdatedAt(new java.util.Date());

        List<String> photoUrls = new ArrayList<>();
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            if (!file.isEmpty()) {
                System.out.println("File Info:");
                System.out.println("getName " + file.getName());
                System.out.println("getOriginalFilename " + file.getOriginalFilename());

                // File target = new File(servletContext.getRealPath("/upload/profile/" + id) + file.getOriginalFilename());
                File target = new File(servletContext.getRealPath("/upload/post/" + authorId + "/") + file.getOriginalFilename());
                System.out.println("Location: " + target.getPath());
                target.getParentFile().mkdirs();

                try {
                    file.transferTo(target);
                    System.out.println("Upload Success");

                    URI getUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                            .path("/upload/post/" + authorId + "/" + file.getOriginalFilename()).build(true).toUri();
                    System.out.println("Uri: " + getUri.toString());
                    photoUrls.add(getUri.toString());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        System.out.println(photoUrls);
        String payload = null;
        try {
            payload = new ObjectMapper().writeValueAsString(photoUrls);
            System.out.println(payload);
            post.setPhotoUrlsJson(payload);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return postService.createPost(post);
    }

    @PutMapping("/posts")
    public Map<Integer, Post> updatePost(@RequestBody Map<String, Post> payload) {
        Post post = payload.get("post");
        post.setUpdatedAt(new java.util.Date());
        return postService.updatePost(post);
    }

    @DeleteMapping("/posts/{id}")
    public int deletePost(@PathVariable("id") Integer id) {
        return postService.deletePost(id);
    }
}
