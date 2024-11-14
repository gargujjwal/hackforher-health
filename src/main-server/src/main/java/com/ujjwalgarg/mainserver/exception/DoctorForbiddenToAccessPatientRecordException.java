package com.ujjwalgarg.mainserver.exception;

public class DoctorForbiddenToAccessPatientRecordException extends RuntimeException {

  public DoctorForbiddenToAccessPatientRecordException(String message) {
    super(message);
  }
}
