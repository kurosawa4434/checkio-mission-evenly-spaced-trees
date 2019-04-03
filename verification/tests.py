"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""
from random import randint, sample
from collections import defaultdict


def evenly_spaced_trees(trees):
    dic = defaultdict(list)
    for i, t in enumerate(trees[:-1]):
        dic[trees[i+1] - t].append((t, trees[i+1]))
    while True:
        for s in range(min(dic), 0, -1):
            add_tree_nums = []
            for k, sections in dic.items():
                if k % s == 0:
                    interval = k // s
                    if interval - 1:
                        for fr, to in sections:
                            add_tree_nums += list(range(fr+s, to, s))
                else:
                    break
            else:
                return add_tree_nums

make_test = lambda io: {'input': io[0], 
                        'answer': io[1], 
                        'explanation': io[2]}

def make_basic_test(inp):
    ans = evenly_spaced_trees(inp)
    return make_test([inp, len(ans), ans])

# Basics
basics = [
        [0, 2, 6],
        [1, 3, 6],
        [0, 2, 4],
]

# Extra
extra = [
        [1, 52, 100],
        [1, 51, 100],
        [0, 50, 100],
]

# Randoms
randoms = []
for _ in range(10):
    while True:
        inp = list(sorted(sample(list(range(101)), randint(3, 5))))
        en = evenly_spaced_trees(inp)
        if len(en) < 30:
            break
    randoms.append([inp, len(en), en])

TESTS = {
    "Basics": list(map(make_basic_test, basics)),
    "Extra": list(map(make_basic_test, extra)),
    "Randoms": list(map(make_test, randoms)),
}

