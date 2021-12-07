#运行程序
启动: ./run.sh  
结束: ./stop.sh  

cd /Users/actboy/Documents/src/cv

tar --exclude=gen_id_photo/pretrained_model --exclude=gen_id_photo/in_photo --exclude=gen_id_photo/out_photo --exclude=gen_id_photo/out_photo2 --exclude=gen_id_photo/.idea --exclude=gen_id_photo/id-photo-web --exclude=gen_id_photo/access.log --exclude=gen_id_photo/error.log --exclude=gen_id_photo/ai-id-photo --exclude=gen_id_photo/ai-id-web -czvf  gen_id_photo.tar.gz gen_id_photo

scp gen_id_photo.tar.gz jl@10.192.64.82:/home/jl/src/

ssh jl@10.192.64.82

cd src/

tar -xzvf gen_id_photo.tar.gz

cd gen_id_photo/

conda activate smart-id-photo

./stop.sh

./run.sh