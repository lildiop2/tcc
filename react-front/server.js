import { env } from 'node:process';
import express from 'express';
import serveStatic from 'serve-static';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
    //we are configuring dist to serve site files
app.use('/', serveStatic(join(__dirname, '/dist')))
    // this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
    res.sendFile(join(__dirname, '/dist/index.html'))
})
const port = env.PORT || 3002
app.listen(port)
console.log(`react-front is listening on port: ${port}`)