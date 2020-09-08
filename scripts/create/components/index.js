const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('child_process')
const { simpleTransform } = require('../../utils')

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
        const componentUrl = path.join(
          __dirname,
          `../../../src/components/${componentName}/index.js`
        )
        const componentTempUrl = path.join(
          __dirname,
          '../templates/components/index.js'
        )
        simpleTransform(
          componentTempUrl,
          componentUrl,
          function (chunk, encoding, callback) {
            this.push(chunk.toString().replace(/component/g, componentName))
          },
          (err) => {
            if (err) {
              console.log(chalk.red(`${componentName} 出错了`))
              return
            }
            console.log(chalk.blue(`${componentName} 创建完成`))
            index--
            if (index === 0) {
              apendRouter()
            }
          }
        )
        const styleUrl = path.join(
          __dirname,
          `../../../src/components/${componentName}/styles.module.css`
        )
        const styleTempUrl = path.join(
          __dirname,
          '../templates/components/styles.module.css'
        )
        simpleTransform(
          styleTempUrl,
          styleUrl,
          function (chunk, encoding, callback) {
            this.push(chunk.toString().replace(/component/g, componentName))
          },
          (err) => {
            if (err) {
              console.log(chalk.red(`${componentName} 出错了`))
              return
            }
            console.log(chalk.blue(`${componentName} style 创建完成`))
            index--
            if (index === 0) {
              apendRouter()
            }
          }
        )
      })
    } else {
      console.log(chalk.red(`${componentName} 已存在`))
    }
  })
}
