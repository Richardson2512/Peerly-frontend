import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface MediaUploadModalProps {
  onFileSelect: (file: File) => void;
  onClose: () => void;
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({ onFileSelect, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
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

          <div className="space-y-3">
            {/* Add from Computer */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-50 to-emerald-50 hover:from-purple-100 hover:to-emerald-100 border-2 border-purple-200 rounded-lg transition-all"
            >
              <Upload className="h-6 w-6 text-purple-600" />
              <span className="font-medium text-purple-700">Add from Computer</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <p className="text-center text-sm text-gray-500">
              Supported: Images (JPG, PNG, GIF, WebP) and Videos (MP4, WebM)
              <br />
              Max size: 10MB for images, 50MB for videos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadModal;

