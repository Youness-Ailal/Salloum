import Form from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";
import { useEffect } from "react";
import { markMessageAsSeen } from "../../services/apiEquipments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputJsx from "../../ui/InputJsx";
import { getCountryCode, getCountryFlag } from "../../utils/helpers";

function ViewMessage({ itemToView = {}, onCloseModal }) {
  const queryClient = useQueryClient();
  const {
    id,
    entreprise,
    email,
    fullName,
    sector,
    message,
    phone,
    date,
    seen,
    country,
  } = itemToView;
  const { mutate: setSeen } = useMutation({
    mutationFn: markMessageAsSeen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["messages"] }),
  });
  useEffect(() => {
    if (!seen) {
      setSeen(id);
    }
  }, []);
  return (
    <Form type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Full name">
        <Input value={fullName} type="text" id="full-name" />
      </FormRow>

      <FormRow label="Phone">
        <Input value={phone} id="phone" />
      </FormRow>
      <FormRow label="Email">
        <Input value={email} id="email" />
      </FormRow>
      <FormRow label="Country">
        <InputJsx>
          {country}
          {<img src={getCountryFlag(getCountryCode(country))} alt="" />}
        </InputJsx>
      </FormRow>

      <FormRow label="Entreprise">
        <Input value={entreprise} type="text" id="name" />
      </FormRow>
      <FormRow label="Sector">
        <Input value={sector} type="text" id="name" />
      </FormRow>
      <FormRow label="Date">
        <Input value={date} id="date" />
      </FormRow>

      <FormRow label="Message">
        <Textarea id="message" value={message} />
      </FormRow>
    </Form>
  );
}

export default ViewMessage;
