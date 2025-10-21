import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, FlipHorizontal, FlipVertical, Crop, X, Check } from 'lucide-react';

interface MediaEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
}

const MediaEditor: React.FC<MediaEditorProps> = ({ imageUrl, onSave, onCancel }) => {
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    loadImage();
  }, [imageUrl]);

  const loadImage = () => {
    const img = new Image();
    img.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = img.src;
      }
    };
    img.src = imageUrl;
  };

  const applyTransforms = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Move to center
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply transformations
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    // Draw image
    ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.restore();
  };

  useEffect(() => {
    if (imgRef.current?.complete) {
      applyTransforms();
    }
  }, [rotation, flipH, flipV]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const editedUrl = URL.createObjectURL(blob);
          onSave(editedUrl);
        }
      }, 'image/jpeg', 0.9);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFlipH = () => {
    setFlipH(!flipH);
  };

  const handleFlipV = () => {
    setFlipV(!flipV);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Edit Media</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Editor Tools */}
        <div className="p-4 border-b bg-gray-50 flex items-center justify-center space-x-2">
          <button
            onClick={handleRotate}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCw className="h-5 w-5 mr-2 text-gray-700" />
            Rotate
          </button>
          <button
            onClick={handleFlipH}
            className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
              flipH ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
          >
            <FlipHorizontal className="h-5 w-5 mr-2" />
            Flip H
          </button>
          <button
            onClick={handleFlipV}
            className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
              flipV ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-gray-300 hover:bg-gray-100'
            }`}
          >
            <FlipVertical className="h-5 w-5 mr-2" />
            Flip V
          </button>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-gray-900 flex items-center justify-center p-8">
          <div className="relative max-w-full max-h-full">
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Edit preview"
              className="hidden"
              onLoad={applyTransforms}
            />
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t bg-gray-50 flex items-center justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all"
          >
            <Check className="h-5 w-5 mr-2" />
            Add to Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaEditor;

