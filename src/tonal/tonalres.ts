import {
  Letters,
  Sound,
  soundSequence,
  Character,
  MatchedSequence,
} from '../unit';

export class Morph {}

export class Allomorph extends Morph {
  tonal: Tonal = new Tonal();

  toString() {
    // this function is promoted from class FreeAllomorph
    return this.tonal.toString();
  }
}

export class FreeAllomorph extends Allomorph {}

export class CheckedAllomorph extends Allomorph {
  final: Final = new Final();

  toString() {
    if (this.tonal.toString()) {
      return this.final.toString() + this.tonal.toString();
    }
    return this.final.toString();
  }
}

class Affix {}

export class TonalAffix extends Affix {
  tonal: Tonal = new Tonal();
  toString() {
    return this.tonal.toString();
  }
}

class FreeAffix extends TonalAffix {}

class CheckedAffix extends TonalAffix {
  // there is no final for affix
}

export enum TonalLetterTags {
  a = 'a',
  e = 'e',
  i = 'i',
  o = 'o',
  u = 'u',
  ur = 'ur',

  c = 'c',
  ch = 'ch',
  j = 'j',
  s = 's',
  ph = 'ph',
  th = 'th',
  kh = 'kh',

  m = 'm',
  n = 'n',
  ng = 'ng',

  nn = 'nn',

  f = 'f',
  w = 'w',
  x = 'x',
  xx = 'xx',
  y = 'y',
  z = 'z',
  zx = 'zx',

  b = 'b',
  g = 'g',
  l = 'l',

  k = 'k',
  p = 'p',
  t = 't',

  kk = 'kk',
  pp = 'pp',
  tt = 'tt',
  hh = 'hh',

  bb = 'bb',
  gg = 'gg',
  ll = 'll',
  jj = 'jj',
  ss = 'ss',

  h = 'h',

  zero = 'zero',

  ea = 'ea',
  er = 'er',
  ir = 'ir',
  or = 'or',
}

export class TonalLetters extends Letters {
  handleN(
    characters: Character[],
    beginOfLetter: number,
    listLength: number
  ): MatchedSequence {
    let ms = new MatchedSequence();
    if (
      characters.length - beginOfLetter >= 'nng'.length &&
      listLength == lowerLettersTonal.size
    ) {
      if (
        characters[beginOfLetter].character === 'n' &&
        characters[beginOfLetter + 1].character === 'n' &&
        characters[beginOfLetter + 2].character === 'g'
      ) {
        // at the beginning of a letter, we should always prefer 'n' to 'nn'
        // 'nn' is not able to begin a syllable
        // 'ng' has higher associativity than 'nn' when in 'nng'
        // special case for 'nng'

        // copy the matched letter
        ms.characters[0] = new Character('n');
        return ms;
      }
    }
    return ms;
  }
}

export const lowerLettersTonal = new TonalLetters([
  TonalLetterTags.a,
  TonalLetterTags.e,
  TonalLetterTags.ea,
  TonalLetterTags.i,
  TonalLetterTags.o,
  TonalLetterTags.u,
  TonalLetterTags.ur,
  TonalLetterTags.c,
  TonalLetterTags.ch,
  TonalLetterTags.j,
  TonalLetterTags.jj,
  TonalLetterTags.s,
  TonalLetterTags.m,
  TonalLetterTags.n,
  TonalLetterTags.ng,
  TonalLetterTags.nn,
  TonalLetterTags.w,
  TonalLetterTags.xx,
  TonalLetterTags.z,
  TonalLetterTags.zx,
  TonalLetterTags.x,
  TonalLetterTags.y,
  TonalLetterTags.b,
  TonalLetterTags.g,
  TonalLetterTags.l,
  TonalLetterTags.k,
  TonalLetterTags.p,
  TonalLetterTags.t,
  TonalLetterTags.kk,
  TonalLetterTags.pp,
  TonalLetterTags.tt,
  TonalLetterTags.hh,
  TonalLetterTags.bb,
  TonalLetterTags.gg,
  TonalLetterTags.ll,
  TonalLetterTags.ss,
  TonalLetterTags.f,
  TonalLetterTags.h,
  TonalLetterTags.er,
  TonalLetterTags.ir,
  TonalLetterTags.or,
  TonalLetterTags.ph,
  TonalLetterTags.th,
  TonalLetterTags.kh,
]);

