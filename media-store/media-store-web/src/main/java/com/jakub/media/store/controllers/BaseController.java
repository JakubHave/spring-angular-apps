package com.jakub.media.store.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BaseController {

    @RequestMapping({"", "/"})
    public String welcome(){

        return "Welcome to Media Store";
    }

}
