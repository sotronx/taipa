import { LexemeMaker, Lexeme } from '../unit';
import {
  TonalCombiningMorpheme,
  TonalSoundChangingMorpheme,
  TonalSoundUnchangingMorpheme,
} from './morpheme';
import {
  TonalWord,
  AllomorphicEnding,
  FreeAllomorphicEnding,
  CheckedAllomorphicEnding,
} from '../tonal/lexeme';
import {
  Allomorph,
  FreeAllomorph,
  CheckedAllomorph,
  TonalSoundTags,
  TonalLetterTags,
} from '../tonal/version2';
import { TonalSyllable } from '../tonal/morpheme';
import { Sound } from '../unit';
import {
  TonalInflectionMetaplasm,
  TonalInsertionMetaplasm,
  TonalInfectionMetaplasm,
  TonalUnmutationMetaplasm,
  TonalUninfectionMetaplasm,
  TonalMutationMetaplasm,
} from '../metaplasm';

/** A word and its inflected forms. */
export class TonalInflectionLexeme extends Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();
  private allomorphicEnding: AllomorphicEnding;
  // TODO: should a member variable root-affix be added and passed to metaplasm. check out member sounds in morpheme

  constructor(
    morphemes: Array<TonalCombiningMorpheme>,
    metaplasm: TonalInflectionMetaplasm
  ) {
    super();

    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) {
      if (morphemes[morphemes.length - 1]) {
        // tonal ending needs to be assigned to sandhi lexeme
        this.allomorphicEnding = this.assignAllomorphicEnding(
          morphemes[morphemes.length - 1].allomorph
        );
      } else {
        this.allomorphicEnding = new AllomorphicEnding();
      }
    } else {
      this.allomorphicEnding = new AllomorphicEnding();
    }

    if (morphemes.length > 0)
      this.forms = this.assignWordForms(morphemes, metaplasm);
  }

  private assignAllomorphicEnding(allomorph: Allomorph) {
    let tse: AllomorphicEnding = new AllomorphicEnding();

    if (allomorph instanceof FreeAllomorph) {
      // replace the tonal ending
      let fte = new FreeAllomorphicEnding();
      fte.allomorph = allomorph;
      tse = fte;
    } else if (allomorph instanceof CheckedAllomorph) {
      // append the tonal of the tonal ending
      let cte = new CheckedAllomorphicEnding();
      cte.allomorph = allomorph;
      tse = cte;
    }
    return tse;
  }

  getInflectionalEnding() {
    if (this.allomorphicEnding)
      return this.allomorphicEnding.allomorph.tonal.toString();
    return '';
  }

  getAllomorphicEnding() {
    if (this.allomorphicEnding) return this.allomorphicEnding;
    return '';
  }

  private assignWordForms(
    ms: Array<TonalCombiningMorpheme>,
    ti: TonalInflectionMetaplasm
  ): TonalWord[] {
    return ti.apply(ms);
  }

  getForms() {
    return this.forms;
  }
}

/** A word and its inserted forms. */
export class TonalInsertionLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundChangingMorpheme>,
    metaplasm: TonalInsertionMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  insertWith(preceding: TonalInsertionLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(x => new TonalSyllable(x.syllable.letters))
    );
    if (preceding.morphemes.length > 0) {
      const adjacentSnds =
        preceding.morphemes[preceding.morphemes.length - 1].sounds;
      let s = new Sound();
      if (
        adjacentSnds[adjacentSnds.length - 1].name ===
          TonalSoundTags.freeTonal &&
        adjacentSnds[adjacentSnds.length - 2].name === TonalSoundTags.nasalFinal
      ) {
        s = adjacentSnds[adjacentSnds.length - 2];
      } else if (
        adjacentSnds[adjacentSnds.length - 1].name === TonalSoundTags.nasalFinal
      ) {
        s = adjacentSnds[adjacentSnds.length - 1];
      }
      const syls = this.morphemes[0].insertNasal(s);

      wrd.replaceSyllable(0, syls[0]);

      return [wrd];
    }
    return [];
  }
}

/** A word and its inserted forms. */
export class TonalUninsertionLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundUnchangingMorpheme>,
    metaplasm: TonalInsertionMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  uninsertWith(preceding: TonalUninsertionLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(x => new TonalSyllable(x.syllable.letters))
    );
    if (preceding.morphemes.length > 0) {
      const adjacentSnds =
        preceding.morphemes[preceding.morphemes.length - 1].sounds;
      let s = new Sound();
      if (
        (adjacentSnds[adjacentSnds.length - 1].name ===
          TonalSoundTags.freeTonal &&
          adjacentSnds[adjacentSnds.length - 2].name ===
            TonalSoundTags.nasalFinal) ||
        adjacentSnds[adjacentSnds.length - 1].name === TonalSoundTags.nasalFinal
      ) {
        s = adjacentSnds[adjacentSnds.length - 2];
      }
      const syls = this.morphemes[0].uninsertNasal();

      wrd.replaceSyllable(0, syls[0]);

      return [wrd];
    }
    return [];
  }
}

