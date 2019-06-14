import { TonalLemmatizationLexeme, TonalLemmatization } from './tonal/lexeme'
import { InflexionLexeme, Lexeme, Word } from './lexeme'
import { dictionary } from './dictionary'
import { DependencyParser, Configuration, Guide, Transition, Arc, Shift, RightArc, Dependency } from './dependencyparser/dependencyparser'
import { RuleBasedTagger, TonalInflexionLexeme } from './dependencyparser/rulebasedtagger'
import { SYMBOLS } from './dependencyparser/symbols'
import { Sound } from './grapheme';

import { AnalyzerLoader } from './analyzer'
import { Kana } from './kana/init';
import { TonalInflective } from './tonal/init'
import { TonalLemmatizationAnalyzer } from './tonal/analyzer'

export class Document {
    lexemes: Array<TonalLemmatizationLexeme> = new Array();
    forms: Array<Word> = new Array();
    inflectionalEnding: string = ''
    parsingLexemes: Array<Lexeme> = new Array();
    combiningMorphemes: Array<Sound[]> = new Array()
    graph: Array<Arc> = new Array()
}

export class Display {

    constructor(private doc: Document) {}

    render() {
        let output = ''
        for(let i in this.doc.lexemes) {
            let l = this.doc.lexemes[i].word.literal
            let en = this.doc.inflectionalEnding
            if(l.length-en.length != 0) {
                output += l.substr(0, l.length-en.length) + ' - ' + 'inflectional stem'
            }
            let filler: string = ''
            for(let n = 0; n < l.substr(0, l.length-en.length).length; n++) {
                filler += ' '
            }
            if(en.length > 0) output += '\n' + filler + en + ' - ' + 'inflectional ending'

            for(let j in this.doc.combiningMorphemes) {
                let syll = ''
                let saunz = []
                for(let k in this.doc.combiningMorphemes[j]) {
                    let sou = this.doc.combiningMorphemes[j][k]
                    saunz.push('  - ' + sou.getLiteral() + ' - ' + sou.name)
                    syll += sou.getLiteral()
                }
                output += '\n' + '- ' + syll
                for(let k in saunz) {
                    output += '\n' + saunz[k]
                }
            }

            let ipw = this.lookup(this.doc.lexemes[i].word.literal);
            // when the input word can be found in the dictionary
            if(ipw != null) {
                output += '\n' + ipw
            }

            let ls = this.doc.forms

            for(let j in ls) {
                let bsw = this.lookup(ls[j].literal);
                // when the base form of the word can be found in the dictionary
                if(bsw != null) {
                    output += '\n' + bsw
                }
            }

        }

        return output
    }

    lookup(k: string) {
        for(let key in dictionary) {
            let value
            if(key == k) {
                value = dictionary[key];
            }
            if(value != null) {
                return value[0];
            }
        }
        return null;
    }

}

export class Client {
    processKana(str: string) {
        let al = new AnalyzerLoader()

        // kana
        al.load(Kana)
        let m_results = al.aws[0].analyzer.getMorphologicalAnalysisResults(str)
        if(m_results.result.successful == true) {
            al.aws[0].getBlocks(m_results.morphemes)
        } else al.aws[0].getBlocks(m_results.morphemes)
        
        al.unload(Kana)
    }

    processTonal(str: string) {
        let al = new AnalyzerLoader()

        // tonal
        al.load(TonalInflective)
        let tokens = str.match(/\w+/g)
        let l_results
        let doc: Document = new Document();
        if(tokens != null && tokens.length > 0) {
            l_results = al.aws[0].analyzer.getLexicalAnalysisResults(tokens[0])
            doc.lexemes = l_results.lexemes
            doc.forms = l_results.lemmata
            doc.inflectionalEnding = l_results.inflectionalEnding

            // the array of sounds is promoted to the lexeme and enclosed. also needs to be output.
            doc.combiningMorphemes = l_results.arraysOfSounds    
        }
        al.unload(TonalInflective)
        return doc;
    }

    process(str: string): Document {
        let dp = new DependencyParser();
        let c: Configuration = dp.getInitialConfiguration();
        let tokens = str.match(/\w+/g);

        let lexemes: Array<TonalLemmatizationLexeme> = new Array();
        let turner = new TonalLemmatizationAnalyzer()
        if(tokens != null && tokens.length >0) {
            for(let key in tokens) {
                lexemes.push(turner.getLexicalAnalysisResults(tokens[key]).lexemes[0])
            }
        }

        // can lexemes be replaced by a phraseme?
        let tagger = new RuleBasedTagger(lexemes);
        let nodes = tagger.lexemes;

        for(let key in nodes) {
            c.queue.push(nodes[key])
        }

        let guide = new Guide()
        let root = new InflexionLexeme()
        root.word.literal = 'ROOT'
        c.stack.push(root)

        if(c.stack.length == 1 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift())
        }

        while(!c.isTerminalConfiguration()) {
            let t = guide.getNextTransition();
            if(t == null || t == undefined) break
            c = c.makeTransition(t);
            if(c.stack[c.stack.length-1] != undefined) {
                if(c.stack[c.stack.length-1].partOfSpeech === SYMBOLS.VERB) {
                    let l = c.stack[c.stack.length-1]
                    if(c.queue.length > 0 && c.queue[0].partOfSpeech === SYMBOLS.PERSONALPRONOUN) {
                            guide.transitions.push(new Shift())
                    } else {
                            guide.transitions.push(new RightArc())
                            c.graph.push(new Arc(Dependency.ccomp, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                            guide.transitions.push(new RightArc())
                    }
                } if(c.stack[c.stack.length-1].partOfSpeech === SYMBOLS.PERSONALPRONOUN) {
                    let l = c.stack[c.stack.length-1]
                            guide.transitions.push(new Shift())
                            c.graph.push(new Arc(Dependency.csubj, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                }
            }
        }

        let doc = new Document();
        doc.graph = c.getGraph();
        return doc;
    }
}
