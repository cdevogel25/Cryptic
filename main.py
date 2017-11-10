#main.py
import sys
import requests
import ast
import json
import lib.cry_help, lib.cry_price

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
                lib.cry_help.help(cmd[1:])
            else:
                lib.cry_help.help()
        elif cmd[0] == 'price':
            if len(cmd) < 4:
                lib.cry_help.help([cmd[0]])
                continue
            cry_price(cmd[1:])
        elif cmd[0] == 'exit' or cmd[0] == 'quit':
            exit = True
        else:
            print 'invalid command...'

main()
