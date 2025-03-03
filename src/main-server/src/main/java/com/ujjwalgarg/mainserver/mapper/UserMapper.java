package com.ujjwalgarg.mainserver.mapper;

import com.ujjwalgarg.mainserver.dto.DoctorDto;
import com.ujjwalgarg.mainserver.dto.LoginResponse;
import com.ujjwalgarg.mainserver.dto.PatientDto;
import com.ujjwalgarg.mainserver.entity.user.Doctor;
import com.ujjwalgarg.mainserver.entity.user.Patient;
import com.ujjwalgarg.mainserver.entity.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants.ComponentModel;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = ComponentModel.SPRING)
public interface UserMapper {

  @Mapping(target = "accessToken", source = "accessToken")
  @Mapping(target = "refreshToken", source = "refreshToken")
  LoginResponse toDto(User user, String accessToken, String refreshToken);

  PatientDto toDto(Patient patient);

  DoctorDto toDto(Doctor doctor);
}
