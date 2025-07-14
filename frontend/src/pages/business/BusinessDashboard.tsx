import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Music, Calendar, BarChart2 } from 'lucide-react';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  
  // Quick stats data
  const quickStats = [
    { title: 'Managed Artists', value: '12', icon: Users, color: 'from-red-600 to-red-800' },
    { title: 'Active Contracts', value: '8', icon: Music, color: 'from-red-700 to-red-900' },
    { title: 'Monthly Revenue', value: '$24,500', icon: BarChart2, color: 'from-red-500 to-red-700' },
    { title: 'Upcoming Events', value: '5', icon: Calendar, color: 'from-red-600 to-red-800' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-12 fade-in">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#141414] to-black pt-6 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Label Dashboard</h1>
          <p className="text-xl text-gray-300">
            Manage your artists, contracts, and revenue in one place
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 slide-up">
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="netflix-card">
                <div className="flex items-start">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-400">{stat.title}</h3>
                    <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
