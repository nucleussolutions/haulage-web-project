FROM openjdk:8-jdk-alpine
VOLUME /tmp

COPY build/libs/server-0.1.jar /app.jar

ENV JAVA_OPTS="-agentlib:jdwp=transport=dt_socket,address=5005,server=y,suspend=n"

ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/urandom -jar /app.jar" ]

EXPOSE 8080

EXPOSE 5005