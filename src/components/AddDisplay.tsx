import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { handleSubmit } from "@/functions/handleSubmit";

import useDisplaysStore, { DisplayInfo } from "@/middleware/displayStore";
import useFuelPricesStore, { FuelPrice } from "@/middleware/fuelStore";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function AddDisplay() {
  const { user } = useUser();
  const { data } = useFuelPricesStore();
  const { displays } = useDisplaysStore();
  const userId = user?.id;
  // const { prices } = data;
  // State variables and validation functions for form fields
  const [errors, setErrors] = useState({
    displayName: "",
    StationID: "",
    Gasoline91: "",
    Gasoline95: "",
    Diesel: "",
  });

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [values, setValues] = useState<DisplayInfo>({
    id: 0,
    userId: "",
    Gasoline91: "",
    Gasoline95: "",
    Diesel: "",
    displayName: "",
    displayId: "",
    isActive: true,
    createdAt: new Date().toISOString(),
  });

  const syncFunction = () => {
    setChecked(true);
    if (data && data.prices) {
      data.prices.price.map((e: FuelPrice) => {
        setValues((prevFormData) => ({
          ...prevFormData,
          [e.fuelName.replace(" ", "")]: e.price,
        }));
      });
    }
  };

  const handelOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setValues((prevFormData) => ({
          ...prevFormData,
          [name]: price,
        }));
      }
    } else {
      setValues((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!values?.displayName) {
      newErrors.displayName = "Display Name is required.";
      valid = false;
    } else {
      newErrors.displayName = "";
    }

    if (!values?.displayId) {
      newErrors.StationID = "StationID is required.";
      valid = false;
    } else {
      newErrors.StationID = "";
    }

    if (!values?.Gasoline91) {
      newErrors.Gasoline91 = "Price is required.";
      valid = false;
    } else {
      newErrors.Gasoline91 = "";
    }
    if (!values?.Gasoline95) {
      newErrors.Gasoline95 = "Price is required.";
      valid = false;
    } else {
      newErrors.Gasoline95 = "";
    }
    if (!values?.Diesel) {
      newErrors.Diesel = "Price is required.";
      valid = false;
    } else {
      newErrors.Diesel = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handelSwitch = () => {
    if (checked) {
      setChecked(false);
      setValues((prevFormData) => ({
        ...prevFormData,
        Gasoline91: "",
        Gasoline95: "",
        Diesel: "",
      }));
    } else {
      syncFunction();
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={syncFunction}>Add new Display</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Fuelight</DialogTitle>
            <DialogDescription>
              <Label htmlFor="name">Display Name:</Label>
              <Input
                id="displayName"
                name="displayName"
                placeholder="Enter Display Name"
                value={values?.displayName}
                onChange={handelOnChange}
              />

              <Label htmlFor="displayId">displayId</Label>
              <Input
                id="displayId"
                name="displayId"
                placeholder="displayId"
                value={values?.displayId}
                onChange={handelOnChange}
              />

              <Label htmlFor="price">Gasoline 91:</Label>
              <Input
                disabled={checked}
                name="Gasoline91"
                placeholder="Enter Price (e.g., 00.00)"
                value={values?.Gasoline91}
                onChange={handelOnChange}
              />
              <Label htmlFor="price">Gasoline 95:</Label>
              <Input
                disabled={checked}
                name="Gasoline95"
                placeholder="Enter Price (e.g., 00.00)"
                value={values?.Gasoline95}
                onChange={handelOnChange}
              />
              <Label htmlFor="price">Diesel:</Label>
              <Input
                disabled={checked}
                name="Diesel"
                placeholder="Enter Price (e.g., 00.00)"
                value={values?.Diesel}
                onChange={handelOnChange}
              />
              {errors.Diesel && <p className="text-red-500">{errors.Diesel}</p>}
              <div className="flex mt-5 justify-around">
                <Button
                  onClick={() => {
                    handleSubmit(userId!, values, setOpen, setValues);
                  }}
                  type="submit"
                >
                  Add
                </Button>
                <div className="flex items-center gap-3">
                  <Switch id="sync" onClick={handelSwitch} checked={checked} />
                  <Label htmlFor="sync">Auto Price</Label>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
