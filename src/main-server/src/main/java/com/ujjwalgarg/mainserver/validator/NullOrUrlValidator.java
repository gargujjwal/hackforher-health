package com.ujjwalgarg.mainserver.validator;

import com.ujjwalgarg.mainserver.annotation.NullOrUrl;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

/**
 * Validator to check if a string is either null or a valid HTTPS URL.
 */
public class NullOrUrlValidator implements ConstraintValidator<NullOrUrl, String> {

  private static final Pattern HTTPS_URL_PATTERN = Pattern.compile(
      "^https://[\\w.-]+(?:\\.[\\w.-]+)+[/\\w\\._-]*$"
  );

  /**
   * Initializes the validator. This method can be used to perform any necessary setup.
   *
   * @param constraintAnnotation the annotation instance for a given constraint declaration
   */
  @Override
  public void initialize(NullOrUrl constraintAnnotation) {
    // Initialization code, if necessary
  }

  /**
   * Checks if the given string is either null or a valid HTTPS URL.
   *
   * @param value   the string to validate
   * @param context context in which the constraint is evaluated
   * @return true if the string is null or a valid HTTPS URL, false otherwise
   */
  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    // Allow null values
    if (value == null) {
      return true;
    }
    // Validate if the string matches the HTTPS URL pattern
    return HTTPS_URL_PATTERN.matcher(value).matches();
  }
}
