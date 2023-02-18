import React from 'react';
import { navigation } from './navigation';

function InvoiceFormNavbar(props: any) {
  return (
    <aside className="flex flex-col py-6 px-2 hover:cursor-pointer sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
      {navigation.map((item, index) => (
        <div
          key={item.name}
          className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-indigo-700"
          onClick={() => {
            props.refs[index].current.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          <div className="flex">
            <item.icon
              className="-ml-1 mr-3 h-6 w-6 flex-shrink-0 text-slate-600 group-hover:text-indigo-500"
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </div>
        </div>
      ))}
    </aside>
  );
}

export default InvoiceFormNavbar;