export enum TonalSpellingTags {
  initialConsonant = 'initialConsonant',
  vowel = 'vowel',
  materLectionis = 'materLectionis',
  nasalization = 'nasalization',
  stopFinalConsonant = 'stopFinalConsonant',
  nasalFinalConsonant = 'nasalFinalConsonant',
  checkedTone = 'checkedTone', // checked tone
  freeTone = 'freeTone', // free tone. unchecked tone
}

export class Initial extends Sound {
  name = TonalSpellingTags.initialConsonant;
}
export class Medial extends Sound {
  name = TonalSpellingTags.vowel;
}
export class Final extends Sound {
  name = '';
}
export class Nasalization extends Sound {
  name = TonalSpellingTags.nasalization;
}
export class Tonal extends Sound {
  name = '';
}

export class FreeTonal extends Tonal {
  name = TonalSpellingTags.freeTone;
}
export class CheckedTonal extends Tonal {
  name = TonalSpellingTags.checkedTone;
}

export class StopFinal extends Final {
  name = TonalSpellingTags.stopFinalConsonant;
}
export class NasalFinal extends Final {
  name = TonalSpellingTags.nasalFinalConsonant;
}

export class MaterLectionis extends Medial {
  name = TonalSpellingTags.materLectionis;
}

class MedialA extends Medial {
  characters = this.makeCharacters(TonalLetterTags.a);
}
class MedialE extends Medial {
  characters = this.makeCharacters(TonalLetterTags.e);
}
class MedialI extends Medial {
  characters = this.makeCharacters(TonalLetterTags.i);
}
class MedialO extends Medial {
  characters = this.makeCharacters(TonalLetterTags.o);
}
class MedialU extends Medial {
  characters = this.makeCharacters(TonalLetterTags.u);
}
class MedialUR extends Medial {
  characters = this.makeCharacters(TonalLetterTags.ur);
}
class MedialEA extends Medial {
  characters = this.makeCharacters(TonalLetterTags.ea);
}
class MedialER extends Medial {
  characters = this.makeCharacters(TonalLetterTags.er);
}
class MedialIR extends Medial {
  characters = this.makeCharacters(TonalLetterTags.ir);
}
class MedialOR extends Medial {
  characters = this.makeCharacters(TonalLetterTags.or);
}

class MaterLectionisM extends MaterLectionis {
  characters = this.makeCharacters(TonalLetterTags.m);
}
class MaterLectionisN extends MaterLectionis {
  characters = this.makeCharacters(TonalLetterTags.n);
}
class MaterLectionisNG extends MaterLectionis {
  characters = this.makeCharacters(TonalLetterTags.ng);
}

class InitialC extends Initial {
  characters = this.makeCharacters(TonalLetterTags.c);
}
class InitialCH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.ch);
}
class InitialJ extends Initial {
  characters = this.makeCharacters(TonalLetterTags.j);
}
class InitialL extends Initial {
  characters = this.makeCharacters(TonalLetterTags.l);
}
class InitialS extends Initial {
  characters = this.makeCharacters(TonalLetterTags.s);
}
class InitialPH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.ph);
}
class InitialTH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.th);
}
class InitialKH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.kh);
}

class InitialH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.h);
}

class InitialP extends Initial {
  characters = this.makeCharacters(TonalLetterTags.p);
}
class InitialT extends Initial {
  characters = this.makeCharacters(TonalLetterTags.t);
}
class InitialK extends Initial {
  characters = this.makeCharacters(TonalLetterTags.k);
}
class InitialB extends Initial {
  characters = this.makeCharacters(TonalLetterTags.b);
}
class InitialG extends Initial {
  characters = this.makeCharacters(TonalLetterTags.g);
}

