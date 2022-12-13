// GraphQL queries
import getNavigationData from '@lib/getNavigationData'
// GraphQL types
import {
  ComponentMenuDropdown,
  ComponentMenuLink,
  Maybe,
  NavigationLinksDynamicZone,
} from '@lib/gql/graphql'
// Components
import { NavDropdown, NavLink } from '@components/Navbar'

// type predicates
const isLink = (
  entry: Maybe<NavigationLinksDynamicZone>
): entry is ComponentMenuLink => {
  return (entry as ComponentMenuLink).style !== undefined
}

const isDropdown = (
  entry: Maybe<NavigationLinksDynamicZone>
): entry is ComponentMenuDropdown => {
  return (entry as ComponentMenuDropdown).sections !== undefined
}

const NavDesktop = async () => {
  const navigationData = await getNavigationData()
  return (
    <div className="sm:flex hidden items-center gap-4">
      {navigationData?.links.map((linkData) =>
        // the navigationData has an array of link elements that can be
        // ComponentMenuDropdown | ComponentMenuLink | Error
        // GraphQL codegen has an alias for that Type, Maybe<NavigationLinksDynamicZone>
        // we then serialize as a specific Type for the child component props
        isLink(linkData as Maybe<NavigationLinksDynamicZone>) ? (
          <NavLink
            key={(linkData as ComponentMenuLink).id}
            data={linkData as ComponentMenuLink}
          />
        ) : isDropdown(linkData as Maybe<NavigationLinksDynamicZone>) ? (
          <NavDropdown
            key={(linkData as ComponentMenuDropdown).id}
            data={linkData as ComponentMenuDropdown}
          />
        ) : null
      )}
    </div>
  )
}

export default NavDesktop
