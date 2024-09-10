import { useRef, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useSendMessage } from "@/data/useSendMessage";
import InfoBox, { infoBoxProps } from "./InfoBox";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_KEY } from "@/utils/constants";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation("translate");
  const [infoBoxData, setInfoBoxData] = useState<infoBoxProps>();
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const handleCaptchaChange = (token: string) => {
    setCaptchaToken(token);
  };
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
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }
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
          placeholder={t("first_name")}
          required
        />
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, lastName: e.target.value }))
          }
          value={ContactValues.lastName}
          id={"last-name"}
          placeholder={t("last_name")}
          required
        />
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, email: e.target.value }))
          }
          value={ContactValues.email}
          id={"email"}
          placeholder={t("email")}
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
          placeholder={t("phone")}
          required
        />
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, entreprise: e.target.value }))
          }
          value={ContactValues.entreprise}
          id={"enterprise"}
          placeholder={t("enterprise")}
        />
        <Input
          onChange={e =>
            setContactValues(prev => ({ ...prev, sector: e.target.value }))
          }
          value={ContactValues.sector}
          id={"sector"}
          placeholder={t("sector")}
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
            placeholder={t("message")}
            required
          />
        </div>
      </form>
      <div className="mt-4">
        <ReCAPTCHA
          hl={i18n.language || "fr"}
          ref={recaptchaRef}
          sitekey={RECAPTCHA_KEY}
          onChange={handleCaptchaChange}
        />
      </div>
      <div className="mt-2 lg:mt-4 ml-auto w-full flex justify-end">
        <Button isLoading={isSending} form="contact">
          {t("submit")}
        </Button>
      </div>
    </div>
  );
}

export default ContactForm;
