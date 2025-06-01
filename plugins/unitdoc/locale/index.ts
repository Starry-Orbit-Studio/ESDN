import zhHans from './zh-Hans.json'

const locales = {
  default: zhHans,
  ['zh-Hans']: zhHans,
}

export default (
  key: keyof typeof locales.default.default,
  type?: Exclude<keyof typeof locales.default, 'default'>,
  lang?: Exclude<keyof typeof locales, 'default'>,
  args?: Record<string, string>,
): string | undefined => {
  if (!key) return ''
  const locale = locales[lang ?? 'default']
  const strings = locale[type ?? 'default']

  let result: string
  if (key in strings) result = strings[key as keyof typeof strings]
  else if (key in locale.default) result = locale.default[key]
  else return undefined

  Object.entries(args ?? {}).forEach(([key, value]) => {
    result = result.replaceAll(`{${key}}`, value)
  })

  return result
}
