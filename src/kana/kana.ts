import { Sound, SetOfSounds, Letters, PositionalSound } from '../grapheme';
import { KanaAnalyzer } from './analyzer';

class RomanizedKanaGenerator {
    generate(beginning: string, len: number) {
        let strs: string[] = new Array();
        for (let i in list_of_romanized_kana) {
            if (list_of_romanized_kana[i].search(beginning) == 0 && list_of_romanized_kana[i].length <= len) {
                strs.push(list_of_romanized_kana[i]);
                // consonant germination
                if (new SetOfGerminatedConsonants().beginWith(list_of_romanized_kana[i]) == true) {
                    strs.push(list_of_romanized_kana[i].charAt(0) + list_of_romanized_kana[i]);
                }
                // sokuon
                let fcs = new SetOfFinalConsonants();
                for (let e of fcs.finalConsonants) {
                    strs.push(list_of_romanized_kana[i] + e.getLiteral());
                }
            }
        }
        //for(let i in strs) console.info(strs[i])
        return strs;
    }
}

export class ClientOfKanaGenerator {
    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if (this.isFinalConsonant(ls[index])) {
            sounds.push(ls[index] + '.' + KanaSoundTags.finalConsonant);
        }
        return sounds;
    }

    private analyzeAfterInitialConsonants(ls: string[], sounds: string[], index: number): string[] {
        let sbool = this.isSemivowel(ls[index]);
        let vbool = this.isVowel(ls[index]);
        if (sbool) {
            sounds.push(ls[index] + '.' + KanaSoundTags.semivowel);
            if (this.isVowel(ls[index + 1])) {
                sounds.push(ls[index + 1] + '.' + KanaSoundTags.vowel);
            }
        } else if (vbool) {
            let k = index;
            while (k < ls.length) {
                if (this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.' + KanaSoundTags.vowel);
                }
                k++;
            }
        }

        if (sbool || vbool) {
            if (ls.length > sounds.length) {
                sounds = this.analyzeAfterVowels(ls, sounds, sounds.length);
            }
        }

        return sounds;
    }

    private isInitialConsonant(str: string) {
        if (new SetOfInitialConsonants().beginWith(str) == true) return true;

        return false;
    }

    private isSemivowel(str: string) {
        if (new SetOfSemivowels().beginWith(str) == true) return true;

        return false;
    }

    private isVowel(str: string) {
        if (new SetOfVowels().beginWith(str) == true) return true;

        return false;
    }

    private isGerminatedConsonant(str: string) {
        if (new SetOfGerminatedConsonants().beginWith(str) == true) return true;

        return false;
    }

    private isFinalConsonant(str: string) {
        if (new SetOfFinalConsonants().beginWith(str) == true) return true;

        return false;
    }

    private convert(entry: string[]) {
        // convert strings in an entry to sounds
        // ex: a.medial -> PSA.medial
        let ret: Array<Sound> = new Array();
        for (let i in entry) {
            let n = entry[i].lastIndexOf('.');
            let clasName = entry[i].slice(0, n);
            let position = entry[i].slice(n + 1);
            let ps = letterClasses.get(clasName);
            if (ps) {
                let snd = ps.map.get(position);
                if (snd) {
                    ret.push(snd);
                }
            }
        }
        return ret;
    }

    generate(beginning: string, len: number, slb: string) {
        let rkg = new RomanizedKanaGenerator();
        let strs: Array<string> = rkg.generate(beginning, len); // retrieve all needed syllables beginning with begginning
        let arrayOfSounds: Array<string[]> = new Array(); // collecting all sounds to be processed
        let analyzer = new KanaAnalyzer();
        let entries: Array<Sound[]> = new Array(); // to be returned

        for (let i in strs) {
            // generates all needed sounds to be processed
            let graphemes = analyzer.doGraphemicAnalysis(strs[i]);
            let ls: string[] = [];
            for (let j in graphemes) {
                ls.push(graphemes[j].letter.literal);
            }

            let sounds: string[] = [];

            // analyze vowels which have no leading consonants
            // pass 0 as index to indicate it has no leading consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0);

            if ((this.isInitialConsonant(ls[0]) || this.isGerminatedConsonant(ls[0])) && ls.length > 1) {
                if (this.isVowel(ls[1]) || this.isSemivowel(ls[1])) {
                    // analyze initial consonants
                    sounds.push(ls[0] + '.' + KanaSoundTags.initialConsonant);
                    // consonants followed by vowels
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length);
                } else if (this.isInitialConsonant(ls[1])) {
                    sounds.push(ls[0] + '.' + KanaSoundTags.germinatedConsonant);
                    sounds.push(ls[1] + '.' + KanaSoundTags.initialConsonant);
                    if (ls.length > 2) sounds = this.analyzeAfterInitialConsonants(ls, sounds, 2);
                }
            }

            arrayOfSounds.push(sounds);
        }

        for (let k = 0; k < arrayOfSounds.length; k++) {
            entries.push(this.convert(arrayOfSounds[k]));
        }

        return entries;
    }
}

