// let cc = window.cc;
let tilesNameTable = [];
for (let i = 1; i < 10; ++i) {
  tilesNameTable.push(`Dot_${i}`);
}
for (let i = 1; i < 10; ++i) {
  tilesNameTable.push(`Bam_${i}`);
}
for (let i = 1; i < 10; ++i) {
  tilesNameTable.push(`Crak_${i}`);
}
tilesNameTable.push('Wind_East');
tilesNameTable.push('Wind_North');
tilesNameTable.push('Wind_West');
tilesNameTable.push('Wind_South');

tilesNameTable.push("Dragon_Red");
tilesNameTable.push("Dragon_Green");
tilesNameTable.push("Dragon_White");

//梅、兰、竹、菊
for (let i = 1; i < 5; ++i) {
  tilesNameTable.push(`Flower_${i}`);
}

//春、夏、秋、冬
for (let i = 1; i < 5; ++i) {
  tilesNameTable.push(`Season_${i}`);
}
export default class MahJongMgr extends cc.ScriptComponent {
  constructor() {
    super();
    cc.vv.mahjongmgr = this;
    this._mtls = new Array(2);
    this._game = null;
  }

  start() {
    this._initViews();
    this._game = this._app;
    console.log('mahjongmgr runs');
  }

  _initViews() {
    let app = this._app;
    let mtlDummies = app.find('dummyforMatrial', this._entity);
    let en = app.find('normal', mtlDummies);
    let model = en && en.getComp('Model');
    this._mtls[0] = model.material;

    en = app.find('inactive', mtlDummies);
    model = en && en.getComp('Model');
    this._mtls[1] = model.material;
  }

  instantiateBlankMjTile(callback) {
    let uuid = this['Dragon_Blank'];
    let app = this._game;
    app.assets.load(uuid, (err, asset) => {
      if (err) {
        callback && callback(err, null);
      } else {
        let en = asset.instantiate();
        if (en) {
          callback && callback(null, en);
        } else {
          callback && callback('tile is not a prefab', null);
        }
      }
    });
    return null;
  }

  getNormalMtl() {
    return this._mtls[0];
  }

  getInactiveMtl() {
    return this._mtls[1];
  }

  instantiateMjTile(id, callback) {
    let uuid = this[tilesNameTable[id]];
    let app = this._game;
    app.assets.load(uuid, (err, asset) => {
      if (err) {
        callback && callback(err, null);
      } else {
        let en = asset.instantiate(null, app._activeLevel);
        if (en) {
          callback && callback(null, en);
        } else {
          callback && callback('tile is not a prefab', null);
        }
      }
    });
    return null;
  }

  getMahjongType(id) {
    if (id >= 0 && id < 9) {
      return 0;
    }
    else if (id >= 9 && id < 18) {
      return 1;
    }
    else if (id >= 18 && id < 27) {
      return 2;
    }
  }

  sortMJ(mahjongs, dingque) {
    mahjongs.sort((a, b) => {
      var ja = cc.vv.gameNetMgr.isJing(a);
      var jb = cc.vv.gameNetMgr.isJing(b);
      if (ja && jb) {
        return a - b;
      }
      if (ja) {
        return -1;
      }
      if (jb) {
        return 1;
      }

      if (dingque >= 0) {
        var t1 = this.getMahjongType(a);
        var t2 = this.getMahjongType(b);
        if (t1 != t2) {
          if (dingque == t1) {
            return 1;
          }
          else if (dingque == t2) {
            return -1;
          }
        }
      }
      return a - b;
    });
  }
}

MahJongMgr.schema = {
  dummy_tiles: {
    type: 'object',
    default: null,
  },

  Dot_1: {
    type: 'string',
    default: '',
  },

  Dot_2: {
    type: 'string',
    default: '',
  },

  Dot_3: {
    type: 'string',
    default: '',
  },

  Dot_4: {
    type: 'string',
    default: '',
  },

  Dot_5: {
    type: 'string',
    default: '',
  },

  Dot_6: {
    type: 'string',
    default: '',
  },

  Dot_7: {
    type: 'string',
    default: '',
  },

  Dot_8: {
    type: 'string',
    default: '',
  },

  Dot_9: {
    type: 'string',
    default: '',
  },

  Bam_1: {
    type: 'string',
    default: '',
  },

  Bam_2: {
    type: 'string',
    default: '',
  },

  Bam_3: {
    type: 'string',
    default: '',
  },

  Bam_4: {
    type: 'string',
    default: '',
  },

  Bam_5: {
    type: 'string',
    default: '',
  },

  Bam_6: {
    type: 'string',
    default: '',
  },

  Bam_7: {
    type: 'string',
    default: '',
  },

  Bam_8: {
    type: 'string',
    default: '',
  },

  Bam_9: {
    type: 'string',
    default: '',
  },

  Crak_1: {
    type: 'string',
    default: '',
  },

  Crak_2: {
    type: 'string',
    default: '',
  },

  Crak_3: {
    type: 'string',
    default: '',
  },

  Crak_4: {
    type: 'string',
    default: '',
  },

  Crak_5: {
    type: 'string',
    default: '',
  },

  Crak_6: {
    type: 'string',
    default: '',
  },

  Crak_7: {
    type: 'string',
    default: '',
  },

  Crak_8: {
    type: 'string',
    default: '',
  },

  Crak_9: {
    type: 'string',
    default: '',
  },

  Wind_East: {
    type: 'string',
    default: '',
  },

  Wind_North: {
    type: 'string',
    default: '',
  },

  Wind_West: {
    type: 'string',
    default: '',
  },

  Wind_South: {
    type: 'string',
    default: '',
  },

  Dragon_Red: {
    type: 'string',
    default: '',
  },

  Dragon_Green: {
    type: 'string',
    default: '',
  },

  Dragon_White: {
    type: 'string',
    default: '',
  },

  Dragon_Blank: {
    type: 'string',
    default: '',
  },

  Flower_1: {
    type: 'string',
    default: '',
  },

  Flower_2: {
    type: 'string',
    default: '',
  },

  Flower_3: {
    type: 'string',
    default: '',
  },

  Flower_4: {
    type: 'string',
    default: '',
  },

  Season_1: {
    type: 'string',
    default: '',
  },

  Season_2: {
    type: 'string',
    default: '',
  },

  Season_3: {
    type: 'string',
    default: '',
  },

  Season_4: {
    type: 'string',
    default: '',
  },
};


