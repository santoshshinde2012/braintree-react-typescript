import React, { useEffect, useState } from 'react';
import Braintree from '../../components/braintree/Braintree';
import PaymentHttpClient, {
  IBraintreeToken,
  ITransactionRequest,
  ITransactionResponse,
} from '../../services/payments';
import './Payment.css';

export default function Payment() {
  const [clientToken, setClientToken] = useState('');
  const [showBraintreeDropIn, setShowBraintreeDropIn] = useState(false);

  useEffect(() => {
    PaymentHttpClient.generateToken()
      .then(({ token }: IBraintreeToken) => {
        setClientToken(token);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  const initiatePayment = (paymentMethodNonce: string) => {
    // TODO : Based on inputs we have to create payload
    // Example - Amount based on cart and price per item
    const payload: ITransactionRequest = {
      amount: '10',
      paymentMethodNonce,
    };
    PaymentHttpClient.checkout(payload)
      .then((result: ITransactionResponse) => {
        alert('Payment successfully completed');
        console.log(result);
      })
      .catch((error: Error) => {
        alert('Payment Failed');
        console.log(error);
      });
  };

  return (
    <div className='container-fluid'>
      <div className='text-center'>
        <h1>Payment</h1>
        {!showBraintreeDropIn && (
          <button
            onClick={() => {
              setShowBraintreeDropIn(true);
            }}
          >
            Go to Checkout
          </button>
        )}
      </div>

      <div className='row justify-content-center'>
        <div className='col-4 text-center'>
          <Braintree
            clientToken={clientToken}
            show={showBraintreeDropIn}
            checkout={initiatePayment}
          />
        </div>
      </div>
    </div>
  );
}
