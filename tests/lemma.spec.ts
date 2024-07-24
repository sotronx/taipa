import { Client } from '../src/client';
import {
  tonalLemmatizationAnalyzer,
  graphAnalyzeTonal,
} from '../src/unchange/analyzer';
import { lemmatize } from '../src/unchange/lemmatizer';
import { TonalUncombiningForms } from '../src/unchange/metaplasm';
import { graphAnalyzeKana } from '../src/kana/analyzer';

describe('Lemma testing', () => {
  const cli = new Client();

  const t1 = cli.processTonal('chitt');
  test('check the number of lemmata', () => {
    expect(t1.lemmas.length).toEqual(0);
  });

  const t2 = cli.processTonal('suzjipwhuatf');
  test('check the number of lemmata', () => {
    expect(t2.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t2.lemmas[0].literal).toEqual('suzjipwhuat');
  });

  const t3 = cli.processTonal('gua');
  test('check the number of lemmata', () => {
    expect(t3.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t3.lemmas[0].literal).toEqual('guay');
  });
});

describe('Uncombining form testing, reduplication', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze(
    'angxxangzangx',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, triplet', () => {
    expect(ms1[0].getForms()[0].literal).toEqual('angx');
  });

  test('check the uncombining form, triplet', () => {
    expect(ms1[1].getForms()[0].literal).toEqual('angx');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze(
    'angzangx',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, doublet', () => {
    expect(ms2[0].getForms()[0].literal).toEqual('angx');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze(
    'juahxjuahwjuahh',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, triplet', () => {
    expect(ms3[0].getForms()[0].literal).toEqual('juahh');
  });

  test('check the uncombining form, triplet', () => {
    expect(ms3[1].getForms()[0].literal).toEqual('juahh');
  });

  const ms4 = tonalLemmatizationAnalyzer.morphAnalyze(
    'juahwjuahh',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, doublet', () => {
    expect(ms4[0].getForms()[0].literal).toEqual('juahh');
  });
});

describe('Uncombining form testing, ay', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze(
    'calxay',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form', () => {
    expect(ms1[0].getForms()[0].literal).toEqual('catt');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze(
    'cagxay',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form', () => {
    expect(ms2[0].getForms()[0].literal).toEqual('cakk');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze(
    'abxay',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form', () => {
    expect(ms3[0].getForms()[0].literal).toEqual('app');
  });

  const ms4 = tonalLemmatizationAnalyzer.morphAnalyze(
    'cilfay',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form', () => {
    expect(ms4[0].getForms()[0].literal).toEqual('cit');
  });

  const ms5 = tonalLemmatizationAnalyzer.morphAnalyze(
    'tegfay',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form', () => {
    expect(ms5[0].getForms()[0].literal).toEqual('tek');
  });

  const ms6 = tonalLemmatizationAnalyzer.morphAnalyze(
    'kabfay',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form', () => {
    expect(ms6[0].getForms()[0].literal).toEqual('kap');
  });

  const ms7 = tonalLemmatizationAnalyzer.morphAnalyze(
    'taiwtongxay',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, 3-syllable word', () => {
    expect(ms7[0].getForms()[0].literal).toEqual('taiz');
  });

  const ms8 = tonalLemmatizationAnalyzer.morphAnalyze(
    'ngzafthaixay',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, 4-syllable word', () => {
    expect(ms8[0].getForms()[1].literal).toEqual('ngx');
    expect(ms8[1].getForms()[0].literal).toEqual('ay');
  });
});

describe('Lemma testing, voiced final consonant followed by ay', () => {
  const lm1 = lemmatize('calx');
  test('check the uncombining form', () => {
    expect(lm1.getLemmas().map((x) => x.literal)[0]).toEqual('catt');
  });

  const lm2 = lemmatize('cagx');
  test('check the uncombining form', () => {
    expect(lm2.getLemmas().map((x) => x.literal)[0]).toEqual('cakk');
  });

  const lm3 = lemmatize('abx');
  test('check the uncombining form', () => {
    expect(lm3.getLemmas().map((x) => x.literal)[0]).toEqual('app');
  });
});

describe('Uncombining form testing, ietf or ietw to ek or ekk', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze(
    'pietfkew',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, changed rime', () => {
    expect(ms1[0].getForms()[1].literal).toEqual('pek');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze(
    'pietwlienx',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, changed rime', () => {
    expect(ms2[0].getForms()[1].literal).toEqual('pekk');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze(
    'pietwchong',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, unchanged rime, changed tone', () => {
    expect(ms3[0].getForms()[0].literal).toEqual('piett');
  });
});

describe('Uncombining form testing', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze(
    'tikwteng',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, tikw to tekk, changed rime', () => {
    expect(ms1[0].getForms()[0].literal).toEqual('tikk');
  });
});

describe('Uncombining form testing', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze(
    'jiwpowcitwlaw',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form for transfix, 4th checked syllable, citw to cit', () => {
    expect(ms1[2].getForms()[0].literal).toEqual('cit');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze(
    'tamwpurhwaw',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form for transfix, 8th checked syllable, purhw to purhh', () => {
    expect(ms2[1].getForms()[1].literal).toEqual('purhh');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze(
    'tangwsiwaw',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form for transfix, free syllable, siw to siy, six, siz', () => {
    expect(ms3[1].getForms()[0].literal).toEqual('si');
    expect(ms3[1].getForms()[1].literal).toEqual('siy');
    expect(ms3[1].getForms()[2].literal).toEqual('six');
    expect(ms3[1].getForms()[3].literal).toEqual('siz');
  });

  const ms6 = tonalLemmatizationAnalyzer.morphAnalyze(
    'tnghwkhih',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, 4th checked syllable, tnghw to tngh', () => {
    expect(ms6[0].getForms()[0].literal).toEqual('tngh');
  });

  const ms7 = tonalLemmatizationAnalyzer.morphAnalyze(
    'kuehwlaih',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, 4th checked syllable, kuehw to kueh', () => {
    expect(ms7[0].getForms()[0].literal).toEqual('kueh');
  });
});

