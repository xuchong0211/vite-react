import en_translations from "./en";
import indo_translations from "./indo";
import _get from "lodash/get";
import intl from "react-intl-universal";
import _capitalize from "lodash/capitalize";

export const LOCALE_EN = "en";
export const LOCALE_INDO = "id";

const defaultLocale = LOCALE_EN;

const ENGLISH = "English";
const INDONESIAN = "Indonesian";

const locales = [
  {
    locale: LOCALE_EN,
    name: ENGLISH,
  },
  {
    locale: LOCALE_INDO,
    name: INDONESIAN,
  },
];

export const switchLocale = (locale: string | undefined): string => {
  if (locale == LOCALE_EN) {
    return LOCALE_INDO;
  }
  return LOCALE_EN;
};

export const LOCALES = {
  [LOCALE_EN]: {
    ...en_translations,
    "alter.language": INDONESIAN,
    "alter.locale": LOCALE_INDO,
  },
  [LOCALE_INDO]: {
    ...indo_translations,
    "alter.language": ENGLISH,
    "alter.locale": LOCALE_EN,
  },
};

type intlFn = (key: string, option?: AnyObject) => string;

export const getIntl: intlFn = (key, option) => {
  return intl
    .get(key, option)
    .defaultMessage(_get(en_translations, key, `missing key: ${key}`));
};

export const getIntlText = (key: string) => _capitalize(getIntl(`text.${key}`));

export const getCurrentLocale = () => {
  const { language } = window.navigator;
  const locale = language.split("-")[0].toLowerCase();

  console.log("locale from window navigator: ", locale);

  return locales.map(({ locale }) => locale).includes(locale)
    ? locale
    : defaultLocale;
};

// const I18N_PREFIX_FORMIK_FORM_KEY = "formik.form.label";
//
// export const getIntlFormLabel = (key: string) =>
//   _capitalize(getIntl(`${I18N_PREFIX_FORMIK_FORM_KEY}.${key}`));
//
// export const getIntlTooltip: intlFn = (key) => getIntl(`tooltip.${key}`);
// export const getIntlDataImport: intlFn = (key) => getIntl(`data.import.${key}`);
// export const getIntlTitle: intlFn = (key) => getIntl(`title.${key}`);
// export const getIntlIndicator: intlFn = (key) => getIntl(`indicator.${key}`);
// export const getIntlActionTo: intlFn = (key) => getIntl(`action.to.${key}`);
// export const getIntlLabel: intlFn = (key, option) =>
//   getIntl(`label.${key}`, option);
// export const getIntlClinicTitle: intlFn = (key, option) =>
//   getIntl(`clinic.title.${key}`, option);
// export const getIntlLaborHistory: intlFn = (key, option) =>
//   getIntl(`patient.anc.checklist.labor.history.${key}`, option);
// export const getIntlFamilyInfo: intlFn = (key, option) =>
//   getIntl(`family.info.${key}`, option);
// export const getIntlContraception: intlFn = (key, option) =>
//   getIntl(`contraception.${key}`, option);
// export const getIntlPostpartum: intlFn = (key, option) =>
//   getIntl(`postpartum.info.${key}`, option);
// export const getIntlCohort: intlFn = (key, option) =>
//   getIntl(`cohort.${key}`, option);
// export const getIntlVaccine: intlFn = (key, option) =>
//   getIntl(`vaccine.${key}`, option);
// export const getIntlSideMenu: intlFn = (key, option) =>
//   getIntl(`navigation.${key}`, option);
// export const getIntlPediatric: intlFn = (key, option) =>
//   getIntl(`pediatric.${key}`, option);
// export const getIntlError: intlFn = (key, option) =>
//   getIntl(`error.${key}`, option);
