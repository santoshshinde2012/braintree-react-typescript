import React, { useEffect, useState } from 'react';
import dropin, { Dropin, PaymentMethodPayload } from 'braintree-web-drop-in';
import './Braintree.css';

// https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live/node#test-value-6243030000000001

type BraintreeProps = {
  clientToken: string;
  show: boolean;
  checkout: (nonce: string) => void;
};

const Braintree = ({ clientToken, show, checkout }: BraintreeProps) => {
  const [braintreeInstance, setBraintreeInstance] = useState<
    Dropin | undefined
  >();

  useEffect(() => {
    if (show) {
      const config = {
        authorization: clientToken,
        container: '#braintree-drop-in-div',
      };

      /**
       * InitializeBraintree Method Callback
       * @param error
       * @param instance
       */
      const callback = (error: object | null, instance: Dropin | undefined) => {
        if (error) console.error(error);
        else setBraintreeInstance(instance);
      };

      const initializeBraintree = () => dropin.create(config, callback);

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
  }, [show]);

  const requestPaymentMethod = () => {
    /**
     * RequestPaymentMethod Callback
     * @param error
     * @param payload
     */
    const callback = (error: object | null, payload: PaymentMethodPayload) => {
      if (error) {
        console.error(error);
      } else {
        const paymentMethodNonce = payload.nonce;
        console.log('payment method nonce', payload.nonce);
        // TODO: use the paymentMethodNonce to
        // call you server and complete the payment here
        checkout(paymentMethodNonce);
      }
    };

    braintreeInstance && braintreeInstance.requestPaymentMethod(callback);
  };

  return (
    <div
      className='braintree'
      style={{ display: `${show ? 'block' : 'none'}` }}
    >
      <div id={'braintree-drop-in-div'} />
      {braintreeInstance && (
        <button disabled={!braintreeInstance} onClick={requestPaymentMethod}>
          Pay Now
        </button>
      )}
    </div>
  );
};

export default Braintree;
