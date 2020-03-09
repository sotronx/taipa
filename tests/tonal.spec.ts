import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalLemmatizationAnalyzer } from '../src/tonal/analyzer';
import { TonalInflectionAnalyzer } from '../src/dparser/analyzer';
import { TonalZeroCombining } from '../src/morpheme';
import { EighthToSecondCombining, EighthToFirstCombining } from '../src/dparser/morpheme';

describe('Tonal testing', () => {
    const cli = new Client();

    const t1 = cli.processTonal('damwvurhhxoay');

    test('check the tonal affix', () => {
        expect(t1.soundSequences[1][3].toString()).toEqual(TonalLetterTags.x);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('binznafchaiw');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[1][2].toString()).toEqual(TonalLetterTags.f);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('qinznafjitt');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[1][2].toString()).toEqual(TonalLetterTags.f);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('chaufcheng');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('daizoanx');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.x);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('daizoanzoez');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[2][2].toString()).toEqual(TonalLetterTags.z);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('daiwjittwvunfdeyqok');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[2][3].toString()).toEqual(TonalLetterTags.f);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('qurzsa');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('hongzqun');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.z);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siappwjipp');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][4].toString()).toEqual(TonalLetterTags.w);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('qazvi');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('mihhwqiannz');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('bakkwchiu');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('ginfnay');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('kazcng');

    test('check the tonal affix', () => {
        expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('ax');

    test('check if it is present, after tone sandhi of ay is incorporated', () => {
        expect(doc.word.literal).toEqual('ax');
    });
});

describe('Tonal testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('soaiw');

    test('check if it is not present. 5 letters in length', () => {
        expect(doc.word.literal).toEqual('');
    });
});

describe('Tonal testing, eighth neutral tone to second neutral tone', () => {
    const tia = new TonalInflectionAnalyzer();

    const wrd1 = 'chiahh';

    const ms1 = tia.morphAnalyze(wrd1, new TonalZeroCombining());

    test('check the allomorph of the syllable', () => {
        expect(ms1[0].allomorph.toString()).toEqual(TonalLetterTags.hh);
    });

    const ms2 = tia.morphAnalyze(wrd1, new EighthToSecondCombining());

    test('check the tone letter of the syllable', () => {
        expect(ms2[0].getForms()[0].lastLetter.literal).toEqual(TonalLetterTags.y);
    });

    const wrd2 = 'chengzhokk';

    const ms4 = tia.morphAnalyze(wrd2, new EighthToFirstCombining());

    test('check the tone letter of the syllable', () => {
        expect(ms4[1].getForms()[0].lastLetter.literal).toEqual(TonalLetterTags.f);
    });
});

describe('Tonal testing', () => {
    const tla = new TonalLemmatizationAnalyzer();
    const morphemes1 = tla.morphAnalyze('ginfnay');

    test('check the tonal of the first syllable', () => {
        expect(morphemes1[0].allomorph.toString()).toEqual(TonalLetterTags.f);
    });

    const tia = new TonalInflectionAnalyzer();
    const morphemes2 = tia.morphAnalyze('ginfay', new TonalZeroCombining());

    test('check the tonal of the first syllable', () => {
        expect(morphemes2[0].allomorph.toString()).toEqual(TonalLetterTags.f);
    });
});

describe('Tonal testing', () => {
    const tla = new TonalLemmatizationAnalyzer();
    const morphemes1 = tla.morphAnalyze('qamxmay');

    test('check the tonal of the first syllable', () => {
        expect(morphemes1[0].allomorph.toString()).toEqual(TonalLetterTags.x);
    });

    const tia = new TonalInflectionAnalyzer();
    const morphemes2 = tia.morphAnalyze('qamxay', new TonalZeroCombining());

    test('check the tonal of the first syllable', () => {
        expect(morphemes2[0].allomorph.toString()).toEqual(TonalLetterTags.x);
    });
});
