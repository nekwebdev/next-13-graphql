// React / Next modules
import Image from 'next/image'
import { Suspense } from 'react'
// GraphQL queries
import getNavigationData from '@lib/getNavigationData'
// Core utilities
import getStrapiMedia from '@core/getStrapiMedia'
// Components
import { NavDesktop, NavMobile } from '@components/Navbar'
import { Navigation } from '@lib/gql/graphql'

const Navbar = async () => {
  // deduped call from Server Component to the graphql api to get our navbar logo
  const navigationData = await getNavigationData()
  return (
    <nav className="w-full bg-white text-black flex items-center font-poppins font-medium justify-around">
      <div className="flex p-1 w-full sm:w-auto justify-between">
        <Suspense fallback={<p>Loading data...</p>}>
          <Image
            className="pr-4"
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
          {/* Navigation */}
          {/* @ts-expect-error Server Component */}
          <NavDesktop />
          <NavMobile data={navigationData as Navigation} />
        </Suspense>
      </div>
    </nav>
  )
}

export default Navbar
