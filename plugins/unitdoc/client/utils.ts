export const getUnit = (id: UnitDoc.Id) => {
  if (__ESDNUnitDoc.source.Units.InfantryTypes[id])
    return {
      type: 'InfantryTypes' as UnitDoc.Type.InfantryTypes,
      data: __ESDNUnitDoc.source.Units.InfantryTypes[id],
    }
  if (__ESDNUnitDoc.source.Units.VehicleTypes[id])
    return {
      type: 'VehicleTypes' as UnitDoc.Type.VehicleTypes,
      data: __ESDNUnitDoc.source.Units.VehicleTypes[id],
    }
  if (__ESDNUnitDoc.source.Units.AircraftTypes[id])
    return {
      type: 'AircraftTypes' as UnitDoc.Type.AircraftTypes,
      data: __ESDNUnitDoc.source.Units.AircraftTypes[id],
    }
  if (__ESDNUnitDoc.source.Units.BuildingTypes[id])
    return {
      type: 'BuildingTypes' as UnitDoc.Type.BuildingTypes,
      data: __ESDNUnitDoc.source.Units.BuildingTypes[id],
    }
  if (__ESDNUnitDoc.source.Units.SuperWeaponTypes[id])
    return {
      type: 'SuperWeaponTypes' as UnitDoc.Type.SuperWeaponTypes,
      data: __ESDNUnitDoc.source.Units.SuperWeaponTypes[id],
    }
  if (__ESDNUnitDoc.source.Weapons[id])
    return {
      type: 'Weapons' as UnitDoc.Type.Weapons,
      data: __ESDNUnitDoc.source.Weapons[id],
    }
  if (__ESDNUnitDoc.source.Warheads[id])
    return {
      type: 'Warheads' as UnitDoc.Type.Warheads,
      data: __ESDNUnitDoc.source.Warheads[id],
    }
  if (__ESDNUnitDoc.source.Armors.includes(id))
    return {
      type: 'Armors' as UnitDoc.Type.Armors,
    }
}
