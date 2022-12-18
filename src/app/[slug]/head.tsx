// GraphQL queries
import getPageData from '@lib/getPageData'
// Components
import DefaultTags from '@components/DefaultTags'

// set props type
type Props = {
  params: {
    slug: string
  }
}

const Head = async ({ params }: Props) => {
  const pageData = await getPageData(params.slug)
  return pageData ? (
    <>
      {/* @ts-expect-error Server Component */}
      <DefaultTags />
      <title>{pageData[0].attributes?.seo.metaTitle}</title>
      <meta name="description" content={pageData[0].attributes?.seo.metaDescription} />
      <meta name="keywords" content={pageData[0].attributes?.seo.metaKeywords} />
    </>
  ) : (
    <></>
  )
}

export default Head
