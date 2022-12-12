'use client' // using the headlessui library that is client-only
// React / Next modules
import Link from 'next/link'
// 3rd party modules
import { Menu } from '@headlessui/react'
// GraphQL types
import {
  ComponentMenuDropdown,
  ComponentMenuLink,
  Maybe,
  NavigationLinksDynamicZone,
} from '@lib/gql/graphql'

// set props type
type Props = {
  data: Maybe<NavigationLinksDynamicZone>
}

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

const NavLink = (props: Props) => {
  // link elements that can either be a ComponentMenuLink or a ComponentMenuDropdown
  // either Type can have an id
  return (
    <Menu
      as="li"
      key={(props.data as ComponentMenuLink | ComponentMenuDropdown).id}
    >
      <Menu.Button className="px-3 text-left md:cursor-pointer hover:text-secondary">
        {/* the open property is set by headlessui and reflects the status of each Menu.Button */}
        {({ open }) => (
          <>
            {isLink(props.data) ? (
              <Link
                href={
                  // null checking the page slug and the url fall back value
                  props.data.page?.data?.attributes?.slug
                    ? props.data.page.data.attributes.slug
                    : props.data.url
                    ? props.data.url
                    : ''
                }
              >
                <h1>{props.data.label}</h1>
              </Link>
            ) : null}
            {/* dropdown do not have a direct link, only a label */}
            {isDropdown(props.data) ? <h1>{props.data.label}</h1> : null}
            {/* if the button is open show a div marrker overlay */}
            {open && (
              <div className="z-10 w-6 h-6 top-9 fixed ml-1 mt-1 bg-white rotate-45" />
            )}
          </>
        )}
      </Menu.Button>
    </Menu>
  )
}

export default NavLink
