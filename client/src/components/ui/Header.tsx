function Header({ title1, title2 }) {
  return (
    <div className="flex flex-col text-center gap-1 uppercase text-sky-950 text-2xl xl:text-4xl font-semibold">
      <p>{title1}</p>
      <p className="font-bold text-sky-900">{title2}</p>
    </div>
  );
}

export default Header;
