const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('child_process')
const { createComponent } = require('./createComponent')
const { createComponentStyle } = require('./createComponentStyle')

module.exports = (name) => {
  fs.readdir(path.join(__dirname, '../../../src/components'), (err, files) => {
    if (err) {
      return
    }
    const componentName =
      name.slice(0, 1).toUpperCase() + name.slice(1, name.length)
    if (files.indexOf(componentName) === -1) {
      const componentDir = path.join(
        __dirname,
        `../../../src/components/${componentName}`
      )
      fs.mkdir(componentDir, (err) => {
        if (err) {
          return
        }
        let index = 2
        const apendRouter = () => {
          const componentExportUrl = path.join(
            __dirname,
            '../../../src/index.js'
          )

          fs.appendFile(
            componentExportUrl,
            `export { default as ${componentName} } from './components/${componentName}'\n`,
            (err) => {
              if (err) throw err
              exec('git add .', {
                cwd: path.join(__dirname, '../../')
              })
              console.log(chalk.blue(`${componentName} 导出完成`))
            }
          )
        }
        createComponent(componentName, () => {
          index--
          if (index === 0) {
            apendRouter()
          }
        })
        createComponentStyle(componentName, () => {
          index--
          if (index === 0) {
            apendRouter()
          }
        })
      })
    } else {
      console.log(chalk.red(`${componentName} 已存在`))
    }
  })
}
