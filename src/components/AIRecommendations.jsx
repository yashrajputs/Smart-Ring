import PropTypes from 'prop-types';

function AIRecommendations({ heartRate, steps,  }) {
  // Analyze heart rate data
  const getHeartRateStatus = () => {
    if (heartRate > 100) return 'Elevated';
    if (heartRate < 60) return 'Low';
    return 'Normal';
  };

  // Generate activity recommendations
  const getActivityRecommendation = () => {
    if (steps < 5000) return 'Consider taking a 30-minute walk today';
    if (steps < 10000) return 'Great activity! Try adding some strength training';
    return 'Excellent activity level! Maintain this pace';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">AI Recommendations</h3>
      
      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-300">Heart Status</h4>
        <p className="text-white">Your heart rate is {getHeartRateStatus()}</p>
        {getHeartRateStatus() !== 'Normal' && (
          <p className="text-yellow-300 mt-1">Consider consulting a healthcare provider</p>
        )}
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="font-semibold text-green-300">Step Count</h4>
        <p className="text-white">{getActivityRecommendation()}</p>
      </div>

    </div>
  );
}

AIRecommendations.propTypes = {
  heartRate: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  batteryLevel: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired
};

export default AIRecommendations;
