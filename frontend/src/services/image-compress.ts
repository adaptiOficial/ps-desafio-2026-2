import imageCompression from 'browser-image-compression'

async function imageCompress(image: File): Promise<File> {
  const imageFile = image

  const options = {
    maxSizeMB: 2,
    maxWidthOrHeight: 1920,
  }

  if (image.size / 1024 / 1024 > options.maxSizeMB) {
    try {
      const compressedFile = await imageCompression(imageFile, options)
      return new File([compressedFile], image.name)
    } catch (error) {}
  }

  return image
}

export { imageCompress }
