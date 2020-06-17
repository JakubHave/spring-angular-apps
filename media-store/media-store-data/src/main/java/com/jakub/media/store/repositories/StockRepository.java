package com.jakub.media.store.repositories;

import com.jakub.media.store.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {

    Optional<Stock> findByName(String name);

    // NOTE: this one is used for query
    Optional<Stock> findBySymbol(String symbol);

    Stock findFirstByIdIsNotNull();

    List<Stock> findAllBySymbolIn(List<String> names);
}
