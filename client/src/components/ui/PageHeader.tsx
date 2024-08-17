import MainLayout from "@/layouts/MainLayout";

function PageHeader({ title }) {
  return (
    <MainLayout heightMobile="300px" height="400px">
      <div className="container flex flex-col mx-auto p-8 xl:p-12">
        {/* <p className="uppercase text-lg lg:text-xl tracking-wider text-sky-400 font-medium mb-2 lg:mb-5">
          Salloumi Company Equipments
        </p> */}
        <p className="text-3xl z-20 self-start relative lg:text-6xl text-white font-bold mt-4">
          {title}
          <span className="absolute w-1/3 h-[3px] left-0 -z-10 -bottom-2 rounded-sm  bg-sky-400"></span>
        </p>
      </div>
    </MainLayout>
  );
}

export default PageHeader;
