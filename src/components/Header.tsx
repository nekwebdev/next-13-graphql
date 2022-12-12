// Components
import Navbar from '@components/Navbar'

const Header = () => {
  return (
    <header>
      {/* Navigation bar */}
      {/* following error is related to TypeScript not expecting a Promise.
          The expect-error will complain once it is fixed and can then be removed */}
      {/* @ts-expect-error Server Component */}
      <Navbar />
    </header>
  )
}

export default Header
