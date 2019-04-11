const faker = require('faker')

const mockPath = {
  path: "",
  method: "POST"
}

const mockRequest = {
  query: [],
  params: [],
  body: [
    {
      name: "name",
      type: "string",
      require: true,
      desc: "Enter string",
      example: "Hedwick"
    },
    {
      name: "owner",
      type: "string",
      require: true,
      desc: "Enter string",
      example: "Harry Potter"
    },
    {
      name: "birthday",
      type: "date",
      format: "YYYY-MM-DD",
      require: true,
      desc: "Enter date",
      example: "2019-01-01"
    }
  ]
}

const mockResponse = {
  status: 200,
  headers: {
    "Content-Type": "application/json"
  },
  body: {
    success: true,
    data: {
      petId: faker.random.number()
    }
  }
}

module.exports = {
  mockPath,
  mockRequest,
  mockResponse
};