import React, { forwardRef, useEffect } from 'react';
import QrCode from 'react-qr-code';

const CustomQRCode = forwardRef(({ value, bgColor, fgColor, size, frameColor, frameWidth }, ref) => {
  useEffect(() => {
    // QRCode bileşeni oluşturulduğunda burada herhangi bir özel işlem yapabilirsiniz
    // Eğer gerekmiyorsa useEffect'i kaldırabilirsiniz
  }, []);

  const frameStyle = {
    padding: `${frameWidth}px`,
    backgroundColor: frameColor,
    display: 'inline-block',
  };

  return (
    <div style={frameStyle}>
      <QrCode ref={ref} value={value} bgColor={bgColor} fgColor={fgColor} size={size} />
    </div>
  );
});

export default CustomQRCode;
