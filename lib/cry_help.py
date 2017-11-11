#help.py
def c_help(cmd=None):
    if cmd == None:
        print 'what do you want help with?'
        return
    if cmd[0] == 'price':
        print 'usage: price [exchange] [crypto] [pair]'
