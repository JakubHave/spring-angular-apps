package com.jakub.media.store.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;

@Data
@Entity
public class User extends BaseEntity{

    @Column
    private String name;
}
