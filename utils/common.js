const fs = require('fs')
const path = require('path')
const YAML = require('yaml')

exports.readYaml = (dir, file) => {
  const filePath = path.join(dir, file)
  let yaml = {}
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8')
    yaml = YAML.parse(data)
    // console.table(`yaml: ${yaml}`)
  }
  return yaml
}
