'use client' // using useState and onClick that are client-only
// React / Next modules
import { useState } from 'react'
// 3rd party modules
import { FiMenu, FiXCircle } from 'react-icons/fi'
// GraphQL types
import { Navigation } from '@lib/gql/graphql'
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
        className="flex z-40 lg:hidden mr-4 sm:mr-10 text-3xl bg-white/90 rounded-lg h-14 w-14 justify-center items-center"
        onClick={() => setMenuToggle((prev: boolean) => !prev)}
      >
        {menuToggle ? <FiXCircle /> : <FiMenu />}
      </button>
      <ul
        className={`
            bg-white z-30 lg:hidden absolute w-full h-[90vh] bottom-0 top-[10vh] rounded-lg px-4 text-center overflow-y-auto
            duration-500 ${menuToggle ? 'right-0' : 'right-[-100%]'}
          `}
      >
        {props.data.links.map((linkData, index) => (
          <li key={index}>
            {isLink(linkData) ? (
              <>
                <div
                  className="lg:cursor-pointer text-xl font-medium py-4"
                  onClick={() => setMenuToggle((prev: boolean) => !prev)}
                >
                  <NavLink data={linkData} />
                </div>
              </>
            ) : isDropdown(linkData) ? (
              <>
                <div className="text-xl font-medium pb-4">
                  <h1>{linkData.label}</h1>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 justify-between">
                  {linkData.sections?.data.map((sectiondData, index) => (
                    <div key={index} className="justify-self-center">
                      <h1 className="text-lg text-active font-semibold uppercase">
                        {sectiondData.attributes?.label}
                      </h1>
                      <ul>
                        {sectiondData.attributes?.links?.map((linkData, index) =>
                          linkData ? (
                            <li
                              key={index}
                              className="text-md text-profondeur my-3"
                              onClick={() => setMenuToggle((prev: boolean) => !prev)}
                            >
                              <NavLink data={linkData} />
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
