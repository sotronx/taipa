import { Sound } from './unit';
import { Client, TokenAnalysis } from './client';
import { TonalWord } from './unchange/unit';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalStandaloneForms } from './unchange/metaplasm';
import { lemmatize } from './unchange/lemmatizer';
import {
  basicSyllables,
  missingSyllables,
  syllabicLoanwords,
} from './tonal/syllablelists';

/** Turn sounds into a sequence of letter-sound pairs */
export function getLetterSoundPairsSequential(
  soundSeqs: Sound[][]
): [string, string][] {
  return soundSeqs
    .flatMap((v) => {
      return v;
    })
    .map((v) => [v.toString(), v.name]);
}

/** Turn sounds into syllabic letter-sound pairs. */
export function getLetterSoundPairsSyllabic(
  soundSeqs: Sound[][]
): [string, string][][] {
  return soundSeqs.map((v) => {
    return v.map((v) => [v.toString(), v.name]);
  });
}

/** Analyze an input into syllabic letter-sound pairs. */
export function analyzeIntoSyllables(input: string) {
  if (!input) return [];
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input);
  const wrd = ta.word as TonalWord;

  const pairs = getLetterSoundPairsSyllabic(
    tla
      .morphAnalyze(wrd.literal, new TonalStandaloneForms([]))
      .map((x) => x.sounds)
  );

  return pairs;
}

/** Analyze an input into a sequence of letter-sound-pairs. */
export function analyzeIntoSequence(input: string) {
  if (!input) return [];
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input);
  const wrd = ta.word as TonalWord;

  const pairs = getLetterSoundPairsSequential(
    tla
      .morphAnalyze(wrd.literal, new TonalStandaloneForms([]))
      .map((x) => x.sounds)
  );

  return pairs;
}

/** Get the uncombining forms of a syllable. */
export function getStandaloneForms(syl: string) {
  if (!syl) return [];
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(syl);
  const wrd = ta.word as TonalWord;

  return tla
    .morphAnalyze(wrd.literal, new TonalStandaloneForms([]))
    .flatMap((mrfm) => mrfm.getForms().map((frm) => frm.literal));
}

/** Get lemmas of the word. */
export function getLemmas(input: string) {
  if (!input) return [];
  const lxLemma = lemmatize(input);
  return lxLemma.getLemmas().map((x) => x.literal);
}

/** Join the letters in each tuple. */
export function pairsToString(pairs: [string, string][]) {
  const chars: string[] = pairs.map((pair: [string, string]) => {
    return pair[0];
  });
  const syl = chars.join('');
  return syl;
}

/** Get the stem of a word. */
export function getStem(input: string) {
  const lxLemma = lemmatize(input);
  const literal = lxLemma.word.literal;
  const ending = lxLemma.getInflectionalEnding();
  if (literal.length - ending.length != 0) {
    return literal.substring(0, literal.length - ending.length);
  }
  return '';
}

/** Get the inflectional suffix of a word. */
export function getDesinence(input: string) {
  const lxLemma = lemmatize(input);
  return lxLemma.getInflectionalEnding();
}

/** Get the syllables whose substring is matched. */
export function getSyllablesInclude(input: string) {
  const syls: string[] = [];
  basicSyllables.forEach((it) => {
    if (it.includes(input)) {
      syls.push(it);
    }
  });
  missingSyllables.forEach((it) => {
    if (it.includes(input)) {
      syls.push(it);
    }
  });
  syllabicLoanwords.forEach((it) => {
    if (it.includes(input)) {
      syls.push(it);
    }
  });
  return syls;
}

/** Get the syllables that matched from the beginning. */
export function getSyllablesStart(input: string) {
  const syls: string[] = [];
  basicSyllables.forEach((it) => {
    if (it.startsWith(input, 0)) {
      syls.push(it);
    }
  });
  missingSyllables.forEach((it) => {
    if (it.startsWith(input, 0)) {
      syls.push(it);
    }
  });
  syllabicLoanwords.forEach((it) => {
    if (it.startsWith(input, 0)) {
      syls.push(it);
    }
  });
  return syls;
}

/** Get the syllables that matched to the end. */
export function getSyllablesEnd(input: string) {
  const syls: string[] = [];
  basicSyllables.forEach((it) => {
    if (it.endsWith(input, it.length)) {
      syls.push(it);
    }
  });
  missingSyllables.forEach((it) => {
    if (it.endsWith(input, it.length)) {
      syls.push(it);
    }
  });
  syllabicLoanwords.forEach((it) => {
    if (it.endsWith(input, it.length)) {
      syls.push(it);
    }
  });
  return syls;
}
