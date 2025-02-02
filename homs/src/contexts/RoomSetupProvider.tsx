import { createContext, useContext, useEffect, useState } from "react";
import { Category } from "../components/RoomCategoriesList";
import { RoomType } from "../components/RoomTypeList";
import { HostelFloor } from "../pages/Floors";
import { Amenity } from "../hooks/useAmenities";
import { View } from "../pages/Views";

export interface RoomSetupContextProps {
  roomCategories: Category[];
  roomTypes: RoomType[];
  floors: HostelFloor[];
  bedTypes: any[];
  amenities: Amenity[];
  hotelViews: View[];
  createDialogOpened: boolean;
  editDialogOpened: boolean;
  viewDialogOpened: boolean;
  deleteDialogOpened: boolean;
  updateRoomCategories: (category: Category) => void;
  updateRoomTypes: (roomType: RoomType) => void;
  updateFloors: (hotelFloor: HostelFloor) => void;
  updateBedTypes: (bedType: any) => void;
  updateAmenities: (amenity: Amenity) => void;
  updateHotelViews: (view: View) => void;
  setCreateDialogOpened: (value: boolean) => void;
  setEditDialogOpened: (value: boolean) => void;
  setViewDialogOpened: (value: boolean) => void;
  setDeleteDialogOpened: (value: boolean) => void;
}

const RoomSetupContext = createContext<RoomSetupContextProps>();

export function RoomSetupProvider({ children }) {
  const [createDialogOpened, setCreateDialogOpened] = useState<boolean>(false);
  const [editDialogOpened, setEditDialogOpened] = useState<boolean>(false);
  const [viewDialogOpened, setViewDialogOpened] = useState<boolean>(false);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);

  const [roomCategories, setRoomCategories] = useState(
    localStorage.getItem("roomCategories")
      ? JSON.parse(localStorage.getItem("roomCategories"))
      : []
  );
  const [roomTypes, setRoomTypes] = useState(
    localStorage.getItem("roomTypes")
      ? JSON.parse(localStorage.getItem("roomTypes"))
      : []
  );
  const [floors, setFloors] = useState(
    localStorage.getItem("floors")
      ? JSON.parse(localStorage.getItem("floors"))
      : []
  );
  const [bedTypes, setBedTypes] = useState(
    localStorage.getItem("bedTypes")
      ? JSON.parse(localStorage.getItem("bedTypes"))
      : []
  );
  const [amenities, setAmenities] = useState(
    localStorage.getItem("amenities")
      ? JSON.parse(localStorage.getItem("amenities"))
      : []
  );

  const [hotelViews, setHotelViews] = useState(
    localStorage.getItem("hotelViews")
      ? JSON.parse(localStorage.getItem("hotelViews"))
      : []
  );

  const updateRoomCategories = (category: Category, action: String) => {
    const rc: Category[] = JSON.parse(localStorage.getItem("roomCategories"));
    if (action === "edit") {
      const updatedRoomCategory = rc.map((cat) =>
        cat.id === category.id ? category : cat
      );
      setRoomCategories(updatedRoomCategory);
      localStorage.setItem(
        "roomCategories",
        JSON.stringify(updatedRoomCategory)
      );
    }
    if (action === "create") {
      const updatedRoomCategories = [category, ...rc];
      setRoomCategories(updatedRoomCategories);
      localStorage.setItem(
        "roomCategories",
        JSON.stringify(updatedRoomCategories)
      );
    }
  };

  const updateRoomTypes = (data: RoomType, action: string) => {
    console.log(data);
    const rt: RoomType[] = JSON.parse(localStorage.getItem("roomTypes"));
    if (action === "edit") {
      const updatedRoomType = rt.map((rt) => (rt.id === data.id ? data : rt));
      setRoomTypes(updatedRoomType);
      localStorage.setItem("roomTypes", JSON.stringify(updatedRoomType));
    }
    if (action === "create") {
      const updatedRoomTypes = [data, ...rt];
      setRoomTypes(updatedRoomTypes);
      localStorage.setItem("roomTypes", JSON.stringify(updatedRoomTypes));
    }
  };

  const updateFloors = (hotelFloor: HostelFloor, action: string) => {
    console.log(hotelFloor);
    const hfloors: HostelFloor[] = JSON.parse(localStorage.getItem("floors"));
    if (action === "edit") {
      const updatedFloor = hfloors.map((hf) => (hf.id === hotelFloor.id ? hotelFloor : hf));
      setFloors(updatedFloor);
      localStorage.setItem("floors", JSON.stringify(updatedFloor));
    }
    if (action === "create") {
      const updatedFloors = [hotelFloor, ...hfloors];
      setFloors(updatedFloors);
      localStorage.setItem("floors", JSON.stringify(updatedFloors));
    }
    // localStorage.setItem("floors", JSON.stringify(floors));
  };

  const updateBedTypes = (bedType) => {
    setBedTypes((prev) => [bedType, ...prev]);
    // localStorage.setItem("bedTypes", JSON.stringify(bedTypes));
  };

  const updateAmenities = (amenity: Amenity) => {
    setAmenities((prev: Amenity[]) => [amenity, ...prev]);
    // localStorage.setItem("amenities", JSON.stringify(amenities));
  };

  const updateHotelViews = (view: View, action: string) => {
    console.log(view)
    const hv: View[] = JSON.parse(localStorage.getItem("hotelViews"));
    if (action === "edit") {
      const updatedView = hv.map((v) => (v.id === view.id ? view : v));
      setHotelViews(updatedView);
      localStorage.setItem("hotelViews", JSON.stringify(updatedView));
    }
    if (action === "create") {
      const updatedViews = [view, ...hv];
      setHotelViews(updatedViews);
      localStorage.setItem("hotelViews", JSON.stringify(updatedViews));
    }
    // localStorage.setItem("hotelViews", JSON.stringify(hotelViews));
  };

  return (
    <RoomSetupContext.Provider
      value={{
        roomCategories,
        roomTypes,
        floors,
        bedTypes,
        amenities,
        hotelViews,
        createDialogOpened,
        editDialogOpened,
        viewDialogOpened,
        deleteDialogOpened,
        setRoomCategories,
        setRoomTypes,
        setFloors,
        setHotelViews,
        updateRoomCategories,
        updateRoomTypes,
        updateFloors,
        updateBedTypes,
        updateAmenities,
        updateHotelViews,
        setCreateDialogOpened,
        setEditDialogOpened,
        setViewDialogOpened,
        setDeleteDialogOpened,
      }}
    >
      {children}
    </RoomSetupContext.Provider>
  );
}

export const useRoomSetup = () => {
  return useContext<RoomSetupContextProps>(RoomSetupContext);
};
