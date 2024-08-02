import { TonalLemmatizationLexeme } from './unchange/lexeme';
import { checkNumberOfLetterTonal, getBlocks } from './tonal/init';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';

import { getKanaBlocks, checkNumberOfLettersKana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { kanaLemmatizationAnalyzer } from './kana/analyzer';
import { Word, Sound } from './unit';
import { TonalStandaloneForms } from './unchange/metaplasm';

export class TokenAnalysis {
  /** Analyzed token. */
  word: Word = new Word();
  /** Base forms of the word. */
  lemmas: Array<Word> = new Array();
  /** Inflectional suffix. */
  inflectionalEnding: string = '';
  /** sound sequences. */
  soundSequences: Array<Sound[]> = new Array();
  /**
   * Syllabic block or syllabogram sequences with tone letters.
   * Multiple sequences could be pushed into this array of strings.
   */
  blockSequences: string[] = [];
  /** Uncombining form sequences. */
  uncombiningSequences: Array<string[]> = new Array(); // uncombining form sequences
}

export class Client {
  processKana(str: string): TokenAnalysis {
    checkNumberOfLettersKana();
    // kana
    let ta: TokenAnalysis = new TokenAnalysis();
    if (str) {
      const ka = kanaLemmatizationAnalyzer;
      const morphemes: KanaUncombiningMorpheme[] = ka.morphAnalyze(str);
      ta.blockSequences = getKanaBlocks(morphemes);

      for (const m of morphemes) {
        ta.soundSequences.push(m.sounds);
      }
    }

    return ta;
  }

  processTonal(str: string): TokenAnalysis {
    checkNumberOfLetterTonal();
    // tonal lurzmafjiz
    let ta: TokenAnalysis = new TokenAnalysis();
    if (str) {
      const tla = tonalLemmatizationAnalyzer;
      const morphemes = tla.morphAnalyze(str, new TonalStandaloneForms([]));
      const lexeme: TonalLemmatizationLexeme = tla.lexAnalyze(morphemes);
      ta.word = lexeme.word;
      ta.lemmas = lexeme.getLemmas();
      ta.inflectionalEnding = lexeme.getInflectionalEnding();

      ta.blockSequences = getBlocks(morphemes);

      for (const m of morphemes) {
        ta.soundSequences.push(m.sounds);
        // TODO: first free tone to fourth. first checked tone to eighth
        ta.uncombiningSequences.push(m.getForms().map((it) => it.literal));
      }
    }

    return ta;
  }
}
