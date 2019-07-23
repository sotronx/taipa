import { TonalInflectingMetaplasm, Lexeme, Word, LexemeMaker } from '../lexeme'
import { TonalCombiningMorpheme } from './morpheme'
import { TonalWord, TonalSymbolEnding, FreeTonalEnding, CheckedTonalEnding } from '../tonal/lexeme'
import { TonalSyllable } from '../tonal/morpheme'
import { Allomorph, FreeAllomorph, CheckedAllomorph } from '../tonal/version2'

//------------------------------------------------------------------------------
//  Tonal Metaplasm
//------------------------------------------------------------------------------

class TonalPersonalPronounDeclension extends TonalInflectingMetaplasm {}
class TonalAdverbInflexion extends TonalInflectingMetaplasm {}
class TonalParticleInflexion extends TonalInflectingMetaplasm {}
class TonalZeroInflexion extends TonalInflectingMetaplasm {
    // examples: author and authoring. che qahf he. type and typing. meet and meeting.
}
class TonalInflexion extends TonalInflectingMetaplasm {
    apply(word: TonalWord, morphemes: Array<TonalCombiningMorpheme>) {
        let tse: TonalSymbolEnding
        if(morphemes.length > 0) {
            if(morphemes[morphemes.length-1].allomorph) {
                // tonal ending needs to be assigned to sandhi lexeme
                tse = this.assignTonalEnding(morphemes[morphemes.length-1].allomorph);
            } else {
                tse = new TonalSymbolEnding()
            }
        } else {
            tse = new TonalSymbolEnding()
        }

        return this.getInflexionForms(word, morphemes, tse)
    }

    private assignTonalEnding(allomorph: Allomorph) {
        let tse: TonalSymbolEnding = new TonalSymbolEnding()

        if(allomorph instanceof FreeAllomorph) {
            // replace the tonal ending
            let fte = new FreeTonalEnding()
            fte.allomorph = allomorph
            tse = fte
        } else if(allomorph instanceof CheckedAllomorph) {
            // append the tonal of the tonal ending
            let cte = new CheckedTonalEnding()
            cte.allomorph = allomorph
            tse = cte
        }
        return tse
    }

    private getInflexionForms(word: TonalWord, morphemes: Array<TonalCombiningMorpheme>, tse: TonalSymbolEnding) {
        if(tse) {
            let wd = new TonalWord(word.syllables);
            let last = morphemes[morphemes.length-1]
            let slbs = last.getForms()
            let rets = []
            for(let i in slbs) {
                wd.popSyllable()
                wd.pushSyllable(slbs[i]);
                rets.push(wd)
            }
            return rets
        }
        return []
    }
}

//------------------------------------------------------------------------------
//  Tonal Inflection Lexeme
//------------------------------------------------------------------------------

export abstract class InflexionLexeme extends Lexeme {
    abstract word: Word
    partOfSpeech: string = ''
}

export class TonalInflexionLexeme extends InflexionLexeme {
    word: TonalWord
    wordForms: Array<TonalWord> = new Array()
    metaplasm: TonalInflectingMetaplasm = new TonalZeroInflexion()

    constructor(word: TonalWord) {
        super()
        this.word = word;
    }

    assignWordForms(ms: Array<TonalCombiningMorpheme>, tm: TonalInflexion): any {
        this.wordForms = tm.apply(this.word, ms)
    }
}

export class DummyLexeme extends InflexionLexeme {
    word: Word = new Word()
    constructor() {
        super()
    }
}

//------------------------------------------------------------------------------
//  Tonal Inflexion Lexeme Maker
//------------------------------------------------------------------------------

export class TonalInflexionLexemeMaker extends LexemeMaker {
    morphemes: Array<TonalCombiningMorpheme>;

    constructor(morphemes: Array<TonalCombiningMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new TonalInflexionLexeme(new TonalWord(syllables));
    }

    postprocess(tl: TonalInflexionLexeme) {
        tl.assignWordForms(this.morphemes, new TonalInflexion())

        let lexemes: Array<TonalInflexionLexeme> = new Array();
        lexemes.push(tl);

        return lexemes
    }
}

export class DummyLexemeMaker {
    makeLexeme(str: string) {
        let l = new DummyLexeme();
        l.word = new Word();
        l.word.literal = str;
        return l;
    }
}
