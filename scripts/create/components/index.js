const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { Transform } = require('stream')
const { exec } = require('child_process')

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
        const componentUrl = path.join(
          __dirname,
          `../../../src/components/${componentName}/index.js`
        )
        const componentTempUrl = path.join(
          __dirname,
          '../templates/components/index.js'
        )
        const comTempStream = fs.createReadStream(componentTempUrl)
        const componentStream = fs.createWriteStream(componentUrl)
        const transform = new Transform({
          transform(chunk, encoding, callback) {
            this.push(chunk.toString().replace(/component/g, componentName))
          }
        })

        comTempStream.on('end', (err) => {
          if (err) {
            console.log(chalk.red(`${componentName} 出错了`))
            return
          }
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
              console.log(chalk.blue(`${componentName} 创建完成`))
            }
          )
        })
        comTempStream.pipe(transform).pipe(componentStream)
      })
    } else {
      console.log(chalk.red(`${componentName} 已存在`))
    }
  })
}
