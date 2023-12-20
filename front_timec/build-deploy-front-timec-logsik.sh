#!/usr/bin/env bash
rm dist/*.html
rm dist/*.js
./deploy.sh

ssh root@103.90.235.12 -p 7878 "rm /home/timec/domains/timec.vn/public_html/his/*.html && rm /home/timec/domains/timec.vn/public_html/his/*.js"
scp -P 7878 dist/*.html root@103.90.235.12:/home/timec/domains/timec.vn/public_html/his/
scp -P 7878 dist/*.js root@103.90.235.12:/home/timec/domains/timec.vn/public_html/his/

scp -P 7878 dist/assets/images/*.* root@103.90.235.12:/home/timec/domains/timec.vn/public_html/his/assets/images/
