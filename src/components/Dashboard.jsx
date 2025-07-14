import { useEffect, useRef, useState } from 'react';
import UserProfile from './UserProfile';
import Chart from 'chart.js/auto';
import MapUI from './MapUI';
import AIRecommendations from './AIRecommendations';
import PropTypes from 'prop-types';
import CameraFeature from './CameraFeature';

function BatteryIndicator({ level = 100 }) {
  const getColor = () => {
    if (level > 60) return 'bg-green-500';
    if (level > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center">
      <div className="relative w-16 h-8 border-2 border-gray-300 rounded">
        <div 
          className={`h-full ${getColor()}`}
          style={{ width: `${level}%` }}
        ></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-300 -mr-1"></div>
      </div>
      <span className="ml-2 text-white font-bold">{level}%</span>
    </div>
  );
}

BatteryIndicator.propTypes = {
  level: PropTypes.number
};

export default function Dashboard() {
  const heartRateChartRef = useRef(null);
  const motionChartRef = useRef(null);
  const heartRateData = Array(60).fill(60);
  const motionData = Array.from({length: 6}, () => Math.floor(Math.random() * 5000));
  motionData.push(0);

  const [batteryLevel, setBatteryLevel] = useState(85);
  const temperatureChartRef = useRef(null);
  const temperatureData = Array(24).fill(36.6).map((val, i) => 
    val + Math.sin(i/3) * 0.4
  );
  const currentTemperature = temperatureData[temperatureData.length - 1].toFixed(1);
  const currentHeartRate = 60;
  const currentSteps = motionData.reduce((a, b) => a + b, 0);

  useEffect(() => {
    const ctxHeartRate = heartRateChartRef.current.getContext('2d');
    new Chart(ctxHeartRate, {
      type: 'line',
      data: {
        labels: Array.from({length: 60}, (_, i) => i + 1),
        datasets: [{
          label: 'Heart Rate (BPM)',
          data: heartRateData,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            min: 30,
            max: 210
          },
          x: {
            title: {
              display: true,
              text: 'Time (seconds)'
            }
          }
        }
      }
    });

    const ctxMotion = motionChartRef.current.getContext('2d');
    new Chart(ctxMotion, {
      type: 'bar',
      data: {
        labels: ['6 hours ago', '5 hours ago', '4 hours ago', '3 hours ago', '2 hours ago', '1 hour ago', 'Current'],
        datasets: [{
          label: 'Steps Taken',
          data: motionData,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 5000
          }
        }
      }
    });
  }, [heartRateData, motionData]);

  useEffect(() => {
    // Initialize temperature chart
    const ctxTemp = temperatureChartRef.current.getContext('2d');
    new Chart(ctxTemp, {
      type: 'line',
      data: {
        labels: Array.from({length: 24}, (_, i) => `${i}:00`),
        datasets: [{
          label: 'Body Temperature (°C)',
          data: temperatureData,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            min: 35.5,
            max: 38.5
          }
        }
      }
    });

    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 1));
    }, 60000);

    return () => clearInterval(interval);
  }, [temperatureData]);

  // Mock user data - replace with actual user data from authentication
  const user = {
    name: 'John Doe',
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg'
  };

  return (
    <div className="w-full">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Smart Ring Dashboard</h1>
          <div className="flex items-center gap-4">
            <UserProfile name={user.name} profilePhoto={user.profilePhoto} />
            <BatteryIndicator level={batteryLevel} />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temperature Card */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Body Temperature</h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-300 font-medium">
                Current: <span className="text-white font-bold text-lg">{currentTemperature}°C</span>
              </p>
            </div>
            <div className="h-48">
              <canvas ref={temperatureChartRef} className="w-full h-full"></canvas>
            </div>
          </div>

          {/* Heart Rate Card */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Heart Rate</h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-300 font-medium">
                Current: <span className="text-white font-bold text-lg">{currentHeartRate} BPM</span>
              </p>
            </div>
            <div className="h-48">
              <canvas ref={heartRateChartRef} className="w-full h-full"></canvas>
            </div>
          </div>

          {/* Steps Card */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Activity</h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-300 font-medium">
                Steps Count: <span className="text-white font-bold text-lg">{currentSteps}</span>
              </p>
            </div>
            <div className="h-48">
              <canvas ref={motionChartRef} className="w-full h-full"></canvas>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 row-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Location</h2>
            <div className="h-96 mb-6">
              <MapUI position={[51.505, -0.09]} zoom={13} />
            </div>
            {/* Camera Feature */}
            <div className="mt-6">
              <h2 className="text-xl font-bold text-white mb-4">Camera</h2>
              <CameraFeature />
            </div>
          </div>

          {/* AI Recommendations Card */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2">
            <AIRecommendations 
              heartRate={currentHeartRate} 
              steps={currentSteps} 
              batteryLevel={batteryLevel}
              temperature={currentTemperature}
            />
          </div>
        </div>
      </main>
    </div>
  );
}