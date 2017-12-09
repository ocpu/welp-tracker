const client = require('eris')(process.env.WELP_TRACKER_TOKEN)
const redis = require('ioredis')(process.env.REDIS_HOST)

client.on('messageCreate', async msg => {
  if (msg.content.startsWith('!welp')) {
    const welps = await redis.get(msg.author.id) || 0
    return client.createMessage(msg.channel.id, `${msg.author.mention} has said welp ${welps} time${welps !== 1 ? 's' : ''}.`)
  }
  if (/\bwelp\b/.test(msg.content)) {
    let counter = 0
    for (const exp = /\bwelp\b/g; exp.exec(msg.content) !== null; counter++);
    redis.incrby(msg.author.id, counter)
  }
})

client.connect()