class InitialM extends Initial {
  characters = this.makeCharacters(TonalLetterTags.m);
}
class InitialN extends Initial {
  characters = this.makeCharacters(TonalLetterTags.n);
}
class InitialNG extends Initial {
  characters = this.makeCharacters(TonalLetterTags.ng);
}

export class ZeroTonal extends Tonal {
  characters = [];
}

export class FreeTonalZ extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.z);
}
export class FreeTonalW extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.w);
}
export class FreeTonalF extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.f);
}
export class FreeTonalXX extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.xx);
}
export class FreeTonalZX extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.zx);
}

export class FreeTonalX extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.x);
}
export class FreeTonalY extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.y);
}

export class CheckedTonalW extends CheckedTonal {
  characters = this.makeCharacters(TonalLetterTags.w);
}
export class CheckedTonalF extends CheckedTonal {
  characters = this.makeCharacters(TonalLetterTags.f);
}

export class CheckedTonalX extends CheckedTonal {
  characters = this.makeCharacters(TonalLetterTags.x);
}
export class CheckedTonalY extends CheckedTonal {
  characters = this.makeCharacters(TonalLetterTags.y);
}

export class FinalP extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.p);
}
export class FinalT extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.t);
}
export class FinalK extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.k);
}
export class FinalH extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.h);
}

export class FinalPP extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.pp);
}
export class FinalTT extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.tt);
}
export class FinalKK extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.kk);
}
export class FinalHH extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.hh);
}

class FinalB extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.b);
}

class FinalL extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.l);
}

class FinalG extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.g);
}

class FinalJ extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.j);
}

class FinalS extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.s);
}

class FinalBB extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.bb);
}

class FinalLL extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.ll);
}

class FinalGG extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.gg);
}

class FinalJJ extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.jj);
}

class FinalSS extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.ss);
}

class FinalM extends NasalFinal {
  characters = this.makeCharacters(TonalLetterTags.m);
}
class FinalN extends NasalFinal {
  characters = this.makeCharacters(TonalLetterTags.n);
}
class FinalNG extends NasalFinal {
  characters = this.makeCharacters(TonalLetterTags.ng);
}

class NasalizationNN extends Nasalization {
  characters = this.makeCharacters(TonalLetterTags.nn);
}

export const nasalizationsTonal = soundSequence([new NasalizationNN()]);

export const nasalFinalConsonantsTonal = soundSequence([
  new FinalM(),
  new FinalN(),
  new FinalNG(),
]);

export const neutralFinalConsonantsTonal = soundSequence([
  new FinalH(),
  new FinalHH(),
]);

export const vowelsTonal = soundSequence([
  new MedialA(),
  new MedialE(),
  new MedialI(),
  new MedialO(),
  new MedialU(),
  new MedialUR(),
  new MedialEA(),
  new MedialIR(),
  new MedialOR(),
  new MedialER(),
]);

export const materLectionisTonal = soundSequence([
  new MaterLectionisM(),
  new MaterLectionisN(),
  new MaterLectionisNG(),
]);

export const initialConsonantsTonal = soundSequence([
  new InitialP(),
  new InitialT(),
  new InitialK(),
  new InitialB(),
  new InitialG(),

  new InitialH(),

  new InitialC(),
  new InitialCH(),
  new InitialJ(),
  new InitialL(),
  new InitialS(),

  new InitialPH(),
  new InitialTH(),
  new InitialKH(),

  new InitialM(),
  new InitialN(),
  new InitialNG(),
]);

export const freeToneLettersTonal = soundSequence([
  new FreeTonalZ(),
  new FreeTonalW(),
  new FreeTonalXX(),
  new FreeTonalF(),
  new FreeTonalZX(),

  new FreeTonalX(),
  new FreeTonalY(),
]);

export const checkedToneLettersTonal = soundSequence([
  new CheckedTonalF(),
  new CheckedTonalY(),
  new CheckedTonalW(),
  new CheckedTonalX(),
]);

