import { connect, StringCodec } from 'nats'

const nc = await connect({ servers: '127.0.0.1:4222' })
const sc = StringCodec()

nc.publish('hello', sc.encode('world'))
nc.publish('hello', sc.encode('again'))

setInterval(() => {
  nc.publish('hello', sc.encode(new Date().toISOString()))
}, 2000)
