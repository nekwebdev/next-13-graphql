// React / Next modules
import Link from 'next/link'
// GraphQL types
import { ComponentMenuLink, Maybe } from '@lib/gql/graphql'

// set props type
type Props = {
  data: Maybe<ComponentMenuLink>
  close?: () => void
}

const NavLink = (props: Props) => {
  return (
    <Link
      className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br hover:from-bleuEspace hover:via-bleuCiel hover:to-plage"
      onClick={props.close}
      href={
        // null checking the url and the page slug fall back value
        props?.data?.url
          ? props.data.url
          : props?.data?.page?.data?.attributes?.slug
          ? props.data.page?.data?.attributes?.slug
          : ''
      }
    >
      {props?.data?.label}
    </Link>
  )
}

export default NavLink
