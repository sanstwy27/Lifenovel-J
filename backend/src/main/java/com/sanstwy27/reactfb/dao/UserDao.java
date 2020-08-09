package com.sanstwy27.reactfb.dao;

import com.sanstwy27.reactfb.bean.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {

    User getUser(User user);
    User getUserByToken(String token);
    List<User> getUsers(List<Integer> userIds);
    List<User> searchUsers(String searchText);
    int updateUser(User user);
    int updateUserByToken(String token);
    int createUser(User user);
}
