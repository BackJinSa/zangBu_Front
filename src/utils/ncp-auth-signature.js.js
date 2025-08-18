import CryptoJS from 'crypto-js'

const hash = (text) => {
  return CryptoJS.SHA256(text).toString()
}

export const createNcpAuthHeaders = (
  method,
  urlString,
  regionName,
  accessKey,
  secretKey,
  headers = {}
) => {
  const SERVICE_NAME = 's3'
  const AWS_ALGORITHM = 'AWS4-HMAC-SHA-256'
  const REQUEST_TYPE = 'aws4_request'
  const UNSIGNED_PAYLOAD = 'UNSIGNED-PAYLOAD'

  const now = new Date()
  const timestamp = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const datestamp = timestamp.substring(0, 8)

  const url = new URL(urlString)
  const canonicalUri = url.pathname

  const searchParams = new URLSearchParams(url.search)
  searchParams.sort()
  const standardizedQueryParameters = searchParams.toString()

  const requestHeaders = {
    host: url.host,
    'x-amz-date': timestamp,
    'x-amz-content-sha256': UNSIGNED_PAYLOAD,
    ...headers,
  }

  const sortedHeaderKeys = Object.keys(requestHeaders)
    .map((k) => k.toLowerCase())
    .sort()

  const standardizedHeaders =
    sortedHeaderKeys
      .map(
        (key) =>
          `${key}:${
            requestHeaders[Object.keys(requestHeaders).find((k) => k.toLowerCase() === key)]
          }`
      )
      .join('\n') + '\n'

  const signedHeaders = sortedHeaderKeys.join(';')

  const canonicalRequest = [
    method.toUpperCase(),
    canonicalUri,
    standardizedQueryParameters,
    standardizedHeaders,
    signedHeaders,
    UNSIGNED_PAYLOAD,
  ].join('\n')

  const scope = `${datestamp}/${regionName}/${SERVICE_NAME}/${REQUEST_TYPE}`
  const hashedCanonicalRequest = hash(canonicalRequest)

  const stringToSign = [AWS_ALGORITHM, timestamp, scope, hashedCanonicalRequest].join('\n')

  // AWS Signature V4 키 생성 과정 (Java 코드와 동일)
  const kSecret = CryptoJS.HmacSHA256(datestamp, 'AWS4' + secretKey)
  const kDate = CryptoJS.HmacSHA256(regionName, kSecret)
  const kRegion = CryptoJS.HmacSHA256(SERVICE_NAME, kDate)
  const kService = CryptoJS.HmacSHA256(REQUEST_TYPE, kRegion)
  const signingKey = kService

  const signature = CryptoJS.HmacSHA256(stringToSign, signingKey).toString()

  const credential = `Credential=${accessKey}/${scope}`
  const signedHeadersPart = `SignedHeaders=${signedHeaders}`
  const signaturePart = `Signature=${signature}`

  const authorization = `${AWS_ALGORITHM} ${credential}, ${signedHeadersPart}, ${signaturePart}`

  // 디버깅을 위한 로그
  console.log('NCP Auth Headers:', {
    Authorization: authorization,
    'X-Amz-Date': timestamp,
    'X-Amz-Content-Sha256': UNSIGNED_PAYLOAD,
  })

  return {
    Authorization: authorization,
    'X-Amz-Date': timestamp,
    'X-Amz-Content-Sha256': UNSIGNED_PAYLOAD,
  }
}
