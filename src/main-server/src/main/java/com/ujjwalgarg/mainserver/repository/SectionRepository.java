package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.Section;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, Long> {

}