//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

enum KanaLetterTags {
    a = 'a',
    e = 'e',
    i = 'i',
    o = 'o',
    u = 'u',

    b = 'b',
    c = 'c',
    ch = 'ch',
    d = 'd',

    f = 'f',
    g = 'g',
    h = 'h',
    j = 'j',
    k = 'k',

    l = 'l',
    m = 'm',
    r = 'r',
    s = 's',
    v = 'v',

    z = 'z',
    p = 'p',
    t = 't',

    w = 'w',
    y = 'y',

    n = 'n',
}

export class LettersOfKana extends Letters {}
export let lowerLettersOfKana = new LettersOfKana([
    KanaLetterTags.a,
    KanaLetterTags.e,
    KanaLetterTags.i,
    KanaLetterTags.o,
    KanaLetterTags.u,
    KanaLetterTags.b,
    KanaLetterTags.c,
    KanaLetterTags.ch,
    KanaLetterTags.d,
    KanaLetterTags.f,
    KanaLetterTags.g,
    KanaLetterTags.h,
    KanaLetterTags.j,
    KanaLetterTags.k,
    KanaLetterTags.l,
    KanaLetterTags.m,
    KanaLetterTags.r,
    KanaLetterTags.s,
    KanaLetterTags.v,
    KanaLetterTags.z,
    KanaLetterTags.p,
    KanaLetterTags.t,
    KanaLetterTags.w,
    KanaLetterTags.y,
    KanaLetterTags.n,
]);

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export enum KanaSoundTags {
    germinatedConsonant = 'germinatedConsonant',
    initialConsonant = 'initialConsonant',
    semivowel = 'semivowel',
    vowel = 'vowel',
    finalConsonant = 'finalConsonant',
}

class GerminatedConsonant extends Sound {
    name = KanaSoundTags.germinatedConsonant;
}
class InitialConsonant extends Sound {
    name = KanaSoundTags.initialConsonant;
}
class Semivowel extends Sound {
    name = KanaSoundTags.semivowel;
}
class Vowel extends Sound {
    name = KanaSoundTags.vowel;
}
class FinalConsonant extends Sound {
    name = KanaSoundTags.finalConsonant;
}

class InitialConsonantB extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.b);
}
class InitialConsonantC extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.c);
}
class InitialConsonantCH extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.ch);
}
class InitialConsonantD extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.d);
}
class InitialConsonantF extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.f);
}
class InitialConsonantG extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.g);
}
class InitialConsonantH extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.h);
}
class InitialConsonantJ extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.j);
}
class InitialConsonantK extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.k);
}
class InitialConsonantL extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.l);
}
class InitialConsonantM extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.m);
}
class InitialConsonantN extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.n);
}
class InitialConsonantP extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.p);
}
class InitialConsonantR extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.r);
}
class InitialConsonantS extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.s);
}
class InitialConsonantT extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.t);
}
class InitialConsonantV extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.v);
}
class InitialConsonantZ extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.z);
}

