"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePathname } from "next/navigation";

export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 750,
      once: true,
      easing: "ease-out-cubic",
      offset: 40,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  return null;
}
