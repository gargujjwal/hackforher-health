package com.ujjwalgarg.mainserver.annotation;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import com.ujjwalgarg.mainserver.validator.NullOrUrlValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

/**
 * Custom annotation to validate that a field is either null or a valid HTTPS URL.
 */
@Documented
@Constraint(validatedBy = NullOrUrlValidator.class)
@Target({FIELD, METHOD, PARAMETER, ANNOTATION_TYPE, TYPE_USE})
@Retention(RUNTIME)
public @interface NullOrUrl {

  /**
   * The default error message that will be used if the field is not null and not a valid HTTPS
   * URL.
   *
   * @return the error message
   */
  String message() default "Field must be null or a valid HTTPS URL";

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
