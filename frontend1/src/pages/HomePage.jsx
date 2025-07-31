import React, { act, useEffect, useState } from "react"
import {
  FeaturedProducts,
  CategoryFirst,
  CategorySecond,
  RecommendedProducts,
  TopSellers,
  LastViewed,
  ProductCategorySection,
} from "../components/homepage";
import { CATEGORIES } from "../utils/constants"
import { getRandomSections } from "../utils/helpers"

const HomePage = () => {
  const [activeSections, setActiveSections] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(false)

  useEffect(() => {
    setActiveSections(getRandomSections())
    
  }, [])
  

  return (
    <main>
      <FeaturedProducts />
      <CategoryFirst />
      <RecommendedProducts />
      <CategorySecond />
      <TopSellers />
      {user && <LastViewed />}
      {activeSections.map(
        (section) =>
          CATEGORIES[section] && (
            <ProductCategorySection
              key={section}
              category={CATEGORIES[section]}
            />
          )
      )}
    </main>
  );
}
export default HomePage