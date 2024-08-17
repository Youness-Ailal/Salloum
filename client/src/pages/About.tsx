import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/ui/PageHeader";

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"ABOUT US"} />
      <div className="container mx-auto text-start my-4 lg:my-8 text-lg leading-8 max-w-[80ch] ">
        <h4 className="text-2xl lg:text-4xl font-medium text-sky-950 mb-8 leading-8 lg:leading-10">
          Salloum Company Your Sustainable Industrial Equipment Source
        </h4>
        <p>
          Salloum Company, leveraging its extensive experience of over a decade,
          is wholly devoted to the restoration and reinvigoration of previously
          owned and surplus industrial equipment, firmly embracing the
          principles of a 'Circular Economy.' Our unwavering commitment lies in
          nurturing a sustainable future for our planet. Through the process of
          revitalizing equipment, we actively contribute to environmental
          conservation, while simultaneously providing our esteemed customers
          with machinery that is both resilient and trustworthy, ensuring
          lasting satisfaction for years to come.
        </p>
        <div className="my-4">
          <p className=" mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Buying Equipments
          </p>
          <p>
            Salloum Company is actively seeking opportunities to purchase used
            equipment. If you have recently replaced or upgraded your equipment
            and are looking to sell your old or obsolete items, we are
            interested in making an offer. We can also responsibly dismantle
            your installation if needed. Please provide details about your
            equipment.
          </p>
        </div>
        <div className="my-4 mb-10">
          <p className=" mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Selling Equipments
          </p>
          <p>
            Thank you for your interest in Salloum Company and our diverse range
            of equipment. We take pride in offering a wide selection of products
            to meet your specific needs. If you require any equipment, please
            don't hesitate to contact us, and we will be happy to assist you in
            finding the right solution. We can arrange for the delivery of the
            equipment to your desired location. Please reach out to us with your
            requirements, and we'll ensure a smooth and efficient process.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