export const finalConsonantsPtkhppttkkhhTonal = soundSequence([
  new FinalP(),
  new FinalT(),
  new FinalK(),
  new FinalH(),
  new FinalPP(),
  new FinalTT(),
  new FinalKK(),
  new FinalHH(),
]);

export const finalConsonantsBgjklpsTonal = soundSequence([
  new FinalB(),
  new FinalG(),
  new FinalJ(),
  new FinalK(),
  new FinalL(),
  new FinalP(),
  new FinalS(),
]);

export const finalConsonantsBBggkkllppssTonal = soundSequence([
  new FinalBB(),
  new FinalGG(),
  new FinalJJ(),
  new FinalKK(),
  new FinalLL(),
  new FinalPP(),
  new FinalSS(),
]);

function positionalSounds(sounds: Sound[]) {
  return (s: TonalSpellingTags) => {
    for (const i in sounds) {
      if (sounds[i].name === s) return sounds[i];
    }
    return new Sound();
  };
}

const psA = positionalSounds([new MedialA()]);
const psB = positionalSounds([new InitialB(), new FinalB()]);
const psBB = positionalSounds([new FinalBB()]);
const psC = positionalSounds([new InitialC()]);
const psCH = positionalSounds([new InitialCH()]);
const psE = positionalSounds([new MedialE()]);
const psEA = positionalSounds([new MedialEA()]);
const psER = positionalSounds([new MedialER()]);
const psF = positionalSounds([new FreeTonalF(), new CheckedTonalF()]);
const psG = positionalSounds([new InitialG(), new FinalG()]);
const psGG = positionalSounds([new FinalGG()]);
const psH = positionalSounds([new InitialH(), new FinalH()]);
const psHH = positionalSounds([new FinalHH()]);
const psI = positionalSounds([new MedialI()]);
const psIR = positionalSounds([new MedialIR()]);
const psJ = positionalSounds([new InitialJ(), new FinalJ()]);
const psJJ = positionalSounds([new FinalJJ()]);
const psK = positionalSounds([new InitialK(), new FinalK()]);
const psKH = positionalSounds([new InitialKH()]);
const psKK = positionalSounds([new FinalKK()]);
const psL = positionalSounds([new InitialL(), new FinalL()]);
const psLL = positionalSounds([new FinalLL()]);
const psM = positionalSounds([
  new InitialM(),
  new MaterLectionisM(),
  new FinalM(),
]);
const psN = positionalSounds([
  new InitialN(),
  new MaterLectionisN(),
  new FinalN(),
]);
const psNN = positionalSounds([new NasalizationNN()]);
const psNG = positionalSounds([
  new InitialNG(),
  new MaterLectionisNG(),
  new FinalNG(),
]);
const psO = positionalSounds([new MedialO()]);
const psOR = positionalSounds([new MedialOR()]);
const psP = positionalSounds([new InitialP(), new FinalP()]);
const psPH = positionalSounds([new InitialPH()]);
const psPP = positionalSounds([new FinalPP()]);
const psS = positionalSounds([new InitialS(), new FinalS()]);
const psSS = positionalSounds([new FinalSS()]);
const psT = positionalSounds([new InitialT(), new FinalT()]);
const psTH = positionalSounds([new InitialTH()]);
const psTT = positionalSounds([new FinalTT()]);
const psU = positionalSounds([new MedialU()]);
const psUR = positionalSounds([new MedialUR()]);
const psW = positionalSounds([new FreeTonalW(), new CheckedTonalW()]);
const psX = positionalSounds([new FreeTonalX(), new CheckedTonalX()]);
const psXX = positionalSounds([new FreeTonalXX()]);
const psY = positionalSounds([new FreeTonalY(), new CheckedTonalY()]);
const psZ = positionalSounds([new FreeTonalZ()]);
const psZX = positionalSounds([new FreeTonalZX()]);

export const tonalPositionalSounds = new Map<
  string,
  (s: TonalSpellingTags) => Sound
