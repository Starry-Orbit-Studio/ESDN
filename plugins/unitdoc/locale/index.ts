import zhHans from './zh-Hans.json'

const locales = {
  default: zhHans,
  ['zh-Hans']: zhHans,
}

export default (
  key: keyof typeof locales.default.default,
  type?: Exclude<keyof typeof locales.default, 'default'>,
  lang?: Exclude<keyof typeof locales, 'default'>,
): string | undefined => {
  if (!key) return ''
  const locale = locales[lang ?? 'default']
  const strings = locale[type ?? 'default']

  if (key in strings) return strings[key as keyof typeof strings]
  if (key in locale.default) return locale.default[key]
}
