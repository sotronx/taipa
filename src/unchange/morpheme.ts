import { MatchedPattern, Morpheme } from '../unit';
import { MorphemeMaker } from '../maker';
import {
  freeAllomorphStandaloneRules,
  checkedAllomorphs,
  freeAllomorphs,
  ZeroAllomorph,
  AllomorphX,
  TonalLetterTags,
  lowerLettersTonal,
  TonalSpellingTags,
  standaloneRulesAy,
  CheckedAllomorph,
  Allomorph,
  freeToneLettersTonal,
  initialConsonantsTonal,
  finalConsonantsPtkhppttkkhhTonal,
} from '../tonal/tonalres';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../unit';
import { TonalSoundGenerator } from '../tonal/soundgen';
import { isInSyllableTable } from '../tonal/syllablelists';
import {
  smMnngHF,
  smMnngHWx,
  smBgkpF,
  smJlsF,
  smJsW,
  smBgkpWx,
  smMngFywxz,
  smIK,
  smVowelMng,
  smLWx,
} from './matcher';
import {
  epentheticLetters,
  fourthToEighthFinalConsonants,
  nasalInitialConsonants,
  finalConsonantsBgjlsbbggjjllss,
  finalConsonantsForBgjlsbbggjjllss,
  voicedVoicelessFinalConsonants,
} from '../tonal/collections';
import {
  LastSyllableForms,
  PrecedingAyStandalone,
  PrecedingExStandalone,
  TonalStandaloneForms,
  TransfixStandalone,
  StandaloneFormsIetfIetwToIkIkk,
} from './metaplasm';
import {
  TonalCombiningMetaplasm,
  RemovingEpenthesisOfAy,
  TonalStandaloneMetaplasm,
} from '../metaplasm';
import { TonalSyllable } from './unit';

