// GraphQL queries
import getPageData from '@lib/getPageData'

// set props type
type Props = {
  params: {
    slug: string
  }
}

const Page = async ({ params }: Props) => {
  const pageData = await getPageData(params.slug)
  return pageData ? <div>{pageData[0].attributes?.content}</div> : <div />
}

export default Page
