// GraphQL queries
import getPageData from '@lib/getPageData'
import Markdown from 'markdown-to-jsx'
import { redirect } from 'next/navigation'

// set props type
type Props = {
  params: {
    slug: string
  }
}

// use https://tailwindcss.com/docs/typography-plugin to style the markdown
const Page = async ({ params }: Props) => {
  params.slug == 'acceuil' ? redirect('/') : null
  const pageData = await getPageData(params.slug)
  return pageData ? (
    <div className="flex flex-col mt-6">
      <div className="text-4xl lg:text-6xl font-extrabold text-center">
        <h1>{pageData[0].attributes?.title}</h1>
      </div>
      <div className="flex justify-center px-4">
        <article className="prose lg:prose-xl prose-zinc dark:prose-invert justify-center">
          <Markdown>
            {pageData[0].attributes?.content ? pageData[0].attributes?.content : ''}
          </Markdown>
        </article>
      </div>
    </div>
  ) : (
    <div />
  )
}

export default Page
