import { readFile, writeFile } from 'node:fs/promises'

export const getData = async (path) => {
  const err_msg = `Couldn't open or create the ${path} file`

  // Try to get the data from a .json file
  let data
  try {
    data = await readFile(path, 'utf-8')
  } catch (err) {
    // Create the .json file if it doesn't exists
    if (err.code === 'ENOENT') {
      try {
        await writeFile(path, '[]')
      } catch {
        console.error(err_msg)
        return
      }
      // Get the data from the newly created file
      data = await readFile(path, 'utf-8')
    } else {
      console.error(err_msg)
    }
  }
  return data
}
