import { useRef, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InfoBox, { infoBoxProps } from "../ui/InfoBox";
import useSendBuyRequest from "@/data/useSendBuyRequest";
import { EquipType, RECAPTCHA_KEY } from "@/utils/constants";
import { useQuotesContext } from "@/context/QuotesProvider";
//@ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

//@ts-ignore
function NewQuoteForm({ quotes }) {
  const { t, i18n } = useTranslation("translate");
  const { isLoading, sendRequest } = useSendBuyRequest();
  const { clearQuotes } = useQuotesContext();
  const [infoBoxData, setInfoBoxData] = useState<infoBoxProps>();
  const recaptchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const handleCaptchaChange = (token: string) => {
    setCaptchaToken(token);
  };
  const clearInfoBox = () => setInfoBoxData({ type: "error", message: "" });

  const [buyData, setBuyData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    entreprise: "",
    sector: "",
    message: "",
  });

  const reset = () => {
    clearQuotes();
    setBuyData({
      firstName: "",
      lastName: "",
      entreprise: "",
      email: "",
      phone: "",
      sector: "",
      message: "",
    });
  };
  //@ts-ignore
  function handleSubmit(e) {
    e.preventDefault();
    if (!captchaToken) {
      alert("Please complete the reCAPTCHA");
      return;
    }
    const { firstName, lastName, entreprise, email, phone, sector, message } =
      buyData;
    //@ts-ignore
    const equipments: EquipType[] = quotes?.map(item => ({
      name: item.name,
      image: item.image,
    }));
    sendRequest(
      {
        fullName: firstName + " " + lastName,
        email,
        phone,
        entreprise,
        message,
        sector,
        equipments,
      },
      {
        onSuccess: () => {
          globalThis.scrollTo({ top: 0 });
          setInfoBoxData({
            type: "success",
            message: "request received. We'll respond shortly.",
          });
          reset();
        },
        onError: err =>
          setInfoBoxData({
            type: "error",
            message: err.message,
          }),
      }
    );
  }
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
        id="new-quote"
        className="grid gap-4 lg:gap-6 lg:grid-cols-2 mt-2 lg:mt-4">
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, firstName: e.target.value }))
          }
          value={buyData.firstName}
          id={"first-name"}
          placeholder={t("first_name") + " *"}
          required
        />
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, lastName: e.target.value }))
          }
          value={buyData.lastName}
          id={"last-name"}
          placeholder={t("last_name") + " *"}
          required
        />
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, email: e.target.value }))
          }
          value={buyData.email}
          id={"email"}
          placeholder={t("email") + " *"}
          type="email"
          required
        />
        <Input
          //@ts-ignore
          onChange={phone => setBuyData(prev => ({ ...prev, phone }))}
          value={buyData.phone}
          id={"phone"}
          as="phone"
          placeholder={t("phone") + " *"}
          required
        />
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, entreprise: e.target.value }))
          }
          value={buyData.entreprise}
          id={"enterprise"}
          placeholder={t("enterprise")}
        />
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, sector: e.target.value }))
          }
          value={buyData.sector}
          id={"sector"}
          placeholder={t("sector")}
        />
        <div className="col-span-full">
          <Input
            onChange={e =>
              setBuyData(prev => ({ ...prev, message: e.target.value }))
            }
            value={buyData.message}
            id={"message"}
            as="textarea"
            className="min-h-28 lg:min-h-32"
            placeholder={t("message")}
            required
          />
        </div>
        <div>
          <ReCAPTCHA
            hl={i18n.language || "en"}
            ref={recaptchaRef}
            sitekey={RECAPTCHA_KEY}
            onChange={handleCaptchaChange}
          />
        </div>
      </form>
      <div className="mt-2 lg:mt-4 ml-auto w-full flex justify-end">
        <Button isLoading={isLoading} form="new-quote">
          {t("send_request")}
        </Button>
      </div>
    </div>
  );
}

export default NewQuoteForm;
