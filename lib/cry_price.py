#cry_price.py
import requests
import json
import cry_help

def price(cmd):
    if len(cmd) < 3:
        cry_help(['price'])
    exchanges = {
        'gdax': {
            'cryptos': ['btc', 'eth'],
            'pairs': ['btc', 'eth', 'usd']
            },
        'gemini': {
            'cryptos': ['eth', 'btc'],
            'pairs': ['btc', 'eth', 'usd']
        }
    }

    base_url = 'https://api.cryptowat.ch/markets/'
    exchange = cmd[0]
    crypto = cmd[1]
    pair = cmd[2]

    if exchange not in exchanges.keys():
        print 'exchange not in list'
        return
    if crypto not in exchanges[exchange]['cryptos']:
        print 'crypto not in list'
        return
    if pair not in exchanges[exchange]['pairs']:
        print 'pair not in list'
        return

    url = base_url + exchange + '/' + crypto + pair + '/price'

    res = requests.get(url)
    json_data = res.text
    res_dict = json.loads(json_data)
    print res_dict['result']['price']
