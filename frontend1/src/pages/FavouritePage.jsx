import { Link } from "react-router-dom"
import React from "react"
import { Error, IsAuthenticated } from "../components"
import { MBlobLoader, MclilyLoader } from "../components/loaders"

const FavouritePage = () => {
  return (
    <main className=" min-h-[calc(100vh-11rem)] flex items-center justify-center p-4 dark:bg-background-white bg-gray-100">
      <IsAuthenticated />
    </main>
  );
}

export default FavouritePage