import React from "react";

const Contact = ({ contactData }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 space-y-8">
          {/* How It Works Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className=" font-montserrat text-2xl font-light text-gray-800 mb-5">
              {contactData.process.title}
            </h2>
            <div className="space-y-5">
              {contactData.process.steps.map((step, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="font-montserrat text-xl font-semibold text-gray-700 mb-2">
                    {step.phase}
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {step.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg ">
            <p className="font-montserrat text-lg text-gray-800 mb-4">
              {contactData.cta.text}
            </p>
            <div className="space-y-1">
              <a
                href={`mailto:${contactData.cta.contactInfo.email}`}
                className="font-montserrat block text-blue-600 hover:text-blue-700 font-medium"
              >
                📧 {contactData.cta.contactInfo.email}
              </a>
              <a
                href={`tel:${contactData.cta.contactInfo.phone}`}
                className="font-montserrat block text-blue-600 hover:text-blue-700 font-medium"
              >
                📞 {contactData.cta.contactInfo.phone}
              </a>
              <a
                href={`tel:${contactData.cta.contactInfo.address}`}
                className="font-montserrat font-light"
              >
                📍 {contactData.cta.contactInfo.address}
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 md:p-8 rounded-lg ">
          <h2 className="font-montserrat text-2xl font-light font-montserrat text-gray-800 mb-5">
            {contactData.formHeading}
          </h2>
          <form className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="font-montserrat block text-lg  text-gray-700">
                Name(required)
              </label>
              <input
                type="text"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="font-montserrat block text-lg  text-gray-700">
                Email(required)
              </label>
              <input
                type="email"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            {/* Phone Field */}
            <div>
              <label className="font-montserrat block text-lg  text-gray-700">
                Phone
              </label>
              <input
                type="phone"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="font-montserrat block text-lg  text-gray-700">
                Message(required)
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-1/3 lg:w-1/3 font-montserrat bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
