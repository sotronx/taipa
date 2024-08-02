import { TonalStandaloneMetaplasm } from '../metaplasm';
import {
  TonalSyllable,
  TonalWord,
  InflectionalEnding,
  FreeInflectionalEnding,
  CheckedInflectionalEnding,
} from './unit';
import { TonalStandaloneMorpheme } from './morpheme';
import {
  Allomorph,
  FreeAllomorph,
  ZeroAllomorph,
  freeAllomorphStandaloneRules,
  CheckedAllomorph,
  TonalLetterTags,
  standaloneRulesAy,
  ZeroTonal,
  FreeTonalZ,
  FreeTonalX,
  lowerLettersTonal,
  neutralFinalConsonantsTonal,
  TonalSpellingTags,
} from '../tonal/tonalres';
import { Sound, AlphabeticLetter } from '../unit';
import { TonalLemmatizationMetaplasm } from '../metaplasm';
import {
  finalConsonantsForBgjlsbbggjjllss,
  voicedVoicelessFinalConsonants,
  nasalFinalConsonants,
  fourthToEighthFinalConsonants,
  finalConsonantsForTransfix,
  finalConsonantsForBgjlsFw,
  finalConsonantsForBglX,
} from '../tonal/collections';
import { isInSyllableTable } from '../tonal/syllablelists';

/** Returns the standalone forms of a syllable. */
export class TonalStandaloneForms extends TonalStandaloneMetaplasm {
  constructor(private soundsFollowing: Sound[]) {
    super();
  }

