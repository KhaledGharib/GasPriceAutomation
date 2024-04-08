import { DisplayInfo } from "@/middleware/displayStore";
import {
  FuelPrice,
  FuelPricesResponse,
  FuelPricesState,
} from "@/middleware/fuelStore";

const handleSwitch = (
  checked: boolean,
  setChecked: React.Dispatch<React.SetStateAction<boolean>>,
  values: any,
  setValues: React.Dispatch<React.SetStateAction<any>>,
  fuelData: any
) => {
  if (checked) {
    setChecked(false);
    setValues((prevFormData: DisplayInfo) => ({
      ...prevFormData,
      Gasoline91: values.Gasoline91,
      Gasoline95: values.Gasoline95,
      Diesel: values.Diesel,
    }));
  } else {
    setChecked(true);
    if (fuelData) {
      fuelData.price.map((e: FuelPrice) => {
        setValues((prevFormData: FuelPrice) => ({
          ...prevFormData,
          [e.fuelName.replace(" ", "")]: e.price,
        }));
        console.log(values);
      });
    }
  }
};

export default handleSwitch;
