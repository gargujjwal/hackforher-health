package com.ujjwalgarg.mainserver.annotation;

import com.ujjwalgarg.mainserver.validator.AppointmentValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = AppointmentValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidAppointment {

  String message() default "Invalid appointment details";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}
