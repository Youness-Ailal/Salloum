import { ComponentProps } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "@/styles/phone.css";
import { timezones } from "@/utils/constants";
import { cn } from "@/lib/utils";

type InputProps = {
  id: string;
  as?: string;
  icon?: React.ReactNode;
  className?: string;
} & ComponentProps<"input">;
function Input({ id, as, className, icon, ...props }: InputProps) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const country = timezones[timezone]?.c[0] || "ma";

  if (as === "phone")
    return (
      <div>
        {
          //@ts-ignore
          <PhoneInput
            defaultCountry={country?.toLowerCase()}
            key={id}
            {...props}
          />
        }
      </div>
    );
  if (as === "textarea")
    return (
      <div>
        {
          //@ts-ignore
          <textarea
            className={cn(
              "p-2 lg:px-3  focus:outline-none focus-within:border-sky-900 focus:shadow-sm focus:shadow-sky-600/10 transition text-sky-950 placeholder:font-normal placeholder:text-base lg:text-lg font-medium placeholder:text-sky-950 bg-sky-50/50 w-full border border-gray-400 rounded-sm resize-none min-h-40 lg:min-h-52",
              className
            )}
            name={id}
            id={id}
            {...props}></textarea>
        }
      </div>
    );
  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        className={cn(
          "p-2 lg:px-3 focus:outline-none focus-within:border-sky-900 focus:shadow-sm focus:shadow-sky-600/10 transition text-sky-950 placeholder:font-normal placeholder:text-base lg:text-lg font-medium placeholder:text-sky-950/90 bg-sky-50/50 w-full border border-gray-400 rounded-sm",
          {
            "!pl-10": icon,
          },
          className
        )}
        {...props}
      />
      {icon && (
        <span className="text-sky-950/90 select-none pointer-events-none absolute left-2 text-lg lg:text-2xl bottom-1/2 translate-y-1/2">
          {icon}
        </span>
      )}
    </div>
  );
}

export default Input;