export function syllabifyTonal(
  letters: Array<AlphabeticLetter>,
  beginOfSyllable: number
) {
  // get the longest matched syllable pattern

  let literal = '';
  let matched = '';
  let begin: number = 0;
  let ltrs: Array<string> = new Array();
  let matchedLtrs: Array<string> = new Array();
  let literalLexicalRoot4th8th = ''; // could be an 4th or 8th root
  let literalLexicalRootEighth = ''; // specific an 8th root

  for (let i = beginOfSyllable; i < letters.length; i++) {
    literal = literal + letters[i].literal;
    ltrs.push(letters[i].literal);
    // console.log(`begining of the loop: ${literal}. ${ltrs}`);
    const had = fourthToEighthFinalConsonants.has(letters[i].literal);
    if (
      i + 1 < letters.length &&
      had &&
      (TonalLetterTags.w === letters[i + 1].literal ||
        TonalLetterTags.x === letters[i + 1].literal)
    ) {
      const got = fourthToEighthFinalConsonants.get(letters[i].literal);
      // restore the lexical roots for 4th final consonants, which is 8th finals
      // in case of absent 8th roots, 4th roots should also be restored
      // e.g. koehwlaih, jiwpowcitwlaw, khihwlih
      // in case of absent 4th roots for an triplet
      // e.g. juahxjuahwjuahh. there is no juah present in syllable table
      // 4th and 8th roots for 3rd checked tones
      if (got) {
        // since it is 4th finals, length of 4th final is one, just slice one character
        literalLexicalRootEighth =
          literalLexicalRoot4th8th.slice(0, literalLexicalRoot4th8th.length) +
          got;
        // console.log(`literalRoot4thFinal: ${literalRoot4thChecked}, 8th: ${literalRoot8thChecked}`);
        // the below fourth should go after the above eighth
        literalLexicalRoot4th8th =
          literalLexicalRoot4th8th + letters[i].literal;
      }
    } else {
      literalLexicalRoot4th8th = literalLexicalRoot4th8th + letters[i].literal;
    }

    if (
      isInSyllableTable(literal) &&
      freeToneLettersTonal.includes(letters[i].literal)
    ) {
      // console.log(`i: ${i}, literal: ${literal}, tone: ${letters[i].literal}, letters[i+1]: ${letters[i + 1].literal}`)
      if (begin === beginOfSyllable) {
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      }
      break;
    } else if (
      (isInSyllableTable(literalLexicalRoot4th8th) ||
        isInSyllableTable(literalLexicalRootEighth)) &&
      finalConsonantsPtkhppttkkhhTonal.includes(letters[i].literal)
    ) {
      // console.log(`i: ${i}, literal: ${literal}, root4th8th: ${literalLexicalRoot4th8th}, root8th: ${literalLexicalRootEighth}, stopFinalConsonant: ${letters[i].literal}`);
      // console.log(`begin: ${begin}, beginOfSyllable: ${beginOfSyllable}`);
      if (begin === beginOfSyllable) {
        matched = literal; // assign literal instead of literalRoot4thFinal
        Object.assign(matchedLtrs, ltrs);
      }
      break;
    } else if (freeToneLettersTonal.includes(letters[i].literal)) {
      // check tonals is the subset of free tonals

      // console.log(`i: ${i}, literal: ${literal}, letters[i].literal, ${letters[i].literal}`);

      // when there are tonals

      if (
        literal.length > 1 &&
        letters[i] &&
        letters[i - 1] &&
        (smBgkpF(letters[i - 1].literal, letters[i].literal) ||
          smBgkpWx(letters[i - 1].literal, letters[i].literal) ||
          smJlsF(letters[i - 1].literal, letters[i].literal) ||
          smJsW(letters[i - 1].literal, letters[i].literal) ||
          smLWx(letters[i - 1].literal, letters[i].literal))
      ) {
        // b, g, bb, gg, l, j, s, ll, ss need to be handled in TonalCombiningMorpheme.assignAllomorph
        // this combining form is not present in the pool.
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
        break;
      } else if (
        literal.length > 2 &&
        letters[i] &&
        letters[i - 1] &&
        letters[i - 2] &&
        (smMnngHWx(
          letters[i - 2].literal,
          letters[i - 1].literal,
          letters[i].literal
        ) ||
          smMnngHF(
            letters[i - 2].literal,
            letters[i - 1].literal,
            letters[i].literal
          ))
      ) {
        // in case of -mhw.
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
        break;
      } else if (
        literal.length > 1 &&
        letters[i] &&
        letters[i - 1] &&
        smMngFywxz(letters[i - 1].literal, letters[i].literal)
      ) {
        // in case of -iengz, -uamz.
        // matched = literal;
        // Object.assign(matchedLtrs, ltrs);
        // break;
      }

      // tone change of free allomorphs
      const rulesFa = freeAllomorphStandaloneRules.get(letters[i].literal);
      const tnlsFa = !rulesFa ? [] : rulesFa.map((x) => x.toString());
      // tone sandhi of ay
      const rulesAy = standaloneRulesAy.get(letters[i].literal);
      const tnlsAy = !rulesAy ? [] : rulesAy.map((x) => x.toString());
      // merge the above twoo arrays
      const tnls = tnlsFa.concat(
        tnlsAy.filter((item) => tnlsFa.indexOf(item) < 0)
      );
      // console.log(`literal: ${literal}`);
      if (tnls.length > 0) {
        for (let t of tnls) {
          // console.log(literal, t.toString(), tnls.length, tnls);
          if (
            isInSyllableTable(
              letters
                .slice(beginOfSyllable, i)
                .map((x) => x.literal)
                .join('') + t
            )
          ) {
            // this combining form is not present in the pool,
            // but its uncombining forms are. e.g. aw.
            matched = literal;
            Object.assign(matchedLtrs, ltrs);
            break;
          }
        }
        if (matched.length > 0 && matchedLtrs.length > 0) break;
      } else {
        // no uncombining forms for this combining form. e.g. ax.
        matched = '';
        matchedLtrs = [];
      }
    } else if (isInSyllableTable(literal)) {
      matched = literal;
      Object.assign(matchedLtrs, ltrs);
      begin = beginOfSyllable;
      // console.log(matched);
    } else {
      // console.log('no matched for syllabifyTonal:' + ltrs);

      // when there are no tone letters

      if (finalConsonantsBgjlsbbggjjllss.includes(letters[i].literal)) {
        // for the syllables with sandhi final consonants that are not present in syllable tables
        const literalWithoutFinal = letters
          .map((val, ind, arr) =>
            ind < i && ind >= beginOfSyllable ? arr[ind].literal : ''
          )
          .join('');
        const gotFinalConsonants = finalConsonantsForBgjlsbbggjjllss.get(
          letters[i].literal
        );
        if (gotFinalConsonants) {
          // check if at least one uncombinging form present
          const isUncombingFormPresent = gotFinalConsonants
            .map((it) => isInSyllableTable(literalWithoutFinal + it))
            .reduce((prev, curr, ind, arr) => prev || curr);
          // console.log(literal,gotFinalConsonants,isUncombingFormPresent,literalWithoutFinal,`i: ${i}`);

          if (isUncombingFormPresent) {
            // at least one uncombining form is present
            matched = literal;
            Object.assign(matchedLtrs, ltrs);
          }
        }
      } else if (smIK(ltrs[ltrs.length - 2], ltrs[ltrs.length - 1])) {
        // match for -ik
        matched = literal;
        Object.assign(matchedLtrs, ltrs);
      } else if (smVowelMng(ltrs[ltrs.length - 2], ltrs[ltrs.length - 1])) {
        // match for -ieng, -uam
        // matched = literal;
        // Object.assign(matchedLtrs, ltrs);
      } else if (!freeToneLettersTonal.includes(letters[i].literal)) {
        // free first tone without a free tonal
        const rules = freeAllomorphStandaloneRules.get(TonalLetterTags.zero);
        const tnls = !rules ? [] : rules;
        for (let t of tnls) {
          // append second tonal letter
          // check the uncombining forms
          if (isInSyllableTable(literal + t.toString())) {
            // if the free first tone's lemma is included
            matched = literal;
            Object.assign(matchedLtrs, ltrs);
            //break;
          }
        }
      }

      // when there is no matched lexcial roots for this syllable, we still assign begin
      begin = beginOfSyllable;
    }
  }

  // console.log(`literal: ${literal}. matched: ${matched}`);
  // console.log(matchedLtrs);

  if (matched.length > 0 && literal.length > matched.length) {
    // when ~ay is longer than ~a by one letter y
    // for those first tone lexcial roots that are present
    matched = '';
    matchedLtrs = [];
  }

  // console.log('matched: ' + matched);
  const tsg = new TonalSoundGenerator();
  //console.log('matched: ' + matched)
  let list: Array<Sound[]> = new Array();

  if (matched.length > 0) {
    list = tsg.generate(matchedLtrs);
  } else {
    if (ltrs.length == 3 && ltrs[1] === 'a' && ltrs[2] === 'y') {
      const rea = new RemovingEpenthesisOfAy();
      const done = rea.applyToString(literal);
      //console.log(done.toString())
      if (epentheticLetters.includes(ltrs[0]) && isInSyllableTable(done)) {
        list = tsg.generate(ltrs);
      }
    }
  }

  // console.log(list);

  let matchedLen = 0;
  let mp = new MatchedPattern();

  for (let m in list) {
    const min = Math.min(letters.length - beginOfSyllable, list[m].length);
    if (list[m].length == min) {
      for (let n = 0; n < min; n++) {
        if (list[m][n] != undefined) {
          if (letters[beginOfSyllable + n].literal === list[m][n].toString()) {
            //console.log(syllabary[m])
            if (n + 1 == min && min > matchedLen) {
              // to make sure it is longer than previous patterns
              // last letter matched for the pattern
              matchedLen = min;
              // copy the matched letters
              for (let q = 0; q < matchedLen; q++) {
                mp.letters[q] = letters[beginOfSyllable + q];
              }

              // copy the pattern of sounds
              mp.pattern = list[m];
              //console.log(syllabary.list[m])
              //console.log(mp.letters)
            }
          } else {
            break;
          }
        }
      }
    }
  }

  return mp;
}

