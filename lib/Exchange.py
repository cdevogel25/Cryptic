import json
import requests
from lib.options import EXCHANGES
from lib.options import BASE_URLS
# from lib.cry_help import c_help

class Exchange:
    name = None
    exchange = None
    base_url = None

    def __init__(self, exchange):
        self.name = exchange
        self.exchange = EXCHANGES[exchange]
        self.base_url = BASE_URLS['price'] + self.name

    def show(self):
        coin_str = '    '
        pair_str = '    '
        for coin in self.exchange['coins']:
            coin_str += coin + ' '
        for pair in self.exchange['pairs']:
            pair_str += pair + ' '
        print(self.name + ':')
        print('  coins:')
        print(coin_str)
        print('  pairs:')
        print(pair_str)

    def price(self, cmd):
        coin = cmd[0]
        pair = cmd[1]

        if coin not in self.exchange['coins']:
            print('coin not in list')
            return
        if pair not in self.exchange['pairs']:
            print('pair not in list')
            return

        url = self.base_url + '/' + coin + pair + '/price'
        res = requests.get(url)
        res_dict = json.loads(res.text)
        print(res_dict['result']['price'])






GDAX = Exchange('gdax')
GDAX.show()
GDAX.price(['eth', 'usd'])
