// GraphQL queries
import getGlobalData from '@lib/getGlobalData'
// Core utilities
import getStrapiMedia from '@core/getStrapiMedia'

const Head = async () => {
  const globalData = await getGlobalData()
  return (
    <>
      <title>{globalData?.siteName}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={globalData?.seo.metaDescription} />
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

export default Head