>()
  .set(TonalLetterTags.a, psA)
  .set(TonalLetterTags.b, psB)
  .set(TonalLetterTags.bb, psBB)
  .set(TonalLetterTags.c, psC)
  .set(TonalLetterTags.ch, psCH)
  .set(TonalLetterTags.e, psE)
  .set(TonalLetterTags.ea, psEA)
  .set(TonalLetterTags.er, psER)
  .set(TonalLetterTags.f, psF)
  .set(TonalLetterTags.g, psG)
  .set(TonalLetterTags.gg, psGG)
  .set(TonalLetterTags.h, psH)
  .set(TonalLetterTags.hh, psHH)
  .set(TonalLetterTags.i, psI)
  .set(TonalLetterTags.ir, psIR)
  .set(TonalLetterTags.j, psJ)
  .set(TonalLetterTags.jj, psJJ)
  .set(TonalLetterTags.k, psK)
  .set(TonalLetterTags.kh, psKH)
  .set(TonalLetterTags.kk, psKK)
  .set(TonalLetterTags.l, psL)
  .set(TonalLetterTags.ll, psLL)
  .set(TonalLetterTags.m, psM)
  .set(TonalLetterTags.n, psN)
  .set(TonalLetterTags.nn, psNN)
  .set(TonalLetterTags.ng, psNG)
  .set(TonalLetterTags.o, psO)
  .set(TonalLetterTags.or, psOR)
  .set(TonalLetterTags.p, psP)
  .set(TonalLetterTags.ph, psPH)
  .set(TonalLetterTags.pp, psPP)
  .set(TonalLetterTags.s, psS)
  .set(TonalLetterTags.ss, psSS)
  .set(TonalLetterTags.t, psT)
  .set(TonalLetterTags.th, psTH)
  .set(TonalLetterTags.tt, psTT)
  .set(TonalLetterTags.u, psU)
  .set(TonalLetterTags.ur, psUR)
  .set(TonalLetterTags.w, psW)
  .set(TonalLetterTags.x, psX)
  .set(TonalLetterTags.xx, psXX)
  .set(TonalLetterTags.y, psY)
  .set(TonalLetterTags.z, psZ)
  .set(TonalLetterTags.zx, psZX);

export class ZeroAllomorph extends FreeAllomorph {
  tonal = new ZeroTonal();
}

class AllomorphF extends FreeAllomorph {
  tonal = new FreeTonalF();
}

export class AllomorphZ extends FreeAllomorph {
  tonal = new FreeTonalZ();
}

export class AllomorphY extends FreeAllomorph {
  tonal = new FreeTonalY();
}

export class AllomorphW extends FreeAllomorph {
  tonal = new FreeTonalW();
}

export class AllomorphX extends FreeAllomorph {
  tonal = new FreeTonalX();
}

class AllomorphXX extends FreeAllomorph {
  tonal = new FreeTonalXX();
}

class AllomorphZX extends FreeAllomorph {
  tonal = new FreeTonalZX();
}

export const freeAllomorphs = new Map<string, Allomorph>()
  .set(TonalLetterTags.f, new AllomorphF())
  .set(TonalLetterTags.w, new AllomorphW())
  .set(TonalLetterTags.xx, new AllomorphXX())
  .set(TonalLetterTags.z, new AllomorphZ())
  .set(TonalLetterTags.zx, new AllomorphZX())
  .set(TonalLetterTags.y, new AllomorphY())
  .set(TonalLetterTags.x, new AllomorphX());

class AllomorphP extends CheckedAllomorph {
  final = new FinalP();
}

class AllomorphT extends CheckedAllomorph {
  final = new FinalT();
}

class AllomorphK extends CheckedAllomorph {
  final = new FinalK();
}

export class AllomorphH extends CheckedAllomorph {
  final = new FinalH();
}

class AllomorphB extends CheckedAllomorph {
  final = new FinalB();
}

class AllomorphL extends CheckedAllomorph {
  final = new FinalL();
}

class AllomorphG extends CheckedAllomorph {
  final = new FinalG();
}

class AllomorphJ extends CheckedAllomorph {
  final = new FinalJ();
}

