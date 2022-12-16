'use client'
// React / Next modules
import { Fragment, useState } from 'react'
import Image from 'next/image'
// 3rd party modules
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { Transition } from '@headlessui/react'
// GraphQL types
import { Navigation } from '@lib/gql/graphql'

// set props type
type Props = {
  data: Navigation | undefined
}

const CallToAction = (props: Props) => {
  console.log(props.data)
  const [isShowing, setIsShowing] = useState(false)
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -50) {
      setIsShowing(true)
    } else {
      setIsShowing(false)
    }
  })
  return (
    <>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex bg-white/90 h-14 px-4 rounded-lg items-center font-semibold">
          <Image
            className="pr-0 sm:pr-2"
            src={props.data?.callToActionLogo?.data?.attributes?.url ?? ''}
            alt="Reservation"
            width={45}
            height={45}
          />
          <p className="hidden sm:flex md:hidden lg:flex xl:hidden">{props.data?.callToAction}</p>
          <p className="hidden md:flex lg:hidden xl:flex">{props.data?.callToActionLong}</p>
        </div>
      </Transition>
      <Transition
        as={Fragment}
        show={!isShowing}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute top-[50vh] left-[50%]">
          <div className="relative -mt-7 -left-[50%] bg-white/90 h-14 px-4 rounded-lg">
            <span className="flex items-center h-full text-2xl font-semibold">
              <Image
                className="pr-0 sm:pr-2"
                src={props.data?.callToActionLogo?.data?.attributes?.url ?? ''}
                alt="Reservation"
                width={45}
                height={45}
              />
              <p className="hidden sm:flex md:hidden">{props.data?.callToAction}</p>
              <p className="hidden sm:hidden md:flex">{props.data?.callToActionLong}</p>
            </span>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default CallToAction
