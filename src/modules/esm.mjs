import { readFile } from 'fs/promises'
import { sep, dirname } from 'path'
import { release, version } from 'os'
import { createServer as createServerHttp } from 'http'
import { fileURLToPath } from 'url'
import './files/c.js'

const random = Math.random()

let unknownObject

if (random > 0.5) {
  unknownObject = await readFile('src/modules/files/a.json')
} else {
  unknownObject = await readFile('src/modules/files/b.json')
}

console.log(`Release ${release()}`)
console.log(`Version ${version()}`)
console.log(`Path segment separator is "${sep}"`)

console.log(`Path to current file is ${fileURLToPath(import.meta.url)}`)
console.log(`Path to current directory is ${dirname(fileURLToPath(import.meta.url))}`)

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted')
})

const PORT = 3000

console.log(JSON.parse(unknownObject))

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  console.log('To terminate it, use Ctrl+C combination')
})

export default {
  unknownObject,
  myServer,
}