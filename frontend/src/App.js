import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import StaffRegistrationForm from './components/StaffRegistrationForm';
import ListPropertyForm from './components/ListPropertyForm';
import AddUnitsForm from './components/AddUnitsForm';
import Home from './components/Home';
import PropertyList from './components/PropertyList';
import UnitList from './components/UnitList';
import StaffList from './components/StaffList';
import PropertyOwnerList from './components/PropertyOwnerList';
import PropertySearch from './components/PropertySearch';
import StaffLogin from './components/StaffLogin';
import ResidentLogin from './components/ResidentLogin';
import ResidentRegister from './components/ResidentRegister';
import LandingPage from './components/LandingPage';
import ResidentDashboard  from './components/ResidentDashboard';
import StaffDashboard from './components/StaffDashboard';
import ResidentUpdateDetails from './components/ResidentUpdateDetails';
import AccessDeviceList from './components/AccessDeviceList';
import LeaseAgreementList from './components/LeaseAgreementList';
import VehicleList from './components/VehicleList';
import MaintenanceRequestList from './components/MaintenanceRequestList';
import ParkingSpotList from './components/ParkingSpotList';
import AccessLogList from './components/AccessLogList';
import CommonAreaList from './components/CommonAreaList';
import ServiceProviderList from './components/ServiceProviderList';
import VisitorLogList from './components/VisitorLogList';
import ResidentList from './components/ResidentList';
import StaffPropertyList from './components/StaffPropertyList';
import UnitSearch from './components/UnitSearch';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/property-owner/register" element={<RegistrationForm />} />
        <Route path="/property-owner/login" element={<LoginForm />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="/resident/login" element={<ResidentLogin />} />
        {/* Dashboard route with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="staff-registration" element={<StaffRegistrationForm />} />
            <Route path="add-unit" element={<AddUnitsForm />} />
            <Route path="add-property" element={<ListPropertyForm />} />
            <Route path="list-property" element={<PropertyList />} />
            <Route path="list-unit" element={<UnitList />} />
            <Route path="list-staff" element={<StaffList />} />
            <Route path="list-owner" element={<PropertyOwnerList />} />
            <Route path="staff-property" element={<StaffPropertyList />} />            
        </Route>
                        {/* Resident Routes */}
                        <Route path="/resident-dashboard" element={<ResidentDashboard />}>
                        <Route path="update-details" element={<ResidentUpdateDetails />} />
                    <Route path="home" element={<Home />} />
                    {/* <Route path="view-properties" element={<ViewProperties />} /> */}
                    <Route path="my-residency" element={<Home />} /> {/* Replace with actual component */}
                    <Route path="update-details" element={<Home />} /> {/* Replace with actual component */}
                    <Route path="list-property" element={<PropertyList />} />
                    <Route path="list-unit" element={<UnitList />} />
                    <Route path="property-search" element={<PropertySearch />} />
                    <Route path="unit-search" element={<UnitSearch />} />

                </Route>

                {/* Staff Routes */}
                <Route path="/staff-dashboard" element={<StaffDashboard />}>
                    <Route path="home" element={<Home />} />
                    {/* <Route path="manage-properties" element={<ManageProperties />} /> */}
                    <Route path="manage-units" element={<Home />} /> {/* Replace with actual component */}
                    <Route path="staff-list" element={<Home />} /> {/* Replace with actual component */}
                    <Route path="acess-devices" element={<AccessDeviceList />} /> {/* Replace with actual component */}
                    <Route path="lease-agreements" element={<LeaseAgreementList />} /> {/* Replace with actual component */}
                    <Route path="maintenance-requests" element={<MaintenanceRequestList />} /> {/* Replace with actual component */}
                    <Route path="parking-spot" element={<ParkingSpotList />} /> {/* Replace with actual component */}
                    <Route path="access-log" element={<AccessLogList />} /> {/* Replace with actual component */}
                    <Route path="common-area" element={<CommonAreaList />} /> {/* Replace with actual component */}
                    <Route path="service-provider" element={<ServiceProviderList />} /> {/* Replace with actual component */}
                    <Route path="visitor-log" element={<VisitorLogList />} /> {/* Replace with actual component */}
                    <Route path="vehicle" element={<VehicleList />} /> {/* Replace with actual component */}
                    <Route path="resident-register" element={<ResidentRegister />} />
                    <Route path="resident-list" element={<ResidentList />} />

                </Route>
      </Routes>
    </Router>
  );
}

export default App;
