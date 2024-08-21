import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import InfoBox, { infoBoxProps } from "../ui/InfoBox";
import useSendBuyRequest from "@/data/useSendBuyRequest";
import { EquipType } from "@/utils/constants";
import { useQuotesContext } from "@/context/QuotesProvider";
//@ts-ignore
function NewQuoteForm({ quotes }) {
  const { isLoading, sendRequest } = useSendBuyRequest();
  const { clearQuotes } = useQuotesContext();
  const [infoBoxData, setInfoBoxData] = useState<infoBoxProps>();
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
          placeholder="First name *"
          required
        />
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, lastName: e.target.value }))
          }
          value={buyData.lastName}
          id={"last-name"}
          placeholder="Last name *"
          required
        />
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, email: e.target.value }))
          }
          value={buyData.email}
          id={"email"}
          placeholder="Email *"
          type="email"
          required
        />
        <Input
          //@ts-ignore
          onChange={phone => setBuyData(prev => ({ ...prev, phone }))}
          value={buyData.phone}
          id={"phone"}
          as="phone"
          placeholder="Phone *"
          required
        />
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, entreprise: e.target.value }))
          }
          value={buyData.entreprise}
          id={"enterprise"}
          placeholder="Enterprise"
        />
        <Input
          onChange={e =>
            setBuyData(prev => ({ ...prev, sector: e.target.value }))
          }
          value={buyData.sector}
          id={"sector"}
          placeholder="Sector"
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
            placeholder="Message"
            required
          />
        </div>
      </form>
      <div className="mt-2 lg:mt-4 ml-auto w-full flex justify-end">
        <Button isLoading={isLoading} form="new-quote">
          Send Request
        </Button>
      </div>
    </div>
  );
}

export default NewQuoteForm;
