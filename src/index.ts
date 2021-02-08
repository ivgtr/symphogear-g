import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import envPaths from 'env-paths'
import execa from 'execa'
import axios from 'axios'
import makeDir from 'make-dir'
import isUrl from 'is-url-superb'
import findExec from 'find-exec'

const paths = envPaths('symphogear')

const PLAYERS = ['mplayer', 'afplay', 'mpg123', 'mpg321', 'play', 'omxplayer', 'aplay', 'cmdmp3']

function findPlayer(player?: string) {
  if (player && PLAYERS.includes(player)) {
    return player
  }
  const execPlayer: string | null = findExec(PLAYERS)
  if (execPlayer === null) {
    throw new Error("Couldn't find a suitable audio playe")
  }
  return execPlayer
}

function toHash(file: string) {
  const shasum = crypto.createHash('sha1')
  shasum.update(file)
  return shasum.digest('hex')
}

async function fetchFile(file: string) {
  if (!isUrl(file)) {
    return file
  }

  const filePath = path.resolve(paths.cache, toHash(file))

  if (fs.existsSync(filePath)) {
    return filePath
  }

  await makeDir(path.dirname(filePath))

  await axios({
    method: 'get',
    url: file,
    responseType: 'stream'
  })
    .then(function (response) {
      response.data.pipe(fs.createWriteStream(filePath))
    })
    .catch(() => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {})
      }
    })

  return filePath
}

const symphogear = async (file: string, opts: { player?: string } = {}) => {
  if (typeof file !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof file}`)
  }
  const player = findPlayer(opts.player)
  const result = await execa(player, [await fetchFile(file)])
  return result
}

export default symphogear
