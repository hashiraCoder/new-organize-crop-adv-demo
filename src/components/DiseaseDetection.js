import React, { useState } from 'react';
import './DiseaseDetection.css';
import { strings } from '../strings';

const DiseaseDetection = ({ language }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setMessage(file ? `${strings[language].imageUploadSuccess}${file.name}` : '');
    setAnalysisResult(null);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleImageAnalysis = async () => {
    if (!selectedFile) {
      setMessage(strings[language].selectFileFirst);
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setMessage('');

    try {
      const base64Image = await toBase64(selectedFile);
      
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          mimeType: selectedFile.type,
          language: language
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      setAnalysisResult(result);

    } catch (error) {
      console.error("Error during image analysis:", error);
      setMessage(strings[language].imageProcessingError);
    } finally {
      setIsLoading(false);
    }
  };

  const progressColor = analysisResult?.health > 75 ? 'text-green-500' : analysisResult?.health > 50 ? 'text-yellow-500' : 'text-red-500';

  const DashboardCard = ({ title, icon, children }) => (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
      <span className="text-3xl mb-2">{icon}</span>
      <h4 className="font-bold text-lg text-gray-700">{title}</h4>
      <div className="mt-1 text-gray-600 w-full">{children}</div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{strings[language].diseaseTitle}</h1>
      <p className="text-gray-600 mb-6">{strings[language].diseasePrompt}</p>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="max-w-xl mx-auto">
          <label htmlFor="file-upload" className="block w-full text-center py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg cursor-pointer hover:bg-gray-300 transition-colors duration-300">
            {strings[language].selectImage}
          </label>
          <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

          {selectedFile && (
            <div className="flex flex-col items-center mt-6">
              <p className="text-gray-500 mb-2 text-sm">{message}</p>
              <img src={URL.createObjectURL(selectedFile)} alt="Selected crop" className="max-w-xs rounded-lg shadow-md" />
            </div>
          )}

          <button onClick={handleImageAnalysis} disabled={!selectedFile || isLoading} className={`w-full mt-6 py-3 px-6 font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${selectedFile && !isLoading ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}>
            {isLoading ? strings[language].analyzing : strings[language].analyzeImage}
          </button>
        </div>

        {analysisResult && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6 text-center">{strings[language].analysisResult}</h3>
            {analysisResult.health != null && (
                <div className="bg-gray-100 p-6 rounded-2xl shadow-inner mb-6 flex flex-col items-center">
                    <h4 className="font-bold text-xl mb-4 text-gray-700">🌱 {strings[language].health.toUpperCase()}</h4>
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle className="text-gray-300 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                            <circle className={`stroke-current transition-all duration-1000 ease-out ${progressColor}`} strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 * (100 - analysisResult.health) / 100} transform="rotate(-90 50 50)"></circle>
                            <text x="50" y="50" textAnchor="middle" dy="0.3em" className={`text-xl font-bold ${progressColor}`}>{analysisResult.health}%</text>
                        </svg>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysisResult.crop && (<DashboardCard title={strings[language].cropIdentification} icon="🌾"><p>{analysisResult.crop}</p></DashboardCard>)}
                {analysisResult.disease && (<DashboardCard title={strings[language].disease} icon="🦠"><p>{analysisResult.disease}</p></DashboardCard>)}
                {analysisResult.symptoms && analysisResult.symptoms.length > 0 && (<DashboardCard title={strings[language].symptoms} icon="🔍"><ul className="list-none text-left w-full space-y-1">{analysisResult.symptoms.map((s, i) => (<li key={i} className="flex items-start"><span className="mr-2 text-gray-500">•</span><span>{s}</span></li>))}</ul></DashboardCard>)}
                {analysisResult.solutions && analysisResult.solutions.length > 0 && (<DashboardCard title={strings[language].solutions} icon="💡"><ul className="list-none text-left w-full space-y-1">{analysisResult.solutions.map((s, i) => (<li key={i} className="flex items-start"><span className="mr-2 text-gray-500">•</span><span>{s}</span></li>))}</ul></DashboardCard>)}
                {analysisResult.pesticides && analysisResult.pesticides.length > 0 && (<div className="md:col-span-2"><DashboardCard title={strings[language].pesticidesAndPrevention} icon="🛡"><ul className="list-none text-left w-full space-y-1">{analysisResult.pesticides.map((p, i) => (<li key={i} className="flex items-start"><span className="mr-2 text-gray-500">•</span><span>{p}</span></li>))}</ul></DashboardCard></div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;

