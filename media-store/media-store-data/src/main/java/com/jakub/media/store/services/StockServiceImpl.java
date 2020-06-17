package com.jakub.media.store.services;

import com.jakub.media.store.model.Stock;
import com.jakub.media.store.repositories.StockRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;

    public StockServiceImpl(final StockRepository stockRepository){
        this.stockRepository = stockRepository;
    }

    @Override
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @Override
    public Stock getStockByName(String stockName) {
        return stockRepository.findByName(stockName).orElse(null);
    }

    @Override
    public boolean areStocksUpdated() {
        Stock stock = stockRepository.findFirstByIdIsNotNull();
        if(stock != null){
            return stock.getLastUpdate().compareTo(LocalDate.now()) == 0;
        }
        return false;
    }

    @Override
    public List<Stock> getStocksByName(List<String> stockSymbolNames) {
        return stockRepository.findAllBySymbolIn(stockSymbolNames);
    }

    @Override
    public Stock updateStock(Stock stock) {

        Stock oldStock = stockRepository.findBySymbol(stock.getSymbol()).orElse(null);
        if(oldStock == null){
            stock.setLastUpdate(LocalDate.now());
            stock.getPrices().forEach(price -> price.setStock(stock));
            return stockRepository.saveAndFlush(stock);
        }
        oldStock.setName(stock.getName());
        oldStock.setSymbol(stock.getSymbol());
        oldStock.setLastUpdate(LocalDate.now());
        oldStock.setPrices(stock.getPrices());
        oldStock.getPrices().forEach(price -> price.setStock(oldStock));
        return stockRepository.saveAndFlush(oldStock);
    }
}