/** A syllable and its uncombining forms. */
export class TonalStandaloneMorpheme extends Morpheme {
  syllable: TonalSyllable;
  allomorph: Allomorph;
  private metaplasm: TonalCombiningMetaplasm;
  private forms: TonalSyllable[];
  sounds: Array<Sound>;

  constructor(
    syllable: TonalSyllable,
    sounds: Array<Sound>,
    metaplasm: TonalCombiningMetaplasm
  ) {
    super();
    this.syllable = syllable;
    this.metaplasm = metaplasm;

    // assign allomorph for each syllable
    this.sounds = sounds;
    this.allomorph = this.assignAllomorph(this.sounds);
    this.forms = this.metaplasm.apply(this.sounds, this.allomorph);
  }

  getForms(): TonalSyllable[] {
    return this.forms;
  }

  addForms(syllables: TonalSyllable[]) {
    if (syllables && syllables.length == 1) {
      this.forms.push(syllables[0]);
    }
  }

  private assignAllomorph(letters: Sound[]): Allomorph {
    let allomorph: Allomorph = new ZeroAllomorph();
    // assign the matched allomorph for this syllable
    let las: Array<Allomorph> = []; // list of allomorphs

    const s: TonalSyllable = new TonalSyllable(
      letters.map((it) => new AlphabeticLetter(it.characters))
    );
    const keys = Array.from(checkedAllomorphs.keys());
    for (let k = 0; k < keys.length; k++) {
      const am = checkedAllomorphs.get(keys[k]);
      if (am && am instanceof CheckedAllomorph) {
        if (am.tonal) {
          if (
            am.tonal.toString() === s.lastLetter.literal &&
            am.final.toString() === s.lastSecondLetter.literal
          ) {
            las.push(am);
            break;
          } else {
            if (am.final.toString() === s.lastLetter.literal) {
              las.push(am);
              break;
            }
          }
        }
      }
    }

    if (las.length > 0) {
      // there is only one match after processing, we just assign it
      const ret = las.shift();
      if (ret) return ret;
    }

    // after matching with checked allomorphs, we go on matching free allomorphs
    las = [];
    if (freeAllomorphs.has(s.lastLetter.literal)) {
      const am = freeAllomorphs.get(s.lastLetter.literal);
      const stpFnls = letters.filter(
        (it) => it.name === TonalSpellingTags.stopFinalConsonant
      );
      const chkttnls = letters.filter(
        (it) => it.name === TonalSpellingTags.checkedTone
      );

      if (
        am &&
        !(
          stpFnls.length == 1 &&
          stpFnls[0].toString().length == 2 &&
          chkttnls.length == 1
        )
      ) {
        // when 8th finals *not* followed by a tonal
        las.push(am);
      } else las.push(new Allomorph());
    }

    if (las.length == 0) {
      // tone 1 has no allomorph
      allomorph = new ZeroAllomorph();
    } else if (las.length == 1) {
      // are there multiple allomorphs? there should be only one.
      for (let i = 0; i < las.length; i++) {
        if (las[i].tonal.toString() === new AllomorphX().tonal.toString()) {
          // this syllable is already in base form
          // in order to display this inflectional ending, we have to assign
          allomorph = las[i];
        } else {
          allomorph = las[i];
        }
      }
    }
    return allomorph;
  }
}

