import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'

export const INDEX = Handlebars.compile(
    fs
        .readFileSync(path.join(import.meta.dirname, 'templates', 'index.html'))
        .toString(),
)
export const PUBLIC = path.join(import.meta.dirname, 'public')
