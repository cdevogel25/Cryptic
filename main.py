#main.py
import os
from lib.options import CMD_LIST
from lib.Exchange import Exchange

class Cli:
    exchange = None
    c_exit = False

    def __init__(self, exchange):
        self.exchange = Exchange(exchange)

    def cli(self):
        while not self.c_exit:
            cmd_s = input('cryptic [' + self.exchange.name + '] ~ ')
            cmd = cmd_s.split(' ')
            if cmd[0] == CMD_LIST[1]:
                self.exchange.price(cmd[1:])
            elif cmd[0] == CMD_LIST[-1]:
                self.c_exit = True
