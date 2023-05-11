import Link from "next/link";

const Header = () => {
  return (
    <div className='w-full flex justify-between px-8 h-24 items-center fixed z-40'>
      <div id='logo' className='relative'>
        <Link href='/'>
          <h1 className='text-lg font-semibold text-black tracking-wider'>perfect</h1>
        </Link>
      </div>
      <Link href='/'>
        <p>Idemo na upise</p>
      </Link>
    </div>
  );
};
export default Header;
