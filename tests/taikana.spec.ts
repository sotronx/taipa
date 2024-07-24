import { Client } from '../src/client';

describe('Taiwanese kana testing, nn, nasalization', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('enn');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('㋓エ');
  });

  const ta2 = cli.processTonal('ianny');
  test('taikanas', () => {
    expect(ta2.blockSequences[0]).toEqual('㋑ア⎛');
  });

  const ta3 = cli.processTonal('annw');
  test('taikanas', () => {
    expect(ta3.blockSequences[0]).toEqual('㋐ア⎝');
  });

  const ta4 = cli.processTonal('iunnx');
  test('taikanas', () => {
    expect(ta4.blockSequences[0]).toEqual('㋑ウ⟨');
  });

  const ta5 = cli.processTonal('ainnz');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual('㋐イ⎸');
  });

  const ta6 = cli.processTonal('hiannh');
  test('taikanas', () => {
    expect(ta6.blockSequences[0]).toEqual('㋪ァ⤆');
  });

  const ta7 = cli.processTonal('siakfphannz');
  test('taikanas', () => {
    expect(ta7.blockSequences[0]).toEqual('シァㇰ⍭㋩゚' + '\u0323' + 'ア⎸');
  });

  const ta8 = cli.processTonal('cuann');
  test('taikanas', () => {
    expect(ta8.blockSequences[0]).toEqual('㋡' + '\u0323' + 'ア');
  });
});

describe('Taiwanese kana testing, consonants', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('k');
  test('taikanas, this lexical root is not available. not a mater lectionis', () => {
    expect(ta1.blockSequences[0]).toEqual('');
  });

  const ta2 = cli.processTonal('kng');
  test('taikanas, an initial followed by a nasal final', () => {
    expect(ta2.blockSequences[0]).toEqual('クン');
  });

  const ta3 = cli.processTonal('m');
  test('taikanas, a mater lectionis', () => {
    expect(ta3.blockSequences[0]).toEqual('ム');
  });

  const ta4 = cli.processTonal('hm');
  test('taikanas, an initial followed by a nasal final', () => {
    expect(ta4.blockSequences[0]).toEqual('フム');
  });

  const ta5 = cli.processTonal('mnghwkiannz');
  test('taikanas, an initial followed by a nasal final', () => {
    expect(ta5.blockSequences[0]).toEqual('ム' + '\u{1b167}' + '⎝㋖ア⎸');
  });

  const ta6 = cli.processTonal('mihwkiannz');
  test('taikanas, an initial followed by a nasal final', () => {
    expect(ta6.blockSequences[0]).toEqual('ミィ⎝㋖ア⎸');
  });

  const ta7 = cli.processTonal('hmh');
  test('taikanas, an initial followed by a nasal final', () => {
    expect(ta7.blockSequences[0]).toEqual('フㇺ⤆');
  });

  const ta8 = cli.processTonal('sngh');
  test('taikanas', () => {
    expect(ta8.blockSequences[0]).toEqual('ス' + '\u{1b167}' + '⤆');
  });

  const ta9 = cli.processTonal('ng');
  test('taikanas', () => {
    expect(ta9.blockSequences[0]).toEqual('ン');
  });

  const ta10 = cli.processTonal('nga');
  test('taikanas', () => {
    expect(ta10.blockSequences[0]).toEqual('カ゚ア');
  });
  /*
  const ta11 = cli.processTonal('chm');
  test('taikanas', () => {
    expect(ta11.blockSequences[0]).toEqual('ツム');
  });
  */

  const ta12 = cli.processTonal('lngz');
  test('taikanas', () => {
    expect(ta12.blockSequences[0]).toEqual('ルン⎸');
  });
});

