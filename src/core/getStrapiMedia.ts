const mediaAPI = process.env.BASE_API_URL

const getStrapiMedia = (url: string): string => {
  // const { url } = media.data.attributes;
  console.log(url)
  const imageUrl = url?.startsWith('/') ? `${mediaAPI}${url}` : url
  console.log(imageUrl)
  return imageUrl
}

export default getStrapiMedia
