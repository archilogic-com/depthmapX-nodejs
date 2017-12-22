# Node.js Bindings for depthmapX CLI

Command Line Interface bindings for depthmapX.

## Methods

Every global option in depthmap CLI translates to a module method.

| CLI mode option | node module method |
| -------------------- | --------------------- |
| -m VGA | dmx.vga |
| -m LINK | dmx.link |
| -m VISPREP | dmx.visprep |
| -m AXIAL | dmx.axial | 
| -m AGENTS | dmx.agents |
| -m ISOVIST | dmx.isovist |
| -m EXPORT | dmx.exportData |
| -m IMPORT | dmx.importData |
  
## Method Options

depthmapX CLI options are translated directly into node method options. See [official depthmapX CLI docs](https://github.com/SpaceGroupUCL/depthmapX/blob/master/docs/commandline.md) for reference.

## Example
```javascript
const dmx = require('depthmapx')

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

``` 