import React, { useRef, useState } from 'react';
import { Upload, X, AlertTriangle, CheckCircle, Info, Crop } from 'lucide-react';
import { validateImage, validateVideo, MediaValidationResult } from '../lib/mediaValidation';

interface MediaUploadModalProps {
  onFileSelect: (file: File, validationResult?: MediaValidationResult) => void;
  onClose: () => void;
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({ onFileSelect, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationResult, setValidationResult] = useState<MediaValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsValidating(true);
      setValidationResult(null);

      try {
        let result: MediaValidationResult;
        
        if (file.type.startsWith('image/')) {
          result = await validateImage(file);
        } else if (file.type.startsWith('video/')) {
          result = await validateVideo(file);
        } else {
          result = {
            isValid: false,
            errors: ['Unsupported file type'],
            warnings: [],
            recommendations: []
          };
        }

        setValidationResult(result);
        
        // If valid or only has warnings, proceed with file selection
        if (result.isValid || (result.errors.length === 0 && result.warnings.length > 0)) {
          onFileSelect(file, result);
        }
      } catch (error) {
        console.error('File validation error:', error);
        setValidationResult({
          isValid: false,
          errors: [`Could not validate file: ${error instanceof Error ? error.message : 'Unknown error'}`],
          warnings: [],
          recommendations: []
        });
      } finally {
        setIsValidating(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add Media</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Add from Computer */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isValidating}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-50 to-emerald-50 hover:from-purple-100 hover:to-emerald-100 border-2 border-purple-200 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isValidating ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              ) : (
                <Upload className="h-6 w-6 text-purple-600" />
              )}
              <span className="font-medium text-purple-700">
                {isValidating ? 'Validating...' : 'Add from Computer'}
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Validation Results */}
            {validationResult && (
              <div className="space-y-3">
                {/* Errors */}
                {validationResult.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">Issues Found:</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          {validationResult.errors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Warnings */}
                {validationResult.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-2">Warnings:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          {validationResult.warnings.map((warning, index) => (
                            <li key={index}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success */}
                {validationResult.isValid && validationResult.errors.length === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-green-800">File is ready!</h4>
                        <p className="text-sm text-green-700 mt-1">Your media meets all requirements.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Auto-Crop Suggestion */}
                {validationResult.autoCropSuggestion && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Crop className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-800 mb-2">Auto-Crop Suggestion</h4>
                        <p className="text-sm text-purple-700 mb-3">
                          Your image doesn't match the recommended aspect ratio. We suggest cropping to {validationResult.suggestedAspectRatio} for optimal posting.
                        </p>
                        <button
                          onClick={() => {
                            // Apply auto-crop suggestion
                            onFileSelect(file, validationResult);
                          }}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          Apply Auto-Crop ({validationResult.autoCropSuggestion.width}×{validationResult.autoCropSuggestion.height}px)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {validationResult.recommendations.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">File Information:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {validationResult.recommendations.map((rec, index) => (
                            <li key={index}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Media Specifications */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Media Specifications</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Images:</h4>
                  <ul className="text-gray-600 space-y-1 ml-2">
                    <li>• Min: 552×368px</li>
                    <li>• Recommended: 1200×627px (landscape)</li>
                    <li>• Square: 1080×1080px</li>
                    <li>• Portrait: 1080×1350px</li>
                    <li>• Max size: 10MB</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Videos:</h4>
                  <ul className="text-gray-600 space-y-1 ml-2">
                    <li>• Duration: 3s - 10min</li>
                    <li>• Recommended: 1920×1080px (1080p)</li>
                    <li>• Aspect ratio: 1:2.4 to 2.4:1</li>
                    <li>• Max size: 4GB</li>
                    <li>• 30fps recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadModal;

