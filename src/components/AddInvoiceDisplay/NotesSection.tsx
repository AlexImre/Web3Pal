import React from 'react';

export default function NotesSection(props: any) {
  const { notes } = props.notesInformation;

  return (
    <div className="w-full py-3">
      <div className="flex items-center">
        <div className="flex-shrink-0"></div>
        <div className="ml-3 w-0 flex-1">
          <div className="text-lg font-medium text-slate-900">Notes</div>
          <div className="truncate text-sm font-medium text-gray-700">
            {notes ? notes : <em>Example Notes</em>}
          </div>
        </div>
      </div>
    </div>
  );
}
