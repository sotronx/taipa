import { AlphabeticLetter, lowerLetters, list_of_syllables, LetterFilters, Character } from './metadata'
import { GrammaticalUnit } from './expression'
import { Context } from './context'
import { LetterMatcher } from './lettermatcher'


//------------------------------------------------------------------------------
//  Rules of Sandhi Tone
//------------------------------------------------------------------------------

abstract class Rule {
    abstract getSandhiForm(b: ToneSandhiSyllable)
}

class FromNoneToZS extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['zs']);
        return b;
    }
}

class FromNoneToXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['xx']);
        return b;
    }
}

class FromNoneToXXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['xxx']);
        return b;
    }
}

class FromNoneToSS extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['ss']);
        return b;
    }
}

class FromYToNone extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['y'])) {
            console.log(b)
            return b;
        }
    }
}

class FromYToSS extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['y'])) {
            b.pushLetter(lowerLetters['ss']);
            return b;
        }
    }
}

class FromWToY extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['w'])) {
            b.pushLetter(lowerLetters['y']);
            return b;
        }
    }
}

class FromZSToW extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['zs'])) {
            b.pushLetter(lowerLetters['w']);
            return b;
        }

    }
}

class FromZSToXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['zs'])) {
            b.pushLetter(lowerLetters['xx']);
            return b;
        }

    }
}

class FromZSToXXX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['zs'])) {
            b.pushLetter(lowerLetters['xxx']);
            return b;
        }
    }
}

class FromXToZS extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        if(b.splitAtLastIndex(lowerLetters['x'])) {
            b.pushLetter(lowerLetters['zs']);
            return b;
        }
    }
}

class FromNoneToK extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['k']);
        return b;
    }
}

class FromNoneToP extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['p']);
        return b;
    }
}

class FromNoneToT extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['t']);
        return b;
    }
}

class FromNoneToX extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['x']);
        return b;
    }
}

class FromNoneToB extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['b']);
        return b;
    }
}

class FromNoneToD extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['d']);
        return b;
    }
}

class FromNoneToG extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['g']);
        return b;
    }
}

class FromNoneToY extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['y']);
        return b;
    }
}


class FromNoneToF extends Rule {
    getSandhiForm(b: ToneSandhiSyllable) {
        b.pushLetter(lowerLetters['f']);
        return b;
    }
}

class RulesOfSandhiTone {
    rules = {
        'ss': [new FromNoneToZS(), new FromNoneToXX(), new FromNoneToXXX(), new FromNoneToSS()],
        'y': [new FromYToSS(), new FromYToNone()],
        'w': [new FromWToY()],
        'zs': [new FromZSToW(), new FromZSToXX, new FromZSToXXX()],
        'x': [new FromXToZS(), new FromZSToXX, new FromZSToXXX()],
        'k': [new FromNoneToK()],
        'p': [new FromNoneToP()],
        't': [new FromNoneToT()],
        'b': [new FromNoneToX(), new FromNoneToB()],
        'd': [new FromNoneToX(), new FromNoneToD()],
        'g': [new FromNoneToX(), new FromNoneToG()],
        'h': [new FromNoneToY()],
        'f': [new FromNoneToX(), new FromNoneToF()],
    }

    rulesOfA = {
        'ss': ['x'],
        'y': ['ss'],
        'w': ['ss'],
        'h': ['hh'],
        'x': ['x'],
        'zs': ['x'],
        'p': ['pp'],
        't': ['tt'],
        'k': ['kk'],
        'b': ['bx'],
        'd': ['dx'],
        'g': ['gx'],
        'f': ['fx'],
    }

    getSandhiForms(b: ToneSandhiSyllable): Array<ToneSandhiSyllable> {
        let arr;
        if(this.rules[b.lastLetter.literal]) {
            arr = this.rules[b.lastLetter.literal];
            console.log(arr)
        } else {
            arr = this.rules['ss'];
            //console.log("first tone hit")
        }
        let ret: Array<ToneSandhiSyllable> = new Array();

        for(let k in arr) {
            let letarr =  Object.assign([], b.letters); // clone the array of letters from baseform
            ret.push(arr[k].getSandhiForm(new ToneSandhiSyllable(letarr)));
        }

        return ret;
    }
}

//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------

class Allomorph {
    literal: string = '';
    finals: Final[] = null;
}

class FreeToneMark extends Allomorph {
}

class FinalToneMark extends Allomorph {
}

