package com.ujjwalgarg.mainserver.annotation;

import com.ujjwalgarg.mainserver.validator.AppointmentValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Custom annotation for validating appointment details. This annotation uses the
 * {@link AppointmentValidator} to perform the validation.
 */
@Constraint(validatedBy = AppointmentValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidAppointment {

  /**
   * The default error message that will be used if the appointment details are invalid.
   *
   * @return the error message
   */
  String message() default "Invalid appointment details";

  /**
   * Allows the specification of validation groups, to which this constraint belongs.
   *
   * @return the array of validation groups
   */
  Class<?>[] groups() default {};

  /**
   * Can be used by clients of the Jakarta Bean Validation API to assign custom payload objects to a
   * constraint.
   *
   * @return the array of payload classes
   */
  Class<? extends Payload>[] payload() default {};
}
