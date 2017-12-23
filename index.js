const spawn = require('child_process').spawn
const chalk = require('chalk')
const Promise = require('bluebird')

// shared

const depthmapVersions = {
  linux: '/bin/linux/depthmapXcli',
  darwin: '/bin/osx/depthmapXcli'
  //win32: './bin/win32/depthmapXcli' // FIXME: add Win32 CLI executable
}
const depthmapPath = __dirname + depthmapVersions[process.platform]

// methods

function vga (args) {

  let cliArgs = ['-m', 'VGA', '-f', args.f, '-o', args.o]

  if (args.vm) cliArgs.push('-vm', args.vm) // isovist, visibility, metric, angular, thruvision
  if (args.vg) cliArgs.push('-vg')
  if (args.vl) cliArgs.push('-vl')
  if (args.vr) cliArgs.push('-vr', args.vr)

  return runCli(depthmapPath, cliArgs)

}

function link (args) {

  let cliArgs = ['-m', 'LINK', '-f', args.f, '-o', args.o]

  if (args.lf) cliArgs.push('-lf', args.lf)
  if (args.lnk) cliArgs.push('-lnk', args.lnk)

  return runCli(depthmapPath, cliArgs)

}

function visprep (args) {

  let cliArgs = ['-m', 'VISPREP', '-f', args.f, '-o', args.o]

  if (args.pg) cliArgs.push('-pg', args.pg)
  if (args.pp) {
    // support one or multiple points
    if (!Array.isArray(args.pp)) args.pp = [args.pp]
    args.pp.forEach(value => {
      cliArgs.push('-pp', value)
    })
  }
  if (args.pf) cliArgs.push('-pf', args.pf)
  if (args.pr) cliArgs.push('-pr', args.pr)
  if (args.pb) cliArgs.push('-pb')

  return runCli(depthmapPath, cliArgs)

}

function axial (args) {

  let cliArgs = ['-m', 'AXIAL', '-f', args.f, '-o', args.o]

  if (args.xl) cliArgs.push('-xl', args.xl)
  if (args.xf) cliArgs.push('-xf')
  if (args.xu) cliArgs.push('-xu')
  if (args.xa) cliArgs.push('-xa')
  if (args.xac) cliArgs.push('-xac')
  if (args.xal) cliArgs.push('-xal')
  if (args.xar) cliArgs.push('-xar')

  return runCli(depthmapPath, cliArgs)

}

function agents (args) {

  let cliArgs = ['-m', 'AXIAL', '-f', args.f, '-o', args.o]

  if (args.am) cliArgs.push('-am', args.am) // standard, los-length, occ-length, occ-any, occ-group-45, occ-group-60, occ-furthest, bin-far-dist, bin-angle, bin-far-dist-angle, bin-memory
  if (args.ats) cliArgs.push('-ats', args.ats)
  if (args.arr) cliArgs.push('-arr', args.arr)
  if (args.atrails) cliArgs.push('-atrails', args.atrails)
  if (args.afov) cliArgs.push('-afov', args.afov)
  if (args.asteps) cliArgs.push('-asteps', args.asteps)
  if (args.alife) cliArgs.push('-alife', args.alife)
  if (args.alocseed) cliArgs.push('-alocseed', args.alocseed)
  if (args.alocfile) cliArgs.push('-alocfile', args.alocfile)
  if (args.aloc) cliArgs.push('-aloc', args.aloc)
  if (args.ot) cliArgs.push('-ot', args.ot) // graph, gatecounts, trails

  return runCli(depthmapPath, cliArgs)

}

function isovist (args) {

  let cliArgs = ['-s', '-m', 'ISOVIST', '-f', args.f, '-o', args.o]

  if (args.ii) cliArgs.push('-ii', args.ii)
  if (args.if) cliArgs.push('-if', args.if)

  return runCli(depthmapPath, cliArgs)

}

function exportData (args) {

  const cliArgs = ['-m', 'EXPORT', '-f', args.f, '-o', args.o]

  if (args.em) cliArgs.push('-em', args.em) // pointmap-data-csv, pointmap-connections-csv

  return runCli(depthmapPath, cliArgs)

}

function importData (args) {

  const cliArgs = ['-m', 'IMPORT', '-f', args.f, '-o', args.o]

  return runCli(depthmapPath, cliArgs)

}

// helpers

function runCli (cmd, args) {
  return new Promise((resolve, reject) => {

    const ls = spawn(cmd, args, {shell: true})
    let log = ''

    ls.stdout.on('data', data => {
      const entry = removeHelpFromDepthmapLog(`${data}`)
      log += entry
      console.log(`depthmapX: ${entry}`)
    })
    ls.stderr.on('data', data => {
      const entry = removeHelpFromDepthmapLog(`${data}`)
      log += entry
      console.error(chalk.red(`depthmapX error: ${entry}`))
    })
    ls.on('close', code => {
      if (!code) {
        resolve()
      } else {
        console.error(chalk.red(`depthmapX Error: Exited with code ${code}`))
        reject(getLastLine(log))
      }
    })
  })
}

function removeHelpFromDepthmapLog (txt) {
  if (!txt) return ''
  return txt.replace(/(Usage: depthmapXcli.*[^]+)$/g, '')
}

function getLastLine (txt) {
  var l = txt.split('\n')
  return l[ l.length-1 ] !== '' ? l[ l.length-1 ] : l[ l.length-2 ]
}

// expose public methods

module.exports = {
  vga: vga,
  link: link,
  visprep: visprep,
  axial: axial,
  agents: agents,
  isovist: isovist,
  exportData: exportData,
  importData: importData
}