const getStrapiMedia = (url: string): string => {
  const imageUrl = url?.startsWith('/')
    ? `${process.env.BASE_API_URL}${url}`
    : url
  return imageUrl
}

export default getStrapiMedia
