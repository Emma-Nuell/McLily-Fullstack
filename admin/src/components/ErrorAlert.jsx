const ErrorAlert = ({message, clearError}) => {
  return (
    <div className="text-red-500 w-full">{message}
    <button onClick={clearError} className="block p-3 bg-red-400">clear</button>
    </div>
  )
}
export default ErrorAlert