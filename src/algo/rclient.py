import redis
from config import get_config


def rc(cfg):
    conn_pool = redis.ConnectionPool(host=cfg['redis']['host'], port=cfg['redis']['port'])
    r = redis.Redis(connection_pool=conn_pool)
    return r


if __name__ == '__main__':
    cfg = get_config('dev')
    client = rc(cfg)
    client.setex('test', 10, 'test-value')
    value = client.get('test')
    print(value)
    import time

    time.sleep(11)
    value = client.get('test')
    print(value)
