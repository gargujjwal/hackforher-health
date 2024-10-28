package com.ujjwalgarg.mainserver.dto;

import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentStatus;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.AppointmentType;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.ModelPrediction;
import com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.ReviewStatus;
import com.ujjwalgarg.mainserver.entity.profile.ConsultationTiming;
import com.ujjwalgarg.mainserver.entity.user.Role;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.MedicalCase}
 */
public record MedicalCaseResponseDto(Long id, String caseDescription, Boolean isResolved,
                                     PatientDto patient,
                                     List<DoctorAssignmentDto> doctorAssignments,
                                     LocalDateTime createdAt) implements
    Serializable {

  /**
   * DTO for {@link com.ujjwalgarg.mainserver.entity.user.Patient}
   */
  public record PatientDto(Long id, String email, String firstName, String lastName,
                           LocalDateTime dob, LocalDateTime createdAt, Role role) implements
      Serializable {

  }

  /**
   * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.DoctorAssignment}
   */
  public record DoctorAssignmentDto(Long id, LocalDateTime assignedAt, LocalDateTime unassignedAt,
                                    DoctorDto doctor, List<AppointmentDto> appointments,
                                    List<QuestionnaireSubmissionDto> questionnaireSubmissions) implements
      Serializable {

    /**
     * DTO for {@link com.ujjwalgarg.mainserver.entity.user.Doctor}
     */
    public record DoctorDto(Long id, String email, String firstName, String lastName,
                            LocalDateTime dob, LocalDateTime createdAt, Role role,
                            Double avgRating,
                            Set<ConsultationTiming> consultationTimings) implements
        Serializable {

    }

    /**
     * DTO for {@link com.ujjwalgarg.mainserver.entity.medicalcase.appointment.Appointment}
     */
    public record AppointmentDto(Long id, LocalDateTime startTime, LocalDateTime endTime,
                                 AppointmentType appointmentType,
                                 AppointmentStatus appointmentStatus, String meetLink
    ) implements
        Serializable {

    }

    /**
     * DTO for
     * {@link com.ujjwalgarg.mainserver.entity.medicalcase.questionnaire.QuestionnaireSubmission}
     */
    public record QuestionnaireSubmissionDto(Long id, LocalDateTime submittedAt,
                                             Map<Long, String> questionResponses,
                                             ModelPrediction modelPrediction,
                                             ReviewStatus reviewStatus,
                                             String doctorNotes) implements
        Serializable {

    }
  }
}
