import Link from "next/link";

const Button = ({ text, link }) => {
  return (
    <div className='inline-block group'>
      <div className="relative before:opacity-0 before:absolute before:top-[30%] before:content-[''] before:bg-red-500 before:block before:h-3 before:w-3 before:rounded-full group-hover:before:-translate-x-2 group-hover:before:opacity-100 before:transition-all before:duration-300 before:ease-in-out">
        <Link href={link}>
          <p className='uppercase text-lg font-bold group-hover:translate-x-2 transition-all duration-300 ease-in-out'>{text}</p>
        </Link>
      </div>
    </div>
  );
};
export default Button;