class SemivowelW extends Semivowel {
    characters = this.makeCharacters(KanaLetterTags.w);
}
class SemivowelY extends Semivowel {
    characters = this.makeCharacters(KanaLetterTags.y);
}

class VowelA extends Vowel {
    characters = this.makeCharacters(KanaLetterTags.a);
}
class VowelE extends Vowel {
    characters = this.makeCharacters(KanaLetterTags.e);
}
class VowelI extends Vowel {
    characters = this.makeCharacters(KanaLetterTags.i);
}
class VowelO extends Vowel {
    characters = this.makeCharacters(KanaLetterTags.o);
}
class VowelU extends Vowel {
    characters = this.makeCharacters(KanaLetterTags.u);
}

class FinalConsonantK extends FinalConsonant {
    characters = this.makeCharacters(KanaLetterTags.k);
}
class FinalConsonantH extends FinalConsonant {
    characters = this.makeCharacters(KanaLetterTags.h);
}
class FinalConsonantN extends FinalConsonant {
    characters = this.makeCharacters(KanaLetterTags.n);
}
class FinalConsonantP extends FinalConsonant {
    characters = this.makeCharacters(KanaLetterTags.p);
}
class FinalConsonantS extends FinalConsonant {
    characters = this.makeCharacters(KanaLetterTags.s);
}
class FinalConsonantT extends FinalConsonant {
    characters = this.makeCharacters(KanaLetterTags.t);
}

class GerminatedConsonantC extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.c);
}
class GerminatedConsonantK extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.k);
}
class GerminatedConsonantP extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.p);
}
class GerminatedConsonantS extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.s);
}
class GerminatedConsonantT extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.t);
}

export class SetOfInitialConsonants extends SetOfSounds {
    initialConsonants: Array<InitialConsonant> = new Array();
    constructor() {
        super();
        this.initialConsonants.push(new InitialConsonantB());
        this.initialConsonants.push(new InitialConsonantC());
        this.initialConsonants.push(new InitialConsonantCH());
        this.initialConsonants.push(new InitialConsonantD());
        this.initialConsonants.push(new InitialConsonantF());
        this.initialConsonants.push(new InitialConsonantG());
        this.initialConsonants.push(new InitialConsonantH());
        this.initialConsonants.push(new InitialConsonantJ());
        this.initialConsonants.push(new InitialConsonantK());
        this.initialConsonants.push(new InitialConsonantL());
        this.initialConsonants.push(new InitialConsonantM());
        this.initialConsonants.push(new InitialConsonantN());
        this.initialConsonants.push(new InitialConsonantP());
        this.initialConsonants.push(new InitialConsonantR());
        this.initialConsonants.push(new InitialConsonantS());
        this.initialConsonants.push(new InitialConsonantT());
        this.initialConsonants.push(new InitialConsonantV());
        this.initialConsonants.push(new InitialConsonantZ());
    }

    toString() {
        return super.toRegexString(this.initialConsonants);
    }
}

export class SetOfVowels extends SetOfSounds {
    vowels: Array<Vowel> = new Array();
    constructor() {
        super();
        this.vowels.push(new VowelA());
        this.vowels.push(new VowelI());
        this.vowels.push(new VowelU());
        this.vowels.push(new VowelE());
        this.vowels.push(new VowelO());
    }

    toString() {
        return super.toRegexString(this.vowels);
    }
}

export class SetOfGerminatedConsonants extends SetOfSounds {
    theGerminated: Array<GerminatedConsonant> = new Array();
    constructor() {
        super();
        this.theGerminated.push(new GerminatedConsonantC());
        this.theGerminated.push(new GerminatedConsonantK());
        this.theGerminated.push(new GerminatedConsonantP());
        this.theGerminated.push(new GerminatedConsonantS());
        this.theGerminated.push(new GerminatedConsonantT());
    }

    toString() {
        return super.toRegexString(this.theGerminated);
    }
}

class SetOfSemivowels extends SetOfSounds {
    semivowels: Array<Semivowel> = new Array();
    constructor() {
        super();
        this.semivowels.push(new SemivowelW());
        this.semivowels.push(new SemivowelY());
    }

