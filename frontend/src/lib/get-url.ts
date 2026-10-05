export function getUrl(path?: string) {
  const baseUrl = process.env.AUTH_TRUST_HOST || ''
  const normalizedPath = path && !path.startsWith('/') ? `/${path}` : path || ''
  return `${baseUrl}${normalizedPath}`
}
