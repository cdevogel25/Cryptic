#help.py
from lib.options import CMD_LIST

def c_help(cmd=None):
    if cmd is None:
        print('what do you want help with?')
    if cmd == CMD_LIST[0]:
        pass
    if cmd == CMD_LIST[1]:
        print('price <exchange> <coin> <pair>')
    if cmd == CMD_LIST[2]:
        print('clears the screen')
    if cmd == CMD_LIST[3]:
        print('prints everything in options.exchanges')
    if cmd == CMD_LIST[4]:
        print('exits the program')
