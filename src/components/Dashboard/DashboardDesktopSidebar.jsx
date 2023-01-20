import { SideBarNavItems } from './SidebarNavItems'
import Link from 'next/link'
import { useRouter } from 'next/router'

const navigation = SideBarNavItems

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DashboardDesktopSidebar() {
  const router = useRouter()
  const { pathname } = router
  console.log(pathname)
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto bg-gradient-to-br from-blue-800 to-blue-500 pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <div className="text-xl font-bold text-blue-100">
              Web3<span className="text-slate-900">Pal</span>
            </div>
            <div className="flex flex-shrink-0 items-center px-4"></div>
          </div>
          <nav
            className="mt-5 flex flex-1 flex-col divide-y divide-blue-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  href={item.href}
                  key={item.name}
                  className={classNames(
                    item.href === pathname
                      ? 'bg-slate-900 text-white'
                      : 'text-blue-100 hover:bg-blue-400 hover:text-white',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className="mr-4 h-6 w-6 flex-shrink-0 text-blue-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
