#main.py
import sys
import requests
import ast
import json
import lib.cry_help

# if len(sys.argv) != 4:
#     print 'usage: main.py <exchange> <crypto> <pair>'
#     sys.exit()

exchanges = ['gdax', 'gemini', 'btce']
cryptos = ['eth', 'btc', 'bch']
pairs = ['eth', 'btc', 'bch', 'usd']

# exchange = sys.argv[1]
# crypto = sys.argv[2]
# pair = sys.argv[3]

base_url = 'https://api.cryptowat.ch/markets/'

# if exchange not in exchanges:
#     print 'exchange not in list'
#     sys.exit()
# if crypto not in cryptos:
#     print 'currency not supported'
#     sys.exit()

# url = base_url + exchange + '/' + crypto + pair

# response = requests.get(url)
# json_data = response.text
# res_dict = json.loads(json_data)
# print res_dict['allowance']

def show_price():
    pass

def main():
    exit = False
    while not exit:
        cmd_s = raw_input('cryptic ~ ')
        cmd = cmd_s.split(' ')
        if cmd[0] == 'help':
            if len(cmd) > 1:
                lib.cry_help.help(cmd[1:])
            else:
                lib.cry_help.help()
        elif cmd[0] == 'price':
            if len(cmd) < 4:
                print ''
            cry_price(cmd[1], cmd[2], cmd[3])
        elif cmd[0] == 'exit':
            exit = True
        else:
            print 'invalid command...'

main()
