import { Button, TextInput, Textarea } from "flowbite-react";

import { BreadcrumbComponents } from "./components";
import LogoComponent from "./components/LogoComponent";
import Section from "./components/Section";

function ContactPage() {
  return (
    <main className="p-4">
      <BreadcrumbComponents />
      <Section subtitle="Contact Us Now">
        <div className="p-4">
          <section className="max-w-screen-laptop mx-auto mb-10 text-justify text-sm">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              odio, maxime itaque minus quidem incidunt accusamus, numquam
              cumque quisquam temporibus autem debitis. Qui placeat nobis quis?
              Alias architecto eligendi et.
            </p>
          </section>
          <Section>
            <div className="absolute inset-0 bg-gray-300 text-center">
              <iframe
                style={{
                  filter: "grayscale(0.6) contrast(1.2) opacity(0.4) blur(1px)",
                }}
                title="map"
                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Enugu&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                width="100%"
                height="100%"
              ></iframe>
            </div>
            <div className="container md:px-5 py-24 mx-auto flex">
              <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                <h3 className="my-4 text-center font-medium title-font logo-clipped">
                  Contact Form
                </h3>
                <div className="mx-auto mb-6">
                  <LogoComponent />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <TextInput type="email" id="email" name="email" />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></Textarea>
                </div>
                <Button gradientDuoTone="greenToBlue">Submit</Button>
                <p className="text-xs text-gray-500 mt-3">
                  we will respond as soon as we get the contact
                </p>
              </div>
            </div>
          </Section>
        </div>
      </Section>
    </main>
  );
}

export default ContactPage;
