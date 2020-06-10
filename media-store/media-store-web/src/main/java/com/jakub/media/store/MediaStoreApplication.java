package com.jakub.media.store;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages={"com.jakub.media.store"})
@SpringBootApplication
public class MediaStoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(MediaStoreApplication.class, args);
    }

}
