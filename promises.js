const https = require("https")

async function getDogBreeds() {
  let data = ""
  const resolvedData = new Promise((resolve, reject) => {
    https.get("https://dog.ceo/api/breeds/list/all", (resp) => {
      resp.on('data', (d) => {
        console.log("Getting dog breeds")
        data += d
      })
      resp.on("end", () => {
        resolve(JSON.parse(data))
      })
    })
    .on("error", (err) => {
      console.log("Error: " + err.message)
    })
  }) 
  return resolvedData
}

async function triggerGetDogBreeds() {
  getDogBreeds().then((d) => {
    console.log("Got dog breeds")
  })
  //await getDogBreeds()
  //console.log("Got dog breeds")
}

function triggerPromises() {
  triggerGetDogBreeds().finally(() => {
    console.log("all promises settled")
  })
}

triggerPromises()
