package com.jakub.media.store.services;

import com.jakub.media.store.model.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    boolean removeUser(String username);
}
