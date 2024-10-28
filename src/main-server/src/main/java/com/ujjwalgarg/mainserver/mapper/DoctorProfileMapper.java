package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.DoctorProfileDto;
import com.ujjwalgarg.mainserver.entity.profile.DoctorProfile;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface DoctorProfileMapper {

  default DoctorProfileDto toDto(DoctorProfile doctorProfile, Doctor doctor) {
    if (doctorProfile == null || doctor == null) {
      return null;
    }
    // Map DoctorProfile fields
    return new DoctorProfileDto(
        doctorProfile.getMedicalCertificatePath(),
        doctorProfile.getMedicalLicenseNumber(),
        doctorProfile.getAddress(),
        doctorProfile.getPhoneNumber(),
        doctorProfile.getSecondaryEmail(),
        doctorProfile.getQualifications(),
        doctorProfile.getPublications(),
        // Map Doctor fields
        doctor.getAvgRating(),
        doctor.getNoAppointmentsFailed(),
        doctor.getConsultationTimings()
    );
  }

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
  DoctorProfile partialUpdate(
      DoctorProfileDto doctorProfileDto, @MappingTarget DoctorProfile doctorProfile);
}
