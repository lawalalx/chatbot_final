const   Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="/male-icon.png"
            alt="Messages image"
          />
        </div>
      </div>

      <div className={`chat-bubble text-white bg-blue-500`}>
        Hi! Whats Up?
      </div>

      {/* <div className={`chat-footer text-white bg-blue-500`}>
        Hi! Whats Up?
      </div> */}
    </div>
  )
} 

export default Message