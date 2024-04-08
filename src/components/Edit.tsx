import { handleOnChange } from "@/functions/handleOnChange";
import handleSwitch from "@/functions/handleSwitch";
import { handleUpdate } from "@/functions/handleUpdate";
import useDisplaysStore, { DisplayInfo } from "@/middleware/displaysStore";
import useFuelPricesStore from "@/middleware/fuelStore";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export default function Edit(display: any) {
  const { data } = display;
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: fuelData } = useFuelPricesStore();
  const [values, setValues] = useState<DisplayInfo>({
    id: 0,
    userId: "",
    Gasoline91: "",
    Gasoline95: "",
    Diesel: "",
    displayName: "",
    displayId: "",
  });

  useEffect(() => {
    setValues(data);
  }, [data]);

  return (
    <>
      <Label htmlFor="name">Display Name:</Label>
      <Input
        id="displayName"
        name="displayName"
        placeholder="Enter Display Name"
        value={values?.displayName}
        onChange={(e) => {
          handleOnChange(e, values, setValues);
        }}
      />

      <Label htmlFor="price">Gasoline 91:</Label>
      <Input
        disabled={checked}
        name="Gasoline91"
        placeholder="Enter Price (e.g., 00.00)"
        value={values?.Gasoline91}
        onChange={(e) => {
          handleOnChange(e, values, setValues);
        }}
      />
      <Label htmlFor="price">Gasoline 95:</Label>
      <Input
        disabled={checked}
        name="Gasoline95"
        placeholder="Enter Price (e.g., 00.00)"
        value={values?.Gasoline95}
        onChange={(e) => {
          handleOnChange(e, values, setValues);
        }}
      />
      <Label htmlFor="price">Diesel:</Label>
      <Input
        disabled={checked}
        name="Diesel"
        placeholder="Enter Price (e.g., 00.00)"
        value={values?.Diesel}
        onChange={(e) => {
          handleOnChange(e, values, setValues);
        }}
      />

      <div className="flex mt-5 justify-around">
        <Button
          onClick={() => {
            handleUpdate(values);
          }}
          type="submit"
        >
          Save
        </Button>
        <div className="flex items-center gap-3">
          <Switch
            id="sync"
            onClick={() => {
              handleSwitch(checked, setChecked, values, setValues, fuelData);
            }}
            checked={checked}
          />
          <Label htmlFor="sync">Auto Price</Label>
        </div>
      </div>
    </>
  );
}
