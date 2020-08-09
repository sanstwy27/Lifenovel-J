package com.sanstwy27.reactfb.Service;

import com.sanstwy27.reactfb.bean.Comment;
import com.sanstwy27.reactfb.dao.CommentDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentService {

    @Autowired
    private CommentDao commentDao;

    public Map<Integer, Comment> getComments(List<Integer> postIds) {
        if (postIds != null && postIds.size() > 0) {
            List<Comment> comments = commentDao.getComments(postIds);
            Map<Integer, Comment> result = new HashMap<>();
            for (Comment comment : comments) {
                result.put(comment.getId(), comment);
            }
            return result;
        }
        return null;
    }

    public Map<Integer, Comment> getCommentById(Integer id) {
        Comment comment = commentDao.getCommentById(id);
        if(comment.getChildCommentIds() == null) comment.setChildCommentIds(new ArrayList<>());
        Map<Integer, Comment> result = new HashMap<>();
        result.put(comment.getId(), comment);
        return result;
    }

    public Map<Integer, Comment> createComment(Comment comment) {
        commentDao.createComment(comment);
        if(comment.getChildCommentIds() == null) comment.setChildCommentIds(new ArrayList<>());
        Map<Integer, Comment> result = new HashMap<>();
        result.put(comment.getId(), comment);
        return result;
    }

    public Map<Integer, Comment> updateCommentById(Comment comment) {
        commentDao.updateCommentById(comment);
        Map<Integer, Comment> result = new HashMap<>();
        result.put(comment.getId(), comment);
        return result;
    }

    public int deleteComment(Integer id) {
        return commentDao.deleteComment(id);
    }
}
