import React from "react";
import Contact from "../../components/Contact";
import contactData from "../../../public/data/contact/contact.json";

const ContactPage = () => {
  return (
    <div>
      <Contact contactData={contactData} />
    </div>
  );
};

export default ContactPage;
