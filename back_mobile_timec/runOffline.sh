#!/usr/bin/env bash
mvn clean install -DskipTests -o
java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n -jar ./target/back_mobile_timec-back-1.0.1-SNAPSHOT.war

