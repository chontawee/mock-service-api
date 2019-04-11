const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const helper = require('./helper')

const start = (rootDirPath, port=3000) => {
  const app = express()

  // set bodyparser
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  fs.readdir(rootDirPath, (errRootDir, subDir) => {
    subDir.forEach((dir) => {
      fs.readdir(`${rootDirPath}/${dir}`, (errSubDir, files) => {
        files.forEach((file) => {
          const { mockPath, mockRequest, mockResponse } = require(`${rootDirPath}/${dir}/${file}`)
          switch(mockPath.method) {
            case "GET":
              app.get(`/${dir}/${mockPath.path}`, (req, res) => helper.restCallback(req, res, mockRequest, mockResponse))
              break
            case "POST":
              app.post(`/${dir}/${mockPath.path}`, (req, res) => helper.restCallback(req, res, mockRequest, mockResponse))
              break
            case "PUT":
              app.put(`/${dir}/${mockPath.path}`, (req, res) => helper.restCallback(req, res, mockRequest, mockResponse))
              break
            case "DELETE":
              app.delete(`/${dir}/${mockPath.path}`, (req, res) => helper.restCallback(req, res, mockRequest, mockResponse))
              break
            default:
              break
          }
        })
      })
    })
  })
  app.listen(port, () => console.log(`Mock Server start on port ${port}!`))  
}

module.exports = {
  start
}