describe('Taiwanese kana testing, vowels', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('a');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('アア');
  });

  const ta2 = cli.processTonal('i');
  test('taikanas', () => {
    expect(ta2.blockSequences[0]).toEqual('イイ');
  });

  const ta3 = cli.processTonal('u');
  test('taikanas', () => {
    expect(ta3.blockSequences[0]).toEqual('ウウ');
  });

  const ta4 = cli.processTonal('ir');
  test('taikanas', () => {
    expect(ta4.blockSequences[0]).toEqual('ウ̅ウ̅');
  });

  const ta5 = cli.processTonal('e');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual('エエ');
  });

  const ta6 = cli.processTonal('o');
  test('taikanas', () => {
    expect(ta6.blockSequences[0]).toEqual('オオ');
  });

  const ta7 = cli.processTonal('er');
  test('taikanas', () => {
    expect(ta7.blockSequences[0]).toEqual('オ̅オ̅');
  });

  const ta8 = cli.processTonal('ur');
  test('taikanas', () => {
    expect(ta8.blockSequences[0]).toEqual('ヲヲ');
  });
  /*
  const ta9 = cli.processTonal('irn');
  test('taikanas', () => {
    expect(ta9.blockSequences[0]).toEqual('ウ̅ヌ');
  });
  */
});

describe('Taiwanese kana testing, ur', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('urh');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ヲ' + '\u{1b166}' + '⤆');
  });

  const ta2 = cli.processTonal('urhy');
  test('taikanas', () => {
    expect(ta2.blockSequences[0]).toEqual('ヲ' + '\u{1b166}' + '⎛');
  });

  const ta3 = cli.processTonal('iur');
  test('taikanas', () => {
    expect(ta3.blockSequences[0]).toEqual('イヲ');
  });

  const ta4 = cli.processTonal('iurh');
  test('taikanas', () => {
    expect(ta4.blockSequences[0]).toEqual('イ' + '\u{1b166}' + '⤆');
  });

  const ta5 = cli.processTonal('iurhy');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual('イ' + '\u{1b166}' + '⎛');
  });

  const ta6 = cli.processTonal('chiur');
  test('taikanas', () => {
    expect(ta6.blockSequences[0]).toEqual('チヲ');
  });

  const ta7 = cli.processTonal('urx');
  test('taikanas', () => {
    expect(ta7.blockSequences[0]).toEqual('ヲヲ⟨');
  });

  const ta8 = cli.processTonal('turw');
  test('taikanas', () => {
    expect(ta8.blockSequences[0]).toEqual('トヲ⎝');
  });
});

describe('Taiwanese kana testing, e and er', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ik');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('イェㇰ⤆');
  });

  const ta2 = cli.processTonal('ing');
  test('taikanas', () => {
    expect(ta2.blockSequences[0]).toEqual('イン');
  });

  const ta4 = cli.processTonal('kik');
  test('taikanas', () => {
    expect(ta4.blockSequences[0]).toEqual('キェㇰ⤆');
  });

  const ta5 = cli.processTonal('king');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual('キン');
  });

  const ta6 = cli.processTonal('ke');
  test('taikanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ケエ');
  });
  /*
  const ta7 = cli.processTonal('ket');
  test('taikanas', () => {
    expect(ta7.blockSequences[0]).toEqual('ケッ⤆');
  });
*/
  const ta8 = cli.processTonal('kenz');
  test('taikanas', () => {
    expect(ta8.blockSequences[0]).toEqual('ケヌ⎸');
  });

  const ta9 = cli.processTonal('liwik');
  test('taikanas', () => {
    expect(ta9.blockSequences[0]).toEqual('リイ⎝イェㇰ⤆');
  });

  const ta10 = cli.processTonal('chiurhwing');
  test('taikanas', () => {
    expect(ta10.blockSequences[0]).toEqual('チ' + '\u{1b166}' + '⎝イン');
  });

  const ta11 = cli.processTonal('ien');
  test('taikanas', () => {
    expect(ta11.blockSequences[0]).toEqual('イェヌ');
  });

  const ta12 = cli.processTonal('en');
  test('taikanas', () => {
    expect(ta12.blockSequences[0]).toEqual('エヌ');
  });
});

