package com.jakub.media.store.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@MappedSuperclass
@Data
public class BaseEntityWithId implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
