package com.jakub.media.store.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Entity
public class HistoricPrice extends BaseEntityWithId {

    @NotNull
    private LocalDate date;

    @NotNull
    private Float price;

    @ManyToOne
    @JsonBackReference
    private Stock stock;
}
