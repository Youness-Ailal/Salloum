import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/ui/PageHeader";

function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"TERMS & CONDITIONS"} />
      <div className="container mx-auto text-start my-4 lg:my-8 text-lg leading-8 max-w-[80ch]">
        <h4 className="text-2xl lg:text-4xl font-medium text-sky-950 mb-8 leading-8 lg:leading-10">
          Terms and Conditions for Salloum Company
        </h4>
        <p>
          Welcome to Salloum Company. These terms and conditions outline the
          rules and regulations for the use of Salloum Company's website and
          services. By accessing this website, you agree to comply with and be
          bound by the following terms and conditions.
        </p>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Intellectual Property Rights
          </p>
          <p>
            Unless otherwise stated, Salloum Company owns the intellectual
            property rights for all material on this website. All intellectual
            property rights are reserved. You may access this content for
            personal use, but you must not republish, sell, or redistribute any
            material without prior written consent.
          </p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            User Responsibilities
          </p>
          <p>
            By using this website, you agree to use it only for lawful purposes.
            You must not use this website in any way that causes or may cause
            damage to the website or impair the availability or accessibility of
            the website.
          </p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Limitation of Liability
          </p>
          <p>
            Salloum Company will not be held liable for any damages arising out
            of or in connection with the use of this website. This includes,
            without limitation, direct, indirect, incidental, or consequential
            damages.
          </p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Governing Law
          </p>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of [Your Jurisdiction], and you submit to
            the exclusive jurisdiction of the courts in that state or location.
          </p>
        </div>
        <div className="my-4 mb-10">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Changes to Terms and Conditions
          </p>
          <p>
            Salloum Company reserves the right to revise these terms and
            conditions at any time. By using this website, you agree to be bound
            by the current version of these terms and conditions.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
