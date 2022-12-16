// React / Next modules
import Image from 'next/image'
import { Suspense } from 'react'
// GraphQL queries
import getNavigationData from '@lib/getNavigationData'
// GraphQL types
import { Navigation } from '@lib/gql/graphql'
// Core utilities
import getStrapiMedia from '@core/getStrapiMedia'
// Components
import { NavDesktop, NavMobile } from '@components/Navbar'

const Navbar = async () => {
  // deduped call from Server Component to the graphql api to get our navbar logo
  const navigationData = await getNavigationData()
  return (
    <Suspense fallback={<p>Loading data...</p>}>
      <nav className="w-full z-40 fixed text-black flex items-center font-medium justify-between pt-[2vh]">
        <div className="flex bg-white rounded-lg p-1 h-14 ml-4 sm:ml-10 xl:ml-20 2xl:ml-60">
          <Image
            src={
              navigationData?.logo?.data?.attributes?.url
                ? getStrapiMedia(navigationData.logo.data.attributes.url)
                : ''
            }
            alt={
              navigationData?.logo?.data?.attributes?.alternativeText
                ? navigationData.logo.data.attributes.alternativeText
                : ''
            }
            width={
              navigationData?.logo?.data?.attributes?.width
                ? navigationData.logo.data.attributes.width
                : undefined
            }
            height={
              navigationData?.logo?.data?.attributes?.height
                ? navigationData.logo.data.attributes.height
                : undefined
            }
          />
        </div>
        {/* Navigation */}
        {/* @ts-expect-error Server Component */}
        <NavDesktop />
        <NavMobile data={navigationData as Navigation} />
      </nav>
    </Suspense>
  )
}

export default Navbar
