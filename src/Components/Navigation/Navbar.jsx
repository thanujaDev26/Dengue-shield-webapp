import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../ProtectedRoutes/AuthContext.jsx";

// import { TurtleIcon } from 'lucide-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const id = user?.id;
  const role = user?.role;
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogoutChange = () => {
    logout(false);
    navigate("/sign-in");
  };
  const navigation = [
    { name: "Home", href: "/", current: false },
    ...(isLoggedIn
      ? [{ name: "Dashboard", href: "/dashboard", current: false }]
      : []),
    { name: "About Us", href: "/about", current: false },
    { name: "Contact Us", href: "/contact", current: false },
  ];

  return (
    <Disclosure as="nav" className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/images/logo.png" alt="Logo" className="h-11 w-auto" />
              <p className="ml-4 text-xl font-semibold">
                MOS<span className="text-red-600">Q</span>GUARD
              </p>
            </Link>
          </div>

          <div className="hidden sm:flex sm:flex-1 justify-center border-0">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "text-gray-900 border-b-2 border-gray-900"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-4 min-w-[200px] border-0 justify-center">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6" />
                </button>
                <Menu as="div" className="relative z-10">
                  <MenuButton className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          to={`/profile`}
                          state={{ id: id, role: role }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Your Profile
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <Link
                          to="/mainpanel"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Dengue Officer Panel
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={onLogoutChange}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full text-left px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="flex items-center hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  Sign In
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  to="/sign-up"
                  className="flex items-center hover:text-gray-700 px-3 py-2 text-sm font-medium"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-1" />
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
