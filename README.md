# Node.js Bindings for depthmapX CLI

Command Line Interface bindings for depthmapX. Every global option in depthmap CLI has it's method in the depthmapX namespace.

## Methods

| DepthmapX CLI mode | node depthmapX method |
| -------------------- | --------------------- |
| IMPORT | importData |
| EXPORT | exportData |
| VGA | vga |
| VISPREP | visprep |

## Method Options

depthmapX CLI options are translated directly into node method options. See [official depthmapX CLI docs](https://github.com/SpaceGroupUCL/depthmapX/blob/master/docs/commandline.md) for reference.

## Example
```javascript
const dmx = require('depthmapX')

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