class Final extends Allomorph {
}

class FreeToneMarkNone extends FreeToneMark {
}

class FreeToneMarkSS extends FreeToneMark {
    literal = 'ss';
}

class FreeToneMarkY extends FreeToneMark {
    literal = 'y';
}

class FreeToneMarkW extends FreeToneMark {
    literal = 'w';
}

class FreeToneMarkX extends FreeToneMark {
    literal = 'x';
}

class FreeToneMarkXX extends FreeToneMark {
    literal = 'xx';
}

class FreeToneMarkXXX extends FreeToneMark {
    literal = 'xxx';
}

class FreeToneMarkZZS extends FreeToneMark {
    literal = 'zzs';
}

class FreeToneMarkZS extends FreeToneMark {
    literal = 'zs';
}

class FinalP extends Final {
    literal = 'p';
}

class FinalT extends Final {
    literal = 't';
}

class FinalK extends Final {
    literal = 'k';
}

class FinalH extends Final {
    literal = 'h';
}

class FinalB extends Final {
    literal = 'b';
}

class FinalD extends Final {
    literal = 'd';
}

class FinalG extends Final {
    literal = 'g';
}

class FinalF extends Final {
    literal = 'f';
}

class FinalToneMarkP extends FinalToneMark {
    literal = 'p';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalP());
    }
}

class FinalToneMarkT extends FinalToneMark {
    literal = 't';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalT());
    }
}

class FinalToneMarkK extends FinalToneMark {
    literal = 'k';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalK());
    }

}

class FinalToneMarkH extends FinalToneMark {
    literal = 'h';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalH());
    }

}

class FinalToneMarkY extends FinalToneMark {
    literal = 'y';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalH());
    }
}

class FinalToneMarkB extends FinalToneMark {
    literal = 'b';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalB());
    }
}

class FinalToneMarkD extends FinalToneMark {
    literal = 'd';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalD());
    }
}

class FinalToneMarkG extends FinalToneMark {
    literal = 'g';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalG());
    }
}

class FinalToneMarkF extends FinalToneMark {
    literal = 'f';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalF());
    }
}

class FinalToneMarkX extends FinalToneMark {
    literal = 'x';
    finals: Final[] = new Array();
    constructor() {
        super();
        this.finals.push(new FinalB());
        this.finals.push(new FinalD());
        this.finals.push(new FinalG());
        this.finals.push(new FinalF());
    }
}

class Allomorphs {
    list: Array<Allomorph>  = new Array();
    constructor() {
        //this.list.push(new FreeToneMarkNone());
        this.list.push(new FreeToneMarkSS());
        this.list.push(new FreeToneMarkY());
        this.list.push(new FreeToneMarkW());
        this.list.push(new FreeToneMarkX());
        this.list.push(new FreeToneMarkXX());
        this.list.push(new FreeToneMarkXXX());
        this.list.push(new FreeToneMarkZZS());
        this.list.push(new FreeToneMarkZS());
        this.list.push(new FinalToneMarkP());
        this.list.push(new FinalToneMarkT());
        this.list.push(new FinalToneMarkK());
        this.list.push(new FinalToneMarkH());
        this.list.push(new FinalToneMarkB());
        this.list.push(new FinalToneMarkD());
        this.list.push(new FinalToneMarkG());
        this.list.push(new FinalToneMarkF());
        this.list.push(new FinalToneMarkY());
        this.list.push(new FinalToneMarkX());
    }
}

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

class Morpheme {
    lemma: string
}

class ToneSandhiMorpheme extends Morpheme {
    getBaseForm(letters: Array<AlphabeticLetter>) {
        let allomorphs = new Allomorphs();
        let arr = new Array();
        for(let key in allomorphs.list) {
            if(allomorphs.list[key].literal === letters[letters.length-1].literal) {
                arr.push(allomorphs.list[key]);
            }
        }
        console.log(arr)
        if(arr.length != 0) {
            for(let key in arr) {
                if(arr[key].finals != null) {
                    for(let k in arr[key].finals) {
                        if(arr[key].finals[k].literal === letters[letters.length-2].literal) {
                            let larr: Array<AlphabeticLetter> = new Array();
                            for(let i = 0; i < letters.length-2; i++) {
                                larr.push(letters[i]);
                            }
                            return larr;
                        }
                    }
                }
            }
        }
        console.log(letters)
        return letters;
    }
}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

class SyllablePatterns {
    // match base forms only

