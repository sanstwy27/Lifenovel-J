package com.sanstwy27.reactfb.controller;

import com.sanstwy27.reactfb.Service.CommentService;
import com.sanstwy27.reactfb.bean.Comment;

import com.sanstwy27.reactfb.bean.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("/comments")
    public Map<Integer, Comment> getComments(@RequestParam("postIds") List<Integer> postIds) {
        return commentService.getComments(postIds);
    }

    @GetMapping("/comments/{id}")
    public Map<Integer, Comment> getComment(@PathVariable("id") Integer id) {
        return commentService.getCommentById(id);
    }

    @PostMapping("/comments")
    public Map<Integer, Comment> createComment(@RequestBody Map<String, Comment> payload) {
        Comment comment = payload.get("comment");
        comment.setCreatedAt(new java.util.Date());
        comment.setUpdatedAt(new java.util.Date());
        return commentService.createComment(comment);
    }

    @PutMapping("/comments")
    public Map<Integer, Comment> updateCommentById(@RequestBody Map<String, Comment> payload) {
        Comment comment = payload.get("comment");
        System.out.println(comment);
        if(comment.getId() == null)
            return null;
        return commentService.updateCommentById(comment);
    }

    @DeleteMapping("/comments/{id}")
    public int deleteComment(@PathVariable("id") Integer id) {
        return commentService.deleteComment(id);
    }
}
