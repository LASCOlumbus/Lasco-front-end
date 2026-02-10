import { SelectOption } from '@/components/ui/Select/types';

export const LS_AUTH_TOKEN_KEY = '<appName>_AuthToken';
export const LS_REFRESH_TOKEN_KEY = '<appName>_RefreshToken';
export const ONE_SECOND = 1_000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const COMMON_ERROR_MESSAGE = 'Uh-oh, something went wrong.';

export const ZIP_CODE_REGEX = /^[a-zA-Z0-9\s]{3,}$/;

export const US_STATES_SELECT_OPTIONS: SelectOption[] = [
    {
        label: 'Alabama',
        value: 'AL',
    },
    {
        label: 'Alaska',
        value: 'AK',
    },
    {
        label: 'American Samoa',
        value: 'AS',
    },
    {
        label: 'Arizona',
        value: 'AZ',
    },
    {
        label: 'Arkansas',
        value: 'AR',
    },
    {
        label: 'California',
        value: 'CA',
    },
    {
        label: 'Colorado',
        value: 'CO',
    },
    {
        label: 'Connecticut',
        value: 'CT',
    },
    {
        label: 'Delaware',
        value: 'DE',
    },
    {
        label: 'District Of Columbia',
        value: 'DC',
    },
    {
        label: 'Federated States Of Micronesia',
        value: 'FM',
    },
    {
        label: 'Florida',
        value: 'FL',
    },
    {
        label: 'Georgia',
        value: 'GA',
    },
    {
        label: 'Guam',
        value: 'GU',
    },
    {
        label: 'Hawaii',
        value: 'HI',
    },
    {
        label: 'Idaho',
        value: 'ID',
    },
    {
        label: 'Illinois',
        value: 'IL',
    },
    {
        label: 'Indiana',
        value: 'IN',
    },
    {
        label: 'Iowa',
        value: 'IA',
    },
    {
        label: 'Kansas',
        value: 'KS',
    },
    {
        label: 'Kentucky',
        value: 'KY',
    },
    {
        label: 'Louisiana',
        value: 'LA',
    },
    {
        label: 'Maine',
        value: 'ME',
    },
    {
        label: 'Marshall Islands',
        value: 'MH',
    },
    {
        label: 'Maryland',
        value: 'MD',
    },
    {
        label: 'Massachusetts',
        value: 'MA',
    },
    {
        label: 'Michigan',
        value: 'MI',
    },
    {
        label: 'Minnesota',
        value: 'MN',
    },
    {
        label: 'Mississippi',
        value: 'MS',
    },
    {
        label: 'Missouri',
        value: 'MO',
    },
    {
        label: 'Montana',
        value: 'MT',
    },
    {
        label: 'Nebraska',
        value: 'NE',
    },
    {
        label: 'Nevada',
        value: 'NV',
    },
    {
        label: 'New Hampshire',
        value: 'NH',
    },
    {
        label: 'New Jersey',
        value: 'NJ',
    },
    {
        label: 'New Mexico',
        value: 'NM',
    },
    {
        label: 'New York',
        value: 'NY',
    },
    {
        label: 'North Carolina',
        value: 'NC',
    },
    {
        label: 'North Dakota',
        value: 'ND',
    },
    {
        label: 'Northern Mariana Islands',
        value: 'MP',
    },
    {
        label: 'Ohio',
        value: 'OH',
    },
    {
        label: 'Oklahoma',
        value: 'OK',
    },
    {
        label: 'Oregon',
        value: 'OR',
    },
    {
        label: 'Palau',
        value: 'PW',
    },
    {
        label: 'Pennsylvania',
        value: 'PA',
    },
    {
        label: 'Puerto Rico',
        value: 'PR',
    },
    {
        label: 'Rhode Island',
        value: 'RI',
    },
    {
        label: 'South Carolina',
        value: 'SC',
    },
    {
        label: 'South Dakota',
        value: 'SD',
    },
    {
        label: 'Tennessee',
        value: 'TN',
    },
    {
        label: 'Texas',
        value: 'TX',
    },
    {
        label: 'Utah',
        value: 'UT',
    },
    {
        label: 'Vermont',
        value: 'VT',
    },
    {
        label: 'Virgin Islands',
        value: 'VI',
    },
    {
        label: 'Virginia',
        value: 'VA',
    },
    {
        label: 'Washington',
        value: 'WA',
    },
    {
        label: 'West Virginia',
        value: 'WV',
    },
    {
        label: 'Wisconsin',
        value: 'WI',
    },
    {
        label: 'Wyoming',
        value: 'WY',
    },
];

