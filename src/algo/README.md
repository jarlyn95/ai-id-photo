# 运行程序
```
cd src/algo
```
启动
```
./run.sh  
```
结束
```
./stop.sh  
```
打包
```
tar --exclude=./pretrained_model \
    --exclude=./in_photo \
    --exclude=./out_photo \
    --exclude=./out_photo2 \
    --exclude=./access.log \
    --exclude=./error.log \
    -czvf  ai_id_photo.tar.gz .
```