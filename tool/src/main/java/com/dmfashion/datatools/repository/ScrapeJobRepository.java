package com.dmfashion.datatools.repository;

import com.dmfashion.datatools.model.ScrapeJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScrapeJobRepository extends JpaRepository<ScrapeJob, String> {
    Optional<ScrapeJob> findTopByOrderByStartedAtDesc();
}
