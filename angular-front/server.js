const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
const morgan = require('morgan');
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
app.use('/', serveStatic(path.join(__dirname, '/dist')))
    // this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})
const port = process.env.PORT || 3001
app.listen(port)
console.log(`angular-front is listening on port: ${port}`)
