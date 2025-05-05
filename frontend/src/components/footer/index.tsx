// src/components/footer
import { Link } from 'react-router-dom';
import './styles.scss';

const CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID || "817845132363038750";

function Footer() {

  return (
    <div className="component footer-component">

      <div className="footer">
        <div className="container">
          <div className="footer-sections-top">
            <div className="row">

              <div className="column col-md-4">
                <div className="footer-section">
                  <div className="section-title">Get started:</div>
                  <div className="section-links">
                    <a href={`https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}`} target='_blank' rel="noopener noreferrer">Invite bot</a>
                  </div>
                </div>
              </div>

              {/* Change the others back to col-md-3 */}
              {/* <div className="column col-md-3">
                <div className="footer-section">
                  <div className="section-title">Explore:</div>
                  <div className="section-links">
                    <a href="/features">Features</a>
                    <a href="/commands">Commands</a>
                  </div>
                </div>
              </div> */}

              <div className="column col-md-4">
                <div className="footer-section">
                  <div className="section-title">Contact:</div>
                  <div className="section-links">
                    <a href="mailto:support@botveon.com">Mail</a>
                    <a href="https://discord.gg/P3x9xtgFRH" target="_blank" rel="noopener noreferrer">Support Server</a>
                  </div>
                </div>
              </div>

              <div className="column col-md-4">
                <div className="footer-section">
                  <div className="section-title">Legal:</div>
                  <div className="section-links">
                  <a href="https://github.com/Gleyveon/Botveon-TOS" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                  <a href="https://github.com/Gleyveon/Botveon-TOS" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="footer-sections-bottom">
            <div className="footer-section">
              <div className='copyright'>&copy; {new Date().getFullYear()} Botveon. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
