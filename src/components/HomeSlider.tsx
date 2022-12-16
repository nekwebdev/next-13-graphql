'use client'
// 3rd party modules
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
// GraphQL types
import { HomeSlider } from '@lib/gql/graphql'
import { isSlide } from '@lib/typePredicates'
// Components
import SlideCard from './SlideCard'

// set props type
type Props = {
  data: HomeSlider
}

const homeSliderSettings = {
  arrows: false,
  pauseOnHover: false,
}

const HomeSlider = (props: Props) => {
  return (
    <div className="">
      <Fade {...homeSliderSettings}>
        {props?.data?.slides?.map((slide, index) =>
          isSlide(slide) ? (
            <div key={index}>
              <SlideCard data={slide} />
            </div>
          ) : null
        )}
      </Fade>
    </div>
  )
}

export default HomeSlider
