import { createNcpAuthHeaders } from './ncp-auth-signature.js'
import CryptoJS from 'crypto-js'

const NCP_ACCESS_KEY = import.meta.env.VITE_NCP_ACCESS_KEY || 'ncp_iam_BPASKRFK5IhZ3ojh0351'
const NCP_SECRET_KEY =
  import.meta.env.VITE_NCP_SECRET_KEY || 'ncp_iam_BPKSKRRGyPeH3PmVpHGqTzErw29fPjDeFP'
const NCP_REGION = import.meta.env.VITE_NCP_REGION || 'kr-standard'
const ENDPOINT = 'https://kr.object.ncloudstorage.com'

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP Error: ${response.status} - ${errorText}`)
  }
  return response
}

export const putObject = async (bucketName, objectName, file) => {
  const method = 'PUT'
  const url = `${ENDPOINT}/${bucketName}/${objectName}`

  const authHeaders = createNcpAuthHeaders(method, url, NCP_REGION, NCP_ACCESS_KEY, NCP_SECRET_KEY)

  const response = await fetch(url, {
    method: method,
    headers: {
      ...authHeaders,
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  })

  await handleResponse(response)
  return url
}

export const getObject = async (bucketName, objectName) => {
  const method = 'GET'
  const url = `${ENDPOINT}/${bucketName}/${objectName}`

  const authHeaders = createNcpAuthHeaders(method, url, NCP_REGION, NCP_ACCESS_KEY, NCP_SECRET_KEY)

  const response = await fetch(url, {
    method: method,
    headers: authHeaders,
  })

  const finalResponse = await handleResponse(response)
  return await finalResponse.blob()
}

/**
 * 서명된 URL 생성 (CORS 우회용)
 */
export const createSignedUrl = (bucketName, objectName, expiresIn = 3600) => {
  const method = 'GET'
  const url = `${ENDPOINT}/${bucketName}/${objectName}`

  // 현재 시간
  const now = new Date()
  const timestamp = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const datestamp = timestamp.substring(0, 8)

  // 서명된 URL용 쿼리 파라미터
  const params = new URLSearchParams()
  params.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256')
  params.set('X-Amz-Credential', `${NCP_ACCESS_KEY}/${datestamp}/${NCP_REGION}/s3/aws4_request`)
  params.set('X-Amz-Date', timestamp)
  params.set('X-Amz-Expires', expiresIn.toString())
  params.set('X-Amz-SignedHeaders', 'host')

  // 서명 생성
  const canonicalRequest = [
    method,
    `/${bucketName}/${objectName}`,
    params.toString(),
    `host:${new URL(ENDPOINT).host}\n`,
    'host',
    'UNSIGNED-PAYLOAD',
  ].join('\n')

  const scope = `${datestamp}/${NCP_REGION}/s3/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    timestamp,
    scope,
    CryptoJS.SHA256(canonicalRequest).toString(),
  ].join('\n')

  // 키 생성
  const kSecret = CryptoJS.HmacSHA256(datestamp, 'AWS4' + NCP_SECRET_KEY)
  const kDate = CryptoJS.HmacSHA256(NCP_REGION, kSecret)
  const kRegion = CryptoJS.HmacSHA256('s3', kDate)
  const kService = CryptoJS.HmacSHA256('aws4_request', kRegion)
  const signingKey = kService

  const signature = CryptoJS.HmacSHA256(stringToSign, signingKey).toString()
  params.set('X-Amz-Signature', signature)

  return `${url}?${params.toString()}`
}

export const listObjects = async (bucketName, queryString = '') => {
  const method = 'GET'
  const url = `${ENDPOINT}/${bucketName}/?${queryString}`

  const authHeaders = createNcpAuthHeaders(method, url, NCP_REGION, NCP_ACCESS_KEY, NCP_SECRET_KEY)

  const response = await fetch(url, {
    method: method,
    headers: authHeaders,
  })

  const finalResponse = await handleResponse(response)
  return await finalResponse.text()
}
