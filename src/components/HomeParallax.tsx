'use client'
import { HomeParallax } from '@lib/gql/graphql'
import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax'
// set props type
type Props = {
  data: HomeParallax
}

const HomeParallax = (props: Props) => {
  return (
    <ParallaxProvider>
      <ParallaxBanner
        layers={[
          { image: props.data.banner?.data?.attributes?.url, speed: 20 },
          {
            speed: -20,
            children: (
              <div className="absolute flex flex-col inset-0 items-center justify-center text-center">
                <h1 className="text-6xl text-shadow-md font-thin">{props.data.header}</h1>
                <p className="text-2xl text-shadow-md font-thin pt-4">{props.data.subtext}</p>
              </div>
            ),
          },
        ]}
        className="aspect-[2/1]"
      />
    </ParallaxProvider>
  )
}

export default HomeParallax
