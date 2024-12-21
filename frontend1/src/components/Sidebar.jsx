import styled from "styled-components";
import { sidebarLinks, sidebarCat } from "../utils/constants";
import { FaTimes, FaHeart, FaUser, FaPhoneAlt } from "react-icons/fa";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useProductContext } from "../context/product-context";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, changeLink, activeLink } = useProductContext();
  // const [active, setActive] = useState(null)

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
    document.body.style.overflow = "auto"
    }
  }, [isSidebarOpen])
  
  return (
    <SidebarContainer
      className="sidebarContainer"
    >
      <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <button type='button' className='close-btn btn' onClick={closeSidebar}>
        <FaTimes />
      </button>
        <div className="main">
        <div className='categories'>
          <h4>Shop By Category</h4>
          <hr />
          {sidebarLinks.map((link) => {
            const subcategories = link[`${activeLink}Subcategory`];
            return (
              <ul key={link.id}>
                <li onClick={() => changeLink(link.name)}>
                  {link.category}
                  {link.subCategory ? ( activeLink === link.name ? (<MdOutlineKeyboardArrowDown />):(<MdKeyboardArrowRight />)) : null}
                </li>
                <ul>
                  {subcategories?.map((item, index) => (
                    <li key={index} onClick = {closeSidebar}>{item}</li>
                  ))}
                </ul>
              </ul>
            );
          })}
        </div>
        <hr />
        <div className='cat'>
          <ul>
              {sidebarCat.map((cat, index) => {
                return (
                  <li key={index} onClick={closeSidebar}>
                    <Link to={cat.url} className="link">{cat.icon}{cat.name}</Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='center'>
          <button type='button' className='btn'>
            Login
          </button>
          </div>
          </div>
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  aside {
    position: fixed;
    top: 6rem;
    width: 100%;
    height: calc(100% - 6rem);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: var(--transition);
    transform: translate(-100%);
    padding: 0;
  }
  .main {
    left: 0;
    top: 6rem;
    width: 300px;
    height: 100%;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transition: var(--transition);
    z-index: 9999;
    padding: 0.8rem;
    font-size: 1rem;
    margin-top: 0
  }
  .close-btn {
    position: absolute;
    right: 8px;
    top: 4px;
  }
  aside .main::-webkit-scrollbar {
    width: 0;
    background: transparent;
    display: none;
  }
  .categories ul > li {
    padding: 0.7rem 0;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .categories ul > li:hover {
    padding: 0.7rem 1rem;
  }
  .categories ul ul > li {
    padding: 0.3rem 1.5rem;
    font-weight: 400;
    font-size: 0.9rem;
  }
  .cat ul > li {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 500;
  }
  .cat .link {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .cat ul > li:hover {
    padding: 0.7rem 1rem;
  }
  .center {
    display: flex;
    justify-content: center;
  }
  .show-sidebar {
    transform: translate(0);
  }
`;
export default Sidebar;
