import { useState } from "react";

export const handleOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  values: any,
  setValues: React.Dispatch<React.SetStateAction<any>>
) => {
  const { name, value } = e.target;
  if (name === "Gasoline91" || name === "Gasoline95" || name === "Diesel") {
    let price = value;
    price = price.replace(/[^0-9.]/g, "");
    if (/^\d{2}$/.test(price)) {
      price = price + ".";
    }
    const hasMultipleDecimals = price.split(".").length > 2;
    const isValidFormat = /^\d{0,2}(\.\d{0,2})?$/.test(price);
    if (!hasMultipleDecimals && isValidFormat) {
      setValues((prevFormData: any) => ({
        ...prevFormData,
        [name]: price,
      }));
    }
  } else {
    setValues((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
};
