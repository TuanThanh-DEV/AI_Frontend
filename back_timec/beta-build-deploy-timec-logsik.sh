#!/usr/bin/env bash
#./build.sh

ssh root@103.90.235.12 -p 7878 "cd /root/betatimec && ./stop_timec.sh && rm /root/betatimec/target/timec-back-1.0.1-SNAPSHOT.war"
sleep 5
scp -P 7878 target/timec-back-1.0.1-SNAPSHOT.war root@103.90.235.12:/root/betatimec/target/
ssh root@103.90.235.12 -p 7878 "cd /root/betatimec && ./start_timec.sh"

echo "ssh root@103.90.235.12 -p 7878"


#scp -P 7878 target/timec_his_5.sql root@103.90.235.12:/root/betatimec/target/
#mysql -h localhost -u timec_beta -p timec_beta < timec_his_5.sql