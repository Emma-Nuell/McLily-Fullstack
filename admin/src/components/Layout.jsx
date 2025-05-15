import {Navbar, Sidebar} from '../components/addcomponents'

const Layout = ({children}) => {
  return (
    <>
          <div className="flex flex-auto h-screen">
                        <Sidebar />
              <div className="grow h-screen overflow-auto scrollbar-hidden">
                  <Navbar />
                  <div className="m-5">{children} </div>
              </div>  
     </div>
    </>
  )
}
export default Layout