const eris = require('eris')
const fs = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const client = new eris(process.env["welp_tracker_token"])

let welp = 0

if (fs.existsSync(resolve(".", "counter.txt"))) readFile(resolve(".", "counter.txt"), "utf8").then(countS => {
    const count = +countS
    welp += count
})

client.on("messageCreate", msg => {
    if (msg.content === "welp" && msg.author.id === "234676929263828993") {
        welp++
        writeFile(resolve('.', 'counter.txt'), ""+welp)
    }
    if (msg.content === "!welp") {
        client.createMessage(msg.channel.id, "<@234676929263828993> has said \"welp\" " + welp + " time" + (welp !== 1 ? 's' : ''))
    }
})

client.connect()
