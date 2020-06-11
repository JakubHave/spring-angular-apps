package com.jakub.media.store.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "roles")
public class Role extends BaseEntityWithId {

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleEnum name;

}
