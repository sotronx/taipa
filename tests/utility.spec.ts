import { TonalSpellingTags } from '../src/tonal/tonalres';
import {
  getStandaloneForms,
  analyzeIntoSequence,
  analyzeIntoSyllables,
  getLemmas,
} from '../src/util';

describe('Utility testing', () => {
  const prs1 = analyzeIntoSyllables('o');
  test('check the letter-soundName pairs', () => {
    expect(prs1[0][0][0]).toEqual('o');
    expect(prs1[0][0][1]).toEqual(TonalSpellingTags.vowel);
  });

  const prs2 = analyzeIntoSequence('o');
  test('check the letter-soundName pairs', () => {
    expect(prs2[0][0]).toEqual('o');
    expect(prs2[0][1]).toEqual(TonalSpellingTags.vowel);
  });

  const frms = getStandaloneForms('o');
  test('check the uncombining forms', () => {
    expect(frms[0]).toEqual('oy');
  });

  const lmms = getLemmas('o');
  test('check the lemmas', () => {
    expect(lmms[0]).toEqual('oy');
  });
});

describe('Utility testing, empty input', () => {
  const inputEmpty: any = '';

  const prs1 = analyzeIntoSyllables(inputEmpty);
  test('check the letter-soundName pairs', () => {
    expect(prs1.length).toEqual(0);
  });

  const prs2 = analyzeIntoSequence(inputEmpty);
  test('check the letter-soundName pairs', () => {
    expect(prs2.length).toEqual(0);
  });

  const frms = getStandaloneForms(inputEmpty);
  test('check the uncombining forms', () => {
    expect(frms.length).toEqual(0);
  });

  const lmms = getLemmas(inputEmpty);
  test('check the lemmas', () => {
    expect(lmms.length).toEqual(0);
  });
});

describe('Utility testing, undefined input', () => {
  const inputUnd: any = undefined;

  const prs1 = analyzeIntoSyllables(inputUnd);
  test('check the letter-soundName pairs', () => {
    expect(prs1.length).toEqual(0);
  });

  const prs2 = analyzeIntoSequence(inputUnd);
  test('check the letter-soundName pairs', () => {
    expect(prs2.length).toEqual(0);
  });

  const frms = getStandaloneForms(inputUnd);
  test('check the uncombining forms', () => {
    expect(frms.length).toEqual(0);
  });

  const lmms = getLemmas(inputUnd);
  test('check the lemmas', () => {
    expect(lmms.length).toEqual(0);
  });
});
