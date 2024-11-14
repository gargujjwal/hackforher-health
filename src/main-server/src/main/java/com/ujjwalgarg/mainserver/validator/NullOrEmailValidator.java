package com.ujjwalgarg.mainserver.validator;

import com.ujjwalgarg.mainserver.annotation.NullOrEmail;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

/**
 * Validator to check if a string is either null or a valid email address.
 */
public class NullOrEmailValidator implements ConstraintValidator<NullOrEmail, String> {

  /**
   * Regular expression pattern to validate email addresses.
   */
  private static final Pattern EMAIL_PATTERN = Pattern.compile(
      "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$",
      Pattern.CASE_INSENSITIVE
  );

  /**
   * Initializes the validator. This method can be used to perform any necessary setup.
   *
   * @param constraintAnnotation the annotation instance for a given constraint declaration
   */
  @Override
  public void initialize(NullOrEmail constraintAnnotation) {
    // Initialization code, if necessary
  }

  /**
   * Checks if the given string is either null or a valid email address.
   *
   * @param value   the string to validate
   * @param context context in which the constraint is evaluated
   * @return true if the string is null or a valid email address, false otherwise
   */
  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    // Allow null values
    if (value == null) {
      return true;
    }
    // Check if the string matches the email pattern
    return EMAIL_PATTERN.matcher(value).matches();
  }
}