    list = new Array();

    constructor() {
        let lf = new LetterFilters();

        // one letter
        this.list.push([lf.medialLetters]);
        this.list.push([lf.nasalInitialLetters]);

        // two letters
        this.list.push([lf.medialLetters, lf.medialLetters]);
        this.list.push([lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.medialLetters, lf.finalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters]);        
        this.list.push([lf.nasalInitialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.nasalInitialLetters, lf.nasalLetters]);

        // three letters
        this.list.push([lf.medialLetters, lf.medialLetters, lf.medialLetters]);
        this.list.push([lf.medialLetters, lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.medialLetters, lf.medialLetters, lf.nasalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.finalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters]);
        this.list.push([lf.nasalInitialLetters, lf.nasalLetters, lf.neutralFinalLetters]);
        this.list.push([lf.initialLetters, lf.nasalLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.medialLetters, lf.finalLetters, lf.finalToneMarkLetters]);

        // four letters
        this.list.push([lf.medialLetters, lf.medialLetters, lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.medialLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.finalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.finalLetters, lf.finalToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.nasalLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.nasalLetters, lf.neutralFinalLetterH]);
        this.list.push([lf.medialLetters, lf.medialLetters, lf.nasalLetters, lf.freeToneMarkLetters]);
        this.list.push([lf.initialLetters, lf.medialLetters, lf.finalLetters, lf.finalToneMarkLetters]);

        // five letters
        this.list.push([lf.initialLetters, lf.medialLetters, lf.medialLetters, lf.nasalLetters, lf.neutralFinalLetters]);

        // lueifx, lurifx
    }
}

class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<string> = new Array();
    get matchedLength() { return this.pattern.length; }
    isAllomorphemicStem(ls: Array<AlphabeticLetter>) {
        // when a syllable of letters is in sandhi form with morpheme -ss
        // those syllables come without morpheme -ss should also be matched
        if(ls.length+1 == this.letters.length) { 
            for(let m = 0; m < ls.length; m++) {
                if(ls[m].literal.search(this.letters[m].literal) == 0) {
                    if(m+1 == ls.length) {
                        if(this.letters[this.letters.length-1].literal === lowerLetters['ss'].literal) {
                            return true;
                        }            
                        return false;
                    }
                } else {
                    return false;
                }
            }

        }
        return false;
    }
    isMatched(ls: Array<AlphabeticLetter>) {
        //console.log("matching %s with %s", new ToneSandhiSyllable(ls).literal, new ToneSandhiSyllable(this.letters).literal)
        if(this.isAllomorphemicStem(ls)) {
            return true;
        } else if(ls.length < this.letters.length) {
            // filter out those syllables shorter than the letters
            return false;
        }
        for(let n = 0; n < this.letters.length; n++) {
            // does it match the matched pattern
            //console.log("n: %d", n)
            //console.log("ls[n]: %s", ls[n].literal)
            if(ls[n].literal.search(this.letters[n].literal) == 0) {
                if(n+1 == this.letters.length) {
                    // the last loop, check the last letter
                    if(ls.length == this.letters.length || 
                        ls.length == this.letters.length+1 && 
                        ls[ls.length-1].literal.search(new RegExp(new LetterFilters().freeToneMarkLetters)) == 0) {
                            // we go beyond one letter in length to check if there are extra syllables to include
                            // we also include those syllables with freetonemark
                            return true;
                    } else {
                        return false;
                    }
                }
            }
        }
        return false;
    }
}

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------


export class Syllable extends GrammaticalUnit {
    literal: string;
    evaluate(context: Context){}
}

export class ToneSandhiSyllable extends Syllable {
    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        super();
        this.letters = new Array();
        if(letters != undefined) {
            let len = letters.length;
            for(var i = 0; i < len; i++) {
                this.pushLetter(letters[i]);
            }
        }
    }

    isBaseForm() {
        // look up in the lexicon to check if this syllable is in base form
    }

    pushLetter(l: AlphabeticLetter) {
        this.letters.push(l);
        this.literal += l.literal;
        //console.log("%s", l.literal);
    }

    popLetter() {
        var tmp = this.literal.substr(0, this.literal.length-this.letters[this.letters.length-1].literal.length);
        this.literal = '';
        this.literal = tmp;
        this.letters = this.letters.slice(0, this.letters.length-1);
    }

    splitAtLastIndex(l: AlphabeticLetter) {
        if(this.letters[this.letters.length-1].literal == l.literal) {
            this.popLetter();
            console.log(this.letters)
            return true;
        }
        return false;
    }

    get lastLetter() {
        return this.letters[this.letters.length-1]
    }
