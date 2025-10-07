import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#141414] h-40 relative p-5 mt-16">
      <div className="flex flex-row items-center justify-between">
        <div>
          <div className="flex flex-row items-center gap-4">
            <Link to='/'>About</Link>
            <Link to='/'>Contact</Link>
            <Link to='/'>Terms</Link>
            <Link to='/'>Privacy</Link>
          </div>
          <p className="text-sm text-white/30">v1.0.0 - Produced by Software Engineering students from PUC Campinas.</p>
        </div>
        <div>
          <h1 className="mb-2">Follow us on</h1>
          <div className="flex flex-row items-center gap-2">
            <Instagram />
            <Twitter />
            <Facebook />
          </div>
        </div>
      </div>
      <h1 className="absolute text-center bottom-5 left-0 right-0">© Save Point, All Rights Reserved.</h1>
    </footer>
  )
}