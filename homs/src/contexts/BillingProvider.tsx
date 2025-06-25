import React, { useContext, createContext } from 'react'

interface BillingContextProps{
    sponsors: string[];
    setSponsors: React.Dispatch<React.SetStateAction<string[]>>;
}

const BillingContext = createContext<BillingContextProps>({
    sponsors: [],
    setSponsors: () => {}
})

const BillingProvider = () => {
  return (
    <div>
      
    </div>
  )
}

export default BillingProvider
