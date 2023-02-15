import React from 'react';
import NumberField from './Fields/NumberField';

function ServicesTableRow(props: any) {
  const { service, index } = props;

  console.log('index', index);

  return (
    <>
      <div className="col-span-8 sm:col-span-2">
        <NumberField name="description" width="w-full" />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <NumberField name="quantity" width="w-full" />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <NumberField name="price" width="w-full" />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <NumberField name="discount" width="w-full" />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <NumberField name="tax" width="w-full" />
      </div>
      <div className="col-span-8 sm:col-span-1">
        <NumberField name="amount" width="w-full" />
      </div>
      {index === 0 ? (
        ''
      ) : (
        <button className="col-span-8 sm:col-span-1">x</button>
      )}
    </>
  );
}

export default ServicesTableRow;
