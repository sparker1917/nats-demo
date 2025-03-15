import { connect, StringCodec } from 'nats'
import dotenv from 'dotenv'
import emailjs from '@emailjs/nodejs'

dotenv.config()

emailjs.init({
  publicKey: process.env.EJS_PUBLIC_KEY,
  privateKey: process.env.EJS_PRIVATE_KEY, // optional, highly recommended for security reasons
})

const nc = await connect({ servers: process.env.NATS_URL })
const sc = StringCodec()

const sub = nc.subscribe('activity.created')

const listen = async () => {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`)
    try {
      const data = JSON.parse(sc.decode(m.data))
      console.log('Sending email...', data)
      await emailjs.send(
        process.env.EJS_SERVICE_ID,
        process.env.EJS_TEMPLATE_ID,
        { ...data, recipientEmail: process.env.RECIPIENT_EMAIL },
      )
      console.log('SUCCESS')
    } catch (e) {
      console.error('FAILED: ', e)
    } finally {
      nc.publish(
        'activity.created.done',
        sc.encode({ id: sc.decode(m.data).id }),
      )
    }
  }
}

await listen()

await nc.closed()

console.log('subcription closed')
