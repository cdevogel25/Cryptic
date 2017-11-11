#main.py
import sys
import requests
import ast
import json
import os
from lib.cry_price import price
from lib.cry_help import c_help
from lib.cry_show import show


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

def cry_price(cmd):
    lib.cry_price.price(cmd)

def main():
    exit = False
    while not exit:
        cmd_s = raw_input('cryptic ~ ')
        cmd = cmd_s.split(' ')
        if cmd[0] == 'help':
            if len(cmd) > 1:
                c_help(cmd[1:])
            else:
                c_help()
        elif cmd[0] == 'price':
            if len(cmd) < 4:
                c_help([cmd[0]])
                continue
            price(cmd[1:])
        elif cmd[0] == 'clear':
            os.system('clear')
        elif cmd[0] == 'exit' or cmd[0] == 'quit':
            exit = True
        elif cmd[0] == 'show':
            show()
        else:
            print 'invalid command...'

main()