export class TonalStandaloneMorphemeMaker extends MorphemeMaker {
  private sandhiFinals = new Array<AlphabeticLetter>();
  private sandhiFinalTonals = new Array<{
    index: number;
    letters: AlphabeticLetter[];
  }>();
  private metaplasm: TonalStandaloneMetaplasm;

  constructor(metaplasm: TonalStandaloneMetaplasm) {
    super();
    this.metaplasm = metaplasm;
  }

  protected createArray() {
    return new Array<TonalStandaloneMorpheme>();
  }

  protected createMorpheme(
    matched: MatchedPattern,
    metaplasm: TonalStandaloneMetaplasm
  ) {
    const tum: TonalStandaloneMorpheme = new TonalStandaloneMorpheme(
      new TonalSyllable(matched.letters),
      matched.pattern,
      metaplasm
    );
    return tum;
  }

  private isCombiningAy(syllables: MatchedPattern[]) {
    const keysAy = Array.from(standaloneRulesAy.keys());

    if (syllables.length >= 2) {
      const nslFnlLast2nd = syllables[syllables.length - 2].pattern.filter(
        (it) => it.name === TonalSpellingTags.nasalFinalConsonant
      );
      const stpFnlH = syllables[syllables.length - 2].pattern.filter(
        (it) =>
          it.name === TonalSpellingTags.stopFinalConsonant &&
          it.toString() === TonalLetterTags.h
      );
      const tnl = syllables[syllables.length - 2].pattern.filter(
        (it) =>
          (it.name === TonalSpellingTags.nasalFinalConsonant ||
            it.name === TonalSpellingTags.checkedTone) &&
          keysAy.includes(it.toString())
      );
      const nslInitLast = syllables[syllables.length - 1].pattern.filter(
        (it) =>
          it.name === TonalSpellingTags.initialConsonant &&
          nasalInitialConsonants.includes(it.toString())
      );

      // ending ay
      const endingAy =
        syllables[syllables.length - 1].lastSecondLetter.literal ===
          TonalLetterTags.a &&
        syllables[syllables.length - 1].lastLetter.literal ===
          TonalLetterTags.y;
      // ending a is the proceeding form of ay
      const endingA =
        syllables[syllables.length - 1].lastLetter.literal ===
        TonalLetterTags.a;

      if (
        !(
          nslFnlLast2nd.length == 1 &&
          stpFnlH.length == 1 &&
          tnl.length == 1
        ) &&
        (endingAy || endingA)
      ) {
        // bypass sandhi t. e.g. vunghf~.
        if (nslInitLast.length == 1 && nslFnlLast2nd.length == 0) {
          // in case of words like vutfngay
          return false;
        }

        const initLast = syllables[syllables.length - 1].pattern.filter(
          (it) =>
            it.name === TonalSpellingTags.initialConsonant &&
            initialConsonantsTonal.includes(it.toString())
        );
        const mdlLast = syllables[syllables.length - 1].pattern.filter(
          (it) => it.name === TonalSpellingTags.vowel
        );

        if (
          stpFnlH.length == 0 &&
          nslFnlLast2nd.length == 1 &&
          initLast.length == 1 &&
          nslFnlLast2nd[0].toString() != initLast[0].toString()
        ) {
          // in case of words like angzchuay, ngzchuay
          return false;
        } else if (initLast.length == 1 && mdlLast.length > 1) {
          // in case of suafluay, suafsuay
          return false;
        }
        return true;
      }
    }

    return false;
  }

