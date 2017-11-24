#cry_price.py
import json
import requests
from lib.options import EXCHANGES
from lib.cry_help import c_help

def price(cmd):
    if len(cmd) < 3:
        c_help(['price'])

    base_url = 'https://api.cryptowat.ch/markets/'
    exchange = cmd[0]
    crypto = cmd[1]
    pair = cmd[2]

    if exchange not in EXCHANGES.keys():
        print('exchange not in list')
        return
    if crypto not in EXCHANGES[exchange]['coins']:
        print('crypto not in list')
        return
    if pair not in EXCHANGES[exchange]['pairs']:
        print('pair not in list')
        return

    url = base_url + exchange + '/' + crypto + pair + '/price'

    res = requests.get(url)
    json_data = res.text
    res_dict = json.loads(json_data)
    print(res_dict['result']['price'])
