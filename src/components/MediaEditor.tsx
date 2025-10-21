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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [cropMode, setCropMode] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadImage();
  }, [imageUrl]);

  const loadImage = () => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setImageLoaded(true);
      if (imgRef.current) {
        imgRef.current.src = img.src;
      }
      // Apply transforms after image is loaded
      setTimeout(() => applyTransforms(), 100);
    };
    img.src = imageUrl;
  };

  const getDisplayDimensions = () => {
    if (!containerRef.current || !imageDimensions.width || !imageDimensions.height) {
      return { width: 400, height: 300 };
    }

    const container = containerRef.current;
    const containerWidth = container.clientWidth - 32; // Account for padding
    const containerHeight = container.clientHeight - 32;

    const aspectRatio = imageDimensions.width / imageDimensions.height;
    const containerAspectRatio = containerWidth / containerHeight;

    let displayWidth, displayHeight;

    if (aspectRatio > containerAspectRatio) {
      // Image is wider than container
      displayWidth = Math.min(containerWidth, imageDimensions.width);
      displayHeight = displayWidth / aspectRatio;
    } else {
      // Image is taller than container
      displayHeight = Math.min(containerHeight, imageDimensions.height);
      displayWidth = displayHeight * aspectRatio;
    }

    // Ensure minimum size
    displayWidth = Math.max(displayWidth, 200);
    displayHeight = Math.max(displayHeight, 150);

    return { width: displayWidth, height: displayHeight };
  };

  const applyTransforms = () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayDims = getDisplayDimensions();
    canvas.width = displayDims.width;
    canvas.height = displayDims.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Move to center
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply transformations
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    // Draw image scaled to fit display dimensions
    ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.restore();

    // Draw crop overlay if in crop mode
    if (cropMode && cropArea.width > 0 && cropArea.height > 0) {
      drawCropOverlay(ctx, canvas.width, canvas.height);
    }
  };

  const drawCropOverlay = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    // Draw dark overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Clear the crop area
    ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Redraw the image in the crop area
    const img = imgRef.current;
    if (img) {
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
      ctx.restore();
    }

    // Draw crop border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

    // Draw corner handles
    const handleSize = 8;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(cropArea.x - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropArea.x - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize);
    ctx.fillRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize);
  };

  useEffect(() => {
    if (imageLoaded) {
      applyTransforms();
    }
  }, [rotation, flipH, flipV, imageLoaded, cropMode, cropArea]);

  // Initialize crop area when entering crop mode
  useEffect(() => {
    if (cropMode && imageLoaded) {
      const displayDims = getDisplayDimensions();
      const centerX = displayDims.width / 2;
      const centerY = displayDims.height / 2;
      const cropSize = Math.min(displayDims.width, displayDims.height) * 0.6;
      
      setCropArea({
        x: centerX - cropSize / 2,
        y: centerY - cropSize / 2,
        width: cropSize,
        height: cropSize
      });
    }
  }, [cropMode, imageLoaded]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Create a high-quality version for saving
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      const img = imgRef.current;
      if (!img) return;

      // Calculate crop area in original image coordinates
      const displayDims = getDisplayDimensions();
      const scaleX = imageDimensions.width / displayDims.width;
      const scaleY = imageDimensions.height / displayDims.height;

      let cropX = 0, cropY = 0, cropWidth = imageDimensions.width, cropHeight = imageDimensions.height;

      if (cropMode && cropArea.width > 0 && cropArea.height > 0) {
        cropX = cropArea.x * scaleX;
        cropY = cropArea.y * scaleY;
        cropWidth = cropArea.width * scaleX;
        cropHeight = cropArea.height * scaleY;
      }

      // Set canvas size to crop dimensions
      tempCanvas.width = cropWidth;
      tempCanvas.height = cropHeight;

      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.save();

      // Move to center
      tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);

      // Apply transformations
      tempCtx.rotate((rotation * Math.PI) / 180);
      tempCtx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

      // Draw cropped image
      tempCtx.drawImage(
        img,
        cropX, cropY, cropWidth, cropHeight,
        -tempCanvas.width / 2, -tempCanvas.height / 2, tempCanvas.width, tempCanvas.height
      );
      tempCtx.restore();

      tempCanvas.toBlob((blob) => {
        if (blob) {
          const editedUrl = URL.createObjectURL(blob);
          onSave(editedUrl);
        }
      }, 'image/jpeg', 0.9);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (imageLoaded) {
        applyTransforms();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageLoaded]);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleFlipH = () => {
    setFlipH(!flipH);
  };

  const handleFlipV = () => {
    setFlipV(!flipV);
  };

  const handleCropToggle = () => {
    setCropMode(!cropMode);
    if (cropMode) {
      // Reset crop area when exiting crop mode
      setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cropMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setDragStart({ x, y });
    setCropArea({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cropMode || !isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = x - dragStart.x;
    const height = y - dragStart.y;

    setCropArea({
      x: Math.min(dragStart.x, x),
      y: Math.min(dragStart.y, y),
      width: Math.abs(width),
      height: Math.abs(height)
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">
              {imageLoaded && (
                <span>
                  Original: {imageDimensions.width} × {imageDimensions.height}px
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">
              {rotation !== 0 && `Rotated: ${rotation}°`}
              {flipH && ' • Flipped H'}
              {flipV && ' • Flipped V'}
              {cropMode && ' • Crop Mode Active'}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2">
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
            <button
              onClick={handleCropToggle}
              className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                cropMode ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-gray-300 hover:bg-gray-100'
              }`}
            >
              <Crop className="h-5 w-5 mr-2" />
              Crop
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-auto bg-gray-900 flex items-center justify-center p-8"
        >
          <div className="relative max-w-full max-h-full">
            <img
              ref={imgRef}
              src={imageUrl}
              alt="Edit preview"
              className="hidden"
            />
            {imageLoaded ? (
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full object-contain border border-gray-600 rounded-lg cursor-crosshair"
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            ) : (
              <div className="flex items-center justify-center w-96 h-64 bg-gray-800 rounded-lg">
                <div className="text-gray-400 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
                  <p>Loading image...</p>
                </div>
              </div>
            )}
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

