package com.jakub.media.store.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.LocalDate;

@Data
@Entity
public class HistoricPrice extends BaseEntityWithId {

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Float price;

    @ManyToOne
    @JsonBackReference
    private Stock stock;
}
