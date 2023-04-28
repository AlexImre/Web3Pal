import { useContext } from 'react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import FromSection from './FromSection';
import ToSection from './ToSection';
import ServiceDisplay from './ServiceDisplay';
import IssueBox from './IssueBox';
import DatePicker from './DatePickerReact';
import { StateContext } from '@/context/stateContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import InvoiceNumberField from './InvoiceNumberField';
import PaymentSection from './PaymentSection';
import WalletSection from './WalletSection';
import NotesForm from '../InvoiceForm/NotesForm';
import AddInvoiceHeader from './AddInvoiceHeader';

export default function InvoiceContainer() {
  const stateContext = useContext(StateContext);
  const { masterState, setMasterState } = stateContext;
  const { issueDate, dueDate } = masterState.invoice.invoiceInformation;

  return (
    <>
      <main>
        <AddInvoiceHeader />

        <div className="mx-auto max-w-7xl p-4 ">
          <div className="flex justify-between space-x-0 xl:space-x-6">
            <div className="mx-auto grid w-full max-w-none grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3">
              <div className="-mx-4 bg-white px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-3 lg:row-span-2 lg:row-end-2 xl:p-8">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-2 col-start-1">
                    <div className="flex items-center space-x-3">
                      <h2 className="text-base text-xl font-semibold leading-6 text-gray-900">
                        Invoice #
                      </h2>
                      <InvoiceNumberField />
                      <span className="text-sm">issued in</span>
                      <IssueBox />
                      <div id="my-anchor-element">
                        <InformationCircleIcon
                          width={20}
                          className="cursor-pointer text-gray-600"
                        />
                        <Tooltip
                          className="w-24"
                          anchorSelect="#my-anchor-element"
                          content="This is the currency that your invoice will be issued in."
                          style={{
                            width: '250px',
                            textAlign: 'center',
                            left: 200,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 col-start-3 text-sm">
                    <div className="items-base flex">
                      <dt className="mr-1 inline text-gray-500">Issued on</dt>{' '}
                      <dd className="inline text-gray-500">
                        <div>
                          {new Date(issueDate)
                            .toDateString()
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                        </div>
                      </dd>
                      <DatePicker isIssueDate={true} />
                    </div>
                    <div className="items-base flex font-semibold">
                      <dt className="mr-1 inline text-gray-900">Due on</dt>{' '}
                      <dd className="inline text-gray-700">
                        <div>
                          {new Date(dueDate)
                            .toDateString()
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                        </div>
                      </dd>
                      <DatePicker isIssueDate={false} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1">
                  <div className="col-span-4 my-3 border-t border-gray-300"></div>
                  <FromSection />
                  <ToSection />
                  <div className="col-span-4 my-3 border-t border-gray-300"></div>
                </div>

                <div className="flex grid grid-cols-4 gap-1">
                  <PaymentSection />
                  <WalletSection />

                  <div className="col-span-4 my-3 border-t border-gray-300"></div>
                </div>

                <ServiceDisplay />
                <div className="col-span-4 my-3 border-t border-gray-300"></div>
                <div className="grid grid-cols-4 gap-1">
                  <div className="col-span-2 col-start-1">
                    <NotesForm />
                  </div>
                  <div className="col-span-2 col-start-3">
                    <div className="px-5 text-sm font-semibold">
                      Attach files
                    </div>
                    <button className="my-1 inline-flex justify-start rounded-md py-1 px-5 text-xs font-medium text-indigo-600">
                      + Add attachment
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="sticky top-0 flex h-auto justify-end self-start">
              <InvoiceProgressBar />
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
