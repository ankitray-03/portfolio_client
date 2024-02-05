import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useState } from "react";
import { useSelector } from "react-redux";

function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portFolioData} = useSelector((state)=>state.root);
  const {experiences} = portFolioData;

  return (
    <div>
      <SectionTitle title="Experience" />
      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:fkex-row sm:overflow-x-scroll sm:w-full">
          {experiences.map((experience, index) => {
            return (
              <div
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className="cursor-pointer"
              >
                <h1
                  className={`text-xl px-5 
                  ${
                    selectedItemIndex === index
                      ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a48] py-3"
                      : "text-white"
                  }`}
                >
                  {experience.period}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-2xl">
            {experiences[selectedItemIndex].title}
          </h1>
          <h1 className="text-tertiary text-2xl">
            {experiences[selectedItemIndex].company}
          </h1>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum velit,
            ullam dolorem deserunt cumque illum est hic sit nulla ducimus iste
            quam nam, asperiores cupiditate enim molestias, nisi harum
            temporibus?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
