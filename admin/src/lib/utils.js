// import axios from "axios";
// const api = import.meta.env.VITE_API_BASE_URL

// const instance = axios.create({
//   baseURL: api,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// export default instance;

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}