  private isCombiningEx(syllables: MatchedPattern[]) {
    // ending ex
    const endingEx =
      syllables[syllables.length - 1].lastSecondLetter.literal ===
        TonalLetterTags.e &&
      syllables[syllables.length - 1].lastLetter.literal === TonalLetterTags.x;
    if (endingEx) {
      return true;
    }
    return false;
  }

  private isTransfixInflection(syllables: MatchedPattern[]) {
    // TODO: there are not many of them. make a tiny dictionary to cover the ocurrences
    const thirds = syllables
      .map((it) =>
        it.pattern.filter((ltr) => ltr.toString() === TonalLetterTags.w)
      )
      .map((seq) => seq.map((ltr) => ltr.toString()))
      .filter((arr) => arr.length > 0);
    const endingAw: boolean =
      syllables[syllables.length - 1].lastSecondLetter.literal ===
      TonalLetterTags.a;
    if (syllables.length > 1 && thirds.length == syllables.length && endingAw)
      return true;
    return false;
  }

  private isDoublet(syllables: MatchedPattern[]) {
    if (syllables.length == 2) {
      const stems = syllables
        .map((it) =>
          it.pattern.filter((s) => s.name !== TonalSpellingTags.freeTone)
        )
        .map((seq) => seq.map((s) => s.toString()).join(''));

      // TODO: add checks for tone group
      const tnls = syllables
        .map((it) =>
          it.pattern.filter((s) => s.name === TonalSpellingTags.freeTone)
        )
        .map((seq) => seq.map((ltr) => ltr.toString()).join(''));

      // compare 2 strings/lexical stems
      if (stems[0] === stems[1]) return true; // identical
    }
    return false;
  }

  private isTriplet(syllables: MatchedPattern[]) {
    if (syllables.length == 3) {
      const stems = syllables
        .map((it) =>
          it.pattern.filter(
            (ltr) =>
              ltr.name !== TonalSpellingTags.freeTone &&
              ltr.name !== TonalSpellingTags.checkedTone
          )
        )
        .map((seq) => seq.map((ltr) => ltr.toString()).join(''));

      const fnls = syllables
        .map((it) =>
          it.pattern.filter(
            (s) => s.name === TonalSpellingTags.stopFinalConsonant
          )
        )
        .map((seq) => seq.map((s) => s.toString()).join(''));

      // TODO: add checks for tone group
      const tnls = syllables
        .map((it) =>
          it.pattern.filter((s) => s.name === TonalSpellingTags.freeTone)
        )
        .map((seq) => seq.map((s) => s.toString()).join(''));

      // compare 3 strings/lexical stems
      if (fnls && fnls.length > 0) {
        // stems of checked tones
        if (stems[0] === stems[1] && stems[0] + fnls[0] === stems[2])
          return true;
      } else {
        // stems of free tones
        if (stems.every((v, i, a) => v === a[a.length - 1])) return true; // identical
      }
    }
    return false;
  }

