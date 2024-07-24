import {
  TonalSpellingTags,
  TonalLetterTags,
  materLectionisTonal,
  neutralFinalConsonantsTonal,
} from './tonalres';
import {
  hiraganaKatakana,
  KanaLetterTags,
  otherKanas,
  kogakimoji,
  hatsuon,
  special,
} from '../kana/kanares';
import { Sound } from '../unit';
import { fourthFinalConsonants } from './collections';
import { TonalUncombiningMorpheme } from '../unchange/morpheme';
import { PseudoUnicodeEncoding } from './tonesets';

const combiningOverline = '\u0305';
const combiningDotBelow = '\u0323';

function handleCombiningDotBelowOverline(initial: string, medial: string) {
  const got = kanaInitials(mappingInitial.get(initial))(medial);
  if (got && got[0]) {
    if (initialsWithCombiningDotBelow.aspirated.includes(initial)) {
      if (freeSyllablesWithCombiningOverline.includes(initial + medial)) {
        return got[0] + combiningOverline + combiningDotBelow;
      }
      return got[0] + combiningDotBelow;
    } else if (
      initialsWithCombiningDotBelow.withoutADotOrOverline.includes(initial)
    ) {
      return got[0];
    } else if (initialsWithCombiningDotBelow.withAnOverline.includes(initial)) {
      if (freeSyllablesWithCombiningOverline.includes(initial + medial)) {
        return got[0] + combiningOverline;
      }
      return got[0];
    }
  }
  return '';
}

function getToneMarkForFourthEighth(final: string, tonalLen: number) {
  if (tonalLen == 0) {
    // 4th tone and 8th tone
    const kn = mappingLettersToPseudoEncoding.get(final.toString());
    if (kn) {
      return kn[0];
    }
  }
  return '';
}

function getReplicatedKanaVowel(sounds: Sound[], j: number, replica: string) {
  if (
    (j == 0 &&
      sounds[0].name === TonalSpellingTags.vowel &&
      (sounds.length == 1 ||
        (sounds.length == 2 &&
          sounds[sounds.length - 1].name === TonalSpellingTags.freeTone) ||
        (sounds.length == 2 &&
          sounds[sounds.length - 1].name ===
            TonalSpellingTags.nasalization))) ||
    (sounds.length == 3 &&
      sounds[sounds.length - 2].name === TonalSpellingTags.nasalization &&
      sounds[sounds.length - 1].name === TonalSpellingTags.freeTone)
  ) {
    // reduplicate the vowel for syllables without an initial
    // in case of a, e,
    // in case ax, ex. enn,
    // in case of ennx
    return replica;
  } else if (
    (sounds.length == 2 &&
      sounds[0].name === TonalSpellingTags.vowel &&
      (sounds[1].toString() === TonalLetterTags.h ||
        sounds[1].toString() === TonalLetterTags.hh)) ||
    (sounds.length == 3 &&
      sounds[0].name === TonalSpellingTags.vowel &&
      (sounds[1].toString() === TonalLetterTags.h ||
        sounds[1].toString() === TonalLetterTags.hh) &&
      sounds[2].name === TonalSpellingTags.checkedTone) ||
    (sounds.length == 3 &&
      sounds[0].name === TonalSpellingTags.vowel &&
      sounds[1].name === TonalSpellingTags.nasalization &&
      (sounds[2].toString() === TonalLetterTags.h ||
        sounds[2].toString() === TonalLetterTags.hh))
  ) {
    // reduplicate the vowel for syllables without an initial
    // in case of ah, ehh
    // in case of ahy
    // in case of ennh, innh
    return getSmallKanaVowel(sounds[0].toString());
  }

  return '';
}

function getSmallKanaVowel(medial: string) {
  const got = otherKanas.get(medial);
  if (got && got[1]) {
    // get the small form of the vowel and append it
    return got[1];
  }
  return '';
}

