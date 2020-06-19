package com.jakub.media.store.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Data
@Entity
public class Investment extends BaseEntityWithId {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String stockSymbol;

    @Column(nullable = false)
    private Double sharesNum;

    @Column(nullable = false)
    private Double moneyNum;

    @ManyToOne
    @JsonBackReference
    private User user;
}
