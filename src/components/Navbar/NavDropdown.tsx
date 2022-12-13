'use client' // using the headlessui library that is client-only
// React / Next modules
import { Fragment } from 'react'
// 3rd party modules
import { Menu, Transition } from '@headlessui/react'
// GraphQL types
import { ComponentMenuDropdown, Maybe } from '@lib/gql/graphql'
// Components
import { NavLink } from '@components/Navbar'

// set props type
type Props = {
  data: Maybe<ComponentMenuDropdown>
}

const NavDropdown = (props: Props) => {
  return (
    <Menu as="li">
      <Menu.Button className="px-3 text-left md:cursor-pointer hover:text-secondary">
        {({ open }) => (
          <>
            {open ? (
              <div className="rotate-45 z-10 w-6 h-6 top-8 fixed ml-1 mt-1 bg-white" />
            ) : null}
            <h1>{props?.data?.label}</h1>
          </>
        )}
      </Menu.Button>
      <div className="absolute left-0 right-4 top-14 py-3">
        <Transition
          enter="transition ease-in-out duration-1000 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-1000 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Menu.Items className="bg-white border-none p-4 grid grid-cols-3 gap-16 justify-between">
            {props?.data?.sections?.data.map((sectiondData) => (
              <Menu.Item as={Fragment} key={sectiondData.id}>
                <div className="justify-self-center">
                  <h1 className="text-lg font-semibold uppercase">
                    {sectiondData.attributes?.label}
                  </h1>
                  <ul>
                    {sectiondData.attributes?.links?.map((linkData) => (
                      <li key={linkData?.id} className="text-md text-gray-600 my-3">
                        <div className="hover:text-secondary">
                          <NavLink data={linkData} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  )
}

export default NavDropdown
