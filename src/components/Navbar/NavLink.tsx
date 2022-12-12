// GraphQL types
import { Maybe, NavigationLinksDynamicZone } from '@lib/gql/graphql'

// set props type
type Props = {
  data: Maybe<NavigationLinksDynamicZone>
}

const NavLink = (props: Props) => {
  // props.data will be of type ComponentMenuLink or ComponentMenuDropdown or Error
  return <div>NavLink</div>
}

export default NavLink
