import Button from "../ui/Button";
import Input from "../ui/Input";

function ContactForm() {
  return (
    <div>
      <form
        id="contact"
        className="grid gap-3 gap-y-6 lg:gap-6 lg:grid-cols-2 mt-2 lg:mt-4">
        <Input id={"first-name"} placeholder="First name *" required />
        <Input id={"last-name"} placeholder="Last name *" required />
        <Input id={"email"} placeholder="Email *" type="email" required />
        <Input id={"phone"} as="phone" placeholder="Phone *" required />
        <Input id={"enterprise"} placeholder="Enterprise" />
        <Input id={"sector"} placeholder="Sector" />
        <div className="col-span-full">
          <Input
            id={"message"}
            as="textarea"
            className="min-h-20 lg:min-h-32"
            placeholder="Message"
            required
          />
        </div>
      </form>
      <div className="mt-2 lg:mt-4 ml-auto w-full flex justify-end">
        <Button form="contact">Send Message</Button>
      </div>
    </div>
  );
}

export default ContactForm;
