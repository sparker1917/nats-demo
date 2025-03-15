import { connect, StringCodec } from 'nats'

const nc = await connect({ servers: '127.0.0.1:4222' })
const sc = StringCodec()

const sub = nc.subscribe('hello')

const listen = async () => {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`)
  }
}

await listen()

await nc.closed()
console.log('subcription closed')
