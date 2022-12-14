// GraphQL queries
import getGlobalData from '@lib/getGlobalData'
// Components
import DefaultTags from '@components/DefaultTags'

const Head = async () => {
  const globalData = await getGlobalData()
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <DefaultTags />
      <title>{globalData?.siteName}</title>
      <meta name="description" content={globalData?.seo.metaDescription} />
      <meta name="keywords" content={globalData?.seo.metaKeywords} />
    </>
  )
}

export default Head
