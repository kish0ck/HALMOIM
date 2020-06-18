package com.hal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
 @Bean
 public Docket api(){
   return new Docket(DocumentationType.SWAGGER_2)
     .apiInfo(info())
     .select()
     .apis(RequestHandlerSelectors.basePackage("com.hal.controller"))
     .paths(PathSelectors.any())
     .build();
 }
  
 private ApiInfo info() {
  return new ApiInfoBuilder().title("HalMoim")
    .description("Web for Active Senior<b>CRUD</b>")
    .license("Team7")
    .version("3.0")
    .build();
 }
}

//http://localhost:8080/swagger-ui.html