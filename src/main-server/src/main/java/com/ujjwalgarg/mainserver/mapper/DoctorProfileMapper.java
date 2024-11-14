package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.DoctorProfileDto;
import com.ujjwalgarg.mainserver.entity.profile.DoctorProfile;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface DoctorProfileMapper {

  DoctorProfileDto toDto(DoctorProfile doctorProfile);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
  DoctorProfile partialUpdate(
      DoctorProfileDto doctorProfileDto, @MappingTarget DoctorProfile doctorProfile);
}
