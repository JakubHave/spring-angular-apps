package com.jakub.media.store.repositories;

import com.jakub.media.store.model.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseEntityRepository extends JpaRepository<BaseEntity, Long> {

}
