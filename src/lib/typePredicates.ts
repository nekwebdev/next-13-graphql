// GraphQL types
import {
  ComponentMenuDropdown,
  ComponentMenuLink,
  ComponentSharedSlide,
  Maybe,
  NavigationLinksDynamicZone,
} from '@lib/gql/graphql'

// type predicates
export const isLink = (entry: Maybe<NavigationLinksDynamicZone>): entry is ComponentMenuLink => {
  return (entry as ComponentMenuLink).style !== undefined
}

export const isDropdown = (
  entry: Maybe<NavigationLinksDynamicZone>
): entry is ComponentMenuDropdown => {
  return (entry as ComponentMenuDropdown).sections !== undefined
}

export const isSlide = (variableToCheck: any): variableToCheck is ComponentSharedSlide =>
  (variableToCheck as ComponentSharedSlide).id !== undefined
