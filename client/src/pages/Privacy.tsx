import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/ui/PageHeader";

function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"PRIVACY POLICY"} />
      <div className="container mx-auto text-start my-4 lg:my-8 text-lg leading-8 max-w-[80ch]">
        <h4 className="text-2xl lg:text-4xl font-medium text-sky-950 mb-8 leading-8 lg:leading-10">
          Privacy Policy for Salloum Company
        </h4>
        <p>
          At Salloum Company, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines the
          types of data we collect, how we use it, and the measures we take to
          safeguard your information.
        </p>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Information We Collect
          </p>
          <p>
            We collect various types of information, including personal details
            such as your name, email address, and phone number when you
            voluntarily provide it to us. We may also gather non-personal data,
            such as your browsing behavior on our site, to enhance your
            experience.
          </p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            How We Use Your Information
          </p>
          <p>
            The information we collect is used to personalize your experience,
            improve our website, and provide you with relevant content and
            offers. We may also use your information to communicate with you,
            process transactions, or respond to your inquiries.
          </p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Data Protection and Security
          </p>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information. Your data is stored securely, and we
            use encryption and other technologies to protect against
            unauthorized access.
          </p>
        </div>
        <div className="my-4 mb-10">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Your Rights
          </p>
          <p>
            You have the right to access, correct, or delete your personal
            information. If you wish to exercise these rights or have any
            questions about our Privacy Policy, please contact us at
            contact@salloumcompany.com
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Privacy;
