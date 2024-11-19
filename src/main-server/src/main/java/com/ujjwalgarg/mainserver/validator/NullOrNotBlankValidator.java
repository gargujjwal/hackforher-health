package com.ujjwalgarg.mainserver.validator;

import com.ujjwalgarg.mainserver.annotation.NullOrNotBlank;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Validator to check if a string is either null or not blank.
 */
public class NullOrNotBlankValidator implements ConstraintValidator<NullOrNotBlank, String> {

  /**
   * Initializes the validator. This method can be used to perform any necessary setup.
   *
   * @param constraintAnnotation the annotation instance for a given constraint declaration
   */
  @Override
  public void initialize(NullOrNotBlank constraintAnnotation) {
    // Initialization code, if necessary
  }

  /**
   * Checks if the given string is either null or not blank.
   *
   * @param value   the string to validate
   * @param context context in which the constraint is evaluated
   * @return true if the string is null or not blank, false otherwise
   */
  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    // Allow null values
    if (value == null) {
      return true;
    }
    // Check that the string is not blank (not empty and contains non-whitespace characters)
    return !value.trim().isEmpty();
  }
}
