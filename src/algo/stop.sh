#!/bin/bash
ps aux |grep 'gunicorn api:app' | awk '{print $2}'|xargs kill -9