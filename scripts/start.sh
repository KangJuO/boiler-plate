#!/bin/bash
cd /home/ubuntu/boiler-plate/server

export MONGO_URI=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_URI --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js