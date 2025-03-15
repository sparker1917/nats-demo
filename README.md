# NATS Demo

A demo of NATS subsscription and publishing, using [nats.js](https://www.npmjs.com/package/nats)

## Use

1. Add `.env` file with the following properties:

```
EJS_PUBLIC_KEY=key
EJS_PRIVATE_KEY=key
EJS_SERVICE_ID=service_id
EJS_TEMPLATE_ID=template_id

RECIPIENT_EMAIL=you@gmail.com

NATS_URL=127.0.0.1:4222
```

2. Run `pnpm install`
3. Run `pnpm start:activity`
