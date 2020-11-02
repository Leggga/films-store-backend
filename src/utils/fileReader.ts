import * as fs from 'fs'
import * as readline from 'readline'

export function readTextFile<Model>(filePath: string, mapper: Mapper<Model>): Promise<Model[]> {
  return new Promise(((resolve, reject) => {
    const stream = fs.createReadStream(filePath, {encoding: 'utf-8'})
    stream.on('error', reject)

    const reader = readline.createInterface({input: stream})
    const arr: Model[] = []

    let obj: Model = {} as Model
    let isFinishedObject = false

    reader.on('line', (line) => {
      if (line) {
        //split line
        const delimiterIndex = line.indexOf(':')
        let key = line.substring(0, delimiterIndex).trim()
        let value = line.substring(delimiterIndex + 1).trim()

        const mapped = mapper[key.toLowerCase()]

        if (mapped) {
          obj[mapped.name] = mapped.type ? convertToType(value, mapped.type) : value
        }
      } else {
        if (Object.keys(obj).length) {
          arr.push(obj)
          obj = {} as Model
        }
      }

      isFinishedObject = !line
    })


    reader.on('close', () => {
      if (!isFinishedObject) {
        arr.push(obj)
      }

      return resolve(arr)
    })
  }))
}

export type Mapper<T> = {
  [k: string]: { name: keyof T, type?: 'number' | 'array' }
}

const convertToType = (val: any, type: string) => {
  switch (type) {
    case 'number':
      return +val
    case 'boolean':
      return !!val
    case 'array':
      return val.toString().split(',').map((v: string) => v.trim())
    default:
      return undefined
  }
}