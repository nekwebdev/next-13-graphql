// GraphQL queries
import getGlobalData from '@lib/getGlobalData'
// Core utilities
import getStrapiMedia from '@core/getStrapiMedia'

const DefaultTags = async () => {
  const globalData = await getGlobalData()
  return (
    <>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link
        rel="icon"
        href={
          globalData?.favicon?.data?.attributes?.url
            ? getStrapiMedia(globalData.favicon.data.attributes.url)
            : ''
        }
      />
    </>
  )
}

export default DefaultTags
