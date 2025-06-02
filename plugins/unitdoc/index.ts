import * as fs from 'node:fs'
import type { App, PageOptions, PluginFunction } from 'vuepress/core'
import { createPage } from 'vuepress/core'
import { path } from 'vuepress/utils'
import i18n from './locale'

const formatUrl = (url: string) => url.replaceAll('//', '/')

const PageBuilder = {
  HomePage: async (app: App, url: string, pageOptions: PageOptions) => {
    pageOptions.path = url

    pageOptions.frontmatter ??= {}
    const title = i18n('UnitDoc')
    if (title) pageOptions.frontmatter.title ??= title
    pageOptions.frontmatter.layout = 'UnitHomePageLayout'

    const page = await createPage(app, pageOptions)
    app.pages.push(page)
  },
  IndexPage: async (
    app: App,
    type: UnitDoc.Types,
    url: string,
    pageOptions: PageOptions,
  ) => {
    pageOptions.path = url

    pageOptions.frontmatter ??= {}

    const title = i18n('TypeName', type)
    if (title) pageOptions.frontmatter.title ??= title
    pageOptions.frontmatter.layout = 'UnitTypeLayout'
    pageOptions.frontmatter.type = type

    const page = await createPage(app, pageOptions)
    app.pages.push(page)
  },
  UnitPage: async (
    app: App,
    type: UnitDoc.Types,
    unitId: UnitDoc.Id,
    title: string | undefined,
    url: string,
    pageOptions: PageOptions,
  ) => {
    pageOptions.path = url

    pageOptions.frontmatter ??= {}

    if (title) pageOptions.frontmatter.title ??= title
    pageOptions.frontmatter.layout = 'UnitLayout'
    pageOptions.frontmatter.type = type
    pageOptions.frontmatter.unitId = unitId

    const page = await createPage(app, pageOptions)
    app.pages.push(page)
  },
}

const plugin =
  (options: UnitDoc.Options): PluginFunction =>
  app => {
    const raw = fs.readFileSync(options.source, 'utf-8')
    const source = JSON.parse(raw) as UnitDoc.Source

    options.baseUrl ??= '/'
    options.iconsBaseUrl ??= '/units/'
    options.baseUrl = formatUrl(app.siteData.base + options.baseUrl) as any
    options.iconsBaseUrl = formatUrl(
      app.siteData.base + options.iconsBaseUrl,
    ) as any

    const __ESDNUnitDoc = {
      options,
      source,
    }

    return {
      name: 'vuepress-plugin-esdn-unit-doc',
      clientConfigFile: path.resolve(__dirname, './client/index.ts'),
      define: {
        __ESDNUnitDoc,
      },
      onInitialized: async app => {
        const relativeBaseUrl = formatUrl(options.baseUrl!)

        const getPageOptions = (url: string): PageOptions =>
          app.pages.filter(i => i.path === url) as any

        await PageBuilder.HomePage(
          app,
          relativeBaseUrl,
          getPageOptions(relativeBaseUrl),
        )

        await Promise.all(
          (
            Object.entries(__ESDNUnitDoc.source.Types) as [
              UnitDoc.Types,
              UnitDoc.Id[],
            ][]
          ).map(async ([type, unitIdList]) => {
            const url = formatUrl(
              `${relativeBaseUrl}/${type.replaceAll('Types', '')}/`,
            )
            await PageBuilder.IndexPage(app, type, url, getPageOptions(url))

            await Promise.all(
              unitIdList.map(async unitId => {
                const unitUrl = formatUrl(`${url}${unitId}.html`)
                const unit = __ESDNUnitDoc.source.Data[unitId]
                if (!unit) return

                const title =
                  'UIName' in unit && unit.UIName
                    ? __ESDNUnitDoc.source.Csf[unit.UIName]
                    : unitId

                await PageBuilder.UnitPage(
                  app,
                  type,
                  unitId,
                  title ?? undefined,
                  unitUrl,
                  getPageOptions(unitUrl),
                )
              }),
            )
          }),
        )
      },
    }
  }
export default plugin
