import Header from "./Header";
import { BsArrowDown } from "react-icons/bs";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

function Faq() {
  const { t } = useTranslation("translate");
  const [shownQuestion, setShownQuestion] = useState("");
  const questions = t("faq", { returnObjects: true });
  return (
    <div>
      <Header title1={t("questions")} title2={t("answers")} />
      <div className="grid xl:grid-cols-2 gap-2 xl:gap-4 xl:gap-y-7 mt-4 xl:mt-6">
        {questions?.map(item => (
          <div
            key={item.question}
            className="flex flex-col rounded-md text-sky-950 ">
            <p
              onClick={() =>
                setShownQuestion(prev =>
                  prev === item.question ? "" : item.question
                )
              }
              className="w-full p-4 bg-sky-50/60 flex gap-4 justify-between text-lg xl:text-xl cursor-pointer">
              {item.question}
              <span
                className={cn({
                  "rotate-180": shownQuestion === item.question,
                })}>
                <BsArrowDown />
              </span>
            </p>
            {shownQuestion === item.question && (
              <p className=" leading-7 border-t mt-2 xl:mt-3 border-gray-300 pt-2 xl:pt-4">
                {item.answer}{" "}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
