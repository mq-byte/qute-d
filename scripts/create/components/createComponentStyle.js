const path = require('path')
const { simpleTransform } = require('../../utils')
const chalk = require('chalk')

const createComponentStyle = (componentName, cb) => {
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
      cb()
    }
  )
}
module.exports = {
  createComponentStyle
}
