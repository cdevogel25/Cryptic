#show.py
import options

def show(cmd=None):
    if cmd == None:
        for key in options.exchanges:
            print key + ':'
            print '  cryptos:'
            print '    ',
            for n in options.exchanges[key]['cryptos']:
                print n,
            print
            print '  pairs:'
            print '    ',
            for n in options.exchanges[key]['pairs']:
                print n,
            print
