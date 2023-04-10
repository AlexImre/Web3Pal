import { CheckCircleIcon } from '@heroicons/react/20/solid';

type SuccessfulPaymentAlertPropType = {
  txHash: string;
  forRenderingInAddInvoiceDisplay?: boolean;
};

export default function SuccessfulPaymentAlert(
  props: SuccessfulPaymentAlertPropType
) {
  const { txHash, forRenderingInAddInvoiceDisplay } = props;

  return (
    <div
      className={
        forRenderingInAddInvoiceDisplay
          ? 'mt-4 rounded-md bg-green-50 p-4 sm:rounded-lg '
          : `m-5 mt-4 w-[600px] rounded-md bg-green-50 p-4 sm:rounded-lg`
      }
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">
            {forRenderingInAddInvoiceDisplay
              ? 'Invoice paid'
              : 'Transaction completed'}
          </h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              Success! This invoice has been paid
              {forRenderingInAddInvoiceDisplay &&
                ' and can no longer be edited'}
              . You can view this transaction{' '}
              <a
                className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                href={`https://goerli.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                here.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
