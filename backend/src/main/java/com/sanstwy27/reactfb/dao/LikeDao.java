package com.sanstwy27.reactfb.dao;

import com.sanstwy27.reactfb.bean.Like;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeDao {

    List<Like> getLikes(List<Integer> likeableIds, String likeableType);
    Like getLike(Integer userId, Integer likeableId, String likeableType);
    int createLike(Like like);
    int deleteLike(Integer likeId);
}