    toString() {
        return super.toRegexString(this.semivowels);
    }
}

export class SetOfFinalConsonants extends SetOfSounds {
    finalConsonants: Array<FinalConsonant> = new Array();
    constructor() {
        super();
        this.finalConsonants.push(new FinalConsonantK());
        this.finalConsonants.push(new FinalConsonantN());
        this.finalConsonants.push(new FinalConsonantP());
        this.finalConsonants.push(new FinalConsonantS());
        this.finalConsonants.push(new FinalConsonantT());
    }

    toString() {
        return super.toRegexString(this.finalConsonants);
    }
}

export class Hatsuon extends SetOfSounds {
    hatsuon: Array<FinalConsonant> = new Array();
    constructor() {
        super();
        this.hatsuon.push(new FinalConsonantN());
    }

    toString() {
        return super.toRegexString(this.hatsuon);
    }
}

//------------------------------------------------------------------------------
//  Positional Sound for Romanized Kana
//------------------------------------------------------------------------------

class PSA extends PositionalSound {
    constructor() {
        super()
        this.name = KanaLetterTags.a;
        this.map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelA());    
    }
}

class PSB extends PositionalSound {
    name = KanaLetterTags.b;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantB());
}

class PSC extends PositionalSound {
    name = KanaLetterTags.c;
    map = new Map<string, Sound>()
        .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantC())
        .set(KanaSoundTags.initialConsonant, new InitialConsonantC());
}

class PSCH extends PositionalSound {
    name = KanaLetterTags.ch;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantCH());
}

class PSD extends PositionalSound {
    name = KanaLetterTags.d;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantD());
}

class PSE extends PositionalSound {
    name = KanaLetterTags.e;
    map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelE());
}

class PSF extends PositionalSound {
    name = KanaLetterTags.f;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantF());
}

class PSG extends PositionalSound {
    name = KanaLetterTags.g;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantG());
}

class PSH extends PositionalSound {
    name = KanaLetterTags.h;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantH());
}

class PSI extends PositionalSound {
    name = KanaLetterTags.i;
    map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelI());
}

class PSJ extends PositionalSound {
    name = KanaLetterTags.j;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantJ());
}

class PSK extends PositionalSound {
    name = KanaLetterTags.k;
    map = new Map<string, Sound>()
        .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantK())
        .set(KanaSoundTags.initialConsonant, new InitialConsonantK())
        .set(KanaSoundTags.finalConsonant, new FinalConsonantK());
}

class PSL extends PositionalSound {
    name = KanaLetterTags.l;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantL());
}

class PSM extends PositionalSound {
    name = KanaLetterTags.m;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantM());
}

class PSN extends PositionalSound {
    name = KanaLetterTags.n;
    map = new Map<string, Sound>()
        .set(KanaSoundTags.initialConsonant, new InitialConsonantN())
        .set(KanaSoundTags.finalConsonant, new FinalConsonantN());
}

class PSO extends PositionalSound {
    name = KanaLetterTags.o;
    map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelO());
}

class PSP extends PositionalSound {
    name = KanaLetterTags.p;
    map = new Map<string, Sound>()
        .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantP())
        .set(KanaSoundTags.initialConsonant, new InitialConsonantP())
        .set(KanaSoundTags.finalConsonant, new FinalConsonantP());
}

class PSR extends PositionalSound {
    name = KanaLetterTags.r;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantR());
}

class PSS extends PositionalSound {
    name = KanaLetterTags.s;
    map = new Map<string, Sound>()
        .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantS())
        .set(KanaSoundTags.initialConsonant, new InitialConsonantS())
        .set(KanaSoundTags.finalConsonant, new FinalConsonantS());
}

class PST extends PositionalSound {
    name = KanaLetterTags.t;
    map = new Map<string, Sound>()
        .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantT())
        .set(KanaSoundTags.initialConsonant, new InitialConsonantT())
        .set(KanaSoundTags.finalConsonant, new FinalConsonantT());
}

class PSU extends PositionalSound {
    name = KanaLetterTags.u;
    map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelU());
}

