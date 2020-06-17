package com.jakub.media.store.controllers;

import com.jakub.media.store.model.User;
import com.jakub.media.store.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService){
        this.userService = userService;
    }

    @GetMapping(path = "/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping(path = "/{username}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    ResponseEntity removeUser(@PathVariable("username") final String username) {

        boolean removed = userService.removeUser(username);

        // response for DELETE -> '204' if success or '404' else
        return removed ? new ResponseEntity(HttpStatus.NO_CONTENT) : new ResponseEntity(HttpStatus.NOT_FOUND) ;
    }
}
