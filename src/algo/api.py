import base64

from flask import Flask, jsonify, render_template
from flask import request
from flask_cors import CORS, cross_origin
from utils import base64_to_image, image_to_base64

import logging
import hashlib
from config import get_config
from rclient import rc

from precision_id_photo import std_photo

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

app = Flask(__name__, static_folder="./html/static", template_folder="./html")
CORS(app)


cfg = get_config()
cache = rc(cfg)

mini_width = 295
mini_heigth = 413

std_size = [(295, 413), (389, 566), (413, 531), (413, 579), (413, 626)]


@app.route("/")
@cross_origin()
def home():
    """
        当在浏览器访问网址时，通过 render_template 方法渲染 dist 文件夹中的 index.html。
        页面之间的跳转交给前端路由负责，后端不用再写大量的路由
    """
    return render_template('index.html')


@app.route("/health")
@cross_origin()
def health():
    """
        健康状态检测
    """
    return jsonify({'code': 0, 'msg': 'ok'})


@app.route('/upload_image', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def upload_image():
    if request.method == 'POST':
        img = request.files['file']
        img_base64 = base64.b64encode(img.read())
        img_id = hashlib.md5(img_base64).hexdigest()
        cache.setex(img_id, 8 * 60 * 60, img_base64)
        return jsonify({'code': 0, 'msg': '成功', 'img_id': img_id})
    if request.method == 'OPTIONS':
        logging.info("预请求")
        return jsonify({'code': 99, 'msg': '浏览器预请求，前端需要重现上传'})


@app.route('/download_cert_image', methods=['POST'])
@cross_origin()
def download_cert_image():
    img_id = request.json.get("img_id")
    img = cache.get(img_id)
    img = base64_to_image(img)
    if not img:
        return {'code': -1, 'msg': '不支持该类型图像'}
    size = img.size
    if size[0] > size[1]:
        return {'code': -2, 'msg': '图像宽度需要小于高度'}
    # if size[0] < mini_width or size[1] < mini_heigth:
    #     return {'code': -3, 'msg': '图像尺寸太小'}

    bg_color_type = request.json.get("color")
    bg_color = 'white'
    if bg_color_type == 1:
        bg_color = 'red'
    if bg_color_type == 2:
        bg_color = 'blue'

    std_size_index = request.json.get("size")
    new_size = None

    if 0 <= std_size_index < len(std_size):
        new_size = std_size[std_size_index]
    photo = std_photo(img=img, std_size=new_size, bg=bg_color)
    if photo:
        img_base64 = image_to_base64(photo)
        return jsonify({"code": 0, "msg": "成功", 'img': img_base64})
    else:
        return jsonify({"code": -1, "msg": "图像中无人脸或者有多张人脸"})


if __name__ == '__main__':
    app.run(port=8501)
