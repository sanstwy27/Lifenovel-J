package com.sanstwy27.reactfb.Service;

import com.sanstwy27.reactfb.bean.Comment;
import com.sanstwy27.reactfb.bean.User;
import com.sanstwy27.reactfb.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    UserDao userDao;

    public User getUser(User user) {
        return userDao.getUser(user);
    }

    public User getUserByToken(String token) {
        return userDao.getUserByToken(token);
    }

    public Map<Integer, User> getUsers(List<Integer> userIds) {
        List<User> users = userDao.getUsers(userIds);
        Map<Integer, User> result = new HashMap<>();
        for (User user : users) {
            result.put(user.getId(), user);
        }
        return result;
    }

    public Map<Integer, Object> searchUsers(String searchText) {
        List<User> searchUsers = userDao.searchUsers(searchText);
        Map<Integer, Object> result = new HashMap<>();
        for (User user : searchUsers) {
            result.put(user.getId(), user);
        }
        return result;
    }

    public int updateUser(User user) {
        return userDao.updateUser(user);
    }

    public int updateUserByToken(String token) {
        return userDao.updateUserByToken(token);
    }

    public int createUser(User user) {
        return userDao.createUser(user);
    }
}
