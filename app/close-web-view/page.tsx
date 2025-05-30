export default function CloseWebView() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-[#FFC100]/20"></div>
          <div
            className="absolute inset-0 h-12 w-12 animate-pulse rounded-full bg-[#FFC100]/40"
            style={{
              boxShadow: '0 0 15px rgba(255, 193, 0, 0.3)',
              animationDuration: '1.5s',
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
