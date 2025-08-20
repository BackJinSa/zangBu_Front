import JSEncrypt from 'jsencrypt'

// 공개키는 백엔드에서 내려주는 걸 세션에 저장해두거나
// 환경변수에 넣어둘 수도 있음
const PUBLIC_KEY =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAysdIHNsqu3omk2Hh7fPCsPoimxl2AAWNOVEo3Xln4bLNixI4b99/T/sP3f+fBcjXnTnzzD+Pk3t+Q2V5Xj4LYTz1Mj0ubsteg2NHN1qkPrNmpo+A6L08m2hpZ+RZ8mdnyx7UgAJHQowEgbUeZ8x7Gvkc2qFEuJDMMaD4GVbhvhn0fzYxX22PtPEevB4m0G+aVW+u5Od9x8h/tNnIfY5vCQ/+2I/yB9b0ulC2t6gQp6fIqXQ3X1NmD3/beVJiIvOAMCE/x1XJ2t6Nq2um7IwO7k0eIUpw8jr9n5rougUBhuLy64gerEgbfyG0wnXzQsu3Sm16073fJpuYB8t6tG0AvQIDAQAB'
export function encryptRsa(text) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY)
  return encryptor.encrypt(text)
}