export function composeTaiKana(morphemes: TonalUncombiningMorpheme[]) {
  let kanaSeqs: string[] = [];
  let kanas: string[] = new Array(morphemes.length);
  let kanas4thToneWoArrow = '';

  for (let i = 0; i < morphemes.length; i++) {
    const initl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.initialConsonant
    );
    const mdls = morphemes[i].sounds.filter(
      (it) =>
        it.name === TonalSpellingTags.vowel ||
        it.name === TonalSpellingTags.materLectionis
    );
    const nslFnl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.nasalFinalConsonant
    );
    const stpFnl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.stopFinalConsonant
    );
    const frTnl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.freeTone
    );
    const chkTnl = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.checkedTone
    );
    const nslz = morphemes[i].sounds.filter(
      (it) => it.name === TonalSpellingTags.nasalization
    );
    const finalsForIToKanaIE = stpFnl
      .filter(
        (it) =>
          it.name === TonalSpellingTags.stopFinalConsonant &&
          finalsForIKigikkigging.includes(it.toString())
      )
      .concat(
        nslFnl.filter(
          (it) =>
            it.name === TonalSpellingTags.nasalFinalConsonant &&
            finalsForIKigikkigging.includes(it.toString())
        )
      );

    // initialize for this morpheme
    kanas[i] = '';

    if (initl.length == 1) {
      if (mdls.length > 0) {
        for (let j = 0; j < mdls.length; j++) {
          if (voewlsIrEr.includes(mdls[j].toString())) {
            kanas[i] +=
              handleCombiningDotBelowOverline(
                initl[0].toString(),
                mdls[j].toString()
              ) + getKanaIrEr(mdls, stpFnl.length + nslFnl.length == 1);
          } else if (mdls[j].toString() === TonalLetterTags.ur) {
            if (j == 0) {
              // if the preceding letter is an initial
              const initialKana = handleCombiningDotBelowOverline(
                initl[0].toString(),
                mdls[j].toString()
              );
              kanas[i] += initialKana;
              if (stpFnl.length == 1) {
                const kn = mappingMedialSmallForm.get(mdls[j].toString());
                if (kn) kanas[i] += kn[1];
              } else {
                const kn = mappingMedial.get(mdls[j].toString());
                if (kn) kanas[i] += kn[1];
              }
            } else {
              if (stpFnl.length == 1) {
                const kn = mappingMedialSmallForm.get(mdls[j].toString());
                if (kn) kanas[i] += kn[1];
              } else {
                const gotVowels = mappingMedial.get(mdls[j].toString());
                if (gotVowels) kanas[i] += gotVowels[1];
              }
            }
          } else {
            if (j > 0) {
              if (stpFnl.length == 1) {
                // more that one vowels. e.g. goehh
                kanas[i] += getSmallKanaVowel(mdls[j].toString());
              } else {
                if (j == 1 && mdls.length == 3) {
                  kanas[i] += getSmallKanaVowel(mdls[j].toString());
                } else if (j == 1 && mdls.length == 2 && nslFnl.length == 1) {
                  kanas[i] += getSmallKanaVowel(mdls[j].toString());
                } else {
                  const kn = hiraganaKatakana.get(mdls[j].toString());
                  if (kn && kn[1]) kanas[i] += kn[1];
                }
              }
            } else {
              // the first vowel. e.g. gehh, goehh
              kanas[i] += handleCombiningDotBelowOverline(
                initl[0].toString(),
                mdls[j].toString()
              );

              if (
                nslFnl.length == 0 &&
                mdls.length == 1 &&
                stpFnl.length == 0
              ) {
                // open syllables with an initial
                const kn = hiraganaKatakana.get(mdls[j].toString());
                if (kn && kn[1]) {
                  // replicate the vowel and append it
                  kanas[i] += kn[1];
                }
              } else if (
                nslFnl.length == 0 &&
                mdls.length == 1 &&
                stpFnl.length == 1 &&
                neutralFinalConsonantsTonal.includes(stpFnl[0].toString())
              ) {
                kanas[i] += getSmallKanaVowel(mdls[j].toString());
              } else if (
                mdls[j].toString() === TonalLetterTags.i &&
                mdls.length == 1 &&
                nslz.length == 0 &&
                stpFnl.length == 1 &&
                finalsForIToKanaIE.length == 1 &&
                !neutralFinalConsonantsTonal.includes(stpFnl[0].toString())
              ) {
                // in case of syllables -ik and -ikk with an initial.
                // an extra small kana e will be appended
                kanas[i] += getSmallKanaVowel(TonalLetterTags.e);
                // console.log('medials>' + mdls + ', finals>' + stpFnl + ', ' + kanas);
              }
            }
          }
        }
      } else {
        // there is no medials
      }
    }

    if (initl.length == 0) {
      if (mdls.length > 0) {
        for (let j = 0; j < mdls.length; j++) {
          let got;
          if (
            j == 0 &&
            mdls[j].toString() === TonalLetterTags.o &&
            mdls.length > 1
          ) {
            // map o to wo
            got = hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o);
          } else {
            // map o to o
            got = hiraganaKatakana.get(mdls[j].toString());
          }

          if (got) {
            if (j == 1 && mdls.length == 3) {
              // get small kana for 2nd medial
              kanas[i] += getSmallKanaVowel(mdls[j].toString());
            } else if (j == 1 && mdls.length == 2 && stpFnl.length == 1) {
              // get small kana for 2nd vowel
              kanas[i] += getSmallKanaVowel(mdls[j].toString());
            } else if (j == 1 && mdls.length == 2 && nslFnl.length == 1) {
              // get small kana for 2nd vowel
              kanas[i] += getSmallKanaVowel(mdls[j].toString());
            } else if (j == 2 && mdls.length == 3 && stpFnl.length == 1) {
              // get small kana for 3rd vowel
              kanas[i] += getSmallKanaVowel(mdls[j].toString());
            } else if (
              mdls[j].toString() === TonalLetterTags.i &&
              mdls.length == 1 &&
              nslz.length == 0 &&
              stpFnl.length == 1 &&
              finalsForIToKanaIE.length == 1
            ) {
              // in case of syllables ik and ikk without an initial
              const kn = hiraganaKatakana.get(TonalLetterTags.i);
              if (kn) kanas[i] += kn[1];
              // an extra small kana e will be appended
              kanas[i] += getSmallKanaVowel(TonalLetterTags.e);
              // console.log('medials>' + mdls + ', finals>' + stpFnl + ', ' + kanas);
            } else {
              kanas[i] += got[1];
              kanas[i] += getReplicatedKanaVowel(
                morphemes[i].sounds,
                j,
                got[1]
              );
            }
          } else {
            if (
              mdls[j].toString() === TonalLetterTags.er ||
              mdls[j].toString() === TonalLetterTags.ir
            ) {
              const kn = mappingMedial.get(mdls[j].toString());
              if (kn) {
                kanas[i] += kn[1] + combiningOverline;
                if (
                  stpFnl.length == 1 &&
                  neutralFinalConsonantsTonal.includes(stpFnl[0].toString())
                ) {
                  // in case of erh, use kanaIrOr to get one extra small kana
                  kanas[i] += getKanaIrEr(
                    mdls,
                    stpFnl.length + nslFnl.length == 1
                  );
                } else {
                  // there replicated kana other than ir, or
                  kanas[i] += getReplicatedKanaVowel(
                    morphemes[i].sounds,
                    i,
                    kn[1] + combiningOverline
                  );
                }
              }
            } else if (
              mdls[j].toString() === TonalLetterTags.ur ||
              mdls[j].toString() === TonalLetterTags.er
            ) {
              // if the preceding letter is not an initial
              const kn = mappingMedial.get(mdls[j].toString());
              // in case of ur, iur. bypass urh, urhy, iurh, iurhy
              if (kn && stpFnl.length == 0) kanas[i] += kn[1];

              if (stpFnl.length == 1) {
                // in case of urh, urhy
                if (kn && mdls.length == 1) kanas[i] += kn[1];
                const sml = mappingMedialSmallForm.get(mdls[j].toString());
                if (sml) kanas[i] += sml[1];
              } else {
                if (mdls.length == 1) {
                  if (kn)
                    kanas[i] += getReplicatedKanaVowel(
                      morphemes[i].sounds,
                      j,
                      kn[1]
                    );
                }
              }
            } else if (materLectionisTonal.includes(mdls[j].toString())) {
              // mater lectionis: m, n, ng.
              const kn = mappingMedial.get(mdls[j].toString());
              if (kn) {
                kanas[i] += kn[1];
              }
            }
          }
        }
      }
    }

    if (nslz.length == 1) {
      const tail = kanas[i].slice(1, kanas[i].length);
      if (initl.length == 1) {
        const kn = mappingNasalization.get(
          initl[0].toString() + mdls[0].toString()
        );
        if (kn) kanas[i] = kn + tail;
      } else {
        const kn = mappingNasalization.get(mdls[0].toString());
        if (kn) kanas[i] = kn + tail;
      }
    }

    if (nslFnl.length == 1) {
      // syllable finals
      if (initl.length == 1 && mdls.length == 0) {
        // there is no medials
        const kn = kanaInitials(mappingInitial.get(initl[0].toString()))(
          nslFnl[0].toString()
        );
        if (kn && kn[0]) {
          kanas[i] += handleCombiningDotBelowOverline(
            initl[0].toString(),
            nslFnl[0].toString()
          );
        }
      }

      let kn;
      if (stpFnl.length > 0)
        kn = mappingSmallNasalFinal.get(nslFnl[0].toString());
      else kn = mappingNasalFinal.get(nslFnl[0].toString());
      if (kn && kn[1]) kanas[i] += kn[1];
    }

    if (stpFnl.length == 1) {
      // syllable finals
      const kn = mappingStopFinal.get(stpFnl[0].toString());
      if (kn && kn[1]) {
        // stop finals p, t, k, pp, tt, kk
        kanas[i] += kn[1];
      }
      if (Object.values(fourthFinalConsonants).includes(stpFnl[0].toString())) {
        kanas4thToneWoArrow = kanas[i];
      }
      kanas[i] += getToneMarkForFourthEighth(
        stpFnl[0].toString(),
        chkTnl.length
      );
    }

    if (frTnl.length == 1) {
      kanas[i] += mappingLettersToPseudoEncoding.get(frTnl[0].toString());
    }

    if (chkTnl.length == 1) {
      kanas[i] += mappingLettersToPseudoEncoding.get(chkTnl[0].toString());
    }
  }

  kanaSeqs.push(kanas.join(''));
  if (kanas4thToneWoArrow.length > 0 && morphemes.length == 1) {
    kanaSeqs.push(kanas4thToneWoArrow);
  }
  return kanaSeqs;
}

