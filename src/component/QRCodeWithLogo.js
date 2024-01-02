// src/components/QRCodeWithLogo.js

import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';

const QRCodeWithLogo = ({ value, bgColor, fgColor, logoSrc }) => {
  const qrCodeRef = useRef(null);
  const [canvasURL, setCanvasURL] = useState('');

  useEffect(() => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current._canvas;
      const context = canvas.getContext('2d');

      // QR kodu çizildikten sonra logoyu ekleyin
      if (logoSrc) {
        const logo = new Image();
        logo.src = logoSrc;

        logo.onload = () => {
          const logoSize = canvas.width / 4; // Logo boyutunu ayarlayabilirsiniz
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;

          // QR kodu üzerine logo ekleyin
          context.drawImage(logo, x, y, logoSize, logoSize);
        };
      }

      // Canvas'tan URL alın
      setCanvasURL(canvas.toDataURL());
    }
  }, [value, bgColor, fgColor, logoSrc]);

  return <img src={canvasURL} alt="QR Code" />;
};

export default QRCodeWithLogo;
