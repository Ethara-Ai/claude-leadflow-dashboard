import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import WelcomeBanner from "./components/WelcomeBanner";
import StatsCards from "./components/StatsCards";
import LeadActivityChart from "./components/LeadActivityChart";
import ConversionRateChart from "./components/ConversionRateChart";
import LeadSourceChart from "./components/LeadSourceChart";
import MeetingCalendar from "./components/MeetingCalendar";
import ActivitiesFeed from "./components/ActivitiesFeed";
import LeadAlerts from "./components/LeadAlerts";
import NotesModal from "./components/NotesModal";
import AddMeetingModal from "./components/AddMeetingModal";
import Footer from "./components/Footer";
import LastUpdated from "./components/LastUpdated";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <Header />

          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Stats Cards */}
          <StatsCards />

          {/* Charts Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <LeadActivityChart />
              <ConversionRateChart />
            </div>
            <div className="grid grid-cols-1 mb-6">
              <LeadSourceChart />
            </div>
          </div>

          {/* Calendar and Activities Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MeetingCalendar />
              <ActivitiesFeed />
            </div>
          </div>

          {/* Alerts Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <LeadAlerts />
          </div>

          {/* Last Updated */}
          <LastUpdated />

          {/* Footer */}
          <Footer />

          {/* Modals */}
          <NotesModal />
          <AddMeetingModal />
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
