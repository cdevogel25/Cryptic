#help.py
from lib import options

def c_help(cmd=None):
    if cmd is None:
        print('what do you want help with?')
        return
    if cmd[0] == options.CMD_LIST[1]:
        print('usage: price [exchange] [crypto] [pair]')
    elif cmd[0] == options.CMD_LIST[2]:
        print('clears the screen')
    elif cmd[0] == options.CMD_LIST[3]:
        print('does something...')
    elif cmd[0] == options.CMD_LIST[4]:
        print('exits cryptic')
