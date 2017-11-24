#show.py
from lib.options import EXCHANGES

def show(cmd=None):
    if cmd is None:
        for key in EXCHANGES:
            print(key + ':')
            print('  coin:')
            out_string = '    '
            for coin in EXCHANGES[key]['coins']:
                out_string += coin + ' '
            print(out_string)
            print('  pairs:')
            out_string = '    '
            for pair in EXCHANGES[key]['pairs']:
                out_string += pair + ' '
            print(out_string)
