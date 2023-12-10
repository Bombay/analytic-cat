import crypto from 'crypto'
import { v4, v5 } from 'uuid'

function hash(input: string) {
  const hash = crypto.createHash('sha512')
  hash.update(input)
  return hash.digest('hex')
}

export function uuid(input?: string) {
  if (!input) {
    return v4()
  }

  return v5(hash(input), v5.DNS)
}
