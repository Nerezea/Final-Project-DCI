import React from "react";
import "./footerLili.scss";
import { LuMapPin } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

const FooterL = () => {
  const currentYear = new Date().getFullYear();

  // Backend information about school
  const footerData = {
    schoolName: "Grundschule unter den Kastanien",
    address: "Kastanienstraße 21-24, 12105 Berlin",
    phone: "+49 30 7737168",
    email: "kastanien@grundschule.de",
    legalLinks: {
      imprint: "Impressum",
      privacyPolicy: "Datenschutz",
    },
    icons: [
      {
        name: "Map",
        icon: LuMapPin,
        url: "https://www.google.com/maps/place/Grundschule+unter+den+Kastanien/@52.4260727,13.3220058,17z/data=!3m2!4b1!5s0x47a85ae122a0808d:0xd28071f5329c999f!4m6!3m5!1s0x41653b7370d26db3:0x2de5455b9f5e29b7!8m2!3d52.4260727!4d13.3245861!16s%2Fg%2F1tgdh03r?entry=ttu", //52.42621260216221, 13.324509332799591
      },
      {
        name: "Mail",
        icon: HiOutlineEnvelope,
        url: `mailto:kastanien@grundschule.de`,
      },
      {
        name: "Facebook",
        icon: FaFacebookSquare,
        url: "https://www.facebook.com",
      },
      {
        name: "Instagram",
        icon: FaInstagram,
        url: "https://www.instagram.com",
      },
    ],
  };

  return (
    <div className="footer-desk">
      <div className="container-text">
        <div className="contact-details">
          <div className="contact-title">{footerData.schoolName}</div>
          <div className="contact-address">
            {footerData.address}
            <a href="" className="number">
              {footerData.phone} <span className="hover-arrow"> ↗</span>
            </a>
            <a href="mailto: kastanien@grundschule.de" className="mailaddress">
              {footerData.email} <span className="hover-arrow"> ↗</span>
            </a>
          </div>
        </div>
        <div className="navbar-small">
          <div className="imprint">{footerData.legalLinks.imprint}</div>
          <div className="data">{footerData.legalLinks.privacyPolicy}</div>
          <small className="copyright">Copyright ©{currentYear}.</small>
        </div>
      </div>
      <div className="container-ions">
        <div className="contact-icons">
          {footerData.icons.map((iconItem) => (
            <a
              key={iconItem.name}
              href={iconItem.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <iconItem.icon className={iconItem.name.toLowerCase()} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterL;
