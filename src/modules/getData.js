import { readFile, writeFile } from 'node:fs/promises'

export const getData = async (path) => {
  const err_msg = `Couldn't open or create the ${path} file`

  let data
  try {
    data = await readFile(path, 'utf-8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      try {
        await writeFile(path, '[]')
      } catch {
        console.error(err_msg)
        return
      }
      data = await readFile(path, 'utf-8')
    } else {
      console.error(err_msg)
    }
  }
  return data
}
