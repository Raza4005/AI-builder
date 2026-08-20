import React from 'react'

const LoginLeft = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat flex-col justify-between p-12 shrink-0 select-none">
        <div className = "flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" className="size-9.5" />
            <span className="text-4xl font-medium text-white">
                Builder AI
            </span>
        </div>
        <div>
            <h2>
                Build your AI applications with ease
            </h2>
            <p>
                Create powerful AI-driven applications without the complexity
            </p>
            <p className="text-zinc-300 text-sm mt-12">
                CopyRight {new Date().getFullYear()} BuilderAI 
                </p>
        </div>
    </div>
  )
}

export default LoginLeft