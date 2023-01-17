import { useState } from 'react'
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline'
import DashboardProfileDropDown from './DashboardProfileDropDown'
import DashboardDesktopSidebar from './DashboardDesktopSidebar'
import DashboardMobileSidebar from './DashboardMobileSidebar'
import HomeCard from './HomeCard'

export default function DashboardHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className="min-h-full">
        <DashboardMobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <DashboardDesktopSidebar />

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
              <div className="flex flex-1"></div>
              <div className="ml-4 flex items-center md:ml-6">
                <DashboardProfileDropDown />
              </div>
            </div>
          </div>
          MY INVOICES PAGE
        </div>
      </div>
    </>
  )
}
