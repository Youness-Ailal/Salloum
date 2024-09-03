import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/ui/PageHeader";

function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"TERMS & CONDITIONS"} />
      <div className="container mx-auto text-start my-4 lg:my-8 text-lg leading-8 max-w-[80ch]">
        <h4 className="text-2xl lg:text-4xl font-medium text-sky-950 mb-8 leading-8 lg:leading-10">
          Dispute Resolution
        </h4>
        <p>
          The European Commission provides a platform for online dispute
          resolution (OS):{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr
          </a>
          . You can find our email address in the legal notice above. We are
          neither willing nor obliged to participate in a dispute resolution
          procedure before a consumer arbitration board.
        </p>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Responsibility for Content
          </p>
          <p>
            As a service provider, we are responsible for our own content on
            these pages in accordance with general laws, pursuant to Section 7,
            Paragraph 1 of the TMG. However, according to Sections 8 to 10 TMG,
            as a service provider, we are not obligated to monitor third-party
            information transmitted or stored, or to investigate circumstances
            indicating illegal activity. The obligations to remove or block the
            use of information in accordance with general laws remain
            unaffected. However, liability in this regard is only possible from
            the moment we become aware of a concrete violation of the law. If we
            become aware of corresponding legal violations, we will immediately
            remove this content.
          </p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Responsibility for Links
          </p>
          <p>
            Our offer contains links to external third-party websites, over
            whose content we have no influence. Therefore, we cannot assume any
            responsibility for this external content. The respective provider or
            operator of the pages is always responsible for the content of the
            linked pages. Linked pages were checked for possible legal
            violations at the time of linking. No illegal content was apparent
            at the time of linking. However, a permanent control of the content
            of the linked pages is not reasonable without concrete evidence of
            an infringement. If we become aware of legal violations, we will
            immediately remove such links.
          </p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            Copyright
          </p>
          <p>
            The contents and works on these pages created by the site operators
            are subject to German copyright law. Reproduction, processing,
            distribution, and any form of exploitation beyond the limits of
            copyright law require the written consent of the respective author
            or creator. Downloads and copies of this page are only permitted for
            private, non-commercial use. If the content of this site was not
            created by the operator, the copyrights of third parties are
            respected. Third-party content is specifically marked as such. If
            you notice any copyright infringement, we ask you to inform us. If
            we become aware of legal violations, we will immediately remove such
            content.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
