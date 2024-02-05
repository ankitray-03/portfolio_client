import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const Projects = () => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portFolioData } = useSelector((state) => state.root);
  const { projects } = portFolioData;
  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:fkex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => {
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
                  {project.title}
                </h1>
              </div>
            );
          })}
        </div>
        <a href={projects[selectedItemIndex].link}>
          <div className="flex items-center justify-center gap-10 m-0  sm:flex-col">
            <img src={projects[selectedItemIndex].image} alt="" />
          </div>
        </a>

        <div className="flex flex-col gap-5">
          <a href={projects[selectedItemIndex].link}>
            <h1 className="text-secondary text-2xl">
              {projects[selectedItemIndex].title}
            </h1>
          </a>

          <p className="text-white">
            {projects[selectedItemIndex].technologies}
          </p>
          <p className="text-white">
            {projects[selectedItemIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
