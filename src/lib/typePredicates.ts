// GraphQL types
import {
  ComponentMenuDropdown,
  ComponentMenuLink,
  ComponentSharedSlide,
  HomeSlider,
  Maybe,
  Navigation,
  NavigationLinksDynamicZone,
} from '@lib/gql/graphql'

// type predicates
export const isLink = (entry: Maybe<NavigationLinksDynamicZone>): entry is ComponentMenuLink =>
  (entry as ComponentMenuLink).style !== undefined

export const isDropdown = (
  entry: Maybe<NavigationLinksDynamicZone>
): entry is ComponentMenuDropdown => (entry as ComponentMenuDropdown).sections !== undefined

export const isSlide = (entry: any): entry is ComponentSharedSlide =>
  (entry as ComponentSharedSlide).id !== undefined

export const isHomeSlider = (entry: any): entry is HomeSlider =>
  (entry as HomeSlider).slides !== undefined

export const isNav = (entry: any): entry is Navigation => (entry as Navigation).logo !== undefined
