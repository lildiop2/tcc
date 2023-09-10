const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
    //we are configuring dist to serve site files
app.use('/', serveStatic(path.join(__dirname, '/dist')))
    // this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})
const port = process.env.PORT || 5173
app.listen(port)
console.log(`vue-front is listening on port: ${port}`)