"use client";

import Image from "next/image";

import { Button } from "@/components/ui/NeoBrutalismButton";
import { IconMenu2, IconMoon, IconSun, IconXboxX } from "@tabler/icons-react";
import React from "react";

import { useTheme } from "next-themes";

export const Navbar = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-md md:max-w-3xl lg:max-w-7xl mt-6 mx-auto h-18 flex items-center px-4 border-border border-2 shadow-shadow justify-between bg-navbar-light">
          <div className="hidden md:contents">
            <DesktopNavbar />
          </div>
          <div className="md:hidden w-full">
            <MobileNavbar />
          </div>
        </div>
      </div>

      <div className="h-24"></div>
    </>
  );
};

export const MobileNavbar = () => {
  const [open, setOpen] = React.useState(false);

  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between items-center w-full max-w-2xl mx-auto relative">
      <h1 className="text-2xl px-6 rounded-tl-xl rounded-br-xl p-1 font-bold font-heading shadow-shadow bg-background">
        <span>BookFm</span>
      </h1>

      <div className="flex items-center gap-2 relative">
        <Button onClick={() => setOpen(!open)} variant="neutral">
          <IconMenu2 />
        </Button>

        {open && (
          <div className="absolute top-12 w-48 right-0 bg-surface shadow-shadow border-border border-2 rounded-md p-4 flex flex-col items-baseline gap-4 z-50">
            <p className="font-heading text-lg">Features</p>
            <p className="font-heading text-lg">Explore</p>
            <Button variant="neutral" className="w-fit">
              SignUp
            </Button>
            <Button variant="neutral" className="w-fit">
              Login
            </Button>

            {theme === "dark" ? (
              <Button variant="neutral" onClick={() => setTheme("light")}>
                <IconSun />
              </Button>
            ) : (
              <Button variant="neutral" onClick={() => setTheme("dark")}>
                <IconMoon />
              </Button>
            )}

            <Button onClick={() => setOpen(!open)}>
              <IconXboxX />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const DesktopNavbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <h1 className="text-2xl px-6 rounded-tl-xl rounded-br-xl p-1 font-bold font-heading shadow-shadow bg-background">
        <span>BookFm</span>
      </h1>

      <div className="flex gap-4">
        <p className="font-heading text-xl ">Features</p>
        <p className="font-heading text-xl  ">Explore</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="neutral" className="mr-2">
          SignUp
        </Button>
        <Button variant="neutral" className="">
          Login
        </Button>

        {theme === "dark" ? (
          <Button variant="neutral" onClick={() => setTheme("light")}>
            <IconSun />
          </Button>
        ) : (
          <Button variant="neutral" onClick={() => setTheme("dark")}>
            <IconMoon />
          </Button>
        )}
      </div>
    </>
  );
};
