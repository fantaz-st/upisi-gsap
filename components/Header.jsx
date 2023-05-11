import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const logoRef = useRef(null);
  const headerRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let sections = gsap.utils.toArray(".light-image");
    const scroller = document.getElementById("row-scroller");

    let ctx = gsap.context(() => {
      const logo = logoRef.current;

      const t = gsap.to(logo, {
        color: "#000000",
        paused: true,
      });

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          markers: false,
          scroller: scroller,
          onEnter: () => {
            console.log("enter");
            t.play();
          },
          onEnterBack: () => t.play(),
          onLeave: () => t.reverse(),
          onLeaveBack: () => t.reverse(),
          start: "top 40",
          end: "bottom 85",
        });
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className='w-full flex justify-between px-8 h-24 items-center fixed z-40' ref={headerRef}>
      <div id='logo' className='relative'>
        <Link href='/'>
          <h1 ref={logoRef} className='text-lg font-semibold text-white tracking-wider'>
            perfect
          </h1>
        </Link>
      </div>
      <Link href='/'>
        <p>Idemo na upise</p>
      </Link>
    </div>
  );
};
export default Header;