const kanaInitials = function (map?: Map<string, string[] | undefined>) {
  return function (following?: string) {
    if (following) {
      if (map && map.has(following)) {
        const got: string[] | undefined = map.get(following);
        if (got && got[1]) {
          return [got[1]];
        }
      }
    } else {
      if (map) {
        /*
        const kanas = Array.from(map.values());
        const dupes = Array.from(kanas.map(it => (it ? it[1] : '')));
        const dedupes = dupes.reduce(function (
          accumulator: string[],
          curr: string
        ) {
          if (accumulator.filter(it => it === curr).length == 0) {
            accumulator.push(curr);
          }
          return accumulator;
        },
        []);
        return dedupes;
        */
      }
    }
    return [];
  };
};

const getKanaIrEr = function (vowels: Sound[], hasOneFinal: boolean) {
  if (vowels.length == 1) {
    const kn = mappingMedial.get(vowels[0].toString());
    if (kn) {
      if (hasOneFinal) {
        const sml = mappingMedialSmallForm.get(vowels[0].toString());
        if (sml) {
          return sml[1] + combiningOverline;
        }
      }
      return kn[1] + combiningOverline;
    }
  } else if (vowels.length == 2) {
    // return small form
    const kn = mappingMedialSmallForm.get(vowels[0].toString());
    if (kn) {
      return kn[1] + combiningOverline;
    }
  }
  return '';
};

