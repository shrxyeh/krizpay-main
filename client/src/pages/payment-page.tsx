import React, { useEffect, useState } from 'react';

const OnmetaPayment: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/onmeta-config')
      .then(res => res.json())
      .then(data => setApiKey(data.apiKey));

    const script = document.createElement('script');
    script.src = 'https://stg.platform.onmeta.in/onmeta-sdk.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (apiKey && window.onMetaWidget) {
      const createWidget = new window.onMetaWidget({
        elementId: 'widget',
        apiKey: apiKey,
        environment: 'staging',
        // Example params - you would fetch these from your state or props
        fiatAmount: 100, // Example amount
        // upi_id: 'merchant@upi', // This would come from the QR scanner
        // merchant_tx_id: 'txn' + Date.now() // A unique transaction ID
      });
      createWidget.init();

      createWidget.on('SUCCESS', (data: any) => {
        console.log('Payment successful:', data);
        // Redirect to a success page or show a success message
      });

      createWidget.on('FAILED', (data: any) => {
        console.error('Payment failed:', data);
        // Redirect to a failure page or show an error message
      });
    }
  }, [apiKey]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Crypto Payment</h1>
        <div id="widget"></div>
      </div>
    </div>
  );
};

declare global {
  interface Window {
    onMetaWidget: any;
  }
}

export default OnmetaPayment; 