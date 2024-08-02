import { TonalStandaloneMorpheme } from './morpheme';
import { Lexeme } from '../unit';
import { FreeAllomorph, CheckedAllomorph, Allomorph } from '../tonal/tonalres';
import { TonalLemmatization } from './metaplasm';
import { LexemeMaker } from '../maker';
import {
  TonalWord,
  InflectionalEnding,
  FreeInflectionalEnding,
  CheckedInflectionalEnding,
} from './unit';

/** A word and its lemmas/base forms. */
export class TonalLemmatizationLexeme extends Lexeme {
  word: TonalWord;
  private lemmata: Array<TonalWord> = new Array(); // lexical forms. underlying forms
  private endingInflectional: InflectionalEnding;

  constructor(
    morphemes: Array<TonalStandaloneMorpheme>,
    metaplasm: TonalLemmatization
  ) {
    super();

    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map((x) => x.syllable));

    if (morphemes.length > 0) {
      if (morphemes[morphemes.length - 1].allomorph) {
        this.endingInflectional = this.assignInflectionalEnding(
          morphemes[morphemes.length - 1].allomorph
        );
      } else {
        // null inflectional ending
        this.endingInflectional = new InflectionalEnding();
      }
    } else {
      // no morphemes. null inflectional ending
      this.endingInflectional = new InflectionalEnding();
    }

    if (morphemes.length > 0)
      this.lemmata = metaplasm.apply(morphemes, this.endingInflectional);
  }

  getLemmas() {
    // this must be called after populateLemmata is called
    return this.lemmata;
  }

  getInflectionalEnding() {
    if (this.endingInflectional) return this.endingInflectional.toString();
    return '';
  }

  private assignInflectionalEnding(allomorph: Allomorph) {
    let ending: InflectionalEnding = new InflectionalEnding();
    // change allomorph to affix
    if (allomorph instanceof FreeAllomorph) {
      let fie = new FreeInflectionalEnding();
      fie.affix.tonal = allomorph.tonal;
      ending = fie;
    } else if (allomorph instanceof CheckedAllomorph) {
      let cie = new CheckedInflectionalEnding();
      cie.affix.tonal = allomorph.tonal;
      ending = cie;
    }
    // this word is already in base form, and its last syllable is checked tone
    return ending;
  }
}

export class TonalLemmatizationLexemeMaker extends LexemeMaker {
  constructor() {
    super();
  }

  makeLexemes(morphemes: Array<TonalStandaloneMorpheme>) {
    return this.make(morphemes);
  }

  protected make(morphemes: Array<TonalStandaloneMorpheme>) {
    return new TonalLemmatizationLexeme(morphemes, new TonalLemmatization());
  }
}
