
import DashboardLayout from '../layouts/DashboardLayout'
import ActionPageHeader from '../components/ActionPageHeader'
import { useRoomSetup } from '../contexts/RoomSetupProvider'
import AmenityList from '../components/AmenityList'

const Amenities = () => {
    const { amenities } = useRoomSetup();
  return (
    <DashboardLayout>
        <ActionPageHeader heading="Amenity" table="amenities" />
        <AmenityList data={amenities} heading="Amenity"  />
    </DashboardLayout>
  )
}

export default Amenities
