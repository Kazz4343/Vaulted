import Link from "next/link";

export default function Navbar() { 
  return (
    <div className="bg-bgdark sticky top-0 z-50 w-full backdrop-blur-md border-b-gray-border border">
      <div className="flex items-center justify-between mx-auto h-11 max-w-6xl px-4">
        <Link href={'/'} className="text-xl font-semibold text-white-dark">Vault<span className="text-accent-dark">ed</span></Link>
        
        <div className="flex gap-3">
          <Link href="auth/sign-in"
            className="bg-bgdark border-white-dark
            text-xs px-4 py-1 border rounded-sm font-semibold"
          >
            Log In
          </Link>
          <Link href="auth/sign-up"
            className="bg-sign-up-bg border-gray-border text-[#8F93A3]
            text-xs px-3 py-1 border rounded-sm font-semibold hover:text-white-dark
            transition-colors duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}