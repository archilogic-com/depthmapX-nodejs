// Creates graph and CSV files from 'archilogic-office.dxf' in 'example' dir

const dmx = require('./index.js')

// 1. import file

dmx.importData({
  f: 'example/archilogic-office.dxf',
  o: 'example/1_new.graph'
}).then(() => {

  // 2. calculate visibility

  return dmx.visprep({
    f:'example/1_new.graph',
    o:'example/2_visibility.graph',
    pg:'0.1',
    pp:'3.0,3.0'
  })

}).then(() => {

  // 3. export as CSV

  return dmx.exportData({
    f: 'example/2_visibility.graph',
    o: 'example/3_visibility.csv',
    em: 'pointmap-data-csv'
  })

})