  private handleAssimilatedFinal(
    syllable: TonalSyllable,
    toneLetter: string
  ): TonalSyllable[] {
    const fnlsOfLemma =
      finalConsonantsForBgjlsFw.get(syllable.lastLetter.literal + toneLetter) ||
      finalConsonantsForBglX.get(syllable.lastLetter.literal + toneLetter);

    if (fnlsOfLemma) {
      const clones = fnlsOfLemma.map((it) => {
        const clone: TonalSyllable = Object.create(syllable);
        clone.replaceLetter(
          syllable.letters.length - 1,
          lowerLettersTonal.get(it.toString())
        );
        return clone;
      });
      const ret: TonalSyllable[] = [];
      clones.map((it) => ret.push(it));
      return clones;
    }
    return [];
  }

  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      if (allomorph instanceof FreeAllomorph) {
        if (allomorph instanceof ZeroAllomorph) {
          // push y to make tone 2
          // 1 to 2
          const s: TonalSyllable = new TonalSyllable(
            sounds.map((x) => new AlphabeticLetter(x.characters))
          );
          const tnltrs = freeAllomorphStandaloneRules.get('zero');
          if (tnltrs) s.pushLetter(new AlphabeticLetter(tnltrs[0].characters));
          return [s];
        } else {
          // the 7th tone has two baseforms
          const ret: TonalSyllable[] = [];
          const rules = freeAllomorphStandaloneRules.get(allomorph.toString());
          const tnltrs = !rules ? [] : rules;
          for (let i in tnltrs) {
            const s: TonalSyllable = new TonalSyllable(
              sounds.map((x) => new AlphabeticLetter(x.characters))
            );
            if (!(tnltrs[i] instanceof ZeroAllomorph)) {
              // 2 to 3. 3 to 7. 7 to 5. 3 to 5.
              // replace z with f or x
              s.popLetter();
              s.pushLetter(new AlphabeticLetter(tnltrs[i].characters));
              ret.push(s);
            } else {
              // 7 to 1
              // pop z
              s.popLetter();
              ret.push(s);
            }
          }
          return ret;
        }
      } else if (allomorph instanceof CheckedAllomorph) {
        const s: TonalSyllable = new TonalSyllable(
          sounds.map((it) => new AlphabeticLetter(it.characters))
        );

        if (allomorph.tonal.toString() === '') {
          // when the final is assimilated, an empty array will be returned
          return this.handleAssimilatedFinal(s, '');
        }

        // pop the tone letter
        // 1 to 4. 3 to 8. 2 to 4. 5 to 8.

        const tnl = s.letters[s.letters.length - 1].literal;
        const nslFnls = sounds.filter(
          (it) => it.name === TonalSpellingTags.nasalFinalConsonant
        );
        s.popLetter(); // pop out the tone letter

        if (
          nslFnls.length == 0 &&
          (tnl === TonalLetterTags.w || tnl === TonalLetterTags.x) &&
          Array.from(fourthToEighthFinalConsonants.keys()).includes(
            s.lastLetter.literal
          )
        ) {
          // in case of no internal sandhi
          const fnl = s.lastLetter.literal;
          s.popLetter(); // pop the 4th final consonant
          const got = fourthToEighthFinalConsonants.get(fnl);
          if (got) {
            if (
              isInSyllableTable(s.literal + lowerLettersTonal.get(got).literal)
            ) {
              // push the 8th final consonant if it is present in syllable table
              s.pushLetter(lowerLettersTonal.get(got));
            } else {
              // if (
              //   s.letters.length === 2 &&
              //   s.letters[0].literal === TonalLetterTags.t &&
              //   s.letters[1].literal === TonalLetterTags.i &&
              //   fnl === TonalLetterTags.k
              // ) {
              //   // handle combining form 'tikw' of lexical root 'tekk'
              //   // combining forms 'tietw' and 'tietf is handled in another function
              //   s.popLetter(); // pop out vowel i
              //   s.pushLetter(lowerLettersTonal.get(TonalLetterTags.e)); // push vowel e
              //   s.pushLetter(lowerLettersTonal.get(TonalLetterTags.kk)); // push final consonant kk
              // } else {

              // restore the popped-out final consonant.
              // a syllable is just returned with its tone letter popped out
              s.pushLetter(lowerLettersTonal.get(fnl));

              // }
            }
          }
        } else if (
          finalConsonantsForBgjlsbbggjjllss.has(s.lastLetter.literal)
        ) {
          // in case of internal or external sandhi
          const ret = this.handleAssimilatedFinal(s, tnl);
          if (ret && ret.length > 0) return ret;
        } else if (
          sounds.filter((it) => it.name === TonalSpellingTags.vowel).length >
            0 &&
          nasalFinalConsonants.includes(s.lastSecondLetter.literal) &&
          neutralFinalConsonantsTonal.includes(s.lastLetter.literal)
        ) {
          // in case of internal sandhi of p or t
          // if there is no medials, e.g. hmhh, hngh, just bypass this block

          // mhh, mh, nhh, nh, nghh, ngh
          if (
            this.soundsFollowing[0] &&
            this.soundsFollowing[0].name ===
              TonalSpellingTags.initialConsonant &&
            s.lastSecondLetter.literal === this.soundsFollowing[0].toString()
          ) {
            // unchange to -tt or -t
            s.popLetter(); // pop the neutral
            s.popLetter(); // pop the nasal
            const clone: TonalSyllable = Object.create(s);
            if (tnl === TonalLetterTags.w) {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.tt));
            } else {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.t));
            }
            return [clone];
          } else if (this.soundsFollowing[0]) {
            // there has to be a following syllable for this syllable to change form
            // unchange to -pp or -p
            s.popLetter(); // pop the neutral
            s.popLetter(); // pop the nasal
            const clone: TonalSyllable = Object.create(s);
            // if (ntrl === TonalLetterTags.hh) {
            if (tnl === TonalLetterTags.w) {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.pp));
            } else {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.p));
            }
            return [clone];
          }
        }
        // a syllable is just returned with the tone letter popped out
        // e.g. tnghw's w is popped and tngh is returned
        return [s];
      }
    }
    return [];
  }
}

