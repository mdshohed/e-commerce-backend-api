yarn add express
yarn add -D typescript #default => npm i -g typescript  
tsc --init #setup-file ->, rootDir='./src', outDir='./dist'
yarn add -D @types/node
yarn add -D @types/express
npm i cors
npm i dotenv

import express, { Request, Response } from 'express';
const app = express()
const port = 3000
app.get('/', (req: Request, res: Response) => {
res.send('Hello World!')
})
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

after setup run ts file. the command is:
`tsc`

run ts and js file:
`tsc -w` and `nodemon ./dist/app.jss`
or we can use:
"start:prod": "node ./dist/server.js",
"start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
