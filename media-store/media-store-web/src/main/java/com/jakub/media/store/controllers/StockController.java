package com.jakub.media.store.controllers;

import com.jakub.media.store.model.Stock;
import com.jakub.media.store.services.StockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/stock")
public class StockController {

    private final StockService stockService;

    public StockController(final StockService stockService){
        this.stockService = stockService;
    }

    @GetMapping(path = "/all")
    public List<Stock> getAllStocks() {

        return stockService.getAllStocks();
    }

    @GetMapping(path = "/by-name")
    public List<Stock> getStocksByName(
            @RequestParam(name = "stockSymbolNames") final List<String> stockSymbolNames ) {

        return stockService.getStocksByName(stockSymbolNames);
    }

    @GetMapping(path = "/updated")
    public ResponseEntity<Boolean> areStocksUpdated() {

        boolean updated = stockService.areStocksUpdated();

        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }

    @PutMapping
    public Stock updateStock(@RequestBody final Stock stock){

        return stockService.updateStock(stock);
    }
}
