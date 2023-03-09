import { XCircleIcon } from '@heroicons/react/20/solid';

type FailedPaymentAlertPropType = {
  txHash: string;
};

export default function FailedPaymentAlert(props: FailedPaymentAlertPropType) {
  const { txHash } = props;

  const checkStatusMessage = (
    <>
      {' '}
      You can also check the status of your transaction{' '}
      <a
        className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
        href={`https://goerli.etherscan.io/tx/${txHash}`}
        target="_blank"
        rel="noreferrer"
      >
        here.
      </a>
    </>
  );

  return (
    <div className="m-5 w-[600px] rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Oops! Something went wrong
          </h3>
          <div className="mt-2 text-sm text-red-700">
            Please try refreshing this page and trying again.{' '}
            {txHash && checkStatusMessage}
          </div>
        </div>
      </div>
    </div>
  );
}