describe('Taiwanese kana testing, replication of kana vowels', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ka');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('カア');
  });
});

describe('Taiwanese kana testing, small form', () => {
  const cli = new Client();
  /*
  const ta1 = cli.processTonal('gerex');
  test('taikanas, small form of vowels', () => {
    expect(ta1.blockSequences[0]).toEqual('ゴォ̅エ⟨');
  });
*/
  const ta2 = cli.processTonal('siau');
  test('taikanas', () => {
    expect(ta2.blockSequences[0]).toEqual('シァウ');
  });

  const ta3 = cli.processTonal('uai');
  test('taikanas', () => {
    expect(ta3.blockSequences[0]).toEqual('ウァイ');
  });

  const ta4 = cli.processTonal('sirinn');
  test('taikanas', () => {
    expect(ta4.blockSequences[0]).toEqual('㋜ゥ̅イ');
  });

  const ta5 = cli.processTonal('khiurh');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual(
      'キ' + '\u{0323}' + '\u{1b166}' + '⤆'
    );
  });

  const ta6 = cli.processTonal('khuany');
  test('taikanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ク' + '\u{0323}' + 'ァヌ⎛');
  });
  /*
  const ta7 = cli.processTonal('erh');
  test('taikanas, small form of vowels', () => {
    expect(ta7.blockSequences[0]).toEqual('オ̅ォ̅⤆');
  });

  const ta8 = cli.processTonal('berh');
  test('taikanas, small form of vowels', () => {
    expect(ta8.blockSequences[0]).toEqual('ボォ̅⤆');
  });

  const ta9 = cli.processTonal('khirh');
  test('taikanas, small form of vowels', () => {
    expect(ta9.blockSequences[0]).toEqual('ク̣ゥ̅⤆');
  });
  */
});

describe('Taiwanese kana testing, tone letter of check tones', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('kiok');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('キォㇰ⤆');
    expect(ta1.blockSequences[1]).toEqual('キォㇰ');
  });

  const ta2 = cli.processTonal('kiokk');
  test('taikanas', () => {
    expect(ta2.blockSequences[0]).toEqual('キォㇰ⤇');
  });

  const ta3 = cli.processTonal('kiokf');
  test('taikanas', () => {
    expect(ta3.blockSequences[0]).toEqual('キォㇰ⍭');
  });

  const ta4 = cli.processTonal('kiokx');
  test('taikanas', () => {
    expect(ta4.blockSequences[0]).toEqual('キォㇰ⟨');
  });

  const ta5 = cli.processTonal('kiokw');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual('キォㇰ⎝');
  });

  const ta6 = cli.processTonal('kiurh');
  test('taikanas', () => {
    expect(ta6.blockSequences[0]).toEqual('キ' + '\u{1b166}' + '⤆');
    expect(ta6.blockSequences[1]).toEqual('キ' + '\u{1b166}');
  });

  const ta7 = cli.processTonal('kiurhy');
  test('taikanas', () => {
    expect(ta7.blockSequences[0]).toEqual('キ' + '\u{1b166}' + '⎛');
  });

  const ta8 = cli.processTonal('changxx');
  test('taikanas', () => {
    expect(ta8.blockSequences[0]).toEqual('サ̅ン⫽');
  });

  const ta9 = cli.processTonal('sangh');
  test('taikanas', () => {
    expect(ta9.blockSequences[0]).toEqual('サ' + '\u{1b167}' + '⤆');
  });

  const ta20 = cli.processTonal('chi');
  test('taikanas', () => {
    expect(ta20.blockSequences[0]).toEqual('チイ');
  });

  const ta21 = cli.processTonal('chiy');
  test('taikanas', () => {
    expect(ta21.blockSequences[0]).toEqual('チイ⎛');
  });

  const ta22 = cli.processTonal('chiw');
  test('taikanas', () => {
    expect(ta22.blockSequences[0]).toEqual('チイ⎝');
  });

  const ta23 = cli.processTonal('chix');
  test('taikanas', () => {
    expect(ta23.blockSequences[0]).toEqual('チイ⟨');
  });

  const ta24 = cli.processTonal('chiz');
  test('taikanas', () => {
    expect(ta24.blockSequences[0]).toEqual('チイ⎸');
  });
});