class AllomorphPP extends CheckedAllomorph {
  final = new FinalPP();
}

class AllomorphTT extends CheckedAllomorph {
  final = new FinalTT();
}

class AllomorphKK extends CheckedAllomorph {
  final = new FinalKK();
}

class AllomorphHH extends CheckedAllomorph {
  final = new FinalHH();
}

class AllomorphBB extends CheckedAllomorph {
  final = new FinalBB();
}

class AllomorphLL extends CheckedAllomorph {
  final = new FinalLL();
}

class AllomorphGG extends CheckedAllomorph {
  final = new FinalGG();
}

class AllomorphJJ extends CheckedAllomorph {
  final = new FinalJJ();
}

class AllomorphSS extends CheckedAllomorph {
  final = new FinalSS();
}

class AllomorphPF extends CheckedAllomorph {
  final = new FinalP();
  tonal = new CheckedTonalF();
}

class AllomorphPW extends CheckedAllomorph {
  final = new FinalP();
  tonal = new CheckedTonalW();
}

class AllomorphTF extends CheckedAllomorph {
  final = new FinalT();
  tonal = new CheckedTonalF();
}

class AllomorphKF extends CheckedAllomorph {
  final = new FinalK();
  tonal = new CheckedTonalF();
}

class AllomorphHF extends CheckedAllomorph {
  final = new FinalH();
  tonal = new CheckedTonalF();
}

export class AllomorphHY extends CheckedAllomorph {
  final = new FinalH();
  tonal = new CheckedTonalY();
}

class AllomorphHW extends CheckedAllomorph {
  final = new FinalH();
  tonal = new CheckedTonalW();
}

class AllomorphTW extends CheckedAllomorph {
  final = new FinalT();
  tonal = new CheckedTonalW();
}

class AllomorphKW extends CheckedAllomorph {
  final = new FinalK();
  tonal = new CheckedTonalW();
}

class AllomorphPX extends CheckedAllomorph {
  final = new FinalP();
  tonal = new CheckedTonalX();
}

class AllomorphTX extends CheckedAllomorph {
  final = new FinalT();
  tonal = new CheckedTonalX();
}

class AllomorphKX extends CheckedAllomorph {
  final = new FinalK();
  tonal = new CheckedTonalX();
}

class AllomorphHX extends CheckedAllomorph {
  final = new FinalH();
  tonal = new CheckedTonalX();
}

class AllomorphBF extends CheckedAllomorph {
  final = new FinalB();
  tonal = new CheckedTonalF();
}

class AllomorphGF extends CheckedAllomorph {
  final = new FinalG();
  tonal = new CheckedTonalF();
}

class AllomorphJF extends CheckedAllomorph {
  final = new FinalJ();
  tonal = new CheckedTonalF();
}

class AllomorphLF extends CheckedAllomorph {
  final = new FinalL();
  tonal = new CheckedTonalF();
}

class AllomorphSF extends CheckedAllomorph {
  final = new FinalS();
  tonal = new CheckedTonalF();
}

class AllomorphBW extends CheckedAllomorph {
  final = new FinalB();
  tonal = new CheckedTonalW();
}

class AllomorphGW extends CheckedAllomorph {
  final = new FinalG();
  tonal = new CheckedTonalW();
}

class AllomorphJW extends CheckedAllomorph {
  final = new FinalJ();
  tonal = new CheckedTonalW();
}

class AllomorphLW extends CheckedAllomorph {
  final = new FinalL();
  tonal = new CheckedTonalW();
}

class AllomorphSW extends CheckedAllomorph {
  final = new FinalS();
  tonal = new CheckedTonalW();
}

class AllomorphBX extends CheckedAllomorph {
  final = new FinalB();
  tonal = new CheckedTonalX();
}

class AllomorphGX extends CheckedAllomorph {
  final = new FinalG();
  tonal = new CheckedTonalX();
}

class AllomorphLX extends CheckedAllomorph {
  final = new FinalL();
  tonal = new CheckedTonalX();
}

