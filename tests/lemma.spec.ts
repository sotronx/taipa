import { Client } from '../src/client';
import { TokenAnalysis } from '../src/token';
import { TonalLemmatizationAnalyzer } from '../src/tonal/analyzer';
import { TonalLemmatizer } from '../src/tonal/lemmatizer';

describe('Lemma testing', () => {
  const cli = new Client();

  const t1 = cli.processTonal('chitt');

  test('check the number of lemmata', () => {
    expect(t1.lemmas.length).toEqual(0);
  });

  const t2 = cli.processTonal('suzjippwhoatf');

  test('check the number of lemmata', () => {
    expect(t2.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t2.lemmas[0].literal).toEqual('suzjippwhoat');
  });

  const t3 = cli.processTonal('goa');

  test('check the number of lemmata', () => {
    expect(t3.lemmas.length).toEqual(1);
  });

  test('check the lemma', () => {
    expect(t3.lemmas[0].literal).toEqual('goay');
  });
});

describe('Uncombining form testing, reduplication', () => {
  const tla = new TonalLemmatizationAnalyzer();

  const ms1 = tla.morphAnalyze('angxxangzangx');

  test('check the uncombining form, triplet', () => {
    expect(ms1[0].getForms()[0].literal).toEqual('angx');
  });

  test('check the uncombining form, triplet', () => {
    expect(ms1[1].getForms()[0].literal).toEqual('angx');
  });

  const ms2 = tla.morphAnalyze('angzangx');

  test('check the uncombining form, doublet', () => {
    expect(ms2[0].getForms()[0].literal).toEqual('angx');
  });
});

describe('Lemma testing', () => {
  const cli = new Client();
  // let doc = new TokenAnalysis();

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
    expect(t4.lemmas[0].literal).toEqual('siax');
    expect(t4.lemmas[1].literal).toEqual('siaf');
    expect(t4.lemmas[2].literal).toEqual('sia');
  });

  const t5 = cli.processTonal('siax');

  test('check the number of lemmata', () => {
    expect(t5.lemmas.length).toEqual(0);
  });
});

describe('Lemma testing, empty string as an argument', () => {
  const tla = new TonalLemmatizationAnalyzer();

  const inputEmpty: any = '';

  const gs2 = tla
    .graphAnalyze(inputEmpty)
    .map(x => x.letter && x.letter.literal);

  test('given empty string, check the letter literal', () => {
    expect(gs2.length).toEqual(0);
  });

  const soudnSeqs1 = tla.morphAnalyze(inputEmpty).map(x => x.sounds);

  test('given empty string, check the letter literal', () => {
    expect(soudnSeqs1.length).toEqual(0);
  });

  const lmtzr = new TonalLemmatizer();
  const lx1 = lmtzr.lemmatize(inputEmpty);

  test('check the word literal', () => {
    expect(lx1.word.literal).toEqual('');
  });

  test('check the inflectional ending literal', () => {
    expect(lx1.getInflectionalEnding()).toEqual('');
  });

  test('check the lemmas', () => {
    expect(lx1.getLemmas().map(x => x.literal).length).toEqual(0);
  });

  test('check the lemmas', () => {
    expect(lx1.getLemmas.length).toEqual(0);
  });
});

describe('Lemma testing, undefined string as an argument', () => {
  const tla = new TonalLemmatizationAnalyzer();

  const inputUnd: any = undefined;

  const gs1 = tla.graphAnalyze(inputUnd).map(x => x.letter && x.letter.literal);

  test('given undefined string, check the letter literal', () => {
    expect(gs1.length).toEqual(0);
  });

  const soudnSeqs2 = tla.morphAnalyze(inputUnd).map(x => x.sounds);

  test('given undefined string, check the letter literal', () => {
    expect(soudnSeqs2.length).toEqual(0);
  });

  const lmtzr = new TonalLemmatizer();

  const lx2 = lmtzr.lemmatize(inputUnd);

  test('check the word literal', () => {
    expect(lx2.word.literal).toEqual('');
  });

  test('check the inflectional ending literal', () => {
    expect(lx2.getInflectionalEnding()).toEqual('');
  });

  test('check the lemmas', () => {
    expect(lx2.getLemmas().map(x => x.literal).length).toEqual(0);
  });

  test('check the lemmas', () => {
    expect(lx2.getLemmas.length).toEqual(0);
  });
});