const freeSyllablesWithCombiningOverline = [
  TonalLetterTags.ch.toString() + TonalLetterTags.a.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.a.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.e.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.e.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.o.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.er.toString(),
  TonalLetterTags.ch.toString() + TonalLetterTags.ur.toString(),
  TonalLetterTags.c.toString() + TonalLetterTags.o.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.i.toString(),
  TonalLetterTags.th.toString() + TonalLetterTags.i.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.u.toString(),
  TonalLetterTags.th.toString() + TonalLetterTags.u.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.ng.toString(),
  TonalLetterTags.th.toString() + TonalLetterTags.ng.toString(),
  TonalLetterTags.t.toString() + TonalLetterTags.ir.toString(),
  TonalLetterTags.th.toString() + TonalLetterTags.ir.toString(),
];

const initialsWithCombiningDotBelow = {
  // whether the dot should be combined
  aspirated: [
    // with a dot
    TonalLetterTags.kh.toString(),
    TonalLetterTags.c.toString(),
    TonalLetterTags.ph.toString(),
    TonalLetterTags.th.toString(),
  ],
  withoutADotOrOverline: [
    TonalLetterTags.k.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.b.toString(),
    TonalLetterTags.p.toString(),
    TonalLetterTags.j.toString(),
    TonalLetterTags.l.toString(),
    TonalLetterTags.h.toString(),
    TonalLetterTags.s.toString(),
    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString(),
    TonalLetterTags.ng.toString(),
  ],
  withAnOverline: [
    TonalLetterTags.ch.toString(),
    TonalLetterTags.c.toString(),
    TonalLetterTags.t.toString(),
  ],
};

