# Dockerfile for inventory-service
FROM openjdk:22-jdk
VOLUME /tmp
COPY target/spring-boot-aws-exec.jar /spring-boot-aws-exec.jar
ENTRYPOINT ["java", "-jar", "/spring-boot-aws-exec.jar"]
EXPOSE 5000
