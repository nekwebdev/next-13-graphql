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
import { NavLink } from '@components/Navbar'

const NavDesktop = async () => {
  // deduped call from Server Component to the graphql api to get our navbar data
  const navigationData = await getNavigationData()
  return (
    <ul className="sm:flex hidden items-center gap-4">
      {navigationData?.links.map((linkData) => (
        // the navigationData has an array of link elements that can either be a ComponentMenuLink or a ComponentMenuDropdown
        // either Type can have an id
        // to pass the linkData as a prop we serialize it as NavigationLinksDynamicZone alias Type as it also includes Error Type as a possibility
        <NavLink
          key={(linkData as ComponentMenuLink | ComponentMenuDropdown).id}
          data={linkData as Maybe<NavigationLinksDynamicZone>}
        />
      ))}
    </ul>
  )
}

export default NavDesktop
