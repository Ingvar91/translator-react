import { IconFlagEnglish } from '../ui-kit/icon/icons/iconFlagEnglish';
import { IconFlagBulgarian } from '../ui-kit/icon/icons/iconFlagBulgarian';
import { IconFlagGerman } from '../ui-kit/icon/icons/iconFlagGerman';
import { IconFlagFrench } from '../ui-kit/icon/icons/iconFlagFrench';
import { IconFlagItalian } from '../ui-kit/icon/icons/iconFlagItalian';
import { IconFlagSpanish } from '../ui-kit/icon/icons/iconFlagSpanish';
import { IconFlagPortuguese } from '../ui-kit/icon/icons/iconFlagPortuguese';
import { IconFlagHindi } from '../ui-kit/icon/icons/iconFlagHindi';
import { IconFlagPolish } from '../ui-kit/icon/icons/iconFlagPolish';
import { IconFlagPersian } from '../ui-kit/icon/icons/iconFlagPersian';
import { IconFlagRussia } from '../ui-kit/icon/icons/iconFlagRussia';

export interface Country {
  code: CountriesCode;
  name: string;
  icon: string;
}

export enum CountriesCode {
  en = 'en',
  de = 'de',
  fr = 'fr',
  it = 'it',
  es = 'es',
  pt = 'pt',
  hi = 'hi',
  pl = 'pl',
  fa = 'fa',
  bg = 'bg',
  ru = 'ru',
}

export const Countries: Country[] = [
  { code: CountriesCode.en, name: 'Английский', icon: IconFlagEnglish },
  { code: CountriesCode.bg, name: 'Болгарский', icon: IconFlagBulgarian },
  { code: CountriesCode.de, name: 'Немецкий', icon: IconFlagGerman },
  { code: CountriesCode.fr, name: 'Французский', icon: IconFlagFrench },
  { code: CountriesCode.it, name: 'Итальянский', icon: IconFlagItalian },
  { code: CountriesCode.es, name: 'Испанский', icon: IconFlagSpanish },
  { code: CountriesCode.pt, name: 'Португальский', icon: IconFlagPortuguese },
  { code: CountriesCode.hi, name: 'Хинди', icon: IconFlagHindi },
  { code: CountriesCode.pl, name: 'Польский', icon: IconFlagPolish },
  { code: CountriesCode.fa, name: 'Персидский', icon: IconFlagPersian },
  { code: CountriesCode.ru, name: 'Русский', icon: IconFlagRussia },
];
