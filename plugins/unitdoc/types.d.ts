declare namespace UnitDoc {
  /** 文档生成器配置 */
  export interface Options {
    source: string
    /** 单位文档前缀 */
    baseUrl?: `/${string}/` | '/'
    iconsBaseUrl?: `/${string}/` | '/'
  }

  /** 图片文件名 */
  export type ImageFileName = `${Lowercase<string>}.webp`
  /** 单位ID */
  export type Id = string
  /** Csf标签 */
  export type CsfLabel = string

  export type Types =
    | 'InfantryTypes'
    | 'VehicleTypes'
    | 'AircraftTypes'
    | 'BuildingTypes'
    | 'SuperWeaponTypes'
    | 'WeaponTypes'
    | 'WarheadTypes'
    | 'GenericPrerequisiteTypes'
    | 'ArmorTypes'

  /** 单位文档数据 */
  export interface Source {
    Csf: Record<CsfLabel, string>
    Types: Record<Types, Id[]>
    Data: Record<Id, Unit | Warhead | Weapon | SuperWeapon>
    GenericPrerequisites: Record<Id, Id[]>
  }

  export interface Unit {
    Hidden: boolean
    Cameo?: ImageFileName
    AltCameo?: ImageFileName

    UIName?: CsfLabel
    UIDescription?: CsfLabel
    Cost?: number
    TechLevel?: number
    Power?: number
    Strength?: number
    Armor?: Id
    Prerequisite?: Id[]
    Weapons?: Id[]
    EliteWeapons?: Id[]
    Primary?: Id
    ElitePrimary?: Id
    Secondary?: Id
    EliteSecondary?: Id
    OpportunityFire?: boolean
    DetectDisguise?: boolean
    BuildTimeMultiplier?: double
    CrushLevel?: number
    OmniCrusher?: boolean
    BuildLimit?: number
    Cloakable?: boolean
    Deployer?: boolean
    Occupier?: boolean
    SelfHealing?: boolean
    ImmuneToEMP?: boolean
    ImmuneToVeins?: boolean
    ImmuneToPsionics?: boolean
    ImmuneToRadiation?: boolean
    ImmuneToPoison?: boolean
    Ammo?: number
    DeploysInto?: Id
    Cloneable?: boolean
    Bunkerable?: boolean
    Trainable?: boolean
    Crushable?: boolean
  }

  export interface Weapon {
    Damage?: number
    ROF?: number
    Range?: number
    Burst?: number
    ['Burst.Delays']?: number
    Warhead?: Id
  }

  export interface Warhead {
    CellSpread?: number
    AffectsAllies?: number
    AffectsEnemies?: number
    AffectsOwner?: number
  }

  export interface SuperWeapon {
    SidebarImage?: ImageFileName

    UIName?: CsfLabel
    UIDescription?: CsfLabel
    WeaponType?: Id
    IsPowered?: boolean
    RechargeTime?: number
  }
}
