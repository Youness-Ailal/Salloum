import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useSendMessage } from "@/data/useSendMessage";
import InfoBox, { infoBoxProps } from "./InfoBox";

function ContactForm() {
  const [ContactValues, setContactValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    entreprise: "",
    sector: "",
    message: "",
  });
  const [infoBoxData, setInfoBoxData] = useState<infoBoxProps>();
  const clearInfoBox = () => setInfoBoxData({ type: "error", message: "" });
  const clearForm = () =>
    setContactValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      entreprise: "",
      sector: "",
      message: "",
    });
  const { isSending, send } = useSendMessage();
  //@ts-ignore
  const handleSubmit = e => {
    e.preventDefault();
    send(
      { ...ContactValues },
      {
        onSuccess: () => {
          clearForm();
          setInfoBoxData({
            type: "success",
            message: "message received! We'll respond shortly.",
          });
          globalThis.scrollTo({ top: 0 });
        },
        onError: err =>
          setInfoBoxData({
            type: "error",
            message: err.message,
          }),
      }
    );
  };
  return (
    <div>
      {infoBoxData?.message && (
        <div className="my-3">
          <InfoBox
            clear={clearInfoBox}
            type={infoBoxData.type}
            message={infoBoxData.message}
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        id="contact"
        className="grid gap-3 gap-y-6 lg:gap-6 lg:grid-cols-2 mt-2 lg:mt-4">
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, firstName: e.target.value }))
          }
          value={ContactValues.firstName}
          id={"first-name"}
          placeholder="First name *"
          required
        />
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, lastName: e.target.value }))
          }
          value={ContactValues.lastName}
          id={"last-name"}
          placeholder="Last name *"
          required
        />
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, email: e.target.value }))
          }
          value={ContactValues.email}
          id={"email"}
          placeholder="Email *"
          type="email"
          required
        />
        <Input
          onChange={e =>
            //@ts-ignore
            setContactValues(prev => ({ ...prev, phone: e }))
          }
          value={ContactValues.phone}
          id={"phone"}
          as="phone"
          placeholder="Phone *"
          required
        />
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, entreprise: e.target.value }))
          }
          value={ContactValues.entreprise}
          id={"enterprise"}
          placeholder="Enterprise"
        />
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, sector: e.target.value }))
          }
          value={ContactValues.sector}
          id={"sector"}
          placeholder="Sector"
        />
        <div className="col-span-full">
          <Input
            onChange={e =>
              setContactValues(prev => ({ ...prev, message: e.target.value }))
            }
            value={ContactValues.message}
            id={"message"}
            as="textarea"
            className="min-h-20 lg:min-h-32"
            placeholder="Message"
            required
          />
        </div>
      </form>
      <div className="mt-2 lg:mt-4 ml-auto w-full flex justify-end">
        <Button isLoading={isSending} form="contact">
          Send Message
        </Button>
      </div>
    </div>
  );
}

export default ContactForm;