export class TonalInfectionLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundChangingMorpheme>,
    metaplasm: TonalInfectionMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  infectWith(preceding: TonalInfectionLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(x => new TonalSyllable(x.syllable.letters))
    );
    if (
      preceding.morphemes.length > 0 &&
      preceding.morphemes[preceding.morphemes.length - 1].sounds.filter(
        i => i.name === TonalSoundTags.nasalization
      ).length > 0
    ) {
      // if there is a nasalization in the preceding word
      const syls = this.morphemes[0].infect();
      wrd.replaceSyllable(0, syls[0]);
      return [wrd];
    }
    return [];
  }
}

export class TonalUninfectionLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundUnchangingMorpheme>,
    metaplasm: TonalUninfectionMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  uninfectWith(preceding: TonalUninfectionLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(i => new TonalSyllable(i.syllable.letters))
    );
    if (preceding.morphemes.length > 0) {
      const adjacentSnds = this.morphemes[this.morphemes.length - 1].sounds;
      const n = preceding.morphemes[
        preceding.morphemes.length - 1
      ].sounds.filter(i => i.name === TonalSoundTags.nasalization);

      if (
        n.length == 1 &&
        adjacentSnds.filter(it => it.name === TonalSoundTags.nasalization)
          .length == 1
      ) {
        // if there is a nasalization in thre preceding word and the current word
        wrd.replaceSyllable(0, this.morphemes[0].uninfect()[0]);
        return [wrd];
      }
    }
    return [];
  }
}

/** A word and its mutated forms. */
export class TonalMutationLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundChangingMorpheme>,
    metaplasm: TonalMutationMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  mutateWith(following: TonalMutationLexeme) {
    const wrd = new TonalWord(
      this.morphemes.map(i => new TonalSyllable(i.syllable.letters))
    );

    if (following.morphemes.length > 0) {
      const adjacentSnds =
        following.morphemes[following.morphemes.length - 1].sounds;
      if (adjacentSnds[0].name === TonalSoundTags.initial) {
        const s = adjacentSnds[0];
        const syls = this.morphemes[
          this.morphemes.length - 1
        ].changeFinalPtkppttkk(s);

        if (syls && syls.length > 0) {
          wrd.popSyllable();
          wrd.pushSyllable(syls[0]);
        }

        return [wrd];
      }
    }
    return [];
  }
}

/** A word and its unmutated forms. */
export class TonalUnmutationLexeme implements Lexeme {
  word: TonalWord;
  private forms: Array<TonalWord> = new Array();

  constructor(
    private morphemes: Array<TonalSoundUnchangingMorpheme>,
    metaplasm: TonalUnmutationMetaplasm
  ) {
    if (morphemes.length == 0) this.word = new TonalWord([]);
    else this.word = new TonalWord(morphemes.map(x => x.syllable));

    if (morphemes.length > 0) this.forms = metaplasm.apply(morphemes);
  }

  getForms() {
    // for internal samdhi
    return this.forms;
  }

  unmutateWith(following: TonalUnmutationLexeme) {
    const snds = this.morphemes[this.morphemes.length - 1].sounds;
    const fnls = snds.filter(i => i.name === TonalSoundTags.stopFinal);
    const wrd = new TonalWord(
      this.morphemes.map(i => new TonalSyllable(i.syllable.letters))
    );

    if (following.morphemes[0].sounds[0].toString() === TonalLetterTags.g) {
      if (
        fnls[0].toString() === TonalLetterTags.gg ||
        fnls[0].toString() === TonalLetterTags.g
      ) {
        wrd.replaceSyllable(
          0,
          this.morphemes[0].unmutateFinalConsonant(
            following.morphemes[0].sounds[0]
          )[0]
        );
        return [wrd];
      }
    }
    return [];
  }
}

export class TonalInflectionLexemeMaker extends LexemeMaker {
  constructor(private metaplasm: TonalInflectionMetaplasm) {
    super();
  }

  makeLexemes(morphemes: Array<TonalCombiningMorpheme>) {
    return this.make(morphemes);
  }

  protected make(morphemes: Array<TonalCombiningMorpheme>) {
    let isInflStemWithX: boolean = false; // inflectional stem with x in the middle

    if (morphemes) {
      isInflStemWithX = this.checkFifth(morphemes);
      if (isInflStemWithX) return new TonalInflectionLexeme([], this.metaplasm);
    }

    return new TonalInflectionLexeme(morphemes, this.metaplasm);
  }

  private checkFifth(ms: Array<TonalCombiningMorpheme>): boolean {
    for (let i = 0; i < ms.length; i++) {
      if (ms[i] && ms[i].syllable.lastLetter.literal === TonalLetterTags.x) {
        if (i < ms.length - 1 && !ms[ms.length - 1].isAy()) {
          if (
            ms[ms.length - 1].syllable.lastLetter.literal === TonalLetterTags.a
          ) {
            break;
          } else {
            // tonal x can't not appear in them middle of an inflectional stem
            // if it is not preceding an ay or a
            return true;
          }
        }
      }
    }

    return false;
  }
}
