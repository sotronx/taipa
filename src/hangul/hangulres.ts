import { Letters } from '../unit';

export enum HangulLetterTags {
  a = 'a',
  e = 'e',
  i = 'i',
  o = 'o',
  u = 'u',

  ea = 'ea',
  er = 'er',
  ir = 'ir',
  ur = 'ur',

  b = 'b',
  d = 'd',
  g = 'g',
  j = 'j',

  ch = 'ch',
  p = 'p',
  t = 't',
  k = 'k',

  c = 'c',
  ph = 'ph',
  th = 'th',
  kh = 'kh',

  h = 'h',
  l = 'l',
  s = 's',

  m = 'm',
  n = 'n',
  ng = 'ng',

  kk = 'kk',
  tt = 'tt',
  pp = 'pp',
  ss = 'ss',
  jj = 'jj',
}

export class LettersOfHangul extends Letters {}

export const lowerLettersHangul = new LettersOfHangul([
  HangulLetterTags.a,
  HangulLetterTags.e,
  HangulLetterTags.i,
  HangulLetterTags.o,
  HangulLetterTags.u,
  HangulLetterTags.ea,
  HangulLetterTags.er,
  HangulLetterTags.ir,
  HangulLetterTags.ur,
  HangulLetterTags.b,
  HangulLetterTags.d,
  HangulLetterTags.g,
  HangulLetterTags.j,
  HangulLetterTags.ch,
  HangulLetterTags.p,
  HangulLetterTags.t,
  HangulLetterTags.k,
  HangulLetterTags.c,
  HangulLetterTags.ph,
  HangulLetterTags.th,
  HangulLetterTags.kh,
  HangulLetterTags.h,
  HangulLetterTags.l,
  HangulLetterTags.s,
  HangulLetterTags.m,
  HangulLetterTags.n,
  HangulLetterTags.ng,
  HangulLetterTags.kk,
  HangulLetterTags.tt,
  HangulLetterTags.pp,
  HangulLetterTags.ss,
  HangulLetterTags.jj,
]);

export enum HangulSpellingTags {
  initialConsonant = 'initialConsonant',
  vowel = 'vowel',
  finalConsonant = 'finalConsonant',
}
