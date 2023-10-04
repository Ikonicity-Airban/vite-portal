import logo from "/logo.png";

export default function LogoComponent() {
  return (
    <div className=" flex items-center">
      <img src={logo} alt="logo" className="w-10" />
      <h2 className="logo-clipped text-xl logo font-bold">
        CS<span className="text-xl text-black">DP</span>
      </h2>
    </div>
  );
}