export const checkedAllomorphs = new Map<string, Allomorph>()
  .set(TonalLetterTags.p, new AllomorphP())
  .set(TonalLetterTags.t, new AllomorphT())
  .set(TonalLetterTags.k, new AllomorphK())
  .set(TonalLetterTags.h, new AllomorphH())
  .set(TonalLetterTags.b, new AllomorphB())
  .set(TonalLetterTags.g, new AllomorphG())
  .set(TonalLetterTags.j, new AllomorphJ())
  .set(TonalLetterTags.l, new AllomorphL())
  .set(TonalLetterTags.pp, new AllomorphPP())
  .set(TonalLetterTags.tt, new AllomorphTT())
  .set(TonalLetterTags.kk, new AllomorphKK())
  .set(TonalLetterTags.hh, new AllomorphHH())
  .set(TonalLetterTags.bb, new AllomorphBB())
  .set(TonalLetterTags.gg, new AllomorphGG())
  .set(TonalLetterTags.jj, new AllomorphJJ())
  .set(TonalLetterTags.ll, new AllomorphLL())
  .set(TonalLetterTags.ss, new AllomorphSS())
  .set(TonalLetterTags.p + TonalLetterTags.f, new AllomorphPF())
  .set(TonalLetterTags.t + TonalLetterTags.f, new AllomorphTF())
  .set(TonalLetterTags.k + TonalLetterTags.f, new AllomorphKF())
  .set(TonalLetterTags.h + TonalLetterTags.f, new AllomorphHF())
  .set(TonalLetterTags.b + TonalLetterTags.f, new AllomorphBF())
  .set(TonalLetterTags.g + TonalLetterTags.f, new AllomorphGF())
  .set(TonalLetterTags.j + TonalLetterTags.f, new AllomorphJF())
  .set(TonalLetterTags.l + TonalLetterTags.f, new AllomorphLF())
  .set(TonalLetterTags.s + TonalLetterTags.f, new AllomorphSF())
  .set(TonalLetterTags.h + TonalLetterTags.y, new AllomorphHY())
  .set(TonalLetterTags.p + TonalLetterTags.w, new AllomorphPW())
  .set(TonalLetterTags.t + TonalLetterTags.w, new AllomorphTW())
  .set(TonalLetterTags.k + TonalLetterTags.w, new AllomorphKW())
  .set(TonalLetterTags.h + TonalLetterTags.w, new AllomorphHW())
  .set(TonalLetterTags.b + TonalLetterTags.w, new AllomorphBW())
  .set(TonalLetterTags.g + TonalLetterTags.w, new AllomorphGW())
  .set(TonalLetterTags.j + TonalLetterTags.w, new AllomorphJW())
  .set(TonalLetterTags.l + TonalLetterTags.w, new AllomorphLW())
  .set(TonalLetterTags.s + TonalLetterTags.w, new AllomorphSW())
  .set(TonalLetterTags.p + TonalLetterTags.x, new AllomorphPX())
  .set(TonalLetterTags.t + TonalLetterTags.x, new AllomorphTX())
  .set(TonalLetterTags.k + TonalLetterTags.x, new AllomorphKX())
  .set(TonalLetterTags.h + TonalLetterTags.x, new AllomorphHX())
  .set(TonalLetterTags.b + TonalLetterTags.x, new AllomorphBX())
  .set(TonalLetterTags.g + TonalLetterTags.x, new AllomorphGX())
  .set(TonalLetterTags.l + TonalLetterTags.x, new AllomorphLX());

export const combinedFreeAllomorphs = new Map<string, Allomorph>()
  .set(TonalLetterTags.w, new AllomorphW())
  .set(TonalLetterTags.z, new AllomorphZ())
  .set(TonalLetterTags.x, new AllomorphX())
  .set(TonalLetterTags.y, new AllomorphY())
  .set(TonalLetterTags.f, new AllomorphF())
  .set(TonalLetterTags.xx, new AllomorphXX());

