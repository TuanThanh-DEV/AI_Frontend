#!/usr/bin/env bash
java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n -jar ./target/timec-back-1.0.1-SNAPSHOT.war --spring.config.location=../application-dev.properties

