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

  export enum Type {
    InfantryTypes = 'InfantryTypes',
    VehicleTypes = 'VehicleTypes',
    AircraftTypes = 'AircraftTypes',
    BuildingTypes = 'BuildingTypes',
    SuperWeaponTypes = 'SuperWeaponTypes',
    Weapons = 'Weapons',
    Warheads = 'Warheads',
    Armors = 'Armors',
  }

  /** 单位文档数据 */
  export interface Source {
    Csf: Record<CsfLabel, string>
    Units: {
      [Type.InfantryTypes]: Record<Id, Unit>
      [Type.VehicleTypes]: Record<Id, Unit>
      [Type.AircraftTypes]: Record<Id, Unit>
      [Type.BuildingTypes]: Record<Id, Unit>
      [Type.SuperWeaponTypes]: Record<Id, Unit>
    }
    [Type.Weapons]: Record<Id, Weapon>
    [Type.Warheads]: Record<Id, Warhead>
    [Type.Armors]: Id[]
  }

  export interface Unit {
    Hidden: boolean
    Cameo?: ImageFileName
    AltCameo?: ImageFileName
    UIName?: CsfLabel
    UIDescription?: CsfLabel
    Cost?: number
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
    BuildTimeMultiplier?: number
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

    IsPowered?: boolean
    RechargeTime?: number
  }

  export interface Weapon {
    Damage?: number
    ROF?: number
    Range?: number
    Burst?: number
    Burst_Delays?: number
    Warhead?: Id
  }

  export interface Warhead {
    CellSpread?: number
    AffectsAllies?: number
    AffectsEnemies?: number
    AffectsOwner?: number
  }
}