describe('Lemma testing', () => {
  const cli = new Client();

  const t1 = cli.processTonal('sia');
  test('check the number of lemmata', () => {
    expect(t1.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t1.lemmas[0].literal).toEqual('siay');
  });

  const t2 = cli.processTonal('siay');
  test('check the number of lemmata', () => {
    expect(t2.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t2.lemmas[0].literal).toEqual('siaw');
  });

  const t3 = cli.processTonal('siaw');
  test('check the number of lemmata', () => {
    expect(t3.lemmas.length).toEqual(2);
  });

  test('check the lemma', () => {
    expect(t3.lemmas[0].literal).toEqual('siaz');
    expect(t3.lemmas[1].literal).toEqual('siax');
  });

  const t4 = cli.processTonal('siaz');
  test('check the number of lemmata', () => {
    expect(t4.lemmas.length).toEqual(3);
  });

  test('check the lemma', () => {
    expect(t4.lemmas[0].literal).toEqual('sia');
    expect(t4.lemmas[1].literal).toEqual('siax');
    expect(t4.lemmas[2].literal).toEqual('siaf');
  });

  const t5 = cli.processTonal('siax');
  test('check the number of lemmata', () => {
    expect(t5.lemmas.length).toEqual(0);
  });
});

describe('Uncombining form testing, ~bwex, ~gwex, ~lwex', () => {
  const ms1 = tonalLemmatizationAnalyzer.morphAnalyze(
    'chabwex',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, voiced to unvoiced', () => {
    expect(ms1[0].getForms().length).toEqual(1);
    expect(ms1[0].getForms()[0].literal).toEqual('chapp');
  });

  const ms2 = tonalLemmatizationAnalyzer.morphAnalyze(
    'lagwex',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, voiced to unvoiced', () => {
    expect(ms2[0].getForms().length).toEqual(1);
    expect(ms2[0].getForms()[0].literal).toEqual('lakk');
  });

  const ms3 = tonalLemmatizationAnalyzer.morphAnalyze(
    'chilwex',
    new TonalUncombiningForms([])
  );
  test('check the uncombining form, voiced to unvoiced', () => {
    expect(ms3[0].getForms().length).toEqual(1);
    expect(ms3[0].getForms()[0].literal).toEqual('chitt');
  });
});

describe('Lemma testing, empty string as an argument, tonal', () => {
  const inputEmpty: any = '';

  const gs1 = graphAnalyzeTonal(inputEmpty).map(
    (x) => x.letter && x.letter.literal
  );
  test('given empty string, check the letter literal', () => {
    expect(gs1.length).toEqual(0);
  });

  const soudnSeqs1 = tonalLemmatizationAnalyzer
    .morphAnalyze(inputEmpty, new TonalUncombiningForms([]))
    .map((x) => x.sounds);
  test('given empty string, check the letter literal', () => {
    expect(soudnSeqs1.length).toEqual(0);
  });

  const lx1 = lemmatize(inputEmpty);
  test('check the word literal', () => {
    expect(lx1.word.literal).toEqual('');
  });

  test('check the inflectional ending literal', () => {
    expect(lx1.getInflectionalEnding()).toEqual('');
  });

  test('check the lemmas', () => {
    expect(lx1.getLemmas().map((x) => x.literal).length).toEqual(0);
  });

  test('check the lemmas', () => {
    expect(lx1.getLemmas.length).toEqual(0);
  });
});

describe('Lemma testing, undefined string as an argument, tonal', () => {
  const inputUnd: any = undefined;

  const gs1 = graphAnalyzeTonal(inputUnd).map(
    (x) => x.letter && x.letter.literal
  );
  test('given undefined string, check the letter literal', () => {
    expect(gs1.length).toEqual(0);
  });

  const soudnSeqs2 = tonalLemmatizationAnalyzer
    .morphAnalyze(inputUnd, new TonalUncombiningForms([]))
    .map((x) => x.sounds);
  test('given undefined string, check the letter literal', () => {
    expect(soudnSeqs2.length).toEqual(0);
  });

  const lx2 = lemmatize(inputUnd);
  test('check the word literal', () => {
    expect(lx2.word.literal).toEqual('');
  });

  test('check the inflectional ending literal', () => {
    expect(lx2.getInflectionalEnding()).toEqual('');
  });

  test('check the lemmas', () => {
    expect(lx2.getLemmas().map((x) => x.literal).length).toEqual(0);
  });

  test('check the lemmas', () => {
    expect(lx2.getLemmas.length).toEqual(0);
  });
});

describe('Lemma testing, empty string as an argument, kana', () => {
  const inputEmpty: any = '';

  const gs1 = graphAnalyzeKana(inputEmpty).map(
    (x) => x.letter && x.letter.literal
  );
  test('given empty string, check the letter literal', () => {
    expect(gs1.length).toEqual(0);
  });
});

describe('Lemma testing, undefined string as an argument, kana', () => {
  const inputUnd: any = undefined;

  const gs1 = graphAnalyzeKana(inputUnd).map(
    (x) => x.letter && x.letter.literal
  );
  test('given undefined string, check the letter literal', () => {
    expect(gs1.length).toEqual(0);
  });
});
