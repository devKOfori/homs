import { createContext, useContext, useEffect, useState } from "react";
import billingService from "../services/billing-service";
import { CanceledError } from "axios";

export type Sponsor = {
  id?: string;
  name: string;
  email?: string;
  phone_number?: string;
  address?: string;
  fax?: string;
  sponsor_type?: string; // e.g., Company, Individual
  created_by?: string;
  date_created?: string;
  description?: string;
};

export type SponsorType = {
  id?: string;
  name: string;
  allow_credit: boolean;
  is_active: boolean;
  description?: string;
  created_by?: string;
  date_created?: string;
};

export type PaymentType = {
  id?: string;
  name: string;
  description?: string;
  created_by?: string;
  date_created?: string;
};

export interface BillingContextProps {
  sponsors: Sponsor[];
  setSponsors: (sponsors: Sponsor[]) => void;
  sponsorTypes: SponsorType[];
  setSponsorTypes: (sponsorTypes: SponsorType[]) => void;
  paymentTypes: PaymentType[];
  setPaymentTypes: (paymentTypes: PaymentType[]) => void;
}

interface BillingProviderProps {
  children: React.ReactNode;
}

const BillingContext = createContext<BillingContextProps>({
  sponsors: [],
  setSponsors: () => {},
  sponsorTypes: [],
  setSponsorTypes: () => {},
  paymentTypes: [],
  setPaymentTypes: () => {},
});

export const BillingProvider = ({ children }: BillingProviderProps) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [fetchSponsorsError, setFetchSponsorsError] = useState<string>("");
  const [sponsorTypes, setSponsorTypes] = useState<SponsorType[]>([]);
  const [fetchSponsorTypesError, setFetchSponsorTypesError] =
    useState<string>("");
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
  const [fetchPaymentTypesError, setFetchPaymentTypesError] =
    useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("paymentTypes")) {
      const cachedPaymentTypes = JSON.parse(
        localStorage.getItem("paymentTypes") || "[]"
      );
      setPaymentTypes(cachedPaymentTypes);
    }
    const { request, cancel } = billingService.getPaymentTypes();
    request
      .then((response) => {
        setPaymentTypes(response.data);
        localStorage.setItem("paymentTypes", JSON.stringify(response.data));
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setFetchPaymentTypesError(error.message);
        console.error("Error fetching payment types:", error.message);
      });
    return () => cancel();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("sponsorTypes")) {
      const cachedSponsorTypes = JSON.parse(
        localStorage.getItem("sponsorTypes") || "[]"
      );
      setSponsorTypes(cachedSponsorTypes);
    }
    const { request, cancel } = billingService.getSponsorTypes();
    request
      .then((response) => {
        setSponsorTypes(response.data);
        localStorage.setItem("sponsorTypes", JSON.stringify(response.data));
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setFetchSponsorTypesError(error.message);
        console.error("Error fetching sponsor types:", error.message);
      });
    return () => cancel();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("sponsors")) {
      const cachedSponsors = JSON.parse(
        localStorage.getItem("sponsors") || "[]"
      );
      setSponsors(cachedSponsors);
    }
    const { request, cancel } = billingService.getSponsors();
    request
      .then((response) => {
        setSponsors(response.data);
        localStorage.setItem("sponsors", JSON.stringify(response.data));
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setFetchSponsorsError(error.message);
        console.error("Error fetching sponsors:", error.message);
      });
    return () => cancel();
  }, []);

  return (
    <BillingContext.Provider
      value={{
        sponsors,
        setSponsors,
        sponsorTypes,
        setSponsorTypes,
        paymentTypes,
        setPaymentTypes,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBilling must be used within a BillingProvider");
  }
  return context;
};
