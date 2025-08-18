import JSEncrypt from 'jsencrypt'

// 공개키는 백엔드에서 내려주는 걸 세션에 저장해두거나
// 환경변수에 넣어둘 수도 있음
const PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAglHMRpu5fbFGmjpOvE1dC5tq5beBNwLq9MwcU6majRhxyhgtbVSkz8QL7VIU/I2pMEldc/n0PQ+w7oMXpuFNVvk1odJz7BeBursGjKDT9ayRy56+EFlfQBLxbp4dSeyjZTmTzlV+4mce5LcT+S+Xc/rNqA6l8gQK76tcnbA+csTJxq3G5Vp9cwkZ7mqSAV7Cf1bnY3zLB+OImA8wKV5JqD2cY37v+7wk9V7/q9BQ4zVtek9/uvcZalChY7GXrX71KXjhg1UJ5QR0NaV3m+8Evcgfr4kRAqKpceH7Co7JneK0GHuz/STvgfrArKzvtLO2qZM1Iup3HOvwSPvSWlQ7gwIDAQAB"

export function encryptRsa(text) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY)
  return encryptor.encrypt(text)
}
