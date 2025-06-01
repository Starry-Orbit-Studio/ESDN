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
    pageOptions.frontmatter.title ??= i18n('UnitDoc')
    pageOptions.frontmatter.layout = 'UnitHomePageLayout'

    const page = await createPage(app, pageOptions)
    app.pages.push(page)
  },
  IndexPage: async (
    app: App,
    type: Exclude<Parameters<typeof i18n>[1], undefined>,
    url: string,
    pageOptions: PageOptions,
  ) => {
    pageOptions.path = url

    pageOptions.frontmatter ??= {}

    pageOptions.frontmatter.title ??= i18n('TypeName', type)
    pageOptions.frontmatter.layout = 'UnitTypeLayout'
    pageOptions.frontmatter.type = type

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
    options.iconsBaseUrl ??= '/icons/'
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

        const types: Array<
          | ['InfantryTypes', Record<UnitDoc.Id, UnitDoc.Unit>]
          | ['VehicleTypes', Record<UnitDoc.Id, UnitDoc.Unit>]
          | ['AircraftTypes', Record<UnitDoc.Id, UnitDoc.Unit>]
          | ['BuildingTypes', Record<UnitDoc.Id, UnitDoc.Unit>]
          | ['SuperWeaponTypes', Record<UnitDoc.Id, UnitDoc.Unit>]
          | ['WeaponTypes', Record<UnitDoc.Id, UnitDoc.Weapon>]
          | ['WarheadTypes', Record<UnitDoc.Id, UnitDoc.Warhead>]
        > = []
        types.push(...(Object.entries(__ESDNUnitDoc.source.Units) as any))
        types.push(['WeaponTypes', __ESDNUnitDoc.source.Weapons])
        types.push(['WarheadTypes', __ESDNUnitDoc.source.Warheads])
        // types.push([
        //   'GenericPrerequisitesTypes',
        //   __ESDNUnitDoc.source.GenericPrerequisites,
        // ])

        await Promise.all(
          types.map(async ([type, data]) => {
            const url = formatUrl(
              `${relativeBaseUrl}/${type.replace('Types', '')}/`,
            )
            await PageBuilder.IndexPage(app, type, url, getPageOptions(url))
          }),
        )

        // pages.push(
        //   ...Object.entries(__ESDNUnitDoc.source.Units).flatMap(
        //     ([type, data]) => {

        //       pages.push(
        //         ...Object.entries(data).map(([unitId, unit]) => {
        //           const relativeUnitUrl =
        //             `${relativeTypeUrl}/${unitId}`.replaceAll('//', '/')

        //           const pageOptions =
        //             (knownPages.find(
        //               ({ path }) => path == relativeUnitUrl,
        //             ) as PageOptions) ?? {}

        //           pageOptions.path = relativeUnitUrl
        //           pageOptions.frontmatter ??= {}
        //           pageOptions.frontmatter = {
        //             ...pageOptions.frontmatter,
        //             title: unit.UIName && __ESDNUnitDoc.source.Csf[unit.UIName],
        //             description:
        //               unit.UIDescription &&
        //               __ESDNUnitDoc.source.Csf[unit.UIDescription],
        //             layout: 'UnitLayout',
        //             sidebar: true,
        //             index: false,
        //             unitId,
        //             unitType: unitType,
        //           }

        //           return pageOptions
        //         }),
        //       )

        //       return pages
        //     },
        //   ),
        // )

        // return pages.map(async option => {
        //   if (!option) return
        //   const page = await createPage(app, {
        //     ...option,
        //   })
        //   // 把它添加到 `app.pages`
        //   app.pages.push(page)
        // })
      },
    }
  }
export default plugin