/*
    get lengthWithoutFreeToneMarkLetter(): number {
        let ret: number = this.letters.length;
        if(this.letters[this.letters.length-1].literal.search(new RegExp(new LetterFilters().freeToneMarkLetters)) == 0) {
            //console.log(this.letters)
            ret -= 1;
        }
        return ret
    }
*/
}

//------------------------------------------------------------------------------
//  ISyllables
//------------------------------------------------------------------------------

export interface ISyllables {
    list: {
        readonly [index: string]: ToneSandhiSyllable
    }
}

//------------------------------------------------------------------------------
//  Syllables
//------------------------------------------------------------------------------

export class Syllables {

    matchLetters(str: string) {
        // create just one syllable object using string
        // Letter Matcher
        let seqofletters: Array<AlphabeticLetter>;
        
        // Letter Matcher
        let lm = new LetterMatcher(str);
        seqofletters = lm.match();

        return seqofletters;
    }

    createSyllable(letters: Array<AlphabeticLetter>): ToneSandhiSyllable {
        return new ToneSandhiSyllable(letters);
    }

    populateSandhiFormTo(ss: Array<ToneSandhiSyllable>) {
        //console.log(ss)

        let baseforms: Array<ToneSandhiSyllable> = new Array();
        for(let k in ss) {
            baseforms.push(ss[k]);
        }
        // apply rules of sandhi form here
        let rost = new RulesOfSandhiTone();
        let sandhiforms;
        for(let m in baseforms) {
            /*
            for(let x in ss[0].letters) {
                console.log(ss[0].letters[x].literal)
            }
            */
            sandhiforms = rost.getSandhiForms(baseforms[m]);
            //console.log(sandhiforms)
            for(let r in ss) {
                // filter out duplicates
                for(let n in sandhiforms) {            
                    //console.log("r: %s, n: %s.", r, n)
                    //console.log(ss[r])
                    //console.log(sandhiforms[n])
                    if(ss[r].literal != sandhiforms[n].literal) {
                        ss.push(sandhiforms[n]);
                    }
                }
            }
    
        }
    }

