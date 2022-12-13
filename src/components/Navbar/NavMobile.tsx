'use client' // using useState and onClick that are client-only
// React / Next modules
import { useState } from 'react'
// 3rd party modules
import { FiMenu, FiXCircle } from 'react-icons/fi'
// GraphQL types
import { ComponentMenuDropdown, ComponentMenuLink, Navigation } from '@lib/gql/graphql'
// Type predicates
import { isLink, isDropdown } from '@lib/typePredicates'
// Components
import { NavLink } from '@components/Navbar'

// set props type
type Props = {
  data: Navigation
}

const NavMobile = (props: Props) => {
  const [menuToggle, setMenuToggle] = useState(false)
  return (
    <>
      <button
        className="sm:hidden text-3xl"
        onClick={() => setMenuToggle((prev: boolean) => !prev)}
      >
        {menuToggle ? <FiXCircle /> : <FiMenu />}
      </button>
      <ul
        className={`
            sm:hidden bg-white absolute w-full h-full bottom-0 top-12 px-4 text-center
            duration-500 ${menuToggle ? 'right-0' : 'right-[-100%]'}
          `}
      >
        {props.data.links.map((linkData) => (
          <li key={(linkData as ComponentMenuLink | ComponentMenuDropdown).id}>
            {isLink(linkData) ? (
              <>
                <div className="md:cursor-pointer text-xl mb-4 font-medium hover:text-secondary">
                  <NavLink data={linkData} />
                </div>
              </>
            ) : isDropdown(linkData) ? (
              <>
                <div className="text-xl mb-4 font-medium">
                  <h1>{linkData.label}</h1>
                </div>

                <div className="grid grid-cols-2 gap-4 my-4 justify-between">
                  {(linkData as ComponentMenuDropdown).sections?.data.map((sectiondData) => (
                    <div key={sectiondData.id} className="justify-self-center">
                      <h1 className="text-lg font-semibold uppercase">
                        {sectiondData.attributes?.label}
                      </h1>
                      <ul>
                        {sectiondData.attributes?.links?.map((linkData) =>
                          linkData ? (
                            <li key={linkData?.id} className="text-md text-gray-600 my-3">
                              <div className="hover:text-secondary">
                                <NavLink data={linkData} />
                              </div>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  )
}

export default NavMobile
