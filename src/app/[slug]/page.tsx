// GraphQL queries
import getPageData from '@lib/getPageData'
import Markdown from 'markdown-to-jsx'

// set props type
type Props = {
  params: {
    slug: string
  }
}

// use https://tailwindcss.com/docs/typography-plugin to style the markdown
const Page = async ({ params }: Props) => {
  const pageData = await getPageData(params.slug)
  return pageData ? (
    <div className="flex justify-center">
      <article className="prose lg:prose-xl prose-zinc dark:prose-invert">
        <Markdown>
          {pageData[0].attributes?.content ? pageData[0].attributes?.content : ''}
        </Markdown>
      </article>
    </div>
  ) : (
    <div />
  )
}

export default Page