/** Returns the standalone forms of a phrasl verb particle syllable. */
export class PhrasalVerbParticleStandalone extends TonalStandaloneMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      if (allomorph instanceof FreeAllomorph) {
        // 7 to 4
        const s: TonalSyllable = new TonalSyllable(
          sounds.map((it) => new AlphabeticLetter(it.characters))
        );
        const tnl = sounds.filter(
          (it) => it.name === TonalSpellingTags.freeTone
        );
        if (tnl && tnl[0].toString() === TonalLetterTags.z) {
          s.popLetter(); // pop the tonal
          s.pushLetter(lowerLettersTonal.get(TonalLetterTags.h)); // push neutral final
        }
        return [s];
      } else if (allomorph instanceof CheckedAllomorph) {
        // 1 to 4. 3 to 4.
        const s: TonalSyllable = new TonalSyllable(
          sounds.map((it) => new AlphabeticLetter(it.characters))
        );
        const tnl = sounds.filter(
          (it) => it.name === TonalSpellingTags.checkedTone
        );
        if (
          tnl &&
          (tnl[0].toString() === TonalLetterTags.f ||
            tnl[0].toString() === TonalLetterTags.w)
        ) {
          s.popLetter(); // pop the tonal
        }
        return [s];
      }
    }
    return [];
  }
}

/** Returns the standalone forms of the syllable preceding ay */
export class PrecedingAyStandalone extends TonalStandaloneMetaplasm {
  private getStandaloneForms(syllable: TonalSyllable, letters: Array<Sound>) {
    if (
      voicedVoicelessFinalConsonants.has(letters[letters.length - 2].toString())
    ) {
      // in case of sandhi finals
      const fnl = voicedVoicelessFinalConsonants.get(
        syllable.lastLetter.literal + letters[letters.length - 1].toString()
      );
      if (fnl)
        syllable.replaceLetter(
          syllable.letters.length - 1,
          lowerLettersTonal.get(fnl)
        );
    } else if (
      fourthToEighthFinalConsonants.has(
        letters[letters.length - 2].toString()
      ) &&
      letters[letters.length - 1].toString() === TonalLetterTags.x
    ) {
      const fnl = fourthToEighthFinalConsonants.get(
        syllable.lastLetter.literal
      );
      if (fnl)
        syllable.replaceLetter(
          syllable.letters.length - 1,
          lowerLettersTonal.get(fnl)
        );
    }
  }

  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      if (allomorph.tonal.toString() === TonalLetterTags.f) {
        if (allomorph instanceof FreeAllomorph) {
          const ret = [];
          const rls = standaloneRulesAy.get(allomorph.toString());
          const tnls = !rls ? [] : rls;
          for (let i in tnls) {
            let s: TonalSyllable = new TonalSyllable(
              sounds.map((it) => new AlphabeticLetter(it.characters))
            );
            // 1 to 2. 1 to 3
            // replace f with y or w
            s.popLetter();
            s.pushLetter(new AlphabeticLetter(tnls[i].characters));
            ret.push(s);
          }
          return ret;
        } else if (allomorph instanceof CheckedAllomorph) {
          const s: TonalSyllable = new TonalSyllable(
            sounds.map((it) => new AlphabeticLetter(it.characters))
          );
          // pop f
          s.popLetter();
          this.getStandaloneForms(s, sounds);
          return [s];
        }
      } else if (allomorph.tonal.toString() === TonalLetterTags.x) {
        // 5 to 1. 5 to 7. 5 to 5.
        if (allomorph instanceof FreeAllomorph) {
          const ret = [];
          const rls = standaloneRulesAy.get(allomorph.toString());
          const tnls = !rls ? [] : rls;
          for (let i in tnls) {
            let s: TonalSyllable = new TonalSyllable(
              sounds.map((it) => new AlphabeticLetter(it.characters))
            );
            if (!(tnls[i] instanceof ZeroTonal)) {
              if (tnls[i] instanceof FreeTonalZ) {
                // 5 to 7
                // replace x with z
                s.popLetter();
                s.pushLetter(new AlphabeticLetter(tnls[i].characters));
                ret.push(s);
              } else if (tnls[i] instanceof FreeTonalX) {
                // 5 to 5
                ret.push(s);
              }
            } else {
              // 5 to 1
              // pop x
              s.popLetter();
              ret.push(s);
            }
          }
          return ret;
        } else if (allomorph instanceof CheckedAllomorph) {
          // 5 to 8.
          const s: TonalSyllable = new TonalSyllable(
            sounds.map((it) => new AlphabeticLetter(it.characters))
          );
          s.popLetter(); // pop x
          this.getStandaloneForms(s, sounds);
          return [s];
        }
      } else if (allomorph.tonal.toString() === TonalLetterTags.y) {
        return [];
      }
    }
    return [];
  }
}

