#options.py

EXCHANGES = {
    'gdax': {
        'coins': ['btc', 'eth'],
        'pairs': ['btc', 'eth', 'usd']
        },
    'gemini': {
        'coins': ['eth', 'btc'],
        'pairs': ['btc', 'eth', 'usd']
    }
}

CMD_LIST = [
    'help',
    'price',
    'clear',
    'show',
    'exit',
]

BASE_URLS = {
    'price': 'https://api.cryptowat.ch/markets/',
}
