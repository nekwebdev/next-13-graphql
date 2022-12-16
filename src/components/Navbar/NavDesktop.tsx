// GraphQL queries
import getNavigationData from '@lib/getNavigationData'
// GraphQL types
import {
  ComponentMenuDropdown,
  ComponentMenuLink,
  Maybe,
  NavigationLinksDynamicZone,
} from '@lib/gql/graphql'
import { isLink, isDropdown } from '@lib/typePredicates'
// Components
import { NavDropdown, NavLink } from '@components/Navbar'

const NavDesktop = async () => {
  const navigationData = await getNavigationData()
  return (
    <ul className="sm:flex hidden items-center gap-4">
      {navigationData?.links.map((linkData) =>
        // the navigationData has an array of link elements that can be
        // ComponentMenuDropdown | ComponentMenuLink | Error
        // GraphQL codegen has an alias for that Type, Maybe<NavigationLinksDynamicZone>
        // we then serialize as a specific Type for the child component props
        isLink(linkData as Maybe<NavigationLinksDynamicZone>) ? (
          <li key={(linkData as ComponentMenuLink).id} className="hover:text-secondary">
            <NavLink data={linkData as ComponentMenuLink} />
          </li>
        ) : isDropdown(linkData as Maybe<NavigationLinksDynamicZone>) ? (
          <li key={(linkData as ComponentMenuDropdown).id}>
            <NavDropdown data={linkData as ComponentMenuDropdown} />
          </li>
        ) : null
      )}
    </ul>
  )
}

export default NavDesktop
