import requests
import urllib
from lxml import etree, html
import time
import os

MAX_PAGE = 100  # 最大页码
xpath = '//*[@id="imageContent"]/section/div/figure'  # 图片列表页面figure元素xpath
header = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
    }


def crawl_person_image_url(page: int = 1, header=header):
    """
    爬去中国人肖像url
    return： 数组[('https://alifei02.cfp.cn/creative/vcg/nowater800/new/VCG211284072569.jpg',
    'https://alifei01.cfp.cn/creative/vcg/400/new/VCG211284072569.jpg')，....],
    每个元素为二元元组，第一分量为大图url，第二分量为小图url
    """
    url = f'https://www.vcg.com/creative-image/xiaoxiang/?creativeRace=1&page={page}'
    req: requests.Response = requests.get(url=url, headers=header)
    src = req.text
    root = etree.HTML(src)
    figures = root.xpath(xpath)  # 获取图像列表
    figure_url_list = []
    # tmp_file = open('url.txt', 'a')
    for fg in figures:
        try:
            img = fg.xpath('a/img')[0]  # 获取图像元素
            data = ('https:' + img.get('data-src'), 'https:' + img.get('data-min'))
            # line = 'https:' + img.get('data-src') + '\t' 'https:' + img.get('data-min') + '\n'
            # tmp_file.write(line)
            figure_url_list.append(data)
        except e:
            continue
    # tmp_file.close()
    return figure_url_list


def download_image(url: str, save_path='./vcg/'):
    """
    下载肖像
    """
    os.makedirs(save_path, exist_ok=True)
    image_name = url.split('/')[-1]
    full_save_file_name = save_path + image_name
    data = requests.get(url).content
    with open(full_save_file_name, 'wb') as f:
        f.write(data)
    return full_save_file_name


def main():
    for i in range(1, MAX_PAGE + 1):
        urls = crawl_person_image_url(i)
        for u in urls:
            download_image(u[0])
            time.sleep(0.1)  # 防止下载过快


if __name__ == '__main__':
    main()

