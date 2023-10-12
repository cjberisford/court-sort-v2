import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image'
import csLogo from '../public/images/logo.svg'
import Breadcrumbs from './Breadcrumbs';
import { ModeToggle } from './ui/theme';



const navigation = [
  { name: 'Leagues', href: '/leagues', current: false },
  { name: 'Clubs', href: '/clubs', current: false },
  { name: 'Players', href: '/players', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Nav: React.FC = () => {
  const { data: session, status } = useSession();
  return (
    <Disclosure as="nav" className="bg-background text-foreground border-b-2 border-primary">
      {({ open }) => (
        <>

          <div className="mx-auto max-w-6xl  ">
            <div className="relative flex h-16 items-center justify-between px-8">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">

                  <Image
                    src={csLogo}
                    alt="Site logo"
                    className="w-8"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (

                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? '' : '',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                {/* Profile dropdown */}
                <ModeToggle />
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {session ?
                        <img
                          className="h-8 w-8 rounded-full"
                          src={session ? session.user.image : null}
                          alt=""
                        />
                        :
                        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                          <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                      }
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {session ?
                        <><Menu.Item>
                          {({ active }) => (
                            <Link href="/" legacyBehavior>
                              <a>
                                <div className="py-2">
                                  <p className="block px-4  text-m text-gray-700">
                                    {session.user.name}
                                  </p>
                                  <p className="block px-4 text-sm text-gray-700">
                                    {session.user.email}
                                  </p>
                                </div>
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                          <hr />
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/create"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                New post
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="/drafts"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Your drafts
                              </a>
                            )}
                          </Menu.Item>
                          <hr />
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={() => signOut()}
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </>
                        :
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/api/auth/signin"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign in
                            </a>
                          )}
                        </Menu.Item>
                      }
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

  )
};

export default Nav;