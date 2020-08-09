package com.sanstwy27.reactfb.Service;

import com.sanstwy27.reactfb.bean.Comment;
import com.sanstwy27.reactfb.bean.Like;
import com.sanstwy27.reactfb.dao.LikeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LikeService {

    @Autowired
    LikeDao likeDao;

    public Map<Integer, Like> getLikes(List<Integer> likeableIds, String likeableType) {
        List<Like> likes = likeDao.getLikes(likeableIds, likeableType);
        Map<Integer, Like> result = new HashMap<>();
        for (Like like : likes) {
            result.put(like.getId(), like);
        }
        return result;
    }

    public Like getLike(Integer userId, Integer likeableId, String likeableType) {
        return likeDao.getLike(userId, likeableId, likeableType);
    }

    public Map<Integer, Like> createLike(Like like) {
        likeDao.createLike(like);
        Map<Integer, Like> result = new HashMap<>();
        result.put(like.getId(), like);
        return result;
    }

    public int deleteLike(Integer likeId) {
        return likeDao.deleteLike(likeId);
    }
}
