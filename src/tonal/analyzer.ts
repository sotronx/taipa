import { Analyzer } from '../analyzer';
import {
  TonalLemmatizationLexemeMaker,
  TonalLemmatizationLexeme
} from './lexeme';
import { AlphabeticGrapheme, GraphemeMaker } from '../unit';
import { lowerLettersTonal } from './version2';
import {
  TonalUncombiningMorphemeMaker,
  TonalUncombiningMorpheme
} from './morpheme';

/** Analyze a string into graphemes, morphemes, or lexeme. */
export class TonalLemmatizationAnalyzer extends Analyzer {
  /**
   * Analyze a string into graphemes. Graphemic analysis.
   * @param str a string
   */
  graphAnalyze(str: string): AlphabeticGrapheme[] {
    const gm = new GraphemeMaker(lowerLettersTonal);
    return gm.makeGraphemes(str);
  }

  morphAnalyze(str: string): TonalUncombiningMorpheme[];
  morphAnalyze(
    graphemes: Array<AlphabeticGrapheme>
  ): TonalUncombiningMorpheme[];
  /**
   * Analyze a string or graphemes into morphemes. Morphological analysis.
   * @param x a string or graphemes
   */
  morphAnalyze(x: string | Array<AlphabeticGrapheme>) {
    // morphological analysis
    let gs: AlphabeticGrapheme[] = [];
    if (typeof x == 'object') {
      gs = x;
    } else if (typeof x == 'string') {
      gs = this.graphAnalyze(x);
    }

    const mm = new TonalUncombiningMorphemeMaker();
    return mm.makeMorphemes(gs);
  }

  lexAnalyze(str: string): TonalLemmatizationLexeme;
  lexAnalyze(
    morphemes: Array<TonalUncombiningMorpheme>
  ): TonalLemmatizationLexeme;
  /**
   * Analyze a string or morphemes into a lexeme. Lexical analysis.
   * @param x a string or uncombining morphemes
   */
  lexAnalyze(
    x: string | Array<TonalUncombiningMorpheme>
  ): TonalLemmatizationLexeme {
    // lexical analysis
    let ms: Array<TonalUncombiningMorpheme> = [];
    if (typeof x == 'object') {
      ms = x;
    } else if (typeof x == 'string') {
      ms = this.morphAnalyze(x);
    }

    const lm = new TonalLemmatizationLexemeMaker();
    return lm.makeLexemes(ms);
  }
}