/** Returns the standalone forms of the syllable preceding ex */
export class PrecedingExStandalone extends TonalStandaloneMetaplasm {
  private handleAssimilatedFinal(syllable: TonalSyllable): TonalSyllable[] {
    const finalConsonant = syllable.lastSecondLetter.literal;
    const fnlsOfLemma = finalConsonantsForBgjlsFw.get(
      syllable.lastSecondLetter.literal + syllable.lastLetter.literal
    );
    if (fnlsOfLemma) {
      if (
        finalConsonant === TonalLetterTags.g ||
        finalConsonant === TonalLetterTags.b
      ) {
        // when the final is b or g, and
        // when the following syllable is ex
        fnlsOfLemma.pop(); // pop tt or t
      }
      syllable.popLetter(); // pop tonal
      const clones = fnlsOfLemma.map((it) => {
        const clone: TonalSyllable = Object.create(syllable);
        // replace the final consonant which is the last letter after
        // the tonal is popped
        clone.replaceLetter(
          syllable.letters.length - 1,
          lowerLettersTonal.get(it.toString())
        );
        return clone;
      });
      const ret: TonalSyllable[] = [];
      clones.map((it) => ret.push(it));
      return clones;
    }
    return [];
  }

  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      const syl: TonalSyllable = new TonalSyllable(
        sounds.map((it) => new AlphabeticLetter(it.characters))
      );

      return this.handleAssimilatedFinal(syl);
    }
    return [];
  }
}

/** Returns the last syllable of a double or triple construction as an standalone form. */
export class LastSyllableForms extends TonalStandaloneMetaplasm {
  constructor(private lettersLastSyllable: Sound[]) {
    super();
  }

  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      // skip the last syllable. it is the base form of the preceding 2 syllables.
      if (
        this.lettersLastSyllable[
          this.lettersLastSyllable.length - 1
        ].toString() === sounds[sounds.length - 1].toString()
      )
        return [];
      const s: TonalSyllable = new TonalSyllable(
        this.lettersLastSyllable.map(
          (it) => new AlphabeticLetter(it.characters)
        )
      );
      return [s];
    }
    return [];
  }
}

/** Returns the standalone forms of a transfix inflected syllable. */
export class TransfixStandalone extends TonalStandaloneMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      const vwlA = sounds.filter((it) => it.toString() === TonalLetterTags.a);
      const chkdFnls = sounds.filter(
        (it) => it.name === TonalSpellingTags.checkedTone
      );
      const s: TonalSyllable = new TonalSyllable(
        sounds.map((it) => new AlphabeticLetter(it.characters))
      );

      if (vwlA.length == 1) {
        // aw -> ay
        s.popLetter(); // pop letter w
        s.pushLetter(lowerLettersTonal.get(TonalLetterTags.y));
        return [s];
      } else if (chkdFnls.length == 1) {
        // checked tones
        s.popLetter(); // pop letter w
        const sylChkd: TonalSyllable = Object.create(s);
        // get hh or tt
        const got = finalConsonantsForTransfix.get(
          s.letters[s.letters.length - 1].literal
        );
        if (got) {
          sylChkd.popLetter(); // pop final t
          sylChkd.pushLetter(lowerLettersTonal.get(got)); // push hh or tt
        }
        return [s, sylChkd];
      } else {
        // in case of free tones other than aw, return the other four free tones
        const syl1: TonalSyllable = Object.create(s); // 1st tone
        const syl2: TonalSyllable = Object.create(s); // 2nd tone
        const syl5: TonalSyllable = Object.create(s); // 5th tone
        const syl7: TonalSyllable = Object.create(s); // 7th tone
        syl1.popLetter(); // pop w
        syl2.popLetter(); // pop w
        syl2.pushLetter(lowerLettersTonal.get(TonalLetterTags.y));
        syl5.popLetter(); // pop w
        syl5.pushLetter(lowerLettersTonal.get(TonalLetterTags.x));
        syl7.popLetter(); // pop w
        syl7.pushLetter(lowerLettersTonal.get(TonalLetterTags.z));

        // console.log(syl1.literal, syl2.literal, syl5.literal, syl7.literal);
        return [syl1, syl2, syl5, syl7];
      }
    }
    return [];
  }
}

