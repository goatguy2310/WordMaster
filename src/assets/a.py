import json

with open('./words_alpha.txt') as f:
    words = f.read().splitlines()

# split list into 5 parts and export to json files
b = len(words) / 5
for i in range(5):
    with open(f'./words_alpha_{i}.json', 'w') as f:
        w = words[int(i*b):min(int((i+1)*b), len(words))]
        json.dump({wd: 1 for wd in w}, f)