  /** Check if ~ik or ~ikk available for the ~iet syllable. */
  private isIKIkkAvailableRimeIet(syllables: MatchedPattern[]) {
    if (syllables.length >= 2) {
      const vs = syllables[syllables.length - 2].pattern.filter(
        (i) => i.name === TonalSpellingTags.vowel
      );
      const fcs = syllables[syllables.length - 2].pattern.filter(
        (i) => i.name === TonalSpellingTags.stopFinalConsonant
      );
      const ts = syllables[syllables.length - 2].pattern.filter(
        (i) => i.name === TonalSpellingTags.checkedTone
      );
      if (
        vs.length == 2 &&
        fcs.length == 1 &&
        ts.length == 1 &&
        vs[0].toString() === TonalLetterTags.i &&
        vs[1].toString() === TonalLetterTags.e &&
        fcs[0].toString() === TonalLetterTags.t &&
        (ts[0].toString() === TonalLetterTags.f ||
          ts[0].toString() === TonalLetterTags.w)
      ) {
        // TODO: check if the standalone forms present in syllable table.
        return true;
      }
    } else if (syllables.length == 1) {
      // standalone syllables ietw and ietf should be handled in this block
    }
    return false;
  }

  protected preprocess(
    graphemes: Array<AlphabeticGrapheme>
  ): AlphabeticLetter[] {
    let ltrs = new Array<AlphabeticLetter>();

    ltrs = graphemes.map((it) => it.letter);

    return ltrs;
  }

  protected postprocess(
    matched: MatchedPattern[]
  ): Array<TonalStandaloneMorpheme> {
    const morphemes = this.createArray();

    for (let i = 0; i < matched.length; i++) {
      const ptn = matched[i];

      if (this.isCombiningAy(matched) && matched.length == 2) {
        // ~fa, ~xa, fay, or ~xay. only 2 syllables
        morphemes.push(this.createMorpheme(ptn, new PrecedingAyStandalone()));
      } else if (
        this.isCombiningAy(matched) &&
        (matched.length == 3 || matched.length == 4)
      ) {
        // ~fa, ~xa, fay, or ~xay. more than 2 syllables
        if (i == matched.length - 2 || i == matched.length - 1)
          // the last 2 syllables
          morphemes.push(this.createMorpheme(ptn, new PrecedingAyStandalone()));
        else if (i == matched.length - 3)
          // the first syllable of a 3-syllable word or the 2nd syllable of a 4-syllable word
          morphemes.push(
            this.createMorpheme(
              ptn,
              new TonalStandaloneForms(matched[i + 1].pattern)
            )
          );
        else if (matched.length == 4 && i == matched.length - 4)
          // the first syllable of a 4-syllable word
          morphemes.push(
            this.createMorpheme(
              ptn,
              new TonalStandaloneForms(matched[i + 1].pattern)
            )
          );
      } else if (this.isCombiningEx(matched) && matched.length == 2) {
        // ~ex
        morphemes.push(this.createMorpheme(ptn, new PrecedingExStandalone()));
      } else if (this.isTriplet(matched)) {
        // triplet construction. pass the last syllable as an argument
        morphemes.push(
          this.createMorpheme(ptn, new LastSyllableForms(matched[2].pattern))
        );
      } else if (this.isDoublet(matched)) {
        // doublet construction. pass the last syllable as an argument
        morphemes.push(
          this.createMorpheme(ptn, new LastSyllableForms(matched[1].pattern))
        );
      } else if (this.isTransfixInflection(matched)) {
        morphemes.push(this.createMorpheme(ptn, new TransfixStandalone()));
      } else {
        if (i < matched.length - 1) {
          // when the target syllable is not the last one in a word.
          // pass the letters of the following syllable to unchange letters accordingly
          morphemes.push(
            this.createMorpheme(
              ptn,
              new TonalStandaloneForms(matched[i + 1].pattern)
            )
          );
        } else {
          // no sandhi letters to unchange, just pass an empty array
          // the metaplasm argument would be either TonalUncombiningForms or PhrasalVerbParticleUncombining
          morphemes.push(this.createMorpheme(ptn, this.metaplasm));
        }
        if (this.isIKIkkAvailableRimeIet(matched) && i < matched.length - 1) {
          const forms = this.createMorpheme(
            ptn,
            new StandaloneFormsIetfIetwToIkIkk()
          ).getForms();
          if (forms && forms.length == 1) {
            morphemes[i].addForms(forms);
          }
        }
      }
    }

    return morphemes;
  }

