'use client'
// 3rd party modules
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
// GraphQL types
import { ComponentSharedSlide, HomeSlider } from '@lib/gql/graphql'
// Components
import SlideCard from './SlideCard'

// set props type
type Props = {
  data: HomeSlider
}

const isSlide = (variableToCheck: any): variableToCheck is ComponentSharedSlide =>
  (variableToCheck as ComponentSharedSlide).id !== undefined

const homeSliderSettings = {
  arrows: false,
  pauseOnHover: false,
}

const HomeSlider = (props: Props) => {
  return (
    <div className="">
      <Fade {...homeSliderSettings}>
        {props?.data?.slides?.map((slide) =>
          isSlide(slide) ? (
            <div key={slide.id}>
              <SlideCard data={slide} />
            </div>
          ) : null
        )}
      </Fade>
    </div>
  )
}

export default HomeSlider
