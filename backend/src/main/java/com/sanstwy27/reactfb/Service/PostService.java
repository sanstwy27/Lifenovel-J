package com.sanstwy27.reactfb.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sanstwy27.reactfb.bean.Post;
import com.sanstwy27.reactfb.dao.PostDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostService {

    @Autowired
    PostDao postDao;

    ObjectMapper objectMapper = new ObjectMapper();

    private boolean deserializeMap(Post post) {
        if (post.getPhotoUrlsJson() != null && post.getPhotoUrlsJson() != "") {
            List<String> jsonMap = new ArrayList<String>();
            try {
                jsonMap = objectMapper.readValue(post.getPhotoUrlsJson(), new TypeReference<List<String>>() {
                }); // converts JSON to Map
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return false;
            }
            post.setPhotoUrlsJson(null);
            post.setPhotoUrls(jsonMap);
        }
        return true;
    }

    public Map<Integer, Post> getPosts(List<Integer> userIds, Integer offset, Integer limit) {
        List<Post> posts = postDao.getPosts(userIds, offset, limit);
        Map<Integer, Post> result = new HashMap<Integer, Post>();
        for (Post post: posts ) {
            if (deserializeMap(post))
                result.put(post.getId(), post);
        }
        return result;
    }

    public Map<Integer, Post> createPost(Post post) {
        postDao.createPost(post);
        Map<Integer, Post> result = new HashMap<Integer, Post>();
        if (deserializeMap(post))
            result.put(post.getId(), post);
        return result;
    }

    public Map<Integer, Post> updatePost(Post post) {
        postDao.updatePost(post);
        Map<Integer, Post> result = new HashMap<Integer, Post>();
        result.put(post.getId(), post);
        return result;
    }

    public int deletePost(Integer id) {
        return postDao.deletePost(id);
    }
}
