import React, { useState } from 'react';
import { BarChart2, TrendingUp, Download, Filter } from 'lucide-react';

const RevenueAnalytics = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  const revenueData = {
    totalRevenue: '$430,000',
    growthPercentage: 18.7,
    royalties: '$280,000',
    streaming: '$100,000',
    merchandise: '$30,000',
    licensing: '$20,000'
  };

  const topPerformers = [
    { name: 'Marcus Allen', revenue: '$210,000', growth: 32 },
    { name: 'Sarah Johnson', revenue: '$125,000', growth: 12 },
    { name: 'The Velvet Sound', revenue: '$95,000', growth: 8 }
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#141414] to-black pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Revenue Analytics</h1>
              <p className="text-gray-400 mt-2">Track financial performance and revenue streams</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <button className="netflix-btn-secondary flex items-center">
                <Download size={16} className="mr-2" />Export Report
              </button>
              <button className="netflix-btn-secondary flex items-center">
                <Filter size={16} className="mr-2" />Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Time Range Selector */}
        <div className="netflix-card mb-8">
          <div className="p-4 flex flex-wrap gap-4">
            {['Weekly', 'Monthly', 'Quarterly', 'Yearly'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range.toLowerCase())}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range.toLowerCase()
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Total Revenue Card */}
          <div className="netflix-card">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-400">Total Revenue</h3>
                <div className="flex items-center text-green-400">
                  <TrendingUp size={16} className="mr-1" />
                  <span>{revenueData.growthPercentage}%</span>
                </div>
              </div>
              <p className="mt-4 text-5xl font-bold text-white">{revenueData.totalRevenue}</p>
              <p className="mt-2 text-gray-400">Year to Date</p>
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="netflix-card">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-400">Revenue Streams</h3>
              
              <div className="mt-6 space-y-4">
                {[
                  { label: 'Royalties', value: revenueData.royalties, width: '65%' },
                  { label: 'Streaming', value: revenueData.streaming, width: '23%' },
                  { label: 'Merchandise', value: revenueData.merchandise, width: '7%' },
                  { label: 'Licensing', value: revenueData.licensing, width: '5%' }
                ].map((stream, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">{stream.label}</span>
                      <span className="text-white">{stream.value}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" 
                        style={{ width: stream.width }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="netflix-card">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Top Performing Artists</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Artist</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {topPerformers.map((artist, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{artist.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">{artist.revenue}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-green-400">+{artist.growth}%</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