class PSV extends PositionalSound {
    name = KanaLetterTags.v;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantV());
}

class PSW extends PositionalSound {
    name = KanaLetterTags.w;
    map = new Map<string, Sound>().set(KanaSoundTags.semivowel, new SemivowelW());
}

class PSY extends PositionalSound {
    name = KanaLetterTags.y;
    map = new Map<string, Sound>().set(KanaSoundTags.semivowel, new SemivowelY());
}

class PSZ extends PositionalSound {
    name = KanaLetterTags.z;
    map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantZ());
}

//------------------------------------------------------------------------------
//  Letter Class
//------------------------------------------------------------------------------

export const letterClasses: Map<string, PositionalSound> = new Map()
    .set(KanaLetterTags.a, new PSA())
    .set(KanaLetterTags.b, new PSB())
    .set(KanaLetterTags.c, new PSC())
    .set(KanaLetterTags.ch, new PSCH())
    .set(KanaLetterTags.d, new PSD())
    .set(KanaLetterTags.e, new PSE())
    .set(KanaLetterTags.f, new PSF())
    .set(KanaLetterTags.g, new PSG())
    .set(KanaLetterTags.h, new PSH())
    .set(KanaLetterTags.i, new PSI())
    .set(KanaLetterTags.j, new PSJ())
    .set(KanaLetterTags.k, new PSK())
    .set(KanaLetterTags.l, new PSL())
    .set(KanaLetterTags.m, new PSM())
    .set(KanaLetterTags.n, new PSN())
    .set(KanaLetterTags.o, new PSO())
    .set(KanaLetterTags.p, new PSP())
    .set(KanaLetterTags.r, new PSR())
    .set(KanaLetterTags.s, new PSS())
    .set(KanaLetterTags.t, new PST())
    .set(KanaLetterTags.u, new PSU())
    .set(KanaLetterTags.v, new PSV())
    .set(KanaLetterTags.w, new PSW())
    .set(KanaLetterTags.y, new PSY())
    .set(KanaLetterTags.z, new PSZ());

//------------------------------------------------------------------------------
//  Romanized Kana
//------------------------------------------------------------------------------

