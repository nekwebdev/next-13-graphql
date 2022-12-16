// GraphQL queries
import getNavigationData from '@lib/getNavigationData'
// GraphQL types
import {
  ComponentMenuDropdown,
  ComponentMenuLink,
  Maybe,
  Navigation,
  NavigationLinksDynamicZone,
} from '@lib/gql/graphql'
import { isLink, isDropdown } from '@lib/typePredicates'
// Components
import { CallToAction, NavDropdown, NavLink } from '@components/Navbar'

const NavDesktop = async () => {
  const navigationData = await getNavigationData()
  return (
    <>
      <CallToAction data={navigationData as Navigation} />
      <ul className="bg-white/90 h-14 pl-4 pr-1 rounded-lg hidden lg:flex mr-10 xl:mr-20 2xl:mr-60 items-center gap-4">
        {navigationData?.links.map((linkData) =>
          // the navigationData has an array of link elements that can be
          // ComponentMenuDropdown | ComponentMenuLink | Error
          // GraphQL codegen has an alias for that Type, Maybe<NavigationLinksDynamicZone>
          // we then serialize as a specific Type for the child component props
          isLink(linkData as Maybe<NavigationLinksDynamicZone>) ? (
            <li key={(linkData as ComponentMenuLink).id}>
              <NavLink data={linkData as ComponentMenuLink} />
            </li>
          ) : isDropdown(linkData as Maybe<NavigationLinksDynamicZone>) ? (
            <li key={(linkData as ComponentMenuDropdown).id}>
              <NavDropdown data={linkData as ComponentMenuDropdown} />
            </li>
          ) : null
        )}
      </ul>
    </>
  )
}

export default NavDesktop
