const moment = require('moment')

const validate = (req, mockReq) => {
  let validateRes = true
  Object.keys(mockReq).forEach((key) => {
    mockReq[key].forEach((param) => {
      if (param.require && validateRes) {
        const input = req[key][param.name]
        switch(param.type) {
          case "string":
            validateRes = /^[A-Za-z ]+$/.test(input)
            break
          case "number":
            validateRes = /^\d+$/.test(input)
            break
          case "tel":
            validateRes = /^\+?\d?\d[- ]?\d{3}[- ]?\d{5}$/.test(input)
            break
          case "email":
            validateRes = /\S+@\S+\.\S+/.test(input)
            break
          case "date":
            validateRes = moment(input, param.format, true).isValid()
            break
          default:  // text
            break
        }
      }
    })
  })
  return validateRes
}

const restCallback = (req, res, mockReq, mockRes) => {
  if (validate(req, mockReq)) {
    res.status(mockRes.status)
    res.set(mockRes.headers)
    res.send(mockRes.body)
  } else {
    res.status(400)
    res.send({
      success: false,
      data: {
        msg: "Bad Request"
      }
    })
  }
}

module.exports = {
  restCallback
}