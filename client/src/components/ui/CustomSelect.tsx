import React from "react";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
const CustomOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex items-center justify-center gap-2 text-sky-950 text-xl">
        {props.data.icon}
      </div>
    </components.Option>
  );
};

const CustomSelect: React.FC = ({ options, onChange }) => {
  const { i18n } = useTranslation();
  const lng = i18n.language;
  const defaultOption =
    options.find(option => option.value === lng) || options[0];

  return (
    <Select
      onChange={onChange}
      className="scale-[0.85] z-50"
      defaultValue={defaultOption}
      options={options}
      components={{ Option: CustomOption }}
    />
  );
};

export default CustomSelect;
