import { CATEGORIES } from "./constants";


export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(number);
  return newNumber;
};

export const shuffleArray = (array) => {  
  return [...array].sort(() => Math.random() - 0.5 )
}

export const getRandomSections = () => { 
  const allSections = [
   ...Object.keys(CATEGORIES)
  ]

  return shuffleArray(allSections).slice(0, 7 + Math.floor(Math.random() * 2))
 }

 
 
