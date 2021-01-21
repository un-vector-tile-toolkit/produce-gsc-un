const geojsonArea = require('@mapbox/geojson-area')

const preProcess = (f) => {
  f.tippecanoe = {
    layer: 'other',
    minzoom: 15,
    maxzoom: 15
  }
  // name
  if (
    f.properties.hasOwnProperty('en_name') ||
    f.properties.hasOwnProperty('int_name') ||
    f.properties.hasOwnProperty('name') ||
    f.properties.hasOwnProperty('ar_name')
  ) {
    let name = ''
    if (f.properties['en_name']) {
      name = f.properties['en_name']
    } else if (f.properties['ar_name']) {
      name = f.properties['ar_name']
    } else if (f.properties['int_name']) {
      name = f.properties['int_name']
    } else {
      name = f.properties['name']
    }
    delete f.properties['en_name']
    delete f.properties['ar_name']
    delete f.properties['int_name']
    delete f.properties['name']
    f.properties.name = name
  }
  return f
}

const postProcess = (f) => {
  delete f.properties['_database']
  delete f.properties['_table']
  return f
}

const flap = (f, defaultZ) => {
  switch (f.geometry.type) {
    case 'MultiPolygon':
    case 'Polygon':
      let mz = Math.floor(
        19 - Math.log2(geojsonArea.geometry(f.geometry)) / 2
      )
      if (mz > 15) { mz = 15 }
      if (mz < 5) { mz = 5 }
      return mz
    default:
      return defaultZ ? defaultZ : 10
  }
}


