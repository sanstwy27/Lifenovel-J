package com.sanstwy27.reactfb.dao;

import com.sanstwy27.reactfb.bean.Post;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostDao {

    List<Post> getPosts(List<Integer> userIds, Integer offset, Integer limit);
    int createPost(Post post);
    int updatePost(Post post);
    int deletePost(Integer id);
}
