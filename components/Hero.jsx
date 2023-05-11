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

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
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
      <div className='w-full h-screen flex content-center items-center bg-blue-50'>
        <div className='w-full flex flex-col justify-between pt-[24.5vh] pr-[5vw] pb-[3.75rem] pl-[4vw]'>
          <h1 className='text-7xl uppercase'>
            Navigating
            <br />
            the future
            <br />
            of maritime
            <br />
            industry
          </h1>
          <div className='ml-auto'>
            <p className='text-3xl mb-8'>
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
          <div className='flex flex-col gap-8 h-screen w-full'>
            {images.row1.map((image) => (
              <div key={image.id} className={`${image.light && "light-image"} relative`}>
                <div className='aspect-[3/4] relative h-full w-full'>
                  <Image src={image.image} alt={image.description} fill className='object-cover' sizes='25vw' />
                </div>
                <p className={`uppercase font-bold absolute bottom-0 px-6 pb-6 ${image.light ? "text-black" : "text-white"}`}>
                  {image.title} • <span className='normal-case font-normal'>{image.description}</span>
                </p>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-8 h-screen w-full'>
            {images.row2.map((image) => (
              <div key={image.id} className='relative'>
                <div className='aspect-[2/3] relative h-full w-full'>
                  <Image src={image.image} alt={image.description} fill className='object-cover' sizes='25vw' />
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
