
import { TonalWord, TonalLemmaLexeme, ToneSandhiInflectionLexeme } from './lexeme'
import { SYMBOLS } from './symbols'
import { TurningIntoInflectionLexeme, TurningIntoSandhiForm } from './lexememaker'
import { combiningRules } from './version2'

//------------------------------------------------------------------------------
//  Construction of Phrase
//------------------------------------------------------------------------------

class ConstructionOfPhrase {
    elements: Array<ConstructionElement> = new Array()

    constructor(arr: Array<ConstructionElement>){
        for(let key in arr) {
            this.elements.push(arr[key])
        }
    }
}

class ConstructionOfClause {
    isSeperable
}

class Conversion {
    // different from parsing lexmem. convert between part of speeches.
    forms: Array<ToneSandhiInflectionLexeme> = null
    as(): ToneSandhiInflectionLexeme {
        return this.forms[0]
    }
}

class Quantifier extends Conversion {
    constructor() {
        super()
    }
}

//------------------------------------------------------------------------------
//  Construction Element
//------------------------------------------------------------------------------

class ConstructionElement{
    id: string = ''
    lexemes: Array<ToneSandhiInflectionLexeme> = new Array()

    constructor(id: string) {
        this.id = id
    }

    addLexeme(l: ToneSandhiInflectionLexeme) {
        this.lexemes.push(l)
    }

    check(w: TonalWord) {
        for(let k in this.lexemes) {
            if(this.lexemes[k].toString(this.id) === w.literal) {
                return true
            }
        }
        return false
    }
}

//------------------------------------------------------------------------------
//  Type of Construction
//------------------------------------------------------------------------------

abstract class TypeOfConstruction {
    abstract constructions: Array<ConstructionOfPhrase> = null;
}

class VerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['intransitive', 'intransitive']),
    //new ConstructionOfPhrase(['serial', 'serial', 'intransitive']),
    //new ConstructionOfPhrase(['causative', 'accusative', 'intransitive'])

    constructions: Array<ConstructionOfPhrase> = []

    constructor() {
        super()

        let turner1 = new TurningIntoSandhiForm(combiningRules.get('zs')['w'])
        let l1 = turner1.turnIntoLexemes('oannzs')[0]
        l1.partOfSpeech = SYMBOLS.VERB
        l1.add('transitive')
        let transitive = new ConstructionElement('transitive')
        transitive.addLexeme(l1)
        
        let turner2 = new TurningIntoSandhiForm(combiningRules.get('y')['zero'])
        let l2 = turner2.turnIntoLexemes('goay')[0]
        l2.partOfSpeech = SYMBOLS.PERSONALPRONOUN
        l2.add('proceeding')
        let proceeding = new ConstructionElement('proceeding')
        proceeding.addLexeme(l2)

        let turner3 = new TurningIntoInflectionLexeme()
        let l3 = turner3.turnIntoLexemes('zurw')[0]
        l3.partOfSpeech = SYMBOLS.VERB
        l3.add('intransitive')
        let intransitive = new ConstructionElement('intransitive')
        intransitive.addLexeme(l3)

        this.constructions.push(new ConstructionOfPhrase([transitive, proceeding, intransitive]))
    }
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['ditransitive', 'dative', 'accusative'])
    constructions = []
}


//------------------------------------------------------------------------------
//  Rule-Based Tagger
//------------------------------------------------------------------------------

export class RuleBasedTagger {
    lexemes: Array<ToneSandhiInflectionLexeme> = new Array();

    constructor(lexemes: Array<TonalLemmaLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<TonalLemmaLexeme>) {
        // take in lemma lexemes and then check them against parsing lexemes
        // store matched parsing lexemes in nodes
        let w: TonalWord = lexemes[0].word

        let cop: ConstructionOfPhrase
        let vp = new VerbPhrase()
        //if(w instanceof ToneSandhiWord) {
            for(let key in vp.constructions) {
                if(vp.constructions[key].elements[0].check(w)) {
                    cop = vp.constructions[key]
                }
            }
        //} else if(w instanceof TonallessWord) {}

        if(cop.elements[1].check(lexemes[1].word))
        { }
        if(cop.elements[2].check(lexemes[2].word))
        { }

        for(let k in lexemes) {
            this.lexemes.push(vp.constructions[0].elements[k].lexemes[0])
        }
    }
}