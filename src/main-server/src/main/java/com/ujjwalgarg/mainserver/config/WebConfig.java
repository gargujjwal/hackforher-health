package com.ujjwalgarg.mainserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  /**
   * Configures the path matching options. Adds a prefix "/api" to all controller paths.
   *
   * @param configurer the PathMatchConfigurer to customize path matching options
   */
  @Override
  public void configurePathMatch(PathMatchConfigurer configurer) {
    configurer.addPathPrefix(
        "/api",
        c ->
            c.isAnnotationPresent(RestController.class)
                && !c.getPackageName()
                .startsWith("org.springframework.boot.autoconfigure.web.servlet.error"));
  }
}
