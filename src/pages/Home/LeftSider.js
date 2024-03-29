import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center ">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* <a href="https://remixicon.com/">
            <i class="ri-facebook-circle-fill text-gray-600 text-xl"></i>
          </a> */}

          {/* <i class="ri-mail-line text-gray-600 text-xl"></i>
          <i class="ri-instagram-line text-gray-600 "></i> */}
          <a href="https://www.linkedin.com/in/ankitray0308/">
          <i class="ri-linkedin-box-fill text-gray-600 "></i>
          </a>
          
          <a href="https://github.com/ankitray-03">
          <i class="ri-github-fill text-gray-600 "></i>
          </a>
          
        </div>

        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
