import { imageCompress } from './image-compress'

export async function filterFormData(form: FormData) {
  const newFormData = new FormData()

  let hasIdField = false

  for (const [key, value] of form.entries()) {
    if (key === 'id') {
      hasIdField = true
    }

    if (
      (value instanceof File && value.size > 0) ||
      (typeof value === 'string' && value.trim() !== '')
    ) {
      if (value instanceof File && value.type.startsWith('image/')) {
        newFormData.append(key, await imageCompress(value))
      } else {
        newFormData.append(key, value)
      }
    }
  }

  if (hasIdField) {
    newFormData.append('_method', 'PUT')
  }

  return newFormData
}
