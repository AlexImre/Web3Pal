import { InformationCircleIcon } from '@heroicons/react/20/solid';

export default function Example() {
  return (
    <div className="rounded-md bg-blue-100 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">Draft Invoice</h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              This invoice is not yet published and can be edited. Please note,
              once you publish this invoice, you will no longer be able to make
              any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
