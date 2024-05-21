import React from "react";

const year = new Date().getFullYear();

function page() {
  return (
    <div className=" flex min-h-screen w-full items-center justify-center">
      <div className="mx-6 mt-20 flex w-fit max-w-2xl flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold">Terms of Use</h1>
          <p>Last Updated: 06/01/2024</p>
        </div>
        <p className="text-sm">
          Welcome to the Helper-Scripts website. By accessing or using this
          website, you agree to comply with and be bound by the following terms
          and conditions. If you do not agree to these terms, please do not use
          this website.
        </p>
        <div>
          <h2 className="text-xl font-medium">Ownership and Copyright</h2>
          <p className="text-sm">
            All content, including text, images, code, and multimedia, is the
            property of tteck unless otherwise stated.
          </p>
          <p className="text-sm">Copyright {year} tteck. All rights reserved.</p>
        </div>
        <div>
          <h2 className="text-xl font-medium">Permitted Use</h2>
          <p className="text-sm">
            You are granted permission to view and use the materials on this
            website for your personal, non-commercial use only.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium">Restrictions</h2>
          <p className="text-sm">
            You may not: <br /> Copy, reproduce, distribute, modify, display,
            perform, publish, license, create derivative works from, transfer,
            or sell any content or code from this website. Use any content or
            code for commercial purposes. Use any content or code in a manner
            that suggests an association with tteck unless expressly permitted.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium">Termination</h2>
          <p className="text-sm">
            Your rights to use the website terminate automatically if you
            violate any of these terms. Upon termination, you must destroy any
            downloaded or printed materials from this website.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium">Governing Law</h2>
          <p className="text-sm">
            These terms shall be governed by and construed in accordance with
            the laws of the United States of America.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium">Contact Information </h2>
          <p className="text-sm">For further information, please contact tteckster@gmail.com.</p>
        </div>
      </div>
    </div>
  );
}

export default page;