  makeMorphemes(graphemes: Array<AlphabeticGrapheme>) {
    const ltrs = this.preprocess(graphemes);
    const ptns = this.make(ltrs, syllabifyTonal);
    const ms = this.postprocess(ptns);
    // TODO: to further check if the syllable is valid, given the following syllable

    return ms;
  }
}

/** A syllable and its sound changing forms. */
export class TonalSoundUnchangingMorpheme extends Morpheme {
  syllable: TonalSyllable;
  sounds: Array<Sound>;

  constructor(syllable: TonalSyllable, sounds: Sound[]) {
    super();
    this.syllable = syllable;
    this.sounds = sounds;
  }

  get lastSecondLetter() {
    return this.sounds[this.sounds.length - 2].toString();
  }

  uninsertNasal() {
    const ltrs = this.sounds;
    ltrs.shift();
    return [
      new TonalSyllable(ltrs.map((it) => new AlphabeticLetter(it.characters))),
    ];
  }

  toVoicelessFinal() {
    // unvoiced
    if (
      voicedVoicelessFinalConsonants.has(
        this.sounds[this.sounds.length - 2].toString()
      )
    ) {
      const fnl = voicedVoicelessFinalConsonants.get(
        this.sounds[this.sounds.length - 2].toString()
      );
      if (fnl) {
        const s: TonalSyllable = new TonalSyllable(
          this.sounds.map((it) => new AlphabeticLetter(it.characters))
        );
        s.replaceLetter(s.letters.length - 2, lowerLettersTonal.get(fnl));
        return [s];
      }
    }
    return [];
  }

  unmutateInitialConsonant(initial: Sound) {
    if (
      initial.name === TonalSpellingTags.initialConsonant &&
      initial.toString() === TonalLetterTags.t
    ) {
      // l- -> t-
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map((it) => new AlphabeticLetter(it.characters))
      );
      s.replaceLetter(0, lowerLettersTonal.get(TonalLetterTags.t));
      return [s];
    }
    return [];
  }

  unmutateFinalConsonant(initial: Sound) {
    if (
      initial.name === TonalSpellingTags.initialConsonant &&
      initial.toString() === TonalLetterTags.g
    ) {
      // gg -> tt
      const syl: TonalSyllable = new TonalSyllable(
        this.sounds.map((it) => new AlphabeticLetter(it.characters))
      );
      const idx = this.sounds.findIndex(
        (i) => i.name === TonalSpellingTags.stopFinalConsonant
      );
      syl.replaceLetter(idx, lowerLettersTonal.get(TonalLetterTags.tt));
      return [syl];
    }

    return [];
  }

  uninfect() {
    const n = this.sounds.filter(
      (i) => i.name === TonalSpellingTags.nasalization
    );
    if (n.length == 1) {
      let ltrs = this.sounds.filter(
        (i) => i.name !== TonalSpellingTags.nasalization
      );
      const s: TonalSyllable = new TonalSyllable(
        ltrs.map((it) => new AlphabeticLetter(it.characters))
      );
      return [s];
    }

    return [];
  }
}

export class TonalSoundUnchangingMorphemeMaker extends MorphemeMaker {
  constructor() {
    super();
  }

  protected createArray() {
    return new Array<TonalSoundUnchangingMorpheme>();
  }

  protected createMorpheme(match: MatchedPattern) {
    const tcm = new TonalSoundUnchangingMorpheme(
      new TonalSyllable(match.letters),
      match.pattern
    );
    return tcm;
  }

  private postprocess(
    matches: MatchedPattern[]
  ): Array<TonalSoundUnchangingMorpheme> {
    let morphemes = this.createArray();
    for (let i in matches) {
      morphemes.push(this.createMorpheme(matches[i]));
    }
    return morphemes;
  }

  makeMorphemes(
    graphemes: Array<AlphabeticGrapheme>
  ): TonalSoundUnchangingMorpheme[] {
    const ltrs = graphemes.map((it) => it.letter);
    const ptrns = this.make(ltrs, syllabifyTonal);
    const ms = this.postprocess(ptrns);

    return ms;
  }
}
