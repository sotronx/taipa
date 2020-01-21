import {
    kanaPositionalSound,
    lowerLettersOfKana,
    Hatsuon,
    kogakimoji,
    hiragana_katakana,
    SetOfFinalConsonants,
    SetOfGerminatedConsonants,
    SetOfInitialConsonants,
    hatsuon,
    gailaigo,
} from './kana';
import { KanaUncombiningMorpheme } from './morpheme';

export function checkLetterSizeKana() {
    if (kanaPositionalSound.size !== lowerLettersOfKana.size) {
        console.log('sizes unmatched');
    }
}

function checkChouon(previousLetter: string, nextLetter: string): boolean {
    if (previousLetter === nextLetter) return true;
    if (previousLetter === 'e' && nextLetter === 'i') return true;
    if (previousLetter === 'o' && nextLetter === 'u') return true;
    return false;
}

function lookup(str: string) {
    let results = hiragana_katakana.get(str);
    if (results == undefined) {
        results = gailaigo.get(str);
    }
    return results;
}

export function getKanaBlocks(ms: KanaUncombiningMorpheme[]): string[] {
    // string one is hiragana, string two is katakana, string 3 is chouon
    let kana_compositions: [string, string, string] = ['', '', ''];
    let previous = '';

    for (let e of ms) {
        let ks = lookup(e.syllable.literal);
        if (ks != undefined && ks[0] != undefined) {
            // in case the kana is absent, we check against ks[0]
            kana_compositions[0] += ks[0];
            kana_compositions[1] += ks[1];

            if (
                previous.length > 0 &&
                checkChouon(
                    previous[previous.length - 1],
                    e.syllable.literal[e.syllable.literal.length - 1],
                ) &&
                new SetOfInitialConsonants().beginWith(e.syllable.literal) == false &&
                e.syllable.literal.length == 1
            ) {
                // a vowel does not begin with a consonant and is of length 1
                // a vowel follows a previous vowel
                kana_compositions[2] += 'ー';
            } else {
                kana_compositions[2] += ks[1];
            }
        } else if (
            new SetOfFinalConsonants().beginWith(e.syllable.literal[e.syllable.literal.length - 1]) == true
        ) {
            ks = lookup(e.syllable.literal.substring(0, e.syllable.literal.length - 1));
            if (ks != undefined && ks[0] != undefined) {
                kana_compositions[0] += ks[0];
                kana_compositions[1] += ks[1];
                kana_compositions[2] += ks[1];
            }
            if (new Hatsuon().beginWith(e.syllable.literal[e.syllable.literal.length - 1])) {
                ks = hatsuon.get('n');
                if (ks) {
                    kana_compositions[0] += ks[0];
                    kana_compositions[1] += ks[1];
                    kana_compositions[2] += ks[1];
                }
            } else {
                ks = kogakimoji.get('chu');
                if (ks) {
                    kana_compositions[0] += ks[0];
                    kana_compositions[1] += ks[1];
                    kana_compositions[2] += ks[1];
                }
            }
        } else {
            let first = e.syllable.literal[0];
            let second = e.syllable.literal[1];

            if (first === second && new SetOfGerminatedConsonants().beginWith(first) == true) {
                ks = kogakimoji.get('chu');
                if (ks) {
                    kana_compositions[0] += ks[0];
                    kana_compositions[1] += ks[1];
                    kana_compositions[2] += ks[1];
                }

                ks = hiragana_katakana.get(e.syllable.literal.substring(1, e.syllable.literal.length));
                if (ks) {
                    kana_compositions[0] += ks[0];
                    kana_compositions[1] += ks[1];
                    kana_compositions[2] += ks[1];
                }
            }
        }

        previous = e.syllable.literal;
    }

    // remove duplicates
    if (kana_compositions[1] === kana_compositions[2]) kana_compositions[2] = '';

    return kana_compositions;
    
}