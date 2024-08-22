import Form from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import { getCountryCode, getCountryFlag } from "../../utils/helpers";
import InputJsx from "../../ui/InputJsx";

const Image = styled.img`
  width: 10rem;
  max-height: 7rem;
  object-fit: cover;
  border-radius: 0.2rem;
`;
const Equips = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2rem;
`;
const Equip = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-grey-200);
`;
const P = styled.div`
  font-size: 1.7rem;
  max-width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function ViewBuyRequest({ itemToView = {}, onCloseModal }) {
  const {
    entreprise,
    email,
    fullName,
    sector,
    message,
    phone,
    date,
    equipments,
    country,
  } = itemToView;

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Full name">
        <Input value={fullName} type="text" id="full-name" />
      </FormRow>
      <FormRow label="Entreprise">
        <Input value={entreprise} type="text" id="name" />
      </FormRow>
      <FormRow label="Sector">
        <Input value={sector} type="text" id="name" />
      </FormRow>
      <FormRow label="Country">
        <InputJsx>
          {country}
          {<img src={getCountryFlag(getCountryCode(country))} alt="" />}
        </InputJsx>
      </FormRow>

      <FormRow label="Phone">
        <Input value={phone} id="phone" />
      </FormRow>
      <FormRow label="Email">
        <Input value={email} id="email" />
      </FormRow>

      <FormRow label="Date">
        <Input value={date} id="date" />
      </FormRow>

      <FormRow label="Message">
        <Textarea id="message" value={message} />
      </FormRow>
      <FormRow label="Equipments">
        <Equips>
          {equipments?.map(item => (
            <Equip>
              <Image src={item.image} alt="" />
              <P>{item.name} </P>
            </Equip>
          ))}
        </Equips>
      </FormRow>
    </Form>
  );
}

export default ViewBuyRequest;
