import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/tonalres';
import { tonalLemmatizationAnalyzer } from '../src/unchange/analyzer';
import { tonalInflectionAnalyzer } from '../src/change/analyzer';
import { TonalZeroCombining } from '../src/metaplasm';
import {
  EighthToSecondCombining,
  TonalCombiningForms,
  TonalDesinenceInflection,
} from '../src/change/metaplasm';
import { createTonalInflectionLexeme } from '../src/change/creator';
import { TonalStandaloneForms } from '../src/unchange/metaplasm';
import {
  extractTones,
  getToneEndingNumber,
  getToneEndingNumbersTwo,
  getToneEndingNumbersThree,
} from '../src/tonal/tone';

describe('Tonal testing', () => {
  const cli = new Client();

  const t1 = cli.processTonal('tamwpurhxuay');
  test('check the tone letter', () => {
    expect(t1.soundSequences[1][3].toString()).toEqual(TonalLetterTags.x);
  });

  const t2 = cli.processTonal('binznafchaiw');
  test('check the tone letter', () => {
    expect(t2.soundSequences[1][2].toString()).toEqual(TonalLetterTags.f);
  });

  const t3 = cli.processTonal('kinznafjitt');
  test('check the tone letter', () => {
    expect(t3.soundSequences[1][2].toString()).toEqual(TonalLetterTags.f);
  });

  const t4 = cli.processTonal('chaufching');
  test('check the tone letter', () => {
    expect(t4.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
  });

  const t5 = cli.processTonal('taizuanx');
  test('check the tone letter', () => {
    expect(t5.soundSequences[1][3].toString()).toEqual(TonalLetterTags.x);
  });

  const t6 = cli.processTonal('taizuanzuez');
  test('check the tone letter', () => {
    expect(t6.soundSequences[2][2].toString()).toEqual(TonalLetterTags.z);
  });

  const t7 = cli.processTonal('taiwjitwpunfteykok');
  test('check the tone letter', () => {
    expect(t7.soundSequences[2][3].toString()).toEqual(TonalLetterTags.f);
  });

  const t8 = cli.processTonal('kurzsa');
  test('check the tone letter', () => {
    expect(t8.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
  });

  const t9 = cli.processTonal('hongzqun');
  test('check the tone letter', () => {
    expect(t9.soundSequences[0][3].toString()).toEqual(TonalLetterTags.z);
  });

  const t10 = cli.processTonal('siapwjipp');
  test('check the tone letter', () => {
    expect(t10.soundSequences[0][4].toString()).toEqual(TonalLetterTags.w);
  });

  const t11 = cli.processTonal('kazpi');
  test('check the tone letter', () => {
    expect(t11.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
  });

  const t12 = cli.processTonal('mihwkiannz');
  test('check the tone letter', () => {
    expect(t12.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });

  const t13 = cli.processTonal('bakwchiu');
  test('check the tone letter', () => {
    expect(t13.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });

  const t14 = cli.processTonal('khazcng');
  test('check the tone letter', () => {
    expect(t14.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
  });

  const t15 = cli.processTonal('lamzturfgiy');
  test('check the tone letter', () => {
    expect(t15.soundSequences[0][3].toString()).toEqual(TonalLetterTags.z);
  });
});

describe('Tonal testing, if present or not', () => {
  const cli = new Client();

  const t1 = cli.processTonal('ax');
  test('check if it is present, after tone sandhi of ay is incorporated', () => {
    expect(t1.word.literal).toEqual('ax');
  });

  const t2 = cli.processTonal('suaiw');
  test('check if it is not present. 5 letters in length', () => {
    expect(t2.word.literal).toEqual('');
  });
});

describe('Tonal testing', () => {
  const tia = tonalInflectionAnalyzer;

  const wrd1 = 'chiahh';
  const ms1 = tia.morphAnalyze(wrd1, new TonalZeroCombining());
  test('check the allomorph of the syllable', () => {
    expect(ms1[0].allomorph.toString()).toEqual(TonalLetterTags.hh);
  });

  const ms2 = tia.morphAnalyze(wrd1, new EighthToSecondCombining());
  test('check the final of the syllable', () => {
    expect(ms2[0].getForms()[0].lastSecondLetter.literal).toEqual(
      TonalLetterTags.h
    );
  });
  test('check the tone letter of the syllable, eighth neutral tone to second neutral tone', () => {
    expect(ms2[0].getForms()[0].lastLetter.literal).toEqual(TonalLetterTags.y);
  });

  const wrd2 = 'chingzhokk';
  const ms3 = tia.morphAnalyze(wrd2, new TonalZeroCombining());
  test('check the allomorph of the syllable', () => {
    expect(ms3[1].allomorph.toString()).toEqual(TonalLetterTags.kk);
  });

  const wrd3 = 'changxx';
  const ms5 = tia.morphAnalyze(wrd3, new TonalCombiningForms());
  test('check the allomorph of the syllable', () => {
    expect(ms5[0].allomorph.toString()).toEqual(TonalLetterTags.xx);
  });
});

describe('Tonal testing', () => {
  const morphemes1 = tonalLemmatizationAnalyzer.morphAnalyze(
    'ginfnay',
    new TonalStandaloneForms([])
  );
  test('check the tonal of the first syllable', () => {
    expect(morphemes1[0].allomorph.toString()).toEqual(TonalLetterTags.f);
  });

  const tia = tonalInflectionAnalyzer;
  const morphemes2 = tia.morphAnalyze('ginfay', new TonalZeroCombining());
  test('check the tonal of the first syllable', () => {
    expect(morphemes2[0].allomorph.toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Tonal testing', () => {
  const morphemes1 = tonalLemmatizationAnalyzer.morphAnalyze(
    'kamxmay',
    new TonalStandaloneForms([])
  );
  test('check the tonal of the first syllable', () => {
    expect(morphemes1[0].allomorph.toString()).toEqual(TonalLetterTags.x);
  });

  const tia = tonalInflectionAnalyzer;
  const morphemes2 = tia.morphAnalyze('kamxay', new TonalZeroCombining());
  test('check the tonal of the first syllable', () => {
    expect(morphemes2[0].allomorph.toString()).toEqual(TonalLetterTags.x);
  });
});

describe('Tone group testing of words', () => {
  const tia = tonalInflectionAnalyzer;
  const lx3 = tia.lexAnalyze('chiahh', new TonalDesinenceInflection());
  const lx4 = tia.lexAnalyze('ez', new TonalDesinenceInflection());
  test('check the tone of the word, 47', () => {
    expect(lx3.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.hh);
  });
  test('check the tone of the word, 47', () => {
    expect(lx4.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.z);
  });

  const lx5 = createTonalInflectionLexeme('phah');
  const lx6 = createTonalInflectionLexeme('ew');
  test('check the tone of the word, 43', () => {
    expect(lx5.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.h);
  });
  test('check the tone of the word, 43', () => {
    expect(lx6.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Tone group testing of syllables', () => {
  const tia = tonalInflectionAnalyzer;

  const ms1 = tia.morphAnalyze('hongwseysew', new TonalCombiningForms());
  test('check the tone of the syllable', () => {
    expect(ms1[0].allomorph.toString()).toEqual(TonalLetterTags.w);
  });
  test('check the tone of the syllable', () => {
    expect(ms1[1].allomorph.toString()).toEqual(TonalLetterTags.y);
  });
  test('check the tone of the syllable', () => {
    expect(ms1[2].allomorph.toString()).toEqual(TonalLetterTags.w);
  });

  const ms2 = tia.morphAnalyze('cuhycuhykiurw', new TonalCombiningForms());
  test('check the tone letter of the syllable', () => {
    expect(ms2[0].allomorph.toString()).toEqual(
      TonalLetterTags.h + TonalLetterTags.y
    );
  });
  test('check the tone letter of the syllable', () => {
    expect(ms2[1].allomorph.toString()).toEqual(
      TonalLetterTags.h + TonalLetterTags.y
    );
  });
  test('check the tone letter of the syllable', () => {
    expect(ms2[2].allomorph.toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Tone group testing of phrasal verbs', () => {
  const lx1 = createTonalInflectionLexeme('ciet');
  const lx2 = createTonalInflectionLexeme('lueh');
  test('check the tonal of the word, 34', () => {
    expect(lx1.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.t);
  });
  test('check the tone of the word, 34', () => {
    expect(lx2.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.h);
  });

  const tia = tonalInflectionAnalyzer;
  const lx3 = tia.lexAnalyze('thehh', new TonalDesinenceInflection());
  const lx4 = tia.lexAnalyze('khih', new TonalDesinenceInflection());
  const lx5 = tia.lexAnalyze('laih', new TonalDesinenceInflection());
  test('check the tone of the word, 844', () => {
    expect(lx3.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.hh);
  });
  test('check the tone of the word, 844', () => {
    expect(lx4.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.h);
  });
  test('check the tone of the word, 844', () => {
    expect(lx5.getAllomorphicEnding().toString()).toEqual(TonalLetterTags.h);
  });
});

describe('Tone testing, extractTone', () => {
  const inputUnd: any = undefined;
  const inputEmpty: any = '';

  const lt1 = extractTones(inputEmpty);
  test('check the length of toneLetters and stopFinals for empty input', () => {
    expect(lt1.toneLetters.length).toEqual(0);
    expect(lt1.stopFinals.length).toEqual(0);
  });

  const lt2 = extractTones(inputUnd);
  test('check the length of toneLetters and stopFinals for undefined input', () => {
    expect(lt2.toneLetters.length).toEqual(0);
    expect(lt2.stopFinals.length).toEqual(0);
  });
});

describe('Tone testing, getToneEndingNumber', () => {
  const inputUnd: any = undefined;
  const inputEmpty: any = '';

  const num1 = getToneEndingNumber(inputEmpty);
  test('check returned value for empty input', () => {
    expect(num1).toEqual(-1);
  });

  const num2 = getToneEndingNumber(inputUnd);
  test('check the returned value for undefined input', () => {
    expect(num2).toEqual(-1);
  });

  const nums1 = getToneEndingNumbersTwo(inputEmpty, inputEmpty);
  test('check returned value for empty input', () => {
    expect(nums1[0]).toEqual(-1);
    expect(nums1[1]).toEqual(-1);
  });

  const nums2 = getToneEndingNumbersTwo(inputUnd, inputUnd);
  test('check the returned value for undefined input', () => {
    expect(nums2[0]).toEqual(-1);
    expect(nums2[1]).toEqual(-1);
  });

  const nums3 = getToneEndingNumbersThree(inputEmpty, inputEmpty, inputEmpty);
  test('check returned value for empty input', () => {
    expect(nums3[0]).toEqual(-1);
    expect(nums3[1]).toEqual(-1);
    expect(nums3[2]).toEqual(-1);
  });

  const nums4 = getToneEndingNumbersThree(inputUnd, inputUnd, inputUnd);
  test('check the returned value for undefined input', () => {
    expect(nums4[0]).toEqual(-1);
    expect(nums4[1]).toEqual(-1);
    expect(nums4[2]).toEqual(-1);
  });
});