describe('Taiwanese kana testing, initials', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('cha');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('サ̅ア');
  });

  const ta2 = cli.processTonal('ca');
  test('taikanas, サ̣̅ア', () => {
    expect(ta2.blockSequences[0]).toEqual('サ' + '\u0305' + '\u0323' + 'ア');
  });

  const ta3 = cli.processTonal('ta');
  test('taikanas', () => {
    expect(ta3.blockSequences[0]).toEqual('タア');
  });

  const ta4 = cli.processTonal('thaw');
  test('taikanas, タ̣ア', () => {
    expect(ta4.blockSequences[0]).toEqual('タ' + '\u0323' + 'ア⎝');
  });

  const ta5 = cli.processTonal('chi');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual('チイ');
  });

  const ta6 = cli.processTonal('ci');
  test('taikanas, チ̣イ', () => {
    expect(ta6.blockSequences[0]).toEqual('チ' + '\u0323' + 'イ');
  });

  const ta7 = cli.processTonal('ti');
  test('taikanas', () => {
    expect(ta7.blockSequences[0]).toEqual('チ̅イ');
  });

  const ta8 = cli.processTonal('thi');
  test('taikanas, チ̣̅イ', () => {
    expect(ta8.blockSequences[0]).toEqual('チ' + '\u0305' + '\u0323' + 'イ');
  });

  const ta9 = cli.processTonal('chu');
  test('taikanas', () => {
    expect(ta9.blockSequences[0]).toEqual('ツウ');
  });

  const ta10 = cli.processTonal('cu');
  test('taikanas, ツ̣ウ', () => {
    expect(ta10.blockSequences[0]).toEqual('ツ' + '\u0323' + 'ウ');
  });

  const ta11 = cli.processTonal('tu');
  test('taikanas', () => {
    expect(ta11.blockSequences[0]).toEqual('ツ̅ウ');
  });

  const ta12 = cli.processTonal('thu');
  test('taikanas, ツ̣̅ウ', () => {
    expect(ta12.blockSequences[0]).toEqual('ツ' + '\u0305' + '\u0323' + 'ウ');
  });

  const ta13 = cli.processTonal('che');
  test('taikanas', () => {
    expect(ta13.blockSequences[0]).toEqual('セ̅エ');
  });

  const ta14 = cli.processTonal('ce');
  test('taikanas, セ̣̅エ', () => {
    expect(ta14.blockSequences[0]).toEqual('セ' + '\u0305' + '\u0323' + 'エ');
  });

  const ta15 = cli.processTonal('te');
  test('taikanas', () => {
    expect(ta15.blockSequences[0]).toEqual('テエ');
  });

  const ta16 = cli.processTonal('the');
  test('taikanas, テ̣エ', () => {
    expect(ta16.blockSequences[0]).toEqual('テ' + '\u0323' + 'エ');
  });

  const ta17 = cli.processTonal('cho');
  test('taikanas', () => {
    expect(ta17.blockSequences[0]).toEqual('ソ̅オ');
  });

  const ta18 = cli.processTonal('co');
  test('taikanas, ソ̣̅オ', () => {
    expect(ta18.blockSequences[0]).toEqual('ソ' + '\u0305' + '\u0323' + 'オ');
  });

  const ta19 = cli.processTonal('to');
  test('taikanas', () => {
    expect(ta19.blockSequences[0]).toEqual('トオ');
  });

  const ta20 = cli.processTonal('tho');
  test('taikanas, ト̣オ', () => {
    expect(ta20.blockSequences[0]).toEqual('ト' + '\u0323' + 'オ');
  });
});

