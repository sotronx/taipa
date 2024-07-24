import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/tonalres';
import { mutateFinalConsonantOfPrecedingSyllable } from '../src/change/mutator';

describe('Epenthesis testing', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('sutflay');
  test('check the consonant', () => {
    expect(ta1.soundSequences[1][0].toString()).toEqual(TonalLetterTags.l);
  });

  const ta2 = cli.processTonal('jiokxgay');
  test('check the consonant', () => {
    expect(ta2.soundSequences[1][0].toString()).toEqual(TonalLetterTags.g);
  });

  const ta3 = cli.processTonal('kapfbay');
  test('check the consonant', () => {
    expect(ta3.soundSequences[1][0].toString()).toEqual(TonalLetterTags.b);
  });

  const ta4 = cli.processTonal('kamxmay');
  test('check the consonant', () => {
    expect(ta4.soundSequences[1][0].toString()).toEqual(TonalLetterTags.m);
  });

  const ta5 = cli.processTonal('suanfnay');
  test('check the consonant', () => {
    expect(ta5.soundSequences[1][0].toString()).toEqual(TonalLetterTags.n);
  });
});

describe('Voiced final testing', () => {
  const lx1 = mutateFinalConsonantOfPrecedingSyllable('lakwex');
  test('chech the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('lagwex');
  });

  const lx2 = mutateFinalConsonantOfPrecedingSyllable('chapwex');
  test('chech the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('chabwex');
  });

  const lx3 = mutateFinalConsonantOfPrecedingSyllable('chitwex');
  test('chech the surface form', () => {
    expect(lx3.getForms()[0].literal).toEqual('chilwex');
  });
});

describe('Reduplication testing', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('siurfsiurzsiur');
  test('check the uncombining form', () => {
    expect(ta1.uncombiningSequences[0]).toContain('siur');
  });

  const ta2 = cli.processTonal('sanfsanfsany');
  test('check the uncombining form', () => {
    expect(ta2.uncombiningSequences[0]).toContain('sany');
  });

  const ta3 = cli.processTonal('samysamysamw');
  test('check the uncombining form', () => {
    expect(ta3.uncombiningSequences[0]).toContain('samw');
  });

  const ta4 = cli.processTonal('sipfsipfsip');
  test('check the uncombining form', () => {
    expect(ta4.uncombiningSequences[0]).toContain('sip');
  });

  const ta5 = cli.processTonal('angfangwangx');
  test('check the uncombining form', () => {
    expect(ta5.uncombiningSequences[0]).toContain('angx');
  });

  const ta6 = cli.processTonal('kufkuwkuz');
  test('check the uncombining form', () => {
    expect(ta6.uncombiningSequences[0]).toContain('kuz');
  });

  const ta7 = cli.processTonal('sitxsitwsitt');
  test('check the uncombining form', () => {
    expect(ta7.uncombiningSequences[0]).toContain('sitt');
  });
});

describe('Voiced final consonant testing', () => {
  const cli = new Client();

  const ta = cli.processTonal('tig');
  test('check if it handles sandhi final consonants', () => {
    expect(ta.soundSequences[0].map((it) => it.toString()).join('')).toEqual(
      'tig'
    );
  });
});

describe('-ik ending testing', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('tik');
  test('check if it handles sandhi rime, tik of tikw, tikw of tikk', () => {
    expect(ta1.soundSequences[0].map((it) => it.toString()).join('')).toEqual(
      'tik'
    );
  });

  const ta2 = cli.processTonal('chik');
  test('check if it handles sandhi final consonants, chik of chikf, chikf of chit', () => {
    expect(ta2.soundSequences[0].map((it) => it.toString()).join('')).toEqual(
      'chik'
    );
  });
});

describe('Consonant mutation testing, sandhi pp, tt, t', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('sannzamhwkauy');
  test('check the uncombining form', () => {
    expect(ta1.uncombiningSequences[1]).toContain('app');
  });

  test('check the consonant', () => {
    expect(ta1.soundSequences[1][1].toString()).toEqual(TonalLetterTags.m);
    expect(ta1.soundSequences[1][2].toString()).toEqual(TonalLetterTags.h);
  });

  const ta2 = cli.processTonal('hinhfnix');

  test('check the uncombining form', () => {
    expect(ta2.uncombiningSequences[0]).toContain('hit');
  });

  test('check the consonant', () => {
    expect(ta2.soundSequences[0][2].toString()).toEqual(TonalLetterTags.n);
    expect(ta2.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });

  const ta3 = cli.processTonal('punghfngay');

  test('check the uncombining form', () => {
    expect(ta3.uncombiningSequences[0]).toContain('put');
  });

  test('check the consonant', () => {
    expect(ta3.soundSequences[0][2].toString()).toEqual(TonalLetterTags.ng);
    expect(ta3.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });

  const ta4 = cli.processTonal('chimhwmix');

  test('check the uncombining form', () => {
    expect(ta4.uncombiningSequences[0]).toContain('chitt');
  });

  test('check the consonant', () => {
    expect(ta4.soundSequences[0][2].toString()).toEqual(TonalLetterTags.m);
    expect(ta4.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });
});
