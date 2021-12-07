import yaml
import os

def get_config():
    pth = os.path.abspath(os.path.dirname(__file__) + '/setting.yaml')
    f = open(pth, encoding='utf-8')
    config = yaml.load(f, yaml.FullLoader)
    active = config['active']
    env_list = config['env_list']
    config = [e for e in env_list if e['env'] == active][0]
    f.close()
    return config


if __name__ == '__main__':
    cfg = get_config()
    print(cfg)
