/*!
 * File of ManyToOne Community
 * Licensed under the GPL-3.0 or later License: https://github.com/mtocommunity/landing-page/blob/master/LICENSE.md
 */

import { useState, useEffect } from "react";
import { ReactComponent as ArrowRight } from "@assets/icons/arrow-right.svg";
import { ReactComponent as Bars } from "@assets/icons/bars.svg";
import { ReactComponent as Xmark } from "@assets/icons/xmark.svg";
import { MTOTransparentBackground } from "../../../../assets";
import { ButtonType } from "../../../general/attoms/button/types";
import Button from "../../../general/attoms/button";

import "./style.css";
import React from "react";

type Props = {
  children: React.ReactNode;
  fixed: boolean;
  full?: boolean;
};

function CustomNavBar({ children, fixed = false, full }: Props) {
  const [toggle, setToggle] = useState(true);
  const [isTop, setIsTop] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", !toggle);
    const handleScroll = (e: Event) => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsTop(scrollTop === 0);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [toggle]);

  const handleLinkClick = () => {
    setToggle(true);
  };

  const renderButton = (additionalClasses = "") => (
    <Button
      type={ButtonType.BORDER_BLUE}
      link="https://discord.mtocommunity.com/"
      className={`lg:flex ${additionalClasses} flex`}
    >
      <span>Contáctanos</span>
      <ArrowRight className="ml-2 mt-0.5 w-5 fill-mto_blue" />
    </Button>
  );

  return (
    <>
      <header
        className={`flex items-center w-full h-16 lg:h-24${
          fixed ? " fixed" : ""
        } bg-gradient-to-b ${
          isTop
            ? "bg-transparent"
            : "from-mto_dark_gray to-mto_dark_gray lg:from-mto_dark_gray lg:via-mto_dark_gray/90"
        } top-0 px-4 transition-colors z-50 lg:w-[100%] lg:mx-auto lg:pt-6 lg:pb-4`}
      >
        <a
          className={`h-full flex items-center ${!toggle ? "hidden" : ""}`}
          href="/"
        >
          <MTOTransparentBackground className="h-full lg:h-[150%] aspect-square" />
          {full && (
            <span className="font-main_sans flex items-center font-semibold ml-2">
              MTO Community
            </span>
          )}
        </a>
        <div
          className="text-white lg:hidden text-2xl ml-auto"
          onClick={handleToggle}
        >
          {toggle ? (
            <Bars class="w-5 fill-white" />
          ) : (
            <Xmark class="w-5 fill-white" />
          )}
        </div>
        <nav className="nav-desktop hidden lg:flex justify-center items-center font-onest flex-1">
          <div className="flex justify-center items-center w-full h-full">
            {children}
          </div>
        </nav>
        {renderButton("hidden lg:flex")}
      </header>
      <div
        className={`nav-mobile min-h-screen flex fixed w-full h-full bg-mto_dark_gray text-white flex-col items-center justify-center text-xl lg:hidden ${
          !toggle ? "active" : ""
        }`}
        onClick={handleLinkClick}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child as React.ReactElement<any>, {
            key: index,
            className: "mb-4",
          })
        )}
        {renderButton("mt-4")}
      </div>
    </>
  );
}

export default CustomNavBar;
