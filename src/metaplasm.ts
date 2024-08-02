import { TonalSyllable } from './unchange/unit';
import { Allomorph } from './tonal/tonalres';
import { Sound, Morpheme } from './unit';
import { TonalWord, InflectionalEnding } from './unchange/unit';
import { TonalPhrase } from './unchange/unit';
import {
  TonalInflectionLexeme,
  TonalInsertionLexeme,
  TonalUninsertionLexeme,
  TonalUninfectionLexeme,
  TonalInfectionLexeme,
  TonalMutationLexeme,
  TonalUnmutationLexeme,
} from './change/lexeme';

abstract class Metaplasm {}

export class TonalCombiningMetaplasm extends Metaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    return [];
  }
}

export class TonalZeroCombining extends TonalCombiningMetaplasm {}

export class RemovingEpenthesisOfAy extends TonalCombiningMetaplasm {
  applyToLetters(letters: Array<string>) {
    letters.shift();
    return letters;
  }
  applyToString(str: string) {
    return str.slice(1, 2);
  }
}

export class RemovingNasalizationOfAy extends TonalCombiningMetaplasm {}

export class KanaCombiningMetaplasm extends Metaplasm {}

export class TonalStandaloneMetaplasm extends Metaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    return [];
  }
}

export class TonalInflectionMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalZeroInflection extends TonalInflectionMetaplasm {}

export class TonalInsertionMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalUninsertionMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalZeroInsertionMetaplasm extends TonalInsertionMetaplasm {}
export class TonalZeroUninsertionMetaplasm extends TonalUninsertionMetaplasm {}

export class TonalInfectionMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalUninfectionMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalZeroInfectionMetaplasm extends TonalInfectionMetaplasm {}
export class TonalZeroUninfectionMetaplasm extends TonalUninfectionMetaplasm {}

export class TonalMutationMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalUnmutationMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalZeroMutationMetaplasm extends TonalMutationMetaplasm {}
export class TonalZeroUnmutationMetaplasm extends TonalUnmutationMetaplasm {}

export class TonalLemmatizationMetaplasm extends Metaplasm {
  apply(
    morphemes: Array<Morpheme>,
    inflectionalEnding: InflectionalEnding
  ): TonalWord[] {
    return [];
  }
}

export class TonalPhrasalInflectionMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalInflectionLexeme,
    lexemeTwo: TonalInflectionLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class TonalPhrasalInflectionVppMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalInflectionLexeme,
    lexemeTwo: TonalInflectionLexeme,
    lexemeThree: TonalInflectionLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class TonalPhrasalZeroInflection extends TonalPhrasalInflectionMetaplasm {}

export class TonalPhrasalInsertionMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalInsertionLexeme,
    lexemeTwo: TonalInsertionLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class TonalPhrasalUninsertionMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalUninsertionLexeme,
    lexemeTwo: TonalUninsertionLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class TonalPhrasalInfectionMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalInfectionLexeme,
    lexemeTwo: TonalInfectionLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class TonalPhrasalUninfectionMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalUninfectionLexeme,
    lexemeTwo: TonalUninfectionLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class TonalPhrasalMutationMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalMutationLexeme,
    lexemeTwo: TonalMutationLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class TonalPhrasalUnmutationMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalUnmutationLexeme,
    lexemeTwo: TonalUnmutationLexeme
  ): TonalPhrase[] {
    return [];
  }
}
