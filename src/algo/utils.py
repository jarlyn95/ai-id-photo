import re
import base64
from io import BytesIO

from PIL import Image
import logging

import numpy as np


def create_bgr_bg(shape, rgb=[255, 255, 255]):
    bg = np.zeros(shape, np.uint8)
    bg[:, :, 0] = rgb[2]  # b
    bg[:, :, 1] = rgb[1]  # g
    bg[:, :, 2] = rgb[0]  # r
    return bg


def create_rgb_bg(shape, rgb=[255, 255, 255]):
    bg = np.zeros(shape, np.uint8)
    bg[:, :, 0] = rgb[0]  # b
    bg[:, :, 1] = rgb[1]  # g
    bg[:, :, 2] = rgb[2]  # r
    return bg


def base64_to_image(base64_str, image_path=None):
    """base64字符串转PIL.Image对象.

	Args:
	  base64_str: base64字符串.
	  image_path: 图像保存路径

	Returns:
	  img: 转换失败返回None，转换成功放回PIL.Image对象
	"""
    try:
        byte_data = base64.b64decode(base64_str)
        image_data = BytesIO(byte_data)
        img = Image.open(image_data)
        if image_path:
            img.save(image_path)
        return img
    except Exception as e:
        logging.info("base64转PIL.Image失败")
        return None


def image_to_base64(img):
    """PIL.Image对象转base64字符串，输出图片格式仅限于jpeg.

	Args:
	  img: PIL.Image对象.

	Returns:
	  base64_str: base64字符串
	"""
    output_buffer = BytesIO()
    img.save(output_buffer, format='JPEG')
    byte_data = output_buffer.getvalue()
    base64_str = base64.b64encode(byte_data)
    base64_str = 'data:image/jpeg;base64,' + bytes.decode(base64_str)
    return base64_str
