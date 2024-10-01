# Dockerfile for order-service
FROM openjdk:17-jdk-alpine
VOLUME /tmp
ADD target/spring-boot-aws-exec.jar spring-boot-aws-exec.jar
ENTRYPOINT ["java", "-jar", "/order-service.jar"]
EXPOSE 8081