// includes mater lectionis
const mappingMedial = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.ir, hiraganaKatakana.get(KanaLetterTags.u))
  .set(TonalLetterTags.er, hiraganaKatakana.get(KanaLetterTags.o))
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.w + KanaLetterTags.o)
  )
  .set(TonalLetterTags.ea, hiraganaKatakana.get(KanaLetterTags.e))
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.n,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(TonalLetterTags.ng, hatsuon.get(KanaLetterTags.n));

const voewlsIrEr = [
  TonalLetterTags.ir.toString(),
  TonalLetterTags.er.toString(),
];

const mappingMedialSmallForm = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.a, otherKanas.get(KanaLetterTags.a))
  .set(TonalLetterTags.i, otherKanas.get(KanaLetterTags.i))
  .set(TonalLetterTags.e, otherKanas.get(KanaLetterTags.e))
  .set(TonalLetterTags.er, otherKanas.get(KanaLetterTags.o))
  .set(TonalLetterTags.ur, otherKanas.get(KanaLetterTags.w + KanaLetterTags.o))
  .set(TonalLetterTags.ir, otherKanas.get(KanaLetterTags.u))
  .set(TonalLetterTags.m, otherKanas.get(KanaLetterTags.m + KanaLetterTags.u))
  .set(TonalLetterTags.n, otherKanas.get(KanaLetterTags.n + KanaLetterTags.u))
  .set(TonalLetterTags.ng, otherKanas.get(KanaLetterTags.n));

