import Image from "next/image";
import gsap from "gsap";
import Button from "./Button";
import { images } from "@/helpers/images";
import { useLayoutEffect, useEffect, useRef } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Observer } from "gsap/dist/Observer";

gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const comp = useRef();
  const scrollContainerRef = useRef(null);
  const overlayRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    let logo = document.getElementById("logo");

    let ctx = gsap.context(() => {
      const slogans = gsap.utils.toArray(".slogan");
      const tl = gsap.timeline({ delay: 0.5 });
      const duration = 0.5;
      const tl2 = gsap.timeline({ paused: true });

      slogans.forEach((slogan, i) => {
        tl2.to(slogans.slice(0, i), {
          y: `-=100%`,
          duration: duration,
        });

        tl.from(slogan, {
          y: "100%",
          duration: duration,
          autoAlpha: true,
          ease: "easeInOut",
          onStart: () => {
            tl2.play();
          },
        });
      });
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "easeInOut",
        display: "none",
      });
      tl.from(row1Ref.current, {
        y: -100,
        opacity: 0,
        ease: "easeOut",
        delay: -0.3,
      });
      tl.from(row2Ref.current, {
        y: -100,
        opacity: 0,
        ease: "easeOut",
        delay: -0.4,
      });

      let restartTimer;

      let t = gsap.to(scrollContainerRef.current, {
        scrollTo: { y: "max", autoKill: true },
        duration: 400,
      });

      Observer.create({
        target: scrollContainerRef.current,
        type: "wheel,touch",
        onChange: () => {
          restartTimer && restartTimer.kill();
          restartTimer = gsap.delayedCall(1, () => {
            const maxScroll = scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight;
            const currentScroll = scrollContainerRef.current.scrollTop;
            t = gsap.to(scrollContainerRef.current, {
              scrollTo: { y: "max", autoKill: true },
              duration: 400 * (1 - currentScroll / maxScroll),
            });
          });
        },
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={comp}>
      <div className='intro-overlay absolute top-0 left-0 w-full h-screen bg-blue-50 block z-30' ref={overlayRef}></div>
      <div className='hero w-full flex flex-col xl:flex-row-reverse gap-8'>
        <div className='hero-left w-full h-[80vh] md:h-screen flex content-center items-center bg-blue-50'>
          <div className='w-full flex flex-col justify-between mx-[5vw] relative h-[50vh]'>
            <div className='title relative top-[40%] xl:top-[50%]'>
              <h1 className='3xl:text-7xl 2xl:text-6xl xl:text-5xl text-5xl font-[500] uppercase slogan absolute z-40 slogan-text'>Navigating</h1>
              <h1 className='3xl:text-7xl 2xl:text-6xl xl:text-5xl text-5xl font-[500] uppercase slogan absolute z-40 slogan-text'>the future</h1>
              <h1 className='3xl:text-7xl 2xl:text-6xl xl:text-5xl text-5xl font-[500] uppercase slogan absolute z-40 slogan-text'>of maritime</h1>
              <h1 className='3xl:text-7xl 2xl:text-6xl xl:text-5xl text-5xl font-[500] uppercase slogan absolute z-40 slogan-text'>industry</h1>
            </div>
            <div className='subtitle absolute top-[90%]'>
              <p className='text-xl xl:text-2xl mb-8'>Over 60 years of tradition in training, teaching and knowledge transfer to future seafarers.</p>
              <Button text='About us' link='/about' />
            </div>
          </div>
        </div>
        <div className='hero-right w-full h-screen z-0'>
          <div className='flex flex-row gap-8 relative overflow-x-scroll scrollbar-hide' ref={scrollContainerRef} id='row-scroller'>
            <div className='flex flex-col gap-8 h-screen w-full' ref={row1Ref}>
              {images.row1.map((image) => (
                <div key={image.id} className={`${image.light && "light-image"} relative`}>
                  <div className='aspect-[3/4] relative h-full w-full'>
                    <Image src={image.image} alt={image.description} fill className='object-cover' sizes='50vw' />
                  </div>
                  <p className={`uppercase text-sm md:text-base font-bold absolute bottom-0 px-2 pb-2 md:px-6 md:pb-6 ${image.light ? "text-black" : "text-white"}`}>
                    {image.title} • <span className='normal-case font-normal'>{image.description}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-8 h-screen w-full' ref={row2Ref}>
              {images.row2.map((image) => (
                <div key={image.id} className='relative'>
                  <div className='aspect-[2/3] relative h-full w-full'>
                    <Image src={image.image} alt={image.description} fill className='object-cover' sizes='50vw' />
                  </div>
                  <p className={`uppercase text-sm md:text-base font-bold absolute bottom-0 px-2 pb-2 md:px-6 md:pb-6 ${image.light ? "text-black" : "text-white"}`}>
                    {image.title} • <span className='normal-case font-normal'>{image.description}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
