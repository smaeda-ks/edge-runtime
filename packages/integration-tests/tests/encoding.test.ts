import { atob, btoa, TextDecoder } from '@edge-runtime/ponyfill'

test('TextDecoder', () => {
  const input = new Uint8Array([
    101, 100, 103, 101, 45, 112, 105, 110, 103, 46, 118, 101, 114, 99, 101, 108,
    46, 97, 112, 112,
  ])

  const utf8Decoder = new TextDecoder('utf-8', { ignoreBOM: true })
  const output = utf8Decoder.decode(input)
  expect(output).toBe('edge-ping.vercel.app')
})

test('TextDecoder with stream', () => {
  const input = new Uint8Array([
    123, 34, 103, 114, 101, 101, 116, 105, 110, 103, 34, 58, 34, 104, 101, 108,
    108, 111, 34, 125,
  ])

  const textDecoder = new TextDecoder()
  let result = textDecoder.decode(input, { stream: true })

  expect(result).toBe('{"greeting":"hello"}')
})

test('btoa', async () => {
  expect(btoa('Hello, world')).toBe('SGVsbG8sIHdvcmxk')
  expect(btoa(new Uint8Array([1, 2, 3]).toString())).toBe('MSwyLDM=')
  expect(btoa(new Uint8Array([1, 2, 3]))).toBe('MSwyLDM=')
  expect(btoa([1, 2, 3])).toBe('MSwyLDM=')
  expect(btoa(123)).toBe('MTIz')
  expect(btoa('123')).toBe('MTIz')
})

test('atob', async () => {
  expect(atob('SGVsbG8sIHdvcmxk')).toBe('Hello, world')
})
