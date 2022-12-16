import getStrapiMedia from '@core/getStrapiMedia'
import { ComponentSharedSlide } from '@lib/gql/graphql'

// set props type
type Props = {
  data: ComponentSharedSlide
}

const SlideCard = (props: Props) => {
  return (
    <div className="w-screen py-auto h-screen">
      <div
        className="flex bg-cover justify-center pt-[14vh] h-1/2"
        style={{
          backgroundImage: `url("${
            props.data.image.data?.attributes?.url
              ? getStrapiMedia(props.data.image.data.attributes.url)
              : ''
          }")`,
          backgroundPosition: 'center center',
        }}
      >
        <div className="text-4xl text-shadow-md cursor-default">{props.data.label}</div>
      </div>
    </div>
  )
}

export default SlideCard
