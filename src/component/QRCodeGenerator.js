import React, { useState, useRef } from 'react';
import CustomQRCode from './QRCode';
import html2pdf from 'html2pdf.js';
import domtoimage from 'dom-to-image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bulma/css/bulma.min.css'; // Bulma stil dosyasını doğrudan ekleyin
import Icon from '@mdi/react';
import { mdiLinkBox, mdiFormatColorFill, mdiPalette } from '@mdi/js';
import Header from './Header';
import CircularProgress from '@mui/material/CircularProgress';

import CircularProgressWithLabel from './CircularWithValueLabel'; // Update the path and component name accordingly


const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrCodeColor, setQRCodeColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [loading, setLoading] = useState(false);
  const qrCodeRef = useRef(null);

  const handleChange = (e) => {
    setLoading(true);
    setUrl(e.target.value);
    // Simulate a delay (e.g., 500 milliseconds) to give time for CircularProgress to show
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleColorChange = (e) => {
    setQRCodeColor(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleDownload = async (format) => {
    try {
      setLoading(true);
      let message = '';
      if (format === 'pdf') {
        const input = qrCodeRef.current;
        await html2pdf(input, {
          margin: [100, 0, 50, 50], // Sol, üst, sağ, alt kenar boşlukları
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
          },
          html2canvas: {
            scale: 2, // İsteğe bağlı, çözünürlük ayarı
          },
          pagebreak: { mode: 'avoid-all' }, // Sayfa sonu ekleme özelliği
          left: 100, // Sol tarafa doğru kaydırma miktarı (örnekte 15 mm)
        });
        message = 'PDF indirme işlemi başarılı.';
      } else if (format === 'jpg') {
        const svg = document.querySelector('svg');
        if (svg) {
          const blob = await domtoimage.toBlob(svg);
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'qrcode.jpg';
          link.click();
          message = 'JPG indirme işlemi başarılı.';
        }
      } else if (format === 'svg') {
        const svg = document.querySelector('svg');
        if (svg) {
          const svgContainer = document.createElement('div');
          svgContainer.appendChild(svg.cloneNode(true));

          const svgString = new XMLSerializer().serializeToString(svgContainer);

          const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'qrcode.svg';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          message = 'SVG indirme işlemi başarılı.';
        }
      } else if (format === 'share') {
        // WhatsApp'ta paylaşma işlemi
        const img = document.querySelector('img');
        if (img) {
          const dataUrl = img.src;
          if (navigator.share) {
            await navigator.share({
              title: 'QR Code',
              text: 'QR Code ile paylaşılan link',
              url: dataUrl,
            });
          } else {
            throw new Error('Tarayıcınız paylaşma özelliğini desteklemiyor.');
          }
        } else {
          throw new Error('QR kodu oluşturulmamış.');
        }
      }

      toast.success(message);
    } catch (error) {
      toast.error('İşlem başarısız oldu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
   <Header handleDownload={handleDownload} /> {/* Header bileşeni ekledik */}

      <div className="card" style={{ maxWidth: '400px', margin: 'auto' }}>
        <div className="card-content">
          <div className="inputlar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label className="url">
              URL Girin:<Icon path={mdiLinkBox} size={1} />
              <input type="text" value={url} onChange={handleChange} className="control is-small is-loading" />
            </label>

            <label>
              <Icon path={mdiPalette} size={1} />
              QR Kod Rengi:
              <input type="color" value={qrCodeColor} onChange={handleColorChange} />
            </label>

            <label>
              <Icon path={mdiFormatColorFill} size={1} />
              Arka Plan Rengi:
              <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
            </label>
          </div>
        </div>
      </div>
      {url && (
       <div>
       <h3>Oluşturulan QR Kod:</h3>
       {loading ? (
        <CircularProgressWithLabel value={50} />

       ) : (
         <CustomQRCode
           ref={qrCodeRef}
           value={url}
           bgColor={backgroundColor}
           fgColor={qrCodeColor}
           size={252}
         />
       )}
     </div>
      )}

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />

      <footer className="footer has-text-white has-background-success">
        <div className="content has-text-centered">
          <p>
            <strong>Diyaridem</strong> by <a href="https://diyaridem.com">Theme</a>. Tüm hakları saklıdır
            <a href="http://opensource.org/licenses/mit-license.php"> TMB</a>. diyaridem.com
            is licensed <a href="http://diyaridem.com">İnegöl/Bursa</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QRCodeGenerator;
