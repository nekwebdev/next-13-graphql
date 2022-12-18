// GraphQL queries
import getPageData from '@lib/getPageData'
import getRedirectsData from '@lib/getRedirectsData'
import Markdown from 'markdown-to-jsx'
import { redirect } from 'next/navigation'

// set props type
type Props = {
  params: {
    slug: string
  }
}

const Page = async ({ params }: Props) => {
  // check for redirects before rendering the page for the given slug
  // const redirects = await getRedirectsData()
  // if (redirects) {
  //   for (let index = 0; index < redirects.length; index++) {
  //     params.slug == redirects[index].attributes?.source
  //       ? redirect(redirects[index].attributes?.destination ?? '')
  //       : null
  //   }
  // }
  // get our page data from the slug
  const pageData = await getPageData(params.slug)
  // use https://github.com/probablyup/markdown-to-jsx &
  // https://tailwindcss.com/docs/typography-plugin to style the markdown
  return pageData ? (
    <div className="flex flex-col mt-6">
      <div className="text-4xl lg:text-6xl font-extrabold text-center">
        <h1>{pageData[0].attributes?.title}</h1>
      </div>
      <div className="flex justify-center px-4">
        <article className="prose lg:prose-xl prose-zinc dark:prose-invert justify-center">
          <Markdown>{pageData[0].attributes?.content ?? ''}</Markdown>
        </article>
      </div>
    </div>
  ) : (
    <div />
  )
}

export default Page