/** Change ~ietf or ietw to ~ik or ~ikk. */
export class StandaloneFormsIetfIetwToIkIkk extends TonalStandaloneMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      const ics = sounds.filter(
        (i) => i.name === TonalSpellingTags.initialConsonant
      );
      const ts = sounds.filter((i) => i.name === TonalSpellingTags.checkedTone);
      if (ics.length > 0 && ts.length > 0) {
        if (ts[0].toString() === TonalLetterTags.f) {
          // in case of ~ietf
          const s: TonalSyllable = new TonalSyllable([
            new AlphabeticLetter(ics[0].characters),
            lowerLettersTonal.get(TonalLetterTags.i),
            lowerLettersTonal.get(TonalLetterTags.k),
          ]);
          return [s];
        } else if (ts[0].toString() === TonalLetterTags.w) {
          // in case of ~ietw
          const s: TonalSyllable = new TonalSyllable([
            new AlphabeticLetter(ics[0].characters),
            lowerLettersTonal.get(TonalLetterTags.i),
            lowerLettersTonal.get(TonalLetterTags.kk),
          ]);
          return [s];
        }
      }
    }
    return [];
  }
}

/** Lemmatizes a word and returns its base forms. */
export class TonalLemmatization extends TonalLemmatizationMetaplasm {
  apply(
    morphemes: Array<TonalStandaloneMorpheme>,
    inflectionalEnding: InflectionalEnding
  ): TonalWord[] {
    return this.populateLemmata(morphemes, inflectionalEnding);
  }

  private getLemmas(
    morphemes: Array<TonalStandaloneMorpheme>,
    inflectionalEnding: InflectionalEnding
  ): Array<TonalWord> {
    if (inflectionalEnding) {
      if (inflectionalEnding instanceof FreeInflectionalEnding) {
        const ret = [];
        const arr = morphemes[morphemes.length - 1].getForms();

        for (const key in arr) {
          const wrd = new TonalWord(morphemes.map((it) => it.syllable));
          wrd.popSyllable();
          wrd.pushSyllable(arr[key]);
          ret.push(wrd);
        }
        return ret;
      } else if (inflectionalEnding instanceof CheckedInflectionalEnding) {
        if (morphemes[morphemes.length - 1].getForms().length == 0) return [];
        const wrd = new TonalWord(morphemes.map((it) => it.syllable));
        wrd.popSyllable();
        wrd.pushSyllable(morphemes[morphemes.length - 1].getForms()[0]);
        return [wrd];
      }
    }

    return [];
  }

  private populateLemmata(
    morphemes: Array<TonalStandaloneMorpheme>,
    inflectionalEnding: InflectionalEnding
  ) {
    let lemmata: Array<TonalWord> = new Array();

    // turn morphemes into lemmas
    let lms = this.getLemmas(morphemes, inflectionalEnding);
    if (lms.length > 0) {
      for (let key in lms) {
        lemmata.push(lms[key]);
      }
    }
    return lemmata;
  }
}
