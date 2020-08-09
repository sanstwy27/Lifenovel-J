package com.sanstwy27.reactfb.dao;

import com.sanstwy27.reactfb.bean.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//@Mapper
public interface CommentDao {

    List<Comment> getComments(List<Integer> postIds);
    Comment getCommentById(Integer id);
    int createComment(Comment comment);
    int updateCommentById(Comment comment);
    int deleteComment(Integer id);
}
