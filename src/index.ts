export {
  tonalLemmatizationAnalyzer,
  graphAnalyzeTonal,
} from './unchange/analyzer';
export { tonalInflectionAnalyzer } from './change/analyzer';
export { kanaLemmatizationAnalyzer, graphAnalyzeKana } from './kana/analyzer';
export { graphAnalyzeHangul } from './hangul/analyzer';
export {
  lowerLettersTonal,
  TonalLetterTags,
  TonalSpellingTags,
} from './tonal/tonalres';
export { KanaLetterTags } from './kana/kanares';
export { lemmatize } from './unchange/lemmatizer';
export {
  createTonalPhrase,
  createTonalInflectionLexeme,
  createCompoundPhraseme,
} from './change/creator';
export {
  inflectDesinence,
  inflectTransfix,
  inflectEncliticE,
  inflectPhrasalVerbParticle,
  inflectEncliticLe,
  inflectPossesiveEx,
  inflectTo,
  inflectEighthToSecond,
  inflectToProceeding,
  inflectVppToProceeding,
  inflectVppToTransitive,
  inflectEToAdnominal,
  inflectLeToConjunctive,
  inflectPossesive,
  inflectToParticiple,
  inflectVppToParticiple,
  inflectSerial,
} from './change/inflector';
export { insertToFollowingSyllable } from './change/inserter';
export { mutateFinalConsonantOfPrecedingSyllable } from './change/mutator';

export { TonalCombiningMorpheme } from './change/morpheme';
export { TonalStandaloneMorpheme } from './unchange/morpheme';
export { TonalInflectionLexeme, TonalInsertionLexeme } from './change/lexeme';
export { TonalLemmatizationLexeme } from './unchange/lexeme';
export {
  PhrasalVerbPhraseme,
  PhrasalVerbVppPhraseme,
  TonalMainParticlePhraseme,
  TonalCompoundPhraseme,
  SerialPhraseme,
} from './change/phraseme';
export { KanaUncombiningMorpheme } from './kana/morpheme';

export {
  initialConsonantsTonal,
  nasalizationsTonal,
  vowelsTonal,
} from './tonal/tonalres';

export {
  TonalDesinenceInflection,
  TonalCombiningForms,
} from './change/metaplasm';
export { TonalStandaloneForms } from './unchange/metaplasm';

export { syllableCompositions } from './tonal/soundgen';

export { getLatinSyllableCompositions } from './tonal/tokenizer';

export {
  LexicalTone,
  extractTones,
  getToneEndingNumber,
  getToneEndingNumbersTwo,
  getToneEndingNumbersThree,
} from './tonal/tone';

export { PseudoUnicodeEncoding, ToneNumberTags } from './tonal/tonesets';

// unit
export { AlphabeticGrapheme } from './unit';
export { GraphemeMaker } from './unit';
export { Sound, SoundGeneration } from './unit';

export { TonalWord, TonalPhrase } from './unchange/unit';

// client
export { Client, TokenAnalysis } from './client';

// uitilities
export {
  getLetterSoundPairsSequential,
  getLetterSoundPairsSyllabic,
  analyzeIntoSequence,
  analyzeIntoSyllables,
  getStandaloneForms,
  getLemmas,
  pairsToString,
  getStem,
  getDesinence,
  getSyllablesInclude,
  getSyllablesStart,
  getSyllablesEnd,
} from './util';
