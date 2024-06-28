import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  GlobeAmericasIcon,
  HomeModernIcon,
  UserGroupIcon,
  CalculatorIcon,
  PaintBrushIcon,
  ScaleIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  ChartBarIcon,
  Squares2X2Icon,
  HomeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import logo from '../../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';

// For hover-group for icons:
// group-hover:text-blue-600 group-hover:text-amber-600 group-hover:text-teal-600
// group-hover:text-blue-500 group-hover:text-amber-500 group-hover:text-teal-500
// group-hover:text-blue-400 group-hover:text-amber-400 group-hover:text-teal-400
// group-hover:text-blue-300 group-hover:text-amber-300 group-hover:text-teal-300
// group-hover:text-blue-200 group-hover:text-amber-200 group-hover:text-teal-200

const products = [
  {
    name: '01: Intro to Seismic Exam',
    description: 'An overview of the exam and its requirements',
    href: '01',
    icon: AcademicCapIcon,
    hoverColor: 'text-blue-600',
  },
  {
    name: '02: Geology & Earthquakes',
    description: 'Background information on how earthquakes occur',
    href: '02',
    icon: GlobeAmericasIcon,
    hoverColor: 'text-amber-600',
  },
  {
    name: '03: Code Provisions',
    description: 'How the building code works',
    href: '03',
    icon: ScaleIcon,
    hoverColor: 'text-teal-600',
  },
  {
    name: '04: Site Conditions',
    description: 'Seismic factors based on soil characteristics',
    href: '04',
    icon: MapPinIcon,
    hoverColor: 'text-blue-500',
  },
  {
    name: '05: Risk Categories',
    description: 'Defining seismic risk by building type',
    href: '05',
    icon: UserGroupIcon,
    hoverColor: 'text-amber-500',
  },
  {
    name: '06: Building Systems',
    description: 'Vertical and Lateral system',
    href: '06',
    icon: BuildingOffice2Icon,
    hoverColor: 'text-teal-500',
  },
  {
    name: '07: Ductility',
    description: 'The concept of ductility and R values',
    href: '07',
    icon: HomeModernIcon,
    hoverColor: 'text-blue-400',
  },
  {
    name: '08: Base Shear',
    description: 'How to calculate base shear',
    href: '08',
    icon: CalculatorIcon,
    hoverColor: 'text-amber-400',
  },
  {
    name: '09: Force Distribution',
    description: 'How to determine story forces',
    href: '09',
    icon: ChartBarIcon,
    hoverColor: 'text-teal-400',
  },
  {
    name: '10: Drift',
    description: 'Lateral drift calculations ',
    href: '10',
    icon: BuildingLibraryIcon,
    hoverColor: 'text-blue-300',
  },
  {
    name: '11: Flexible Diaphragms',
    description: 'Intro to diaphragms and flexible analysis',
    href: '11',
    icon: HomeIcon,
    hoverColor: 'text-amber-300',
  },
  {
    name: '12: Rigid Diaphragms',
    description: 'Rigid diaphgragm analysis',
    href: '12',
    icon: BuildingOfficeIcon,
    hoverColor: 'text-teal-300',
  },
  {
    name: '13: Irregularities',
    description: 'Irregularities and redundancy as applied to seismic design',
    href: '13',
    icon: ExclamationTriangleIcon,
    hoverColor: 'text-blue-200',
  },
  {
    name: '14: Non-structural Components',
    description: 'Forces and basic design of non-structural components',
    href: '14',
    icon: CubeIcon,
    hoverColor: 'text-amber-200',
  },
  {
    name: '15: Seismic Detailing',
    description: 'How to identify good seismic load paths',
    href: '15',
    icon: PaintBrushIcon,
    hoverColor: 'text-teal-200',
  },
];

const callsToAction = [
  { name: 'Show All Lectures', href: '/lectures', icon: Squares2X2Icon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <NavLink className="-m-1.5 p-1.5" to="/">
              <span className="sr-only">California Seismic</span>
              <img className="h-16 w-auto" src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Lectures
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-sm overflow-scroll rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 max-h-[70vh]">
                  <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                      >
                        <item.icon
                          className="h-5 w-5 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-1 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className={`h-6 w-6 text-gray-600 group-hover:${item.hoverColor}`}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <NavLink to={`lectures/${item.href}`}>
                            <p className="block font-semibold text-gray-900">
                              {item.name}
                            </p>
                            <p className="mt-1 text-gray-600">
                              {item.description}
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <NavLink
              className="text-sm font-semibold leading-6 text-gray-900"
              to="/practice"
            >
              Practice
            </NavLink>
            <NavLink
              className="text-sm font-semibold leading-6 text-gray-900"
              to="/exam-guide"
            >
              Exam Guide
            </NavLink>
            <NavLink
              className="text-sm font-semibold leading-6 text-gray-900"
              to="/contributors"
            >
              Contributors
            </NavLink>
          </Popover.Group>
          <div
            data-testid="testBlankDiv"
            className="hidden lg:flex lg:flex-1 lg:justify-end"
          ></div>
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div> */}
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">California Seismic</span>
                <img
                  className="h-8 w-auto"
                  src={logo}
                  alt="California Seismic Logo"
                />
              </NavLink>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                          Lectures
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'rotate-180' : '',
                              'h-5 w-5 flex-none'
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Link></Link>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...callsToAction, ...products].map(
                            (item, index) => (
                              <Disclosure.Button
                                key={item.name}
                                as="a"
                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                <Link
                                  to={
                                    index === 0
                                      ? item.href
                                      : `lectures/${item.href}`
                                  }
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </Disclosure.Button>
                            )
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <NavLink
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to="/practice"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Practice
                  </NavLink>
                  <NavLink
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to="/exam-guide"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Exam Guide
                  </NavLink>
                  <NavLink
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    to="/contributors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contributors
                  </NavLink>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}
