import { Link } from "react-router-dom"
import React from "react"

const FavouritePage = () => {
  return (
    <section className="bg-background-white text-center my-4">
      <div className="section section-center page-100">
        <h4>Add products you like to your favourite list to have easy access to them whenever you visit our website</h4>
        <Link className="btn">Login</Link>
      </div>
    </section>
  )
}

export default FavouritePage