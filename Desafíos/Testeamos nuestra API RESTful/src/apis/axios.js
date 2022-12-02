const axios = require("axios")

const axiosGET = async URL => {
  return await axios.get(URL)
}

const axiosPOST = async (URL, data) => {
  return await axios.post(URL, data)
}

const axiosPUT = async (URL, data) => {
  return await axios.put(URL, data)
}

const axiosDELETE = async (URL, data) => {
  return await axios.delete(URL, { data })
}

module.exports = { axiosGET, axiosPOST, axiosPUT, axiosDELETE }
