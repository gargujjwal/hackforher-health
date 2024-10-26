package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.PatientProfileDto;
import com.ujjwalgarg.mainserver.entity.profile.PatientProfile;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface PatientProfileMapper {

  PatientProfileDto toDto(PatientProfile patientProfile);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
  PatientProfile partialUpdate(
      PatientProfileDto patientProfileDto, @MappingTarget PatientProfile patientProfile);
}
