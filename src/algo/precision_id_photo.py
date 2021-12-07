# -*- coding: utf-8 -*-
import logging

# from face_recognition import face_locations
import numpy as np
from PIL import Image

import tarfile
import tensorflow as tf
import cv2 as cv
from utils import create_bgr_bg
import os
import paddlehub as hub

face_landmark = hub.Module(name="face_landmark_localization")


class DeepLabModel(object):
    """Class to load deeplab model and run inference."""

    INPUT_TENSOR_NAME = 'ImageTensor:0'
    OUTPUT_TENSOR_NAME = 'SemanticPredictions:0'
    INPUT_SIZE = 513
    # INPUT_SIZE = 641
    FROZEN_GRAPH_NAME = 'frozen_inference_graph'

    def __init__(self, tarball_path):
        """Creates and loads pretrained deeplab model."""
        self.graph = tf.Graph()

        graph_def = None
        # Extract frozen graph from tar archive.
        tar_file = tarfile.open(tarball_path)
        for tar_info in tar_file.getmembers():
            if self.FROZEN_GRAPH_NAME in os.path.basename(tar_info.name):
                file_handle = tar_file.extractfile(tar_info)
                graph_def = tf.GraphDef.FromString(file_handle.read())
                break

        tar_file.close()

        if graph_def is None:
            raise RuntimeError('Cannot find inference graph in tar archive.')

        with self.graph.as_default():
            tf.import_graph_def(graph_def, name='')

        self.sess = tf.Session(graph=self.graph)

    def run(self, image):
        """Runs inference on a single image.

        Args:
          image: A PIL.Image object, raw input image.

        Returns:
          resized_image: RGB image resized from original input image.
          seg_map: Segmentation map of `resized_image`.
        """
        width, height = image.size
        resize_ratio = 1.0 * self.INPUT_SIZE / max(width, height)
        target_size = (int(resize_ratio * width), int(resize_ratio * height))
        resized_image = image.convert('RGB').resize(target_size, Image.ANTIALIAS)
        batch_seg_map = self.sess.run(
            self.OUTPUT_TENSOR_NAME,
            feed_dict={self.INPUT_TENSOR_NAME: [np.asarray(resized_image)]})
        seg_map = batch_seg_map[0]
        return resized_image, seg_map


# def std_size_by_face(img: Image, size=(295, 413), ratio=1.3):
#     """ 根据人脸定位，裁剪为标准尺寸
#
#     Returns:
#         当图像中仅有1张人脸时，放回PIL.Image对象，当无人脸或者多张人脸时，返回None
#     """
#
#     rgb_img = img.convert('RGB')
#     img_data = np.array(rgb_img)
#     dets = face_locations(img_data, 1, model='cnn')
#
#     logging.info("图像中有{}张人脸".format(len(dets)))
#     if len(dets) != 1:
#         return None
#
#     detected_face = dets[0]
#     left = detected_face[3]
#     right = detected_face[1]
#
#     top = detected_face[0]
#     bottom = detected_face[2]
#
#     cx = (left + right) // 2
#     cy = (top + bottom) // 2
#
#     w = right - left
#     h = size[1] * w // size[0]
#
#     box = (cx - w * ratio, cy - h * ratio, cx + w * ratio, cy + h * ratio)
#     cropped_img = img.crop(box)
#     resized_img = cropped_img.resize(size, Image.ANTIALIAS)
#
#     return resized_img

def std_size_by_face(raw_img, rate=1.3, crop_size=(295, 413)):
    """ 根据人脸定位，裁剪为标准尺寸

    """
    # 人脸识别
    result = face_landmark.keypoint_detection(images=[np.array(raw_img)])
    if len(result) != 1 or len(result[0]['data']) != 1:
        logging.info("图像中只能有1张人脸")
        return None
    face = np.array(result[0]['data'][0], dtype=np.int64)

    # 剪裁
    left = face[:, 0].min()
    right = face[:, 0].max()
    w = right - left
    cw = (right+left) // 2

    upper = face[:, 1].min()
    lower = face[:, 1].max()
    # h = lower - upper
    ch = (lower + upper) // 2

    h = crop_size[1] * w // crop_size[0]

    box = (cw - rate * w, ch-rate * h, cw + rate * w, ch + rate * h)

    cropped_img = raw_img.crop(box)
    resized_img = cropped_img.resize(crop_size, Image.ANTIALIAS)

    return resized_img


def create_mask(label):
    """人像rgb为192, 128, 128，其他为0.
    Returns:
        A Colormap for visualizing segmentation results.
    """
    colormap = np.zeros((256, 3), dtype=int)
    colormap[15, :] = [192, 128, 128]

    return colormap[label]


def std_bg_by_person(img: Image, model: DeepLabModel, rgb=[255, 0, 0]):
    """根据人物分割修改背景

    """
    std_size = img.size
    resized_image, seg_map = model.run(img)  # resized_image 某个方向的像素点为513

    mask = create_mask(seg_map).astype(np.uint8)[:, :, 0]
    img = np.asarray(resized_image).transpose((2, 0, 1))
    img = img.copy()

    person = []
    mask = np.array((mask < 180), dtype=np.uint8)
    mask = cv.dilate(mask, None, iterations=2)
    mask = np.array(mask, dtype=np.bool)
    for i in range(3):
        a = img[i]
        a[mask] = rgb[i]
        person.append(a)

    img = np.array(person).transpose((1, 2, 0))
    new_image = Image.fromarray(img)
    std_new_img = new_image.resize(std_size, Image.ANTIALIAS)

    return std_new_img


def std_photo(img, rate=1.3, std_size=(295, 413), thresh=2, bg='white'):
    rgb = [255, 255, 255]
    if bg == 'red':
        rgb = [255, 0, 0]
    if bg == 'blue':
        rgb = [67, 142, 219]
    if std_size:
        img1 = std_size_by_face(img, rate, crop_size=std_size)
        if not img1:
            return img1
        img2 = std_bg_by_person(img1, model, rgb)
        return img2
    else:
        img2 = std_bg_by_person(img, model, rgb)
        return img2


model_path = "./pretrained_model/deeplabv3_pascal_train_aug_2018_01_04.tar.gz"
model = DeepLabModel(model_path)

if __name__ == '__main__':
    in_path = './in_photo/'
    out_path = './out_photo2/'
    file_name = 'xinxi.jpeg'
    image = Image.open(in_path + file_name)
    # img1 = std_size_by_face(image)
    # if not img1:
    #     exit(0)
    # img2 = std_bg_by_person(img1, model)
    img2 = std_photo(image, std_size=None, bg='blue')
    img2.save(out_path + file_name)
