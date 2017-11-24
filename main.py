#main.py
import os
from lib.options import CMD_LIST
from lib.cry_price import price
from lib.cry_help import c_help
from lib.cry_show import show


BASE_URL = 'https://api.cryptowat.ch/markets/'

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

def main():
    c_exit = False
    while not c_exit:
        cmd_s = input('cryptic ~ ')
        cmd = cmd_s.split(' ')
        if cmd[0] == CMD_LIST[0]:
            if len(cmd) > 1:
                c_help(cmd[1:])
            else:
                c_help()
        elif cmd[0] == CMD_LIST[1]:
            if len(cmd) < 4:
                c_help([cmd[0]])
                continue
            price(cmd[1:])
        elif cmd[0] == 'clear':
            os.system('clear')
        elif cmd[0] == CMD_LIST[3]:
            c_exit = True
        elif cmd[0] == CMD_LIST[4]:
            show()
        else:
            print('invalid command...')

main()
