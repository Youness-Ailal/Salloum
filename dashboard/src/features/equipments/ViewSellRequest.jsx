import Form from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import {
  formatCurrency,
  getCountryCode,
  getCountryFlag,
} from "../../utils/helpers";
import InputJsx from "../../ui/InputJsx";

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  max-height: 20rem;
  overflow: auto;
`;
const Image = styled.img`
  height: 15rem;
  object-fit: cover;
  padding: 0.2rem;
  border-radius: 0.2rem;
  border: 1px solid var(--color-grey-200);
`;

function ViewSellRequest({ itemToView = {}, onCloseModal }) {
  const {
    productName,
    email,
    fullName,
    details,
    country,
    phone,
    price,
    date,
    photos,
  } = itemToView;

  // function download(file) {}

  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Equipment name">
        <Input value={productName} type="text" id="name" />
      </FormRow>

      <FormRow label="Full name">
        <Input value={fullName} type="text" id="full-name" />
      </FormRow>

      <FormRow label="Phone">
        <Input value={phone} id="phone" />
      </FormRow>
      <FormRow label="Email">
        <Input value={email} id="email" />
      </FormRow>
      <InputJsx>
        <FormRow></FormRow>

        {country}
        {<img src={getCountryFlag(getCountryCode(country))} alt="" />}
      </InputJsx>
      <FormRow label="Best price">
        <Input value={formatCurrency(price)} id="price" />
      </FormRow>
      <FormRow label="Date">
        <Input value={date} id="date" />
      </FormRow>

      <FormRow label="Additional details">
        <Textarea id="details" value={details} defaultValue="" />
      </FormRow>
      <FormRow label="Images">
        <Images>
          {photos?.map(item => (
            <Image src={item} alt="" />
          ))}
        </Images>
      </FormRow>
    </Form>
  );
}

export default ViewSellRequest;
