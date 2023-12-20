#!/usr/bin/env bash
nohup java -jar ~/timec/target/train-back-1.0.1-SNAPSHOT.war  > ~/timec/timec.txt 2>&1 &
echo $! > ~/timec/pid.file
