#!/usr/bin/env node

import { LetterTransformer } from './lettertransformer'
import { ToneSandhiSyllableTransformer } from './syllabletransformer'
import { ToneSandhiWordTransformer } from './wordtransformer'
import { dictionary } from './dictionary'

const argc = process.argv.splice(2);

if (argc.length != 1) {
    console.error(`Invalid number of arguments ${argc}`);
    process.exit(1);
}

const input = argc[0];

class Client {
    lookup(k: string) {
        for(let key in dictionary) {
            if(key == k) {
            var value = dictionary[key];
            }
            if(value != null) {
            //console.log(value[0]);
            return value[0];
            }
        }
        return null;
    }

    take(str: string) {
        console.log("input: %s", str)
        
        // Letter Transformer
        let lt = new LetterTransformer(str);
        let seqOfGraphemes = lt.transform();

        // Syllable Transformer
        let st = new ToneSandhiSyllableTransformer(seqOfGraphemes);
        let seqOfMorphemes = st.transform();
        
        // Word Transformer
        let wt = new ToneSandhiWordTransformer(seqOfMorphemes);
        let seqOfLexemes = wt.transform();

        //console.log(seqOfLexemes[0].word.literal)
        //console.log(seqOfLexemes[0].baseForms)
        return seqOfLexemes[0].word.literal;
    }
}

let clt = new Client();
let query = clt.take(input);
let results = clt.lookup(query);

console.log(results);
