package com.ujjwalgarg.mainserver.repository;

import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
