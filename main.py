#main.py
import os
from lib.options import CMD_LIST
from lib.Exchange import Exchange

class Cli:
    exchange = None
    c_exit = False

    def __init__(self):
        self.exchange = Exchange('gdax')

    def cli(self):
        while not self.c_exit:
            cmd_s = input('cryptic [' + self.exchange.name + '] ~ ')
            cmd = cmd_s.split(' ')
            if cmd[0] == CMD_LIST[1]:
                self.exchange.price(cmd[1:])
            elif cmd[0] == CMD_LIST[-1]:
                self.c_exit = True

# BASE_URL = 'https://api.cryptowat.ch/markets/'

cli = Cli()
cli.cli()


# def main():
#     c_exit = False
#     while not c_exit:
#         cmd_s = input('cryptic ~ ')
#         cmd = cmd_s.split(' ')
#         if cmd[0] == CMD_LIST[0]:
#             if len(cmd) > 1:
#                 c_help(cmd[1:])
#             else:
#                 c_help()
#         elif cmd[0] == CMD_LIST[1]:
#             if len(cmd) < 4:
#                 c_help([cmd[0]])
#                 continue
#             price(cmd[1:])
#         elif cmd[0] == 'clear':
#             os.system('clear')
#         elif cmd[0] == CMD_LIST[3]:
#             show()
#         elif cmd[0] == CMD_LIST[-1]:
#             c_exit = True
#         else:
#             print('invalid command...')

# main()
