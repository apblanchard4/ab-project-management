import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewProjects from './pages/ViewProjects';
import CreateProject from './pages/CreateProject';
import Home from './pages/Home';
import ViewTime from './pages/ViewTime';
import AddTime from './pages/AddTime';
import ViewProject from './pages/ViewProject';
import EditProject from './pages/EditProject';
import EditTime from './pages/EditTime';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Router>
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viewProjects" element={<ViewProjects />} />
            <Route path="/viewProject/:id" element={<ViewProject />} />
            <Route path="/editProject/:id" element={<EditProject />} />
            <Route path="/viewTime" element={<ViewTime />} />
            <Route path="/createProject" element={<CreateProject />} />
            <Route path="/addTime/:id" element={<AddTime />} />
            <Route path="/editTime/:projectId/:timeEntryId" element={<EditTime />} />


          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
