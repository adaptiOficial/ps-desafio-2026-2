const phoneReplace = (value: string) => {
  if (!value) return ''
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, '($1) $2')
  value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  return value.substring(0, 15)
}

const whatsAppUrlReplace = (cellphone: string) => {
  if (!cellphone) return ''
  const clearNumber = `55${cellphone.replace(/\D/g, '')}`
  const whatsappUrl = `${process.env.NEXT_PUBLIC_WHATSAPP_URL}/${clearNumber}`
  return whatsappUrl
}

export { phoneReplace, whatsAppUrlReplace }
