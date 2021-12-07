#!/bin/bash

cpu_core_num=( $(python -c 'import multiprocessing; print(multiprocessing.cpu_count())' ))
#pro_num=$(expr $cpu_core_num \* 2 + 1)
#pro_num=$cpu_core_num
pro_num=4
export SMART_ID_PHOTO_ENV=prod
gunicorn api:app -w $pro_num -b :5000 -t 300  \
         --access-logfile ./access.log -D     \
         --error-logfile ./error.log \
         --capture-output
#         \
#         --certfile ./key/server.crt \
#         --keyfile ./key/server.key