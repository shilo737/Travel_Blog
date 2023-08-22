import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import useUser from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const currentBg = (path) => {
    return location.pathname === path ? true : false;
  };
  const navigation = [
    { name: "Home", href: "/", current: currentBg("/") },
    { name: "Blogs", href: "/post", current: currentBg("/post") },
    { name: "Guides", href: "/guides", current: currentBg("/guides") },
    { name: "Contact", href: "/sendEmail", current: currentBg("/sendEmail") },
  ];

  const nav = useNavigate();
  const { user } = useUser();

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <div className="bg-gradient-to-br from-slate-500 to-indigo-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative z-50">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {/* Logo (hidden on larger screens) */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <button
                    onClick={() => nav("/")}
                    className="h-11 w-full lg:hidden text-[2em] text-amber-50"
                  >
                    {/* Your logo or text here */}
                  </button>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-3">
                    {navigation.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center"
                        aria-colcount={item.current ? "page" : undefined}
                      >
                        <Link
                          to={item.href}
                          className={classNames(
                            item.current
                              ? "bg-blue-600 text-white"
                              : "text-white hover:bg-blue-600 hover:text-white",
                            "rounded-md px-3 py-2 text-xl font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full p-1 border border-blue-500 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full "
                        src={
                          user
                            ? user?.profileImage
                            : "https://img.freepik.com/free-icon/add-user_318-932773.jpg?size=626&ext=jpg&ga=GA1.1.1208200538.1686835925&semt=ais"
                        }
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-blue-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {!user && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/signUp"
                              className={classNames(
                                active ? "bg-blue-500" : "",
                                "block px-4 py-2 text-sm text-white"
                              )}
                            >
                              Sign Up
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {user && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? "bg-blue-500" : "",
                                "block px-4 py-2 text-sm text-white"
                              )}
                            >
                              Your profile
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {!user && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/login"
                              className={classNames(
                                active ? "bg-blue-500" : "",
                                "block px-4 py-2 text-sm text-white"
                              )}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                      {user && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/favorite"
                              className={classNames(
                                active ? "bg-blue-500" : "",
                                "block px-4 py-2 text-sm text-white"
                              )}
                            >
                              My favorite
                            </Link>
                          )}
                        </Menu.Item>
                      )}

                      {user?.role === "admin" && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/admin"
                              className={classNames(
                                active ? "bg-blue-500" : "",
                                "block px-4 py-2 text-sm text-white"
                              )}
                            >
                              User Management
                            </Link>
                          )}
                        </Menu.Item>
                      )}

                      {user && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/logout"
                              className={classNames(
                                active ? "bg-blue-500" : "",
                                "block px-4 py-2 text-sm text-white"
                              )}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="sm:hidden relative z-50  bg-blue-600 rounded-2xl">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-blue-400 text-white"
                      : "text-white hover:bg-blue-500 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
