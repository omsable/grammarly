#!/usr/bin/env node

const { correct, plagiarism, Grammarly } = require('@stewartmcgown/grammarly-api')

const Koa = require('koa')
const router = require('koa-router')()
const body = require('koa-json-body')

const app = new Koa()
const port = 8080

router.post('/', async (ctx, next) => {
  const { text = '' } = ctx.request.body

  const client = await new Grammarly()
  const results = await client.analyse(text).then(correct)

  ctx.body = {
    results
  }
})

router.get('/health', ctx => {
  ctx.body = 'OK'
})

app.use(body())
app.use(router.routes())
app.listen(port)
console.log(`Listening on localhost:${port}`)
