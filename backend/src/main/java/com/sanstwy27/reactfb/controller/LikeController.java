package com.sanstwy27.reactfb.controller;

import com.sanstwy27.reactfb.Service.LikeService;
import com.sanstwy27.reactfb.bean.Comment;
import com.sanstwy27.reactfb.bean.Like;
import com.sanstwy27.reactfb.bean.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class LikeController {

    @Autowired
    LikeService likeService;

    @GetMapping("/likes")
    public Map<Integer, Like> getLikes(@RequestParam(value = "likeableId", required = false) List<Integer> likeableIds, @RequestParam("likeableType") String likeableType) {
        if (likeableIds != null) {
            return likeService.getLikes(likeableIds, likeableType);
        }
        return null;
    }

    @GetMapping("/likes/{id}")
    public Like getLike(@PathVariable("id") Integer userId, @RequestParam("likeableId") Integer likeableId, @RequestParam("likeableType") String likeableType) {
        return likeService.getLike(userId, likeableId, likeableType);
    }

    @PostMapping("/likes")
    public Map<Integer, Like> createLike(@RequestBody Map<String, Like> payload) {
        Like like = payload.get("like");
        System.out.println(like);
        like.setCreatedAt(new java.util.Date());
        like.setUpdatedAt(new java.util.Date());
        return likeService.createLike(like);
    }

    @DeleteMapping("/likes/{id}")
    public int deleteLike(@PathVariable("id") Integer likeId) {
        return likeService.deleteLike(likeId);
    }
}
