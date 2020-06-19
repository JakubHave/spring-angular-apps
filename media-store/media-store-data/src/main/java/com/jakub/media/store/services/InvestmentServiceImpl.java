package com.jakub.media.store.services;

import com.jakub.media.store.model.Investment;
import com.jakub.media.store.model.User;
import com.jakub.media.store.repositories.InvestmentRepository;
import com.jakub.media.store.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestmentServiceImpl implements InvestmentService {

    private final UserRepository userRepository;
    private final InvestmentRepository investmentRepository;

    public InvestmentServiceImpl(final UserRepository userRepository,
                                 final InvestmentRepository investmentRepository){
        this.userRepository = userRepository;
        this.investmentRepository = investmentRepository;
    }

    @Override
    public Investment createInvestment(Investment investment) {

        User user = investment.getUser();
        User userDB = userRepository.findByName(user.getName()).orElse(null);
        if(userDB==null) {
            throw new RuntimeException("User with username: " + user.getName() + " does not exist.");
        }
        investment.setUser(userDB);
        Investment newInvestment =  investmentRepository.saveAndFlush(investment);

        List<Investment> userInvestments = userDB.getInvestments();
        userInvestments.add(newInvestment);
        userDB.setInvestments(userInvestments);
        userDB.setBalance(userDB.getBalance() - investment.getMoneyNum());
        userRepository.saveAndFlush(userDB);

        return newInvestment;
    }

    @Override
    public List<Investment> getAllInvestmentsByUser(String username) {

        User userDB = userRepository.findByName(username).orElse(null);
        if(userDB==null) {
            throw new RuntimeException("User with username: " + username + " does not exist.");
        }
        return investmentRepository.findAllByUser(userDB);
    }

    @Override
    public boolean removeInvestment(Long investmentId) {

        Investment investment = investmentRepository.findById(investmentId).orElse(null);
        if(investment==null) {
            throw new RuntimeException("Investment with ID: " + investmentId + " does not exist.");
        }
        investmentRepository.deleteById(investmentId);
        return true;
    }
}
