import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { ABOUT_ROUTE } from "../utils/consts";
export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A]/70 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Alter Ego</h3>
          <p className="text-gray-400">Покоряйте вершины, открывая для себя красоту гор уже более 8 лет.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Product</h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li>
              <Link to="#features" className="text-gray-400 hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link to="#pricing" className="text-gray-400 hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-400 hover:text-white">
                Integrations
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li>
              <Link to={ABOUT_ROUTE} className="text-gray-400 hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-400 hover:text-white">
                Careers
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <Link to="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2025 Alter Ego. All rights reserved.</p>
      </div>
    </footer>
  )
}
