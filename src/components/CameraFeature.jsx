import { useRef, useState } from 'react';

export default function CameraFeature() {
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [streaming, setStreaming] = useState(false);

  const startCamera = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStreaming(true);
    } catch (err) {
      setError('Camera access denied or not available.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-center">
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-xs rounded mb-4 bg-black" style={{ minHeight: 200 }} />
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <div className="flex gap-4">
        <button
          onClick={startCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={streaming}
        >
          Start Camera
        </button>
        <button
          onClick={stopCamera}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
          disabled={!streaming}
        >
          Stop Camera
        </button>
      </div>
    </div>
  );
}
