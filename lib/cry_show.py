#show.py
import options

def show(cmd=None):
    if cmd == None:
        for key in options.exchanges:
            print(key + ':')
            print('  cryptos:')
            print('    ', end = '')
            for n in options.exchanges[key]['cryptos']:
                print(n + ' ', end = '')
            print()
            print('  pairs:')
            print('    ', end = '')
            for n in options.exchanges[key]['pairs']:
                print(n + ' ', end = '')
            print()
