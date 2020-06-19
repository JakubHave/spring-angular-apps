package com.jakub.media.store.services;

import com.jakub.media.store.model.User;
import com.jakub.media.store.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(final UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public boolean removeUser(String username) {
        User user = userRepository.findByName(username).orElse(null);
        if(user != null) {
            userRepository.delete(user);
            return true;
        }
        return false;
    }

    @Override
    public User getUserByName(String username) {
        User user = userRepository.findByName(username).orElse(null);
        if(user == null) {
            throw new RuntimeException("User with username: " + username + " does not exist");
        }

        return user;
    }

    @Override
    public User updateBalanceForUser(User user) {
        User userDB = userRepository.findByName(user.getName()).orElse(null);
        if(userDB == null) {
            throw new RuntimeException("User with username: " + user.getName() + " does not exist");
        }
        userDB.setBalance(user.getBalance());
        return userRepository.saveAndFlush(userDB);
    }
}
