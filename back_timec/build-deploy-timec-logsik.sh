#!/usr/bin/env bash
./build.sh

ssh root@103.90.235.12 -p 7878 "cd /root/histimec && ./stop_timec.sh && rm /root/histimec/target/timec-back-1.0.1-SNAPSHOT.war"
sleep 5
scp -P 7878 target/timec-back-1.0.1-SNAPSHOT.war root@103.90.235.12:/root/histimec/target/
ssh root@103.90.235.12 -p 7878 "cd /root/histimec && ./start_timec.sh"

echo "ssh root@103.90.235.12 -p 7878"