describe('Taiwanese kana testing, neutral finals', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('ngehh');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('ケ゚ェ⤇');
  });

  const ta2 = cli.processTonal('neh');
  test('taikanas', () => {
    expect(ta2.blockSequences[0]).toEqual('ネェ⤆');
  });

  const ta3 = cli.processTonal('kheh');
  test('taikanas, ケ̣ェ⤆', () => {
    expect(ta3.blockSequences[0]).toEqual('ケ' + '\u0323' + 'ェ⤆');
  });

  const ta4 = cli.processTonal('sehwsehh');
  test('taikanas', () => {
    expect(ta4.blockSequences[0]).toEqual('セェ⎝セェ⤇');
  });

  const ta5 = cli.processTonal('ehh');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual('エェ⤇');
  });

  const ta6 = cli.processTonal('ueh');
  test('taikanas', () => {
    expect(ta6.blockSequences[0]).toEqual('ウェ⤆');
  });

  const ta7 = cli.processTonal('khennhh');
  test('taikanas', () => {
    expect(ta7.blockSequences[0]).toEqual('㋘' + '\u0323' + 'ェ⤇');
  });

  const ta8 = cli.processTonal('hennh');
  test('taikanas', () => {
    expect(ta8.blockSequences[0]).toEqual('㋬ェ⤆');
  });
  /*
  const ta9 = cli.processTonal('ennh');
  test('taikanas', () => {
    expect(ta9.blockSequences[0]).toEqual('㋓ェ⤆');
  });
  */
});

describe('Taiwanese kana testing, sandhi final', () => {
  const cli = new Client();

  const ta1 = cli.processTonal('pujfjinx');
  test('taikanas', () => {
    expect(ta1.blockSequences[0]).toEqual('プㇲ゙⍭ジヌ⟨');
  });

  const ta2 = cli.processTonal('chiswsix');
  test('taikanas', () => {
    expect(ta2.blockSequences[0]).toEqual('チㇲ⎝シイ⟨');
  });

  const ta3 = cli.processTonal('chabwex');
  test('taikanas', () => {
    expect(ta3.blockSequences[0]).toEqual('サ̅ㇷ゙⎝エエ⟨');
  });

  const ta4 = cli.processTonal('lagwex');
  test('taikanas', () => {
    expect(ta4.blockSequences[0]).toEqual('ラㇰ゙⎝エエ⟨');
  });

  const ta5 = cli.processTonal('chilwex');
  test('taikanas', () => {
    expect(ta5.blockSequences[0]).toEqual('チㇽ⎝エエ⟨');
  });

  const ta6 = cli.processTonal('chimhwmix');
  test('taikanas', () => {
    expect(ta6.blockSequences[0]).toEqual('チㇺ⎝ミイ⟨');
  });

  const ta7 = cli.processTonal('chinhwnix');
  test('taikanas', () => {
    expect(ta7.blockSequences[0]).toEqual('チㇴ⎝ニイ⟨');
  });

  const ta8 = cli.processTonal('punghfngay');
  test('taikanas', () => {
    expect(ta8.blockSequences[0]).toEqual('プ' + '\u{1b167}' + '⍭カ゚ア⎛');
  });

  const ta9 = cli.processTonal('chinghwngueh');
  test('taikanas', () => {
    expect(ta9.blockSequences[0]).toEqual('チ' + '\u{1b167}' + '⎝ク゚ェ⤆');
  });
});

describe('Taiwanese kana testing, unicode', () => {
  test('taikanas, katakana letter small letter wo', () => {
    expect('\ud82c\udd66').toEqual('\u{1b166}');
  });

  test('taikanas, katakana letter small letter n', () => {
    expect('\ud82c\udd67').toEqual('\u{1b167}');
  });
});