    getMatchedSyllablePattern(letters: Array<AlphabeticLetter>, i: number, beginOfSyllable: number) {
        // get the longest matched syllable pattern
        let sp = new SyllablePatterns();
        let matchedLen = 0; // to be deleted
        let mp = new MatchedPattern();
        for(let m in sp.list) {
            let min = Math.min(letters.length-beginOfSyllable, sp.list[m].length);
            //console.log("min: %d", min)
            if(sp.list[m].length == min) {
                for(let n = 0; n < min; n++) {
                    //console.log("i: %d. n: %d.", i, n)
                    //console.log(letters)
                    if(letters[i+n].literal.search(new RegExp(sp.list[m][n])) == 0) {
                        if(n+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                mp.letters[q] = letters[i+q];
                            }
                            mp.pattern = sp.list[m];
                            console.log(sp.list[m])
                            //console.log(letters[i+n].literal)
                            //console.log(new RegExp(sp.list[m][n]))
                            //console.log(matchedLen)    
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return mp;
    }

    filter(ls: Array<AlphabeticLetter>, letters: Array<AlphabeticLetter>, i: number, beginOfSyllable: number) {
        console.log("%s matching", new ToneSandhiSyllable(ls).literal)
        let min = Math.min(ls.length, letters.length-beginOfSyllable);
        for(let q = 0; q < min; q++) {
            console.log("q: %d. ls.length: %d.",  q, ls.length)
            if(ls[q].literal != letters[i+q].literal) {
                // not equal at this letter
                console.log("%s != %s", ls[q].literal, letters[i+q].literal)
                break;
            } else if(ls[q].literal === letters[i+q].literal) {
                if(q == ls.length-1) {
                    // all letters are equal
                    //ss.push(new ToneSandhiSyllable(ls));
                    return new ToneSandhiSyllable(ls);
                } else if(q == ls.length-2) {
                    if(ls[q+1].literal === lowerLetters['y'].literal) {
                        if(letters.length === i+q+1) {
                            // '' != 'y'. 'ss' != 'y'. first tone != second tone
                            break;
                        } else if(letters.length === i+q+1+1) {
                            if(letters[i+q+1].literal === lowerLetters['ss'].literal) {
                                // replace y with ss
                                let s = new ToneSandhiSyllable(ls);
                                s.popLetter();
                                s.pushLetter(lowerLetters['ss']);
                                //ss.push(s);
                                return s;
                            }
                        }
                    }
                }
            }
        }

    }

    match(letters: Array<AlphabeticLetter>) {
        
        let syllables: Array<ToneSandhiSyllable> = new Array();
        //console.log("metadata letter array length %s. ", letters[0].literal);
        console.log(letters);
        let beginOfSyllable: number = 0;
        let ss: Array<ToneSandhiSyllable> = new Array(); // syllables
        for(let i = 0; i < letters.length; i++) {
            console.log("examining letter: %s. length of letters: %d", letters[i].literal, letters.length);
            //console.log("metadata letter array looping.");

            if(i-beginOfSyllable == 0) {
                console.log("i:%d. begin of syllable hit", i);
                //ss = this.list.filter(s => s.letters[0].literal === letters[i].literal);
                
                let msp = this.getMatchedSyllablePattern(letters, i, beginOfSyllable);

                console.log("matchedLen: %d", msp.matchedLength);
                console.log(msp.pattern);

                let arr = list_of_syllables.filter(s => s.search(letters[i].literal) === 0
                             && msp.isMatched(this.matchLetters(s)));

                //<--------------------------------------------------------------------------------
                let tmp = this.createSyllable(new ToneSandhiMorpheme().getBaseForm(letters)).literal;
                console.log(tmp)
                let ind = arr.indexOf(tmp);
                console.log("base form: %s", ind);

                if(ind >= 0) {
                }
                //-------------------------------------------------------------------------------->

                console.log(arr)

                for(let x = 0; x < arr.length; x++) {
                    console.log("x: %d. arr: %s",  x, arr[x])
                    let s = this.filter(this.matchLetters(arr[x]), letters, i, beginOfSyllable);
                    if(s != null) {
                        ss.push(s);
                    }
                }

                console.log(ss);
                if(ss.length == 1) {
                    this.populateSandhiFormTo(ss);
                }
    
            } else {
                console.log("i:%d. beginOfSyllable:%d. i-beginOfSyllable:%d", i, beginOfSyllable, i-beginOfSyllable);
                ss = ss.filter(s => s[i-beginOfSyllable] === letters[i].literal);
            }


            console.log(ss);
            if(ss.length == 0) {
                console.log("nothing matched");
            } else if(ss.length == 1) {
                console.log("just one matched. i:%d. ss[0].letters.length:%d", i, ss[0].letters.length);
                if(i+1-beginOfSyllable == ss[0].letters.length) {
                    // when index i plus one equals the length of the matched syllable
                    let tmp = ss.shift();
                    beginOfSyllable +=  tmp.letters.length;
                    syllables.push(tmp);
                }
            } else if(ss.length > 1) {
                let j = 0;
                do {
                    //ls.filter(l => console.log(l.characters) );
                    //console.log(ls);
                    console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let atLeastJ = new Array();
                    atLeastJ = ss.filter(s => s.letters.length >= j+1);
                    //console.log(atLeastJ);

                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let underJ = new Array();
                    underJ = ss.filter(s => s.letters.length < j+1);
                    //console.log(underJ);

                    if(atLeastJ.length > 0){
                        //console.log(ss);
                        //console.log("%s. %s", ss[0].literal, letters[i+j].literal)
                        ss = atLeastJ.filter(s => s.letters[j].literal === letters[i+j].literal);
                        //console.log("%s. %s", ss[0].literal, letters[i+j].literal)
                        //console.log("length of ss is: %d", ss.length)
                        //console.log(ss);
                        //console.log("length of ss is: %d", ss.length)
                        if(ss.length > 0){
                            ;
                        } else {
                            ss = underJ;
                        }
                    }
                    
                    j++;
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    //console.log(ss);
                    // continue looping when there are more than one results
                    // stop looping when j goes beyond the end of target
                } while(ss.length > 1 && i+j < letters.length);
                i += ss[0].letters.length-1; // skip the length-1 of characters of the found letter
                console.log("i:%d", i)
                // we want it only when the whole syllable is matched
                let tmp = ss.shift();
                beginOfSyllable += tmp.letters.length;
                syllables.push(tmp); // push the matched letter
                //console.log(tmp);
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        console.log(syllables);
        //console.log("length of syllables: %d", syllables.length);
        return syllables;
    }
}
