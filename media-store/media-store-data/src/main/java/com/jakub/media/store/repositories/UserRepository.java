package com.jakub.media.store.repositories;

import com.jakub.media.store.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
