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
    let ctx = gsap.context(() => {
      const slogans = gsap.utils.toArray(".slogan");
      const tl = gsap.timeline();
      const duration = 0.5;
      const tl2 = gsap.timeline({ paused: true });
      slogans.forEach((slogan, i) => {
        tl2.to(slogans.slice(0, i), {
          y: `-=80`,
          duration: duration,
        });

        tl.from(slogan, {
          y: 80,
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

      /* slogans.forEach((slogan, i) => {
        const tl2 = gsap.timeline({ paused: true });

        tl2.to(slogans.slice(0, i), {
          y: `-=50`,
          duration: 0.55,
        });

        tl.from(slogan, {
          autoAlpha: true,
          y: 50,
          duration: 0.55,
          ease: "none",
          onStart: () => {
            tl2.play();
          },
        });
      });
 */
      // -------------------------------------------------------------------------------

      let restartTimer;

      let t = gsap.to(scrollContainerRef.current, {
        scrollTo: { y: "max", autoKill: true },
        duration: 600,
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
              duration: 600 * (1 - currentScroll / maxScroll),
            });
          });
        },
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section className='w-full flex flex-row-reverse gap-8' ref={comp}>
      <div className='absolute top-0 left-0 w-full h-screen bg-blue-50 block z-30' ref={overlayRef}></div>
      <div className='w-full h-screen flex content-center items-center bg-blue-50'>
        <div className='w-full flex flex-col justify-between mx-[5vw] relative'>
          <div className='relative h-[50vh] overflow-hidden z-40'>
            <h1 className='text-8xl uppercase slogan absolute bottom-20'>Navigating</h1>
            <h1 className='text-8xl uppercase slogan absolute bottom-20'>the future</h1>
            <h1 className='text-8xl uppercase slogan absolute bottom-20'>of maritime</h1>
            <h1 className='text-8xl uppercase slogan absolute bottom-20'>industry</h1>
          </div>
          <div className='ml-auto'>
            <p className='text-2xl mb-8'>
              Over 60 years of <br />
              tradition in training, <br />
              teaching and knowledge <br />
              transfer to future seafarers.
            </p>
            <Button text='About us' link='/about' />
          </div>
        </div>
      </div>
      <div className='w-full h-screen z-0'>
        <div className='flex flex-row gap-8 relative overflow-x-scroll scrollbar-hide' ref={scrollContainerRef} id='row-scroller'>
          <div className='flex flex-col gap-8 h-screen w-full' ref={row1Ref}>
            {images.row1.map((image) => (
              <div key={image.id} className={`${image.light && "light-image"} relative`}>
                <div className='aspect-[3/4] relative h-full w-full'>
                  <Image src={image.image} alt={image.description} fill className='object-cover' sizes='50vw' />
                </div>
                <p className={`uppercase font-bold absolute bottom-0 px-6 pb-6 ${image.light ? "text-black" : "text-white"}`}>
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
                <p className={`uppercase font-bold absolute bottom-0 px-6 pb-6 ${image.light ? "text-black" : "text-white"}`}>
                  {image.title} • <span className='normal-case font-normal'>{image.description}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
