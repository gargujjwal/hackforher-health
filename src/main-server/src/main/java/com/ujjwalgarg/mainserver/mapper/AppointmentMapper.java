package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.AppointmentDto;
import com.ujjwalgarg.mainserver.entity.medicalcase.appointment.Appointment;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface AppointmentMapper {

  Appointment toEntity(AppointmentDto appointmentDto);

  AppointmentDto toDto(Appointment appointment);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  Appointment partialUpdate(
      AppointmentDto appointmentDto, @MappingTarget Appointment appointment);
}
