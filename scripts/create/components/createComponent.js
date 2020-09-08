const path = require('path')
const { simpleTransform } = require('../../utils')
const chalk = require('chalk')

const createComponent = (componentName, cb) => {
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
      cb()
    }
  )
}
module.exports = {
  createComponent
}
