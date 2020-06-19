package com.jakub.media.store.services;

import com.jakub.media.store.model.Investment;

import java.util.List;

public interface InvestmentService {

    Investment createInvestment(Investment investment);

    List<Investment> getAllInvestmentsByUser(String username);

    boolean removeInvestment(Long investmentId);
}
