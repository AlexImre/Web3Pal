import React from 'react';
import SuccessfulPaymentAlert from '../Web3/SuccessfulPaymentAlert';
import UnpaidInvoiceAlert from './UnpaidInvoiceAlert';
import DraftInvoiceAlert from './DraftInvoiceAlert';
import OverdueInvoiceAlert from './OverdueInvoiceAlert';
import VoidInvoiceAlert from './VoidInvoiceAlert';

type InvoiceStatusHeaderProps = {
  invoiceStatus: string;
  txHash: string;
};

function InvoiceStatusHeader(props: InvoiceStatusHeaderProps) {
  const { invoiceStatus, txHash } = props;

  const getInvoiceHeader = () => {
    switch (invoiceStatus) {
      case 'Paid':
        return (
          <SuccessfulPaymentAlert
            txHash={txHash}
            forRenderingInAddInvoiceDisplay={true}
          />
        );
      case 'Unpaid':
        return <UnpaidInvoiceAlert />;
      case 'Overdue':
        return <OverdueInvoiceAlert />;
      case 'Draft':
        return <DraftInvoiceAlert />;
      case 'Void':
        return <VoidInvoiceAlert />;
      default:
        return <></>;
    }
  };

  return getInvoiceHeader();
}

export default InvoiceStatusHeader;
