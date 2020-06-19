package com.jakub.media.store.repositories;

import com.jakub.media.store.model.Investment;
import com.jakub.media.store.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {

    List<Investment> findAllByUser(User user);
}