export const LANGUAGES = [
    { label: 'Afar', value: 'aa' },
    { label: 'Abkhazian', value: 'ab' },
    { label: 'Avestan', value: 'ae' },
    { label: 'Afrikaans', value: 'af' },
    { label: 'Akan', value: 'ak' },
    { label: 'Amharic', value: 'am' },
    { label: 'Aragonese', value: 'an' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Assamese', value: 'as' },
    { label: 'Avaric', value: 'av' },
    { label: 'Aymara', value: 'ay' },
    { label: 'Azerbaijani', value: 'az' },

    { label: 'Bashkir', value: 'ba' },
    { label: 'Belarusian', value: 'be' },
    { label: 'Bulgarian', value: 'bg' },
    { label: 'Bihari', value: 'bh' },
    { label: 'Bislama', value: 'bi' },
    { label: 'Bambara', value: 'bm' },
    { label: 'Bengali', value: 'bn' },
    { label: 'Tibetan', value: 'bo' },
    { label: 'Breton', value: 'br' },
    { label: 'Bosnian', value: 'bs' },

    { label: 'Catalan', value: 'ca' },
    { label: 'Chechen', value: 'ce' },
    { label: 'Chamorro', value: 'ch' },
    { label: 'Corsican', value: 'co' },
    { label: 'Cree', value: 'cr' },
    { label: 'Czech', value: 'cs' },
    { label: 'Church Slavic', value: 'cu' },
    { label: 'Chuvash', value: 'cv' },
    { label: 'Welsh', value: 'cy' },

    { label: 'Danish', value: 'da' },
    { label: 'German', value: 'de' },
    { label: 'Divehi', value: 'dv' },
    { label: 'Dzongkha', value: 'dz' },

    { label: 'Ewe', value: 'ee' },
    { label: 'Greek', value: 'el' },
    { label: 'English', value: 'en' },
    { label: 'Esperanto', value: 'eo' },
    { label: 'Spanish', value: 'es' },
    { label: 'Estonian', value: 'et' },
    { label: 'Basque', value: 'eu' },

    { label: 'Persian', value: 'fa' },
    { label: 'Fulah', value: 'ff' },
    { label: 'Finnish', value: 'fi' },
    { label: 'Fijian', value: 'fj' },
    { label: 'Faroese', value: 'fo' },
    { label: 'French', value: 'fr' },
    { label: 'Western Frisian', value: 'fy' },

    { label: 'Irish', value: 'ga' },
    { label: 'Scottish Gaelic', value: 'gd' },
    { label: 'Galician', value: 'gl' },
    { label: 'Guarani', value: 'gn' },
    { label: 'Gujarati', value: 'gu' },

    { label: 'Manx', value: 'gv' },

    { label: 'Hausa', value: 'ha' },
    { label: 'Hebrew', value: 'he' },
    { label: 'Hindi', value: 'hi' },
    { label: 'Hiri Motu', value: 'ho' },
    { label: 'Croatian', value: 'hr' },
    { label: 'Haitian', value: 'ht' },
    { label: 'Hungarian', value: 'hu' },

    { label: 'Armenian', value: 'hy' },

    { label: 'Igbo', value: 'ig' },
    { label: 'Ido', value: 'io' },
    { label: 'Icelandic', value: 'is' },
    { label: 'Italian', value: 'it' },
    { label: 'Inuktitut', value: 'iu' },

    { label: 'Japanese', value: 'ja' },
    { label: 'Javanese', value: 'jv' },

    { label: 'Georgian', value: 'ka' },
    { label: 'Kongo', value: 'kg' },
    { label: 'Kikuyu', value: 'ki' },
    { label: 'Kwanyama', value: 'kj' },
    { label: 'Kazakh', value: 'kk' },
    { label: 'Kalaallisut', value: 'kl' },
    { label: 'Khmer', value: 'km' },
    { label: 'Kannada', value: 'kn' },
    { label: 'Korean', value: 'ko' },
    { label: 'Kanuri', value: 'kr' },
    { label: 'Kashmiri', value: 'ks' },
    { label: 'Kurdish', value: 'ku' },
    { label: 'Komi', value: 'kv' },
    { label: 'Cornish', value: 'kw' },
    { label: 'Kirghiz', value: 'ky' },

    { label: 'Latin', value: 'la' },
    { label: 'Luxembourgish', value: 'lb' },
    { label: 'Ganda', value: 'lg' },
    { label: 'Limburgish', value: 'li' },
    { label: 'Lingala', value: 'ln' },
    { label: 'Lao', value: 'lo' },
    { label: 'Lithuanian', value: 'lt' },
    { label: 'Luba-Katanga', value: 'lu' },
    { label: 'Latvian', value: 'lv' },

    { label: 'Malagasy', value: 'mg' },
    { label: 'Marshallese', value: 'mh' },
    { label: 'Maori', value: 'mi' },
    { label: 'Macedonian', value: 'mk' },
    { label: 'Malayalam', value: 'ml' },
    { label: 'Mongolian', value: 'mn' },
    { label: 'Marathi', value: 'mr' },
    { label: 'Malay', value: 'ms' },
    { label: 'Maltese', value: 'mt' },
    { label: 'Burmese', value: 'my' },

    { label: 'Nauru', value: 'na' },
    { label: 'Norwegian Bokmål', value: 'nb' },
    { label: 'North Ndebele', value: 'nd' },
    { label: 'Nepali', value: 'ne' },
    { label: 'Ndonga', value: 'ng' },
    { label: 'Dutch', value: 'nl' },
    { label: 'Norwegian Nynorsk', value: 'nn' },
    { label: 'Norwegian', value: 'no' },
    { label: 'South Ndebele', value: 'nr' },
    { label: 'Navajo', value: 'nv' },
    { label: 'Chichewa', value: 'ny' },

    { label: 'Occitan', value: 'oc' },
    { label: 'Ojibwa', value: 'oj' },
    { label: 'Oromo', value: 'om' },
    { label: 'Oriya', value: 'or' },
    { label: 'Ossetian', value: 'os' },

    { label: 'Punjabi', value: 'pa' },
    { label: 'Pali', value: 'pi' },
    { label: 'Polish', value: 'pl' },
    { label: 'Pashto', value: 'ps' },
    { label: 'Portuguese', value: 'pt' },

    { label: 'Quechua', value: 'qu' },

    { label: 'Romansh', value: 'rm' },
    { label: 'Kirundi', value: 'rn' },
    { label: 'Romanian', value: 'ro' },
    { label: 'Russian', value: 'ru' },
    { label: 'Kinyarwanda', value: 'rw' },

    { label: 'Sanskrit', value: 'sa' },
    { label: 'Sardinian', value: 'sc' },
    { label: 'Sindhi', value: 'sd' },
    { label: 'Northern Sami', value: 'se' },
    { label: 'Sango', value: 'sg' },
    { label: 'Sinhala', value: 'si' },
    { label: 'Slovak', value: 'sk' },
    { label: 'Slovenian', value: 'sl' },
    { label: 'Samoan', value: 'sm' },
    { label: 'Shona', value: 'sn' },
    { label: 'Somali', value: 'so' },
    { label: 'Albanian', value: 'sq' },
    { label: 'Serbian', value: 'sr' },
    { label: 'Swati', value: 'ss' },
    { label: 'Southern Sotho', value: 'st' },
    { label: 'Sundanese', value: 'su' },
    { label: 'Swedish', value: 'sv' },
    { label: 'Swahili', value: 'sw' },

    { label: 'Tamil', value: 'ta' },
    { label: 'Telugu', value: 'te' },
    { label: 'Tajik', value: 'tg' },
    { label: 'Thai', value: 'th' },
    { label: 'Tigrinya', value: 'ti' },
    { label: 'Turkmen', value: 'tk' },
    { label: 'Tagalog', value: 'tl' },
    { label: 'Tswana', value: 'tn' },
    { label: 'Tonga', value: 'to' },
    { label: 'Turkish', value: 'tr' },
    { label: 'Tsonga', value: 'ts' },
    { label: 'Tatar', value: 'tt' },
    { label: 'Twi', value: 'tw' },

    { label: 'Tahitian', value: 'ty' },

    { label: 'Uighur', value: 'ug' },
    { label: 'Ukrainian', value: 'uk' },
    { label: 'Urdu', value: 'ur' },
    { label: 'Uzbek', value: 'uz' },

    { label: 'Venda', value: 've' },
    { label: 'Vietnamese', value: 'vi' },
    { label: 'Volapük', value: 'vo' },

    { label: 'Walloon', value: 'wa' },
    { label: 'Wolof', value: 'wo' },

    { label: 'Xhosa', value: 'xh' },

    { label: 'Yiddish', value: 'yi' },
    { label: 'Yoruba', value: 'yo' },

    { label: 'Zhuang', value: 'za' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Zulu', value: 'zu' },
];

export const ACCOUNT_TYPE_SELECT_OPTIONS = [
    { label: 'Checking', value: 'checking' },
    { label: 'Savings', value: 'savings' },
    { label: 'Brokerage / Investment', value: 'brokerage_investment' },
    { label: 'Retirement (IRA / 401(k))', value: 'retirement' },
    { label: 'Trust account', value: 'trust_account' },
    { label: 'Other', value: 'other' },
];

export const FORM_TYPES = {
    prospectiveWardsFinancialInformation: 'prospective_wards_financial_information',
    webcheckWaiver: 'webcheck_waiver',
    waiverOfNotice: 'waiver_of_notice',
    adultGuardianship: 'adult_guardianship',
    nextOfKinOfProspectiveWard: 'next_of_kin_of_prospective_ward',
    applicantCredibilityApplication: 'applicant_credibility_application',
    adultJurisdictionAffidavit: 'adult_jurisdiction_affidavit',
    applicationForAppointmentOfGuardian: 'application_for_appointment_of_guardian_of_alleged_incompetent',
} as const;
