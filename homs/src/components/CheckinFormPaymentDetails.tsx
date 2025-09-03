import { HStack, Input } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { NativeSelectRoot, NativeSelectField } from "@chakra-ui/react";
import { useBilling } from "../contexts/BillingProvider";
import { useFormContext } from "react-hook-form";

const CheckinFormPaymentDetails = () => {
  const { sponsors, paymentTypes } = useBilling();
  // console.log("Payment Types:", paymentTypes);
  const { register } = useFormContext();
  return (
    <>
      <Field label="Sponsor" mb="10px">
        <NativeSelectRoot>
          <NativeSelectField px="10px" {...register("sponsor")}>
            <option value="">Select Sponsor</option>
            {sponsors.map((sponsor) => (
              <option key={sponsor.id} value={sponsor.name}>
                {sponsor.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field label="Employee ID" mb="10px">
        <Input placeholder="Employee ID" {...register("employee_id")} />
      </Field>
      <Field label="Payment Type" mb="10px">
        <NativeSelectRoot>
          <NativeSelectField px="10px" {...register("payment_type")}>
            <option value="">Select Payment Method</option>
            {paymentTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>
      <Field label="Deposit Paid" mb="10px">
        <Input
          type="number"
          step="0.01"
          placeholder="Deposit Paid"
          {...register("deposit_paid", { valueAsNumber: true })}
        />
      </Field>
      <Field label="Receipt Number" mb="10px">
        <Input placeholder="Receipt Number" {...register("receipt_number")} />
      </Field>
    </>
  );
};

export default CheckinFormPaymentDetails;