const mappingLettersToPseudoEncoding = new Map()
  .set(TonalLetterTags.f, PseudoUnicodeEncoding.first)
  .set(TonalLetterTags.y, PseudoUnicodeEncoding.second)
  .set(TonalLetterTags.w, PseudoUnicodeEncoding.third)
  .set(TonalLetterTags.x, PseudoUnicodeEncoding.fifth)
  .set(TonalLetterTags.zx, PseudoUnicodeEncoding.sixth)
  .set(TonalLetterTags.z, PseudoUnicodeEncoding.seventh)
  .set(TonalLetterTags.xx, PseudoUnicodeEncoding.ninth)
  .set(TonalLetterTags.p, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.t, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.k, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.h, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.b, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.g, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.j, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.l, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.s, PseudoUnicodeEncoding.fourth)
  .set(TonalLetterTags.pp, PseudoUnicodeEncoding.eighth)
  .set(TonalLetterTags.tt, PseudoUnicodeEncoding.eighth)
  .set(TonalLetterTags.kk, PseudoUnicodeEncoding.eighth)
  .set(TonalLetterTags.hh, PseudoUnicodeEncoding.eighth)
  .set(TonalLetterTags.bb, PseudoUnicodeEncoding.eighth)
  .set(TonalLetterTags.gg, PseudoUnicodeEncoding.eighth)
  .set(TonalLetterTags.jj, PseudoUnicodeEncoding.eighth)
  .set(TonalLetterTags.ll, PseudoUnicodeEncoding.eighth)
  .set(TonalLetterTags.ss, PseudoUnicodeEncoding.eighth);

const mappingStopFinal = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.p, otherKanas.get(KanaLetterTags.p + KanaLetterTags.u))
  .set(TonalLetterTags.t, kogakimoji.get(KanaLetterTags.ch + KanaLetterTags.u))
  .set(TonalLetterTags.k, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u))
  .set(TonalLetterTags.b, otherKanas.get(KanaLetterTags.b + KanaLetterTags.u))
  .set(TonalLetterTags.g, otherKanas.get(KanaLetterTags.g + KanaLetterTags.u))
  .set(TonalLetterTags.j, otherKanas.get(KanaLetterTags.j + KanaLetterTags.u))
  .set(TonalLetterTags.l, otherKanas.get(KanaLetterTags.r + KanaLetterTags.u))
  .set(TonalLetterTags.s, otherKanas.get(KanaLetterTags.s + KanaLetterTags.u))
  .set(TonalLetterTags.pp, otherKanas.get(KanaLetterTags.p + KanaLetterTags.u))
  .set(TonalLetterTags.tt, kogakimoji.get(KanaLetterTags.ch + KanaLetterTags.u))
  .set(TonalLetterTags.kk, otherKanas.get(KanaLetterTags.k + KanaLetterTags.u))
  .set(TonalLetterTags.bb, otherKanas.get(KanaLetterTags.b + KanaLetterTags.u))
  .set(TonalLetterTags.gg, otherKanas.get(KanaLetterTags.g + KanaLetterTags.u))
  .set(TonalLetterTags.jj, otherKanas.get(KanaLetterTags.j + KanaLetterTags.u))
  .set(TonalLetterTags.ll, otherKanas.get(KanaLetterTags.r + KanaLetterTags.u))
  .set(TonalLetterTags.ss, otherKanas.get(KanaLetterTags.s + KanaLetterTags.u));

