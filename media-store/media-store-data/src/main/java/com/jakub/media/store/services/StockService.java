package com.jakub.media.store.services;

import com.jakub.media.store.model.Stock;

import java.util.List;

public interface StockService {

    List<Stock> getAllStocks();

    Stock getStockByName(String stockName);

    boolean areStocksUpdated();

    List<Stock> getStocksByName(List<String> stockSymbolNames);

    Stock updateStock(Stock stock);
}
