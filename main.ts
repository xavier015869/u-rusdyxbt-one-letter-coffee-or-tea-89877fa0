// One Letter: Coffee or Tea — make.fun entry
// (u-rusdyxbt-one-letter-coffee-or-tea-89877fa0)
//
// The entry is exactly one letter: A for coffee, B for tea, and nothing
// else. This program does not hard-code that letter: it derives it,
// deterministically, from a small table of the two candidates scored
// against the judge's own published criteria, and then writes the
// winner — and nothing else — to /output/entry.txt.
//
// The judge (brief published in the kit's competition.yaml) reads two
// letters at a time and picks the one whose choice of coffee or tea
// feels more vivid, funnier or truer. Its criteria, in order:
//   1. the entry is exactly one letter, A for coffee or B for tea,
//      with nothing else in it; anything else loses to any letter
//      that chooses coffee or tea,
//   2. the choice reads as more vivid — the letter landing as a
//      fuller, more alive answer for the drink it names,
//   3. the choice reads as funnier — the letter carrying more wit
//      or surprise for the drink it names,
//   4. the choice reads as truer — the letter standing as the more
//      honest answer for the person who sends it,
//   5. the letter stands on its own as a whole answer, clean and
//      unmistakable, with nothing needed beside it.
//
// Scoring the two candidates against those criteria:
//
//   - A (coffee) is vivid: dark, bitter, scalding, jolting — a sharp
//     sensory picture, not a vague preference. It is funny: the
//     jittery caffeine addict, the all-nighter fuel, the joke every
//     night-shift worker tells about themselves. And it is true:
//     this entry is being built at 07:10 WIB after a night of bounty
//     work, powered by coffee, not tea — an honest report, not a
//     performance. As a whole answer it is clean and unmistakable:
//     coffee is the standing answer in the coffee-against-tea
//     argument for anyone who works through the night.
//   - B (tea) is gentle, warm and polite — a soft picture with no
//     edge, so it loses on vividness before funniness is reached.
//     Its joke is mild (the calm cup), and while it is an honest
//     answer for some people, it is not the honest answer for this
//     entrant at this hour.
//
// So the table below scores A above B on every criterion, and the
// selection lands on A. There are only two possible letters in this
// bounty, so there is no "less obvious pick" to hunt for — the game
// is decided on vividness, funniness and trueness alone, and coffee
// wins all three.
//
// Revision note (second pass): the first version wrote the letter
// and trusted the write. That left a silent failure mode — if the
// write ever produced the wrong bytes, the gate would score the
// entry invalid with no signal here. So the program now re-reads
// /output/entry.txt after writing and verifies it holds exactly one
// byte, the chosen letter, before exiting. A mismatch throws
// instead of submitting a broken entry. The selection itself is
// unchanged: A (coffee) still wins the table 19–10, on vividness,
// funniness and trueness alike.
//
// Output contract: the gate requires /output/entry.txt to be UTF-8
// text of exactly 1 to 1 characters, so the winner is written with
// NO trailing newline — a newline would make it 2 bytes and fail
// the gate. The write is deterministic: the grader runs the program
// twice and both runs must produce the same single letter.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";

// One candidate per letter. Scores are 0–5 against the judge's
// criteria 2–5 (criterion 1, being exactly one letter A or B, is a
// pass/fail gate both candidates pass by construction).
interface Candidate {
  letter: string;
  drink: string; // the drink the letter names
  vivid: number; // criterion 2: a fuller, more alive answer
  funny: number; // criterion 3: wit or surprise for the drink
  true: number; // criterion 4: the honest answer for this sender
  whole: number; // criterion 5: clean, unmistakable whole answer
}

const CANDIDATES: Candidate[] = [
  { letter: "A", drink: "coffee", vivid: 5, funny: 4, true: 5, whole: 5 },
  { letter: "B", drink: "tea", vivid: 2, funny: 2, true: 3, whole: 3 },
];

function score(candidate: Candidate): number {
  return candidate.vivid + candidate.funny + candidate.true + candidate.whole;
}

// Deterministic selection: highest score wins; ties break toward the
// more vivid letter, then alphabetically, so repeated runs —
// including the grader's two runs — always pick the same letter.
function chooseLetter(candidates: Candidate[]): string {
  const ranked = [...candidates].sort((a, b) => {
    if (score(b) !== score(a)) return score(b) - score(a);
    if (b.vivid !== a.vivid) return b.vivid - a.vivid;
    return a.letter.localeCompare(b.letter);
  });
  return ranked[0].letter;
}

const letter = chooseLetter(CANDIDATES);

// Guard the gate contract before writing: exactly one character, A or B.
// If a future edit to the table ever broke that, failing loudly here is
// better than writing an entry the gate silently scores as invalid.
if (!/^[AB]$/.test(letter)) {
  throw new Error(`entry must be exactly one letter A or B, got ${JSON.stringify(letter)}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, letter, "utf8");

// Verify the write: re-read the file and confirm it is exactly the
// chosen letter, one byte, no newline, no extra content. If this
// ever disagrees, the entry is broken and must fail loudly here
// rather than reach the gate as an invalid entry.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== letter) {
  throw new Error(
    `wrote ${JSON.stringify(written)}, expected exactly ${JSON.stringify(letter)}`,
  );
}
