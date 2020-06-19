package com.jakub.media.store.controllers;

import com.jakub.media.store.model.Investment;
import com.jakub.media.store.services.InvestmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/invest")
public class InvestController {

    private final InvestmentService investmentService;

    public InvestController(final InvestmentService investmentService){
        this.investmentService = investmentService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Investment> createInvestment(@RequestBody final Investment investment){

        final Investment newInvestment = investmentService.createInvestment(investment);

        return ResponseEntity.status(HttpStatus.CREATED).body(newInvestment);
    }

    @GetMapping(path = "/{username}")
    @PreAuthorize("hasRole('USER')")
    public List<Investment> getAllInvestmentsByUser(@PathVariable("username") final String username) {

        return investmentService.getAllInvestmentsByUser(username);
    }

    @DeleteMapping(path = "/{investmentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity removeInvestment(@PathVariable("investmentId") final Long investmentId){

        investmentService.removeInvestment(investmentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
