import React from 'react';
import { FaAngleDown, FaFilePdf, FaFileImage, FaFileCode, FaWhatsapp } from 'react-icons/fa';

const Header = ({ handleDownload }) => {
  return (
    <section className="hero is-success">
      <div className="hero-body">
        <p className="title">
          QR Kod Oluşturucu
        </p>
        <p className="subtitle">
          www.diyaridem.com
        </p>
      </div>
      <div className="download-btns" style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <div className="dropdown is-right is-active">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>İndir</span>
              <span className="icon is-small">
                <FaAngleDown />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <button className="button is-info is-fullwidth" onClick={() => handleDownload('pdf')}>
                <span className="icon">
                  <FaFilePdf />
                </span>
                <span style={{ marginLeft: '5px', marginTop: '5px', marginBottom: '5px' }}>PDF Olarak İndir</span>
              </button>
              <button className="button is-warning is-fullwidth" onClick={() => handleDownload('jpg')}>
                <span className="icon">
                  <FaFileImage />
                </span>
                <span style={{ marginLeft: '5px', marginTop: '5px', marginBottom: '5px' }}>JPG Olarak İndir</span>
              </button>
              <button className="button is-success is-fullwidth" onClick={() => handleDownload('svg')}>
                <span className="icon">
                  <FaFileCode />
                </span>
                <span style={{ marginLeft: '5px', marginTop: '5px', marginBottom: '5px' }}>SVG Olarak İndir</span>
              </button>
              <button className="button is-primary is-fullwidth" onClick={() => handleDownload('share')}>
                <span className="icon">
                  <FaWhatsapp />
                </span>
                <span style={{ marginLeft: '5px', marginBottom: '5px' }}>WhatsApp'ta Paylaş</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
