import React from "react";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mockup-browser bg-base-300 border">
        <div className="mockup-browser-toolbar">
          <div className="input">https://contentlens.com/not-found</div>
        </div>
        <div className="bg-base-200 flex justify-center px-4 py-16 flex-col items-center">
          <h2 className="font-bold">404</h2>
          <h3 className="font-bold">Not Found!</h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