export const uncombinedCheckedAllomorphs = new Map<string, Allomorph>()
  .set(TonalLetterTags.p, new AllomorphP())
  .set(TonalLetterTags.t, new AllomorphT())
  .set(TonalLetterTags.k, new AllomorphK())
  .set(TonalLetterTags.h, new AllomorphH())
  .set(TonalLetterTags.pp, new AllomorphPP())
  .set(TonalLetterTags.tt, new AllomorphTT())
  .set(TonalLetterTags.kk, new AllomorphKK())
  .set(TonalLetterTags.hh, new AllomorphHH());

export const combinedCheckedAllomorphs = new Map<string, Allomorph[]>()
  .set(TonalLetterTags.p + TonalLetterTags.f, [new AllomorphPF()])
  .set(TonalLetterTags.p + TonalLetterTags.w, [new AllomorphPW()])
  .set(TonalLetterTags.p + TonalLetterTags.x, [new AllomorphPX()])
  .set(TonalLetterTags.t + TonalLetterTags.f, [new AllomorphTF()])
  .set(TonalLetterTags.t + TonalLetterTags.w, [new AllomorphTW()])
  .set(TonalLetterTags.t + TonalLetterTags.x, [new AllomorphTX()])
  .set(TonalLetterTags.k + TonalLetterTags.f, [new AllomorphKF()])
  .set(TonalLetterTags.k + TonalLetterTags.w, [new AllomorphKW()])
  .set(TonalLetterTags.k + TonalLetterTags.x, [new AllomorphKX()])
  .set(TonalLetterTags.h + TonalLetterTags.f, [new AllomorphHF()])
  .set(TonalLetterTags.h + TonalLetterTags.y, [new AllomorphHY()])
  .set(TonalLetterTags.h + TonalLetterTags.w, [new AllomorphHW()])
  .set(TonalLetterTags.h + TonalLetterTags.x, [new AllomorphHX()])
  .set(TonalLetterTags.b + TonalLetterTags.f, [new AllomorphBF()])
  .set(TonalLetterTags.b + TonalLetterTags.w, [new AllomorphBW()])
  .set(TonalLetterTags.b + TonalLetterTags.x, [new AllomorphBX()])
  .set(TonalLetterTags.g + TonalLetterTags.f, [new AllomorphGF()])
  .set(TonalLetterTags.g + TonalLetterTags.w, [new AllomorphGW()])
  .set(TonalLetterTags.g + TonalLetterTags.x, [new AllomorphGX()])
  .set(TonalLetterTags.j + TonalLetterTags.f, [new AllomorphJF()])
  .set(TonalLetterTags.j + TonalLetterTags.w, [new AllomorphJW()])
  .set(TonalLetterTags.l + TonalLetterTags.f, [new AllomorphLF()])
  .set(TonalLetterTags.l + TonalLetterTags.w, [new AllomorphLW()])
  .set(TonalLetterTags.l + TonalLetterTags.x, [new AllomorphLX()])
  .set(TonalLetterTags.s + TonalLetterTags.f, [new AllomorphSF()])
  .set(TonalLetterTags.s + TonalLetterTags.w, [new AllomorphSW()]);

export const freeAllomorphStandaloneRules = new Map<string, Tonal[]>()
  .set(TonalLetterTags.f, [new FreeTonalY()])
  .set(TonalLetterTags.w, [new FreeTonalZ(), new FreeTonalX()])
  .set(TonalLetterTags.xx, [
    new FreeTonalZ(),
    new FreeTonalF(),
    new FreeTonalX(),
  ])
  .set(TonalLetterTags.z, [new ZeroTonal(), new FreeTonalX(), new FreeTonalF()])
  .set(TonalLetterTags.zx, [])
  .set(TonalLetterTags.x, [])
  .set(TonalLetterTags.y, [new FreeTonalW()])
  .set(TonalLetterTags.zero, [new FreeTonalY()]);

export const standaloneRulesAy = new Map<string, Tonal[]>()
  .set(TonalLetterTags.f, [new FreeTonalY(), new FreeTonalW()])
  .set(TonalLetterTags.x, [
    new ZeroTonal(),
    new FreeTonalX(),
    new FreeTonalZ(),
  ]);
