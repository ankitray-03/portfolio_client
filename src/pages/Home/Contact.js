import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const Contact = () => {
  const { portFolioData } = useSelector((state) => state.root);
  const { contact } = portFolioData;

  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map((key) => {
            return (
              key !== "_id" && (
                <p className="ml-5 text-md">
                  <span className="text-tertiary">{key} : </span>
                  <span className="text-tertiary">{contact[key]}</span>
                </p>
              )
            );
          })}
          <p className="text-white">{"}"}</p>
        </div>
        <div className="h-[400px]">
          <dotlottie-player
            src="https://lottie.host/a4196121-eb6d-466c-b6d9-bd301b3bce48/HkJW2DmuSO.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
};

export default Contact;