const mappingNasalization = new Map<string, string>()
  .set(TonalLetterTags.a, '㋐')
  .set(TonalLetterTags.i, '㋑')
  .set(TonalLetterTags.ir, '㋒')
  .set(TonalLetterTags.u, '㋒')
  .set(TonalLetterTags.e, '㋓')
  .set(TonalLetterTags.o, '㋔')
  .set(TonalLetterTags.kh + TonalLetterTags.a, '㋕')
  .set(TonalLetterTags.kh + TonalLetterTags.i, '㋖')
  .set(TonalLetterTags.kh + TonalLetterTags.u, '㋗')
  .set(TonalLetterTags.kh + TonalLetterTags.e, '㋘')
  .set(TonalLetterTags.kh + TonalLetterTags.o, '㋙')
  .set(TonalLetterTags.s + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.s + TonalLetterTags.i, '㋛')
  .set(TonalLetterTags.s + TonalLetterTags.ir, '㋜')
  .set(TonalLetterTags.s + TonalLetterTags.u, '㋜')
  .set(TonalLetterTags.s + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.s + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.c + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.c + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.c + TonalLetterTags.ir, '㋡')
  .set(TonalLetterTags.c + TonalLetterTags.u, '㋡')
  .set(TonalLetterTags.c + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.c + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.ch + TonalLetterTags.a, '㋚')
  .set(TonalLetterTags.ch + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.ch + TonalLetterTags.ir, '㋡')
  .set(TonalLetterTags.ch + TonalLetterTags.u, '㋡')
  .set(TonalLetterTags.ch + TonalLetterTags.e, '㋝')
  .set(TonalLetterTags.ch + TonalLetterTags.o, '㋞')
  .set(TonalLetterTags.t + TonalLetterTags.a, '㋟')
  .set(TonalLetterTags.t + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.t + TonalLetterTags.u, '㋡')
  .set(TonalLetterTags.t + TonalLetterTags.e, '㋢')
  .set(TonalLetterTags.t + TonalLetterTags.o, '㋣')
  .set(TonalLetterTags.j + TonalLetterTags.i, '㋛' + '\u{3099}') // ㋛゙
  .set(TonalLetterTags.ph + TonalLetterTags.a, '㋩' + '\u{309a}') // ㋩゚
  .set(TonalLetterTags.ph + TonalLetterTags.i, '㋪' + '\u{309a}') // ㋪゚
  .set(TonalLetterTags.ph + TonalLetterTags.u, '㋫' + '\u{309a}') // ㋫゚
  .set(TonalLetterTags.ph + TonalLetterTags.e, '㋬' + '\u{309a}') // ㋬゚
  .set(TonalLetterTags.ph + TonalLetterTags.o, '㋭' + '\u{309a}') // ㋭゚
  .set(TonalLetterTags.k + TonalLetterTags.a, '㋕')
  .set(TonalLetterTags.k + TonalLetterTags.i, '㋖')
  .set(TonalLetterTags.k + TonalLetterTags.ir, '㋗')
  .set(TonalLetterTags.k + TonalLetterTags.u, '㋗')
  .set(TonalLetterTags.k + TonalLetterTags.e, '㋘')
  .set(TonalLetterTags.k + TonalLetterTags.o, '㋙')
  .set(TonalLetterTags.h + TonalLetterTags.a, '㋩')
  .set(TonalLetterTags.h + TonalLetterTags.i, '㋪')
  .set(TonalLetterTags.h + TonalLetterTags.ir, '㋫')
  .set(TonalLetterTags.h + TonalLetterTags.u, '㋫')
  .set(TonalLetterTags.h + TonalLetterTags.e, '㋬')
  .set(TonalLetterTags.h + TonalLetterTags.o, '㋭')
  .set(TonalLetterTags.th + TonalLetterTags.a, '㋟')
  .set(TonalLetterTags.th + TonalLetterTags.i, '㋠')
  .set(TonalLetterTags.th + TonalLetterTags.u, '㋡')
  .set(TonalLetterTags.th + TonalLetterTags.e, '㋢')
  .set(TonalLetterTags.th + TonalLetterTags.o, '㋣')
  .set(TonalLetterTags.p + TonalLetterTags.a, '㋩' + '\u{309a}') // ㋩゚
  .set(TonalLetterTags.p + TonalLetterTags.i, '㋪' + '\u{309a}') // ㋪゚
  .set(TonalLetterTags.p + TonalLetterTags.u, '㋫' + '\u{309a}') // ㋫゚
  .set(TonalLetterTags.p + TonalLetterTags.e, '㋬' + '\u{309a}') // ㋬゚
  .set(TonalLetterTags.p + TonalLetterTags.o, '㋭' + '\u{309a}'); // ㋭゚

