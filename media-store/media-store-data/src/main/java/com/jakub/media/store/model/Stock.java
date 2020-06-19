package com.jakub.media.store.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class Stock extends BaseEntityWithId {

    @NotBlank
    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate lastUpdate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "stock")
    @JsonManagedReference
    private List<HistoricPrice> prices;
}
