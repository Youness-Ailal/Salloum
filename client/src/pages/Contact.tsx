import MainLayout from "@/layouts/MainLayout";

function Contact() {
  return (
    <MainLayout heightMobile="300px" height="400px">
      <div className="container mx-auto p-8 xl:p-12">
        <p className="uppercase text-lg lg:text-xl tracking-wider text-sky-400 font-medium mb-2 lg:mb-5">
          Salloumi Company Equipments
        </p>
        <p className="text-3xl lg:text-6xl  uppercase text-white font-bold mt-4">
          Contact Us
        </p>
      </div>
    </MainLayout>
  );
}

export default Contact;