export const hiragana_katakana: Map<string, Array<string>> = new Map()
    .set('a', ['あ', 'ア'])
    .set('i', ['い', 'イ'])
    .set('u', ['う', 'ウ'])
    .set('e', ['え', 'エ'])
    .set('o', ['お', 'オ'])
    .set('ka', ['か', 'カ'])
    .set('ki', ['き', 'キ'])
    .set('ku', ['く', 'ク'])
    .set('ke', ['け', 'ケ'])
    .set('ko', ['こ', 'コ'])
    .set('sa', ['さ', 'サ'])
    .set('si', ['し', 'シ'])
    .set('su', ['す', 'ス'])
    .set('se', ['せ', 'セ'])
    .set('so', ['そ', 'ソ'])
    .set('ta', ['た', 'タ'])
    .set('ci', ['ち', 'チ'])
    .set('chu', ['つ', 'ツ'])
    .set('te', ['て', 'テ'])
    .set('to', ['と', 'ト'])
    .set('na', ['な', 'ナ'])
    .set('ni', ['に', 'ニ'])
    .set('nu', ['ぬ', 'ヌ'])
    .set('ne', ['ね', 'ネ'])
    .set('no', ['の', 'ノ'])
    .set('ha', ['は', 'ハ'])
    .set('hi', ['ひ', 'ヒ'])
    .set('fu', ['ふ', 'フ'])
    .set('he', ['へ', 'ヘ'])
    .set('ho', ['ほ', 'ホ'])
    .set('ma', ['ま', 'マ'])
    .set('mi', ['み', 'ミ'])
    .set('mu', ['む', 'ム'])
    .set('me', ['め', 'メ'])
    .set('mo', ['も', 'モ'])
    .set('ya', ['や', 'ヤ'])
    .set('yu', ['ゆ', 'ユ'])
    .set('yo', ['よ', 'ヨ'])
    .set('ra', ['ら', 'ラ'])
    .set('ri', ['り', 'リ'])
    .set('ru', ['る', 'ル'])
    .set('re', ['れ', 'レ'])
    .set('ro', ['ろ', 'ロ'])
    .set('wa', ['わ', 'ワ'])
    .set('wi', ['ゐ', 'ヰ'])
    .set('we', ['ゑ', 'ヱ'])
    .set('wo', ['を', 'ヲ'])
    .set('ga', ['が', 'ガ'])
    .set('gi', ['ぎ', 'ギ'])
    .set('gu', ['ぐ', 'グ'])
    .set('ge', ['げ', 'ゲ'])
    .set('go', ['ご', 'ゴ'])
    .set('za', ['ざ', 'ザ'])
    .set('ji', ['じ', 'ジ'])
    .set('zu', ['ず', 'ズ'])
    .set('ze', ['ぜ', 'ゼ'])
    .set('zo', ['ぞ', 'ゾ'])
    .set('da', ['だ', 'ダ'])
    .set('de', ['で', 'デ'])
    .set('do', ['ど', 'ド'])
    .set('ba', ['ば', 'バ'])
    .set('bi', ['び', 'ビ'])
    .set('bu', ['ぶ', 'ブ'])
    .set('be', ['べ', 'ベ'])
    .set('bo', ['ぼ', 'ボ'])
    .set('pa', ['ぱ', 'パ'])
    .set('pi', ['ぴ', 'ピ'])
    .set('pu', ['ぷ', 'プ'])
    .set('pe', ['ぺ', 'ペ'])
    .set('po', ['ぽ', 'ポ'])
    .set('kya', ['きゃ', 'キャ'])
    .set('kyu', ['きゅ', 'キュ'])
    .set('kyo', ['きょ', 'キョ'])
    .set('sya', ['しゃ', 'シャ'])
    .set('syu', ['しゅ', 'シュ'])
    .set('syo', ['しょ', 'ショ'])
    .set('cya', ['ちゃ', 'チャ'])
    .set('cyu', ['ちゅ', 'チュ'])
    .set('cyo', ['ちょ', 'チョ'])
    .set('nya', ['にゃ', 'ニャ'])
    .set('nyu', ['にゅ', 'ニュ'])
    .set('nyo', ['にょ', 'ニョ'])
    .set('hya', ['ひゃ', 'ヒャ'])
    .set('hyu', ['ひゅ', 'ヒュ'])
    .set('hyo', ['ひょ', 'ヒョ'])
    .set('mya', ['みゃ', 'ミャ'])
    .set('myu', ['みゅ', 'みょ'])
    .set('myo', ['ミュ', 'ミョ'])
    .set('rya', ['りゃ', 'リャ'])
    .set('ryu', ['りゅ', 'リュ'])
    .set('ryo', ['りょ', 'リョ'])
    .set('gya', ['ぎゃ', 'ギャ'])
    .set('gyu', ['ぎゅ', 'ギュ'])
    .set('gyo', ['ぎょ', 'ギョ'])
    .set('jya', ['じゃ', 'ジャ'])
    .set('jyu', ['じゅ', 'ジュ'])
    .set('jyo', ['じょ', 'ジョ'])
    .set('bya', ['びゃ', 'ビャ'])
    .set('byu', ['びゅ', 'ビュ'])
    .set('byo', ['びょ', 'ビョ'])
    .set('pya', ['ぴゃ', 'ピャ'])
    .set('pyu', ['ぴゅ', 'ピュ'])
    .set('pyo', ['ぴょ', 'ピョ'])
    .set('fa', ['ふぁ', 'ファ'])
    .set('fi', ['ふぃ', 'フィ'])
    .set('fe', ['ふぇ', 'フェ'])
    .set('fo', ['ふぉ', 'フォ']);

let list_of_romanized_kana = Array.from(hiragana_katakana.keys());

export const kogakimoji: Map<string, Array<string>> = new Map().set('chu', ['っ', 'ッ']);

export const hatsuon: Map<string, Array<string>> = new Map().set('n', ['ん', 'ン']);