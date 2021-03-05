const https = require("https")

async function requestPromise() {
  let data = ""
  const resolvedData = new Promise((resolve, reject) => {
    https.get("https://dog.ceo/api/breeds/list/all", (resp) => {
      resp.on('data', (d) => {
        data += d
      })
      resp.on("end", () => {
        console.log("requestPromise settled")
        resolve(JSON.parse(data))
      })
    })
    .on("error", (err) => {
      console.log("Error: " + err.message)
    })
  }) 
  return resolvedData
}

async function triggerRequestPromise() {
  requestPromise().then((d) => {
    console.log("triggerRequestPromise settled")
  })
}

function triggerPromises() {
  triggerRequestPromise().finally(() => {
    console.log("all promises settled")
  })
}

triggerPromises()
