
FROM ubuntu:17.04



#
RUN apt-get update && apt-get install -y \
    openjdk-8-jre \
    openjdk-8-jdk \
    wget \
    unzip
#    openjfx \
#    git \
#    maven

# Credits:
# https://github.com/mozart-analytics/grails-docker
#FROM openjdk:8

# Set customizable env vars defaults.
# Set Grails version
ENV GRAILS_VERSION 3.3.0

# Install Grails
WORKDIR /opt

# TODO put grails zips on your own server with decent bandwidth
RUN wget https://github.com/grails/grails-core/releases/download/v$GRAILS_VERSION/grails-$GRAILS_VERSION.zip && \
    unzip grails-$GRAILS_VERSION.zip && \
    rm -rf grails-$GRAILS_VERSION.zip && \
    ln -s grails-$GRAILS_VERSION grails

# Setup Grails path.
ENV GRAILS_HOME /opt/grails
ENV PATH $GRAILS_HOME/bin:$PATH

RUN mkdir -p /root/gradle/.gradle
ENV GRADLE_USER_HOME=/root/gradle/.gradle

# Create App Directory
RUN mkdir /app

# Set Workdir
VOLUME /app
WORKDIR /app

#ENV GRADLE_OPTS -Dorg.gradle.native=false

RUN mkdir -p /root/.gradle
ENV HOME /root
VOLUME /root/.gradle

#VOLUME /dev/urandom

EXPOSE 8080