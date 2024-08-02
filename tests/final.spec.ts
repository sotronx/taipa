import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/tonalres';
import { TokenAnalysis } from '../src/client';
import { tonalLemmatizationAnalyzer } from '../src/unchange/analyzer';
import { TonalStandaloneMorpheme } from '../src/unchange/morpheme';
import { TonalStandaloneForms } from '../src/unchange/metaplasm';

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('isfsing');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][1].toString()).toEqual(TonalLetterTags.s);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('jiswsix');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.s);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('bajfjiz');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.j);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('chibfhuat');
  test('check the stop final', () => {
    expect(ta1.soundSequences[0][2].toString()).toEqual(TonalLetterTags.b);
  });
  test('check the tonal', () => {
    expect(ta1.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
  });

  const ta2 = cli.processTonal('jib');
  test('check the stop final', () => {
    expect(ta2.soundSequences[0][2].toString()).toEqual(TonalLetterTags.b);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const mfs: TonalStandaloneMorpheme[] =
    tonalLemmatizationAnalyzer.morphAnalyze(
      'habwliy',
      new TonalStandaloneForms([])
    );
  const letterSeqs = mfs.map((x) => x.sounds);
  test('check the stop final', () => {
    expect(letterSeqs[0][2].toString()).toEqual(TonalLetterTags.b);
  });
  test('check the tonal', () => {
    expect(letterSeqs[0][3].toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('silfley');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.l);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let ta = new TokenAnalysis();

  ta = cli.processTonal('palwjitt');
  test('check the stop final', () => {
    expect(ta.soundSequences[0][2].toString()).toEqual(TonalLetterTags.l);
  });
  test('check the tonal', () => {
    expect(ta.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('cugfguaz');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.g);
  });

  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('bagwbaix');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.g);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('abxbay');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][1].toString()).toEqual(TonalLetterTags.b);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.x);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('cagxgay');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.g);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.x);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('chigg');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.gg);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('lagg');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.gg);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('calxlay');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.l);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.x);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('chikfqi');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.k);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('pukwkong');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.k);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('cupfphuaw');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.p);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Sandhi final testing, stop final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('bipwpang');
  test('check the stop final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.p);
  });
  test('check the tonal', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Sandhi final testing, nasal final, neutral final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('chimhwmix');
  test('check the nasal final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.m);
  });
  test('check the neutral final', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });
  test('check the checked tonal', () => {
    expect(doc.soundSequences[0][4].toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Sandhi final testing, nasal final, neutral final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('binhwngx');
  test('check the nasal final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.n);
  });
  test('check the neutral final', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });
  test('check the checked tonal', () => {
    expect(doc.soundSequences[0][4].toString()).toEqual(TonalLetterTags.w);
  });
});

describe('Sandhi final testing, nasal final, neutral final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('pimhfmngx');
  test('check the nasal final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.m);
  });
  test('check the neutral final', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });

  test('check the checked tonal', () => {
    expect(doc.soundSequences[0][4].toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Sandhi final testing, nasal final, neutral final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('hinhfnix');
  test('check the nasal final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.n);
  });
  test('check the neutral final', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });
  test('check the checked tonal', () => {
    expect(doc.soundSequences[0][4].toString()).toEqual(TonalLetterTags.f);
  });
});

describe('Sandhi final testing, nasal final, neutral final, checked tonal', () => {
  const cli = new Client();
  let doc = new TokenAnalysis();

  doc = cli.processTonal('punghfngay');
  test('check the nasal final', () => {
    expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.ng);
  });
  test('check the neutral final', () => {
    expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.h);
  });
  test('check the checked tonal', () => {
    expect(doc.soundSequences[0][4].toString()).toEqual(TonalLetterTags.f);
  });
});
