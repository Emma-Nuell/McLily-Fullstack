
import { Sling as HamburgerMain } from "hamburger-react"

const Hamburger = ({mobileMenu, setMobileMenu}) => {
  return (
   <div className="sm:hidden text-aquamine-3 dark:text-gray-400 ">
       <HamburgerMain toggled={mobileMenu} toggle={setMobileMenu} />      
   </div>
  )
}
export default Hamburger