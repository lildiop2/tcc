import { env } from 'node:process';
import express from'express';
import serveStatic from'serve-static';
import {join,dirname} from 'path'
import { fileURLToPath } from 'url';
import morgan  from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()

app.use(morgan('dev'));
//remove cache
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.header('Surrogate-Control', 'no-store');
    next()
});
    //we are configuring dist to serve site files
app.use('/', serveStatic(join(__dirname, '/dist')))
    // this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
    res.sendFile(join(__dirname, '/dist','index.html'))
})
const port = env.PORT || 3002
app.listen(port)
console.log(`react-front is listening on port: ${port}`)