const finalsForIKigikkigging = [
  TonalLetterTags.k.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.kk.toString(),
  TonalLetterTags.gg.toString(),
  TonalLetterTags.ng.toString(),
];

const mappingNasalFinal = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.n,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(TonalLetterTags.ng, hatsuon.get(KanaLetterTags.n));

const mappingSmallNasalFinal = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.m, otherKanas.get(KanaLetterTags.m + KanaLetterTags.u))
  .set(TonalLetterTags.n, otherKanas.get(KanaLetterTags.n + KanaLetterTags.u))
  .set(TonalLetterTags.ng, otherKanas.get(KanaLetterTags.n));

const mappingInitialB = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.b + KanaLetterTags.o)
  );

const mappingInitialC = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  );

const mappingInitialG = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.g + KanaLetterTags.o)
  );

const mappingInitialH = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.f + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.h + KanaLetterTags.o)
  );

const mappingInitialJ = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.j + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.z + KanaLetterTags.u)
  );
const mappingInitialK = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.k + KanaLetterTags.u)
  );

const mappingInitialL = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.r + KanaLetterTags.u)
  );

const mappingInitialM = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.m + KanaLetterTags.u)
  );

const mappingInitialN = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.n + KanaLetterTags.u)
  );

const mappingInitialNG = new Map<string, string[] | undefined>()
  .set(TonalLetterTags.a, special.get(KanaLetterTags.ng + KanaLetterTags.a))
  .set(TonalLetterTags.i, special.get(KanaLetterTags.ng + KanaLetterTags.i))
  .set(TonalLetterTags.u, special.get(KanaLetterTags.ng + KanaLetterTags.u))
  .set(TonalLetterTags.e, special.get(KanaLetterTags.ng + KanaLetterTags.e))
  .set(TonalLetterTags.o, special.get(KanaLetterTags.ng + KanaLetterTags.o))
  .set(TonalLetterTags.ir, special.get(KanaLetterTags.ng + KanaLetterTags.u));

const mappingInitialP = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.p + KanaLetterTags.o)
  );

const mappingInitialS = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.m,
    hiraganaKatakana.get(KanaLetterTags.s + KanaLetterTags.u)
  );

const mappingInitialT = new Map<string, string[] | undefined>()
  .set(
    TonalLetterTags.a,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.a)
  )
  .set(
    TonalLetterTags.e,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.e)
  )
  .set(
    TonalLetterTags.i,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.i)
  )
  .set(
    TonalLetterTags.o,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.u,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ng,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ir,
    hiraganaKatakana.get(KanaLetterTags.ch + KanaLetterTags.u)
  )
  .set(
    TonalLetterTags.ur,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  )
  .set(
    TonalLetterTags.er,
    hiraganaKatakana.get(KanaLetterTags.t + KanaLetterTags.o)
  );

const mappingInitial = new Map<string, Map<string, string[] | undefined>>()
  .set(TonalLetterTags.b, mappingInitialB)
  .set(TonalLetterTags.c, mappingInitialC)
  .set(TonalLetterTags.ch, mappingInitialC)
  .set(TonalLetterTags.t, mappingInitialT)
  .set(TonalLetterTags.g, mappingInitialG)
  .set(TonalLetterTags.h, mappingInitialH)
  .set(TonalLetterTags.j, mappingInitialJ)
  .set(TonalLetterTags.kh, mappingInitialK)
  .set(TonalLetterTags.l, mappingInitialL)
  .set(TonalLetterTags.m, mappingInitialM)
  .set(TonalLetterTags.n, mappingInitialN)
  .set(TonalLetterTags.ng, mappingInitialNG)
  .set(TonalLetterTags.ph, mappingInitialP)
  .set(TonalLetterTags.k, mappingInitialK)
  .set(TonalLetterTags.s, mappingInitialS)
  .set(TonalLetterTags.th, mappingInitialT)
  .set(TonalLetterTags.p, mappingInitialP);
