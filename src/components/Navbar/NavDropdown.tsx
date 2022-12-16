'use client' // using the headlessui library that depends on states
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
    <Menu>
      <Menu.Button className="px-3 text-left md:cursor-pointer">
        {({ open }) => (
          <>
            {open ? <div className="rotate-45 w-6 h-6 top-16 fixed ml-1 mt-1" /> : null}
            <h1
              className={`${
                open ? 'text-active' : ''
              } hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-br hover:from-bleuEspace hover:via-bleuCiel hover:to-plage`}
            >
              {props?.data?.label}
            </h1>
          </>
        )}
      </Menu.Button>
      <div className="absolute left-0 right-6 top-24 py-3">
        <Transition
          enter="transition ease-in-out duration-1000 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-1000 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Menu.Items className="bg-white/90 rounded-r-lg -mt-2 p-4 grid grid-cols-3 gap-16 justify-between">
            {props?.data?.sections?.data.map((sectiondData) => (
              <Menu.Item as={Fragment} key={sectiondData.id}>
                {({ close }) => (
                  <div className="justify-self-center">
                    <h1 className="text-lg font-semibold uppercase">
                      {sectiondData.attributes?.label}
                    </h1>
                    <ul>
                      {sectiondData.attributes?.links?.map((linkData) => (
                        <li key={linkData?.id} className="text-md text-gray-600 my-3">
                          <NavLink data={linkData} close={close} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  )
}

export default NavDropdown
