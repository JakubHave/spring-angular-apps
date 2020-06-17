package com.jakub.media.store.bootstrap;

import com.jakub.media.store.model.Role;
import com.jakub.media.store.model.RoleEnum;
import com.jakub.media.store.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * This is for initial data loading.
 */

@Component
public class DataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataLoader(final RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // NOTE: create roles if they do not exist
        Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER).orElse(null);
        if(userRole == null) {
            userRole = new Role();
            userRole.setName(RoleEnum.ROLE_USER);
            roleRepository.saveAndFlush(userRole);
        }

        Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN).orElse(null);
        if(adminRole == null) {
            adminRole = new Role();
            adminRole.setName(RoleEnum.ROLE_ADMIN);
            roleRepository.saveAndFlush(adminRole);
        }
    }
}
