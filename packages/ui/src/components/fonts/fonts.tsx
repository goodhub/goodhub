interface FontSpec {
  name: string;
  weight: any;
  fstyle: string;
}

export const fontPairings: { [key: string]: { primary: FontSpec; secondary: FontSpec } } = {
  'Roboto Cabin': {
    primary: {
      name: 'Roboto Condensed',
      weight: '700',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Cabin',
      weight: '400',
      fstyle: 'normal'
    }
  },
  'Raleway OpenSans': {
    primary: {
      name: 'Raleway',
      weight: '300',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Open Sans',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Playfair SourceSans': {
    primary: {
      name: 'Playfair Display',
      weight: '700i',
      fstyle: 'italic'
    },
    secondary: {
      name: 'Source Sans Pro',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'RobotoBold Lora': {
    primary: {
      name: 'Roboto',
      weight: '700',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Lora',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Abril Poppins': {
    primary: {
      name: 'Abril Fatface',
      weight: '400',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Poppins',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Ruda RobotoSlab': {
    primary: {
      name: 'Ruda',
      weight: '400',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Roboto Slab',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Cormorant Fira': {
    primary: {
      name: 'Cormorant Garamond',
      weight: '700',
      fstyle: 'italic'
    },
    secondary: {
      name: 'Fira Sans',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Oxygen Noto': {
    primary: {
      name: 'Oxygen',
      weight: '300',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Noto Serif',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Arvo Lato': {
    primary: {
      name: 'Arvo',
      weight: '400',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Lato',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Lato Catamaran': {
    primary: {
      name: 'Lato',
      weight: '400',
      fstyle: 'italic'
    },
    secondary: {
      name: 'Catamaran',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Merriweather Muli': {
    primary: {
      name: 'Merriweather',
      weight: '400',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Muli',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'WorkSans OpenSans': {
    primary: {
      name: 'Work Sans',
      weight: '300',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Open Sans',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Josefin Lato': {
    primary: {
      name: 'Josefin Sans',
      weight: '400,600',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Lato',
      weight: '400',
      fstyle: 'normal'
    }
  },
  'Julius Monda': {
    primary: {
      name: 'Julius Sans One',
      weight: '400',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Monda',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Vollkorn Raleway': {
    primary: {
      name: 'Vollkorn',
      weight: '400',
      fstyle: 'italic'
    },
    secondary: {
      name: 'Raleway',
      weight: '500',
      fstyle: 'normal'
    }
  },
  'Marker overpass': {
    primary: {
      name: 'Permanent Marker',
      weight: '700',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Overpass',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'SourceSansPro Sintony': {
    primary: {
      name: 'Source Sans pro',
      weight: '900',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Sintony',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Shrikhand Fanwood': {
    primary: {
      name: 'Shrikhand',
      weight: '400',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Fanwood Text',
      weight: '300',
      fstyle: 'normal'
    }
  },
  'Anton Signika': {
    primary: {
      name: 'Anton',
      weight: '400',
      fstyle: 'normal'
    },
    secondary: {
      name: 'Signika',
      weight: '300',
      fstyle: 'normal'
    }
  }
};
