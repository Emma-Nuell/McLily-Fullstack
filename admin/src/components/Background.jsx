const Background = ({children}) => {
  return (
      <div className="bg-background dark:bg-gray-800 min-h-full overflow-auto scrollbar-hidden">{children}</div>
  )
}
export default Background