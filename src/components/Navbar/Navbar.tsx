// Components
import { NavDesktop, NavMobile } from '@components/Navbar'

const Navbar = () => {
  return (
    <nav className="z-50 w-full">
      <div className="bg-white text-black flex items-center font-poppins font-medium justify-around">
        <div className="flex z-50 p-1 w-full sm:w-auto justify-between">
          {/* Navigation bar */}
          <NavDesktop />
          <NavMobile />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