const lut = {
  // 1. nature
  un_mission_lc_ls: f => {
    f.tippecanoe = {
      layer: 'landcover',
      minzoom: 10,
      maxzoom: 15
    }
    return f
  },
  un_glc30_global_lc_ms: f => {
    f.tippecanoe = {
      layer: 'landcover',
      minzoom: 5,
      maxzoom: 9
    }
    delete f.properties['id']
    return f
  },
  // 2. water
  custom_planet_ocean_l08: f => {
    f.tippecanoe = {
      layer: 'ocean',
      minzoom: 5,
      maxzoom: 7
    }
    return f
  },
  custom_planet_ocean: f => {
    f.tippecanoe = {
      layer: 'ocean',
      minzoom: 8,
      maxzoom: 15
    } 
    return f
  },
  custom_planet_land_a_l08: f => {
    f.tippecanoe = {
      layer: 'landmass',
      minzoom: 5,
      maxzoom: 7
    }
    return f
  },
  custom_planet_land_a: f => {
    f.tippecanoe = {
      layer: 'landmass',
      minzoom: 8,
      maxzoom: 15
    } 
    return f
  },
  custom_ne_rivers_lakecentrelines: f => {
    f.tippecanoe = {
      layer: 'un_water',
      minzoom: 5,
      maxzoom: 7
    }
    return f
  },
  // 3. boundary
  unhq_bndl: f => {
    f.tippecanoe = {
      layer: 'hq_bnd',
      minzoom: 5,
      maxzoom: 15
    }
    return f
  },
 unhq_bnda_a1: f => {
    f.tippecanoe = {
      layer: 'hq_bnd',
      minzoom: 6,
      maxzoom: 8
    }
    return f
  },
  unhq_bnda_a2: f => {
    f.tippecanoe = {
      layer: 'hq_bnd',
      minzoom: 9,
      maxzoom: 15
    }
    return f
  },
 unhq_bnda_a1_p: f => {
    f.tippecanoe = {
      layer: 'hq_bnd_lab1',
      minzoom: 6,
      maxzoom: 8
    }
    return f
  },
  unhq_bnda_a2_p: f => {
    f.tippecanoe = {
      layer: 'hq_bnd_lab2',
      minzoom: 9,
      maxzoom: 15
    }
    return f
  },
  custom_unmap_0_bnda_a1: f => {
    f.tippecanoe = {
      layer: 'c_bnd',
      minzoom: 6,
      maxzoom: 8
    }
    return f
  },
  custom_unmap_0_bnda_a2: f => {
    f.tippecanoe = {
      layer: 'c_bnd',
      minzoom: 9,
      maxzoom: 15
    }
    return f
  },
  custom_unmap_0_bnda_a1_p: f => {
    f.tippecanoe = {
      layer: 'c_bnd_lab1',
      minzoom: 6,
      maxzoom: 8
    }
    return f
  },
  custom_unmap_0_bnda_a2_p: f => {
    f.tippecanoe = {
      layer: 'c_bnd_lab2',
      minzoom: 9,
      maxzoom: 15
    }
    return f
  },
  custom_unmap_0_bndl: f => {
    f.tippecanoe = {
      layer: 'c_bnd',
      minzoom: 5,
      maxzoom: 15
    }
    return f
  },
  un_unmik_bnda_a2: f => {
    f.tippecanoe = {
      layer: 'mik_bnd',
      minzoom: 7,
      maxzoom: 8
    }
    return f
  },
  un_unmik_bnda_a_p: f => {
    f.tippecanoe = {
      layer: 'mik_bnd_lab2',
      minzoom: 7,
      maxzoom: 8
    }
    return f
  },
  un_unmik_bnda_a3: f => {
    f.tippecanoe = {
      layer: 'mik_bnd',
      minzoom: 9,
      maxzoom: 15
    }
    return f
  },
  un_unmik_bnda_a3_p: f => {
    f.tippecanoe = {
      layer: 'mik_bnd_lab3',
      minzoom: 9,
      maxzoom: 15
    }
    return f
  },
  un_unmik_bndl: f => {
    f.tippecanoe = {
      layer: 'mik_bnd',
      minzoom: 7,
      maxzoom: 15
    }
    return f
  },
  un_unvmc_igac_bnda_a1_departments: f => {
    f.tippecanoe = {
      layer: 'vmc_bnd',
      minzoom: 7,
      maxzoom: 8
    }
    return f
  },
  un_unvmc_igac_bnda_a1_departments_p: f => {
    f.tippecanoe = {
      layer: 'vmc_bnd_lab1',
      minzoom: 7,
      maxzoom: 8
    }
    return f
  },
  un_unvmc_igac_bnda_a2_municipalities: f => {
    f.tippecanoe = {
      layer: 'vmc_bnd',
      minzoom: 9,
      maxzoom: 10
    }
    return f
  },
  un_unvmc_igac_bnda_a2_municipalities_p: f => {
    f.tippecanoe = {
      layer: 'vmc_bnd_lab2',
      minzoom: 9,
      maxzoom: 10
    }
    return f
  },
  un_unvmc_igac_bnda_a3_rural_units: f => {
    f.tippecanoe = {
      layer: 'vmc_bnd',
      minzoom: 11,
      maxzoom: 15
    }
    return f
  },
  un_unvmc_igac_bnda_a3_rural_units_p: f => {
    f.tippecanoe = {
      layer: 'vmc_bnd_lab3',
      minzoom: 11,
      maxzoom: 15
    }
    return f
  },
  un_unvmc_igac_bndl: f => {
    f.tippecanoe = {
      layer: 'vmc_bnd',
      minzoom: 6,
      maxzoom: 15
    }
    return f
  },
  unhq_bnda05_cty: f => {
    f.tippecanoe = {
      layer: 'bnd_cty',
      minzoom: 5,
      maxzoom: 11
    }
    return f
  },
  unhq_bnda_cty_anno_l06: f => {
    f.tippecanoe = {
      layer: 'lab_cty',
      minzoom: 5,
      maxzoom: 11
    }
    return f
  },

  // 9. place
  unhq_popp: f => {
    f.tippecanoe = {
      layer: 'un_popp',
      minzoom: 5,
      maxzoom: 15
    }
    return f
  },
  un_global_places: f => {
    f.tippecanoe = {
      layer: 'un_place',
      minzoom: 6,
      maxzoom: 15
    }
    f.properties._source = 'un_global_places'
    return f
  },
  unhq_phyp: f => {
    f.tippecanoe = {
      layer: 'label',
      minzoom: 5,
      maxzoom: 15
    }
    f.properties._source = 'unhq_phyp'
    return f
  },
  un_minusca_pois: f => {
    f.tippecanoe = {
      layer: 'poi_minusca',
      minzoom: 7,
      maxzoom: 15
    }
    return f
  },
  un_global_pois: f => {
    f.tippecanoe = {
      layer: 'un_poi',
      minzoom: 7,
      maxzoom: 15
    }
    return f
  }
}
module.exports = (f) => {
  return postProcess(lut[f.properties._table](preProcess(f)))
}

