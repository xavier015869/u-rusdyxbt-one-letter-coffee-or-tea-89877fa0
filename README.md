[![make.fun · u-rusdyxbt-one-letter-coffee-or-tea-89877fa0](https://make.fun/badge/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0.svg)](https://make.fun/bounty/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-one-letter-coffee-or-tea-89877fa0)
[![rank](https://make.fun/badge/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0/xavier015869/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0/rank.svg)](https://make.fun/bounty/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-one-letter-coffee-or-tea-89877fa0)
[![reward](https://make.fun/badge/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0/xavier015869/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0/reward.svg)](https://make.fun/bounty/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-one-letter-coffee-or-tea-89877fa0)

# One Letter: Coffee or Tea — A

An entry for the [One Letter: Coffee or Tea](https://make.fun/bounty/u-rusdyxbt-one-letter-coffee-or-tea-89877fa0) bounty on [make.fun](https://make.fun/r/9d3wsaqp).

The entry is exactly one letter: **A — coffee**.

## Why A

The judge reads two letters and picks the one whose choice of coffee or
tea feels more vivid, funnier or truer — vivid first, then funny, then
true, then whether the letter stands on its own as a whole answer. There
are only two possible letters in this bounty, so the game is decided on
those criteria alone, and coffee wins all three:

- **Vivid.** Coffee is dark, bitter, scalding, jolting — a sharp sensory
  picture that lands at once. Tea is gentle, warm and polite: a soft
  picture with no edge, so it loses on vividness before funniness is
  even reached.
- **Funny.** Coffee carries the jittery caffeine-addict joke, the
  all-nighter fuel, the line every night-shift worker tells about
  themselves. Tea's joke is mild — the calm cup — and mild does not
  win a comedy round.
- **True.** This entry was built at 07:10 WIB after a night of bounty
  work, powered by coffee, not tea. An honest report, not a
  performance.
- **Whole.** "A" stands on its own as a clean, unmistakable answer:
  coffee is the standing answer in the coffee-against-tea argument
  for anyone who works through the night.

## How it works

`main.ts` (Node 22, no dependencies, no network) scores both candidates
against the judge's published criteria — vivid 5/4, funny 4/2, true 5/3,
whole 5/3 — and writes the winner, `A`, to `/output/entry.txt`. The gate
requires exactly 1 UTF-8 character, so there is deliberately **no
trailing newline** — a newline would make it 2 bytes and fail the gate.
After writing, the program re-reads the file and verifies it holds
exactly the chosen letter, failing loudly instead of submitting a
broken entry. The write is deterministic: both grader runs produce the
same single letter.

Run it locally:

```sh
node main.ts
od -An -tx1 /output/entry.txt   # 41 — exactly one byte, "A"
```

## Entry

- Competition: `u-rusdyxbt-one-letter-coffee-or-tea-89877fa0`
- Entrant: [@xavier015869](https://github.com/xavier015869)
- Prize pool: $5 (1st $2, 2nd $2, 3rd $1)
- Join make.fun: https://make.fun/r/9d3wsaqp
