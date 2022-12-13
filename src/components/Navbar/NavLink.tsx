'use client' // using the headlessui library that is client-only
// React / Next modules
import Link from 'next/link'
// GraphQL types
import { ComponentMenuLink } from '@lib/gql/graphql'

// set props type
type Props = {
  data: ComponentMenuLink
}

const NavLink = (props: Props) => {
  return (
    <Link
      className=""
      href={
        // null checking the url and the page slug fall back value
        props.data.url
          ? props.data.url
          : props.data.page?.data?.attributes?.slug
          ? props.data.page?.data?.attributes?.slug
          : ''
      }
    >
      {props.data.label}
    </Link>
  )
}

export default NavLink
