const eris = require('eris')
const fs = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const client = new eris(process.env["welp_tracker_token"])

let welps = {
    // userid: times
}

if (fs.existsSync(resolve(".", "welp.json"))) readFile(resolve(".", "welp.json"), "utf8").then(JSON.parse).then(welp => {
    Object.getOwnPropertyNames(welp).forEach(id => {
        if (id in welps) welps[id] += welp[id]
        else welps[id] = welp[id]
    })
})

client.on("messageCreate", msg => {
    if (msg.content === "welp" && msg.author.id in welps) {
        welps[msg.author.id]++
        writeFile(resolve('.', 'welp.json'), JSON.stringify(welps), "utf-8")
    }
    if (msg.content === "!welp") {
        client.createMessage(msg.channel.id, msg.author.mention + " has said \"welp\" " + welp + " time" + (welp !== 1 ? 's' : ''))
    }
})

client.connect()
