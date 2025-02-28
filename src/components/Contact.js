"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = ({ contactData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace these with your EmailJS credentials
    const serviceID = "service_3yieedc";
    const templateID = "template_o93t3ew";
    const userID = "cQPlL-SBf23zPTuJo";

    // Send email using EmailJS
    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setSubmitStatus("success");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          }); // Reset form
        },
        (error) => {
          console.error("Failed to send email.", error);
          setSubmitStatus("error");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="px-6 md:px-10 lg:px-16 py-12 font-orpheus">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 -ml-2 lg:-ml-4">
          {/* How It Works Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg">
            <h2 className="font-orpheus font-normal whitespace-pre-wrap isolate text-[35.44px] leading-[55.9101px] block break-words antialiased w-[362.575px] h-[55.9125px] text-black mb-8">
              {contactData.process.title}
            </h2>
            <div className="space-y-8">
              {" "}
              {/* Increased gap between steps */}
              {contactData.process.steps.map((step, index) => (
                <div key={index} className="p-4 rounded-lg">
                  <h3 className="font-orpheus text-xl ml-[-20px] font-bold text-[18.16px] text-black -mt-8 mb-2">
                    {step.phase}
                  </h3>
                  <ul className="list-disc pl-5 space-y-0.5 mt-6 text-gray-900 block font-normal font-orpheus text-[18.16px] leading-[32.688px] tracking-[0.7264px] text-left antialiased break-words">
                    {step.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white p-6 md:p-8 rounded-lg -mt-12">
            {" "}
            {/* Reduced gap between last step and CTA */}
            <p className="font-normal font-orpheus text-lg text-[18.16px] leading-[32.688px] tracking-[0.7264px] text-gray-900 mb-3">
              {contactData.cta.text}
            </p>
            <div className="space-y-2">
              {/* Email */}
              <div>
                <p className="font-orpheus text-black font-normal text-[18.16px] leading-[32.688px] tracking-[0.7264px]">
                  Email
                </p>
                <p className="font-orpheus font-bold text-black text-[18.16px] leading-[32.688px] tracking-[0.7264px]">
                  {contactData.cta.contactInfo.email}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="font-orpheus font-bold text-black text-[18.16px] leading-[32.688px] tracking-[0.7264px]">
                  Phone
                </p>
                <p className="font-orpheus  text-black text-[18.16px] leading-[32.688px] tracking-[0.7264px]">
                  {contactData.cta.contactInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full lg:w-[45%] bg-white p-6 md:p-8 font-normal font-orpheus ml-auto mr-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <label className="font-normal text-[18.16px] block text-black">
              Name <span className="text-gray-600">(required)</span>
            </label>
            {/* First Name and Last Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-normal font-orpheus block text-lg text-black">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="font-normal font-orpheus block text-lg text-black">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-600"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="font-normal font-orpheus block text-lg text-black">
                Email <span className="text-gray-600">(required)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-600"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="font-normal font-orpheus block text-lg text-black">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-600"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="font-normal font-orpheus block text-lg text-black">
                Message <span className="text-gray-600">(required)</span>
              </label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-gray-600"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block font-orpheus text-white text-[16px] italic rounded-lg font-medium tracking-wide leading-normal text-center px-6 py-3 bg-black hover:bg-gray-800 transition duration-200 ease-in-out cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

            <span className="mt-8 font-normal font-orpheus block text-lg text-gray-900">
              Schedule time with me
            </span>

            {/* Submission Status Message */}
            {submitStatus === "success" && (
              <p className="text-green-600 font-montserrat">
                Message sent successfully!
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-600 font-montserrat">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
