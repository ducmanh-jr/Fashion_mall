package com.dmfashion.datatools.repository;

import com.dmfashion.datatools.model.QuarantineRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuarantineRecordRepository extends JpaRepository<QuarantineRecord, Long> {
    List<QuarantineRecord> findByJobIdOrderByCreatedAtDesc(String jobId);
    List<QuarantineRecord> findAllByOrderByCreatedAtDesc();
}
