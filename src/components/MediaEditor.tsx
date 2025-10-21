import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, FlipHorizontal, FlipVertical, Crop, X, Check } from 'lucide-react';

interface MediaEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
  autoCropSuggestion?: {
    x: number;
    y: number;
    width: number;
    height: number;
    aspectRatio: string;
  };
}

const MediaEditor: React.FC<MediaEditorProps> = ({ imageUrl, onSave, onCancel, autoCropSuggestion }) => {
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [cropMode, setCropMode] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragType, setDragType] = useState<'move' | 'resize' | 'corner' | 'edge' | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [showCropPreview, setShowCropPreview] = useState(false);
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
    const img = imgRef.current;
    if (!img) return;

    if (showCropPreview) {
      // Show only the cropped area zoomed to fill the canvas
      const scaleX = canvasWidth / cropArea.width;
      const scaleY = canvasHeight / cropArea.height;
      const scale = Math.min(scaleX, scaleY);
      
      const scaledWidth = cropArea.width * scale;
      const scaledHeight = cropArea.height * scale;
      const offsetX = (canvasWidth - scaledWidth) / 2;
      const offsetY = (canvasHeight - scaledHeight) / 2;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      // Draw the cropped portion of the image
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      
      // Calculate source coordinates in original image
      const sourceX = (cropArea.x / canvasWidth) * img.naturalWidth;
      const sourceY = (cropArea.y / canvasHeight) * img.naturalHeight;
      const sourceWidth = (cropArea.width / canvasWidth) * img.naturalWidth;
      const sourceHeight = (cropArea.height / canvasHeight) * img.naturalHeight;
      
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight
      );
      ctx.restore();
      
      // Draw a subtle border to show this is the preview
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(offsetX, offsetY, scaledWidth, scaledHeight);
      
    } else {
      // Normal crop overlay mode
      // First, draw the full image
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
      ctx.restore();

      // Draw dark overlay over the entire image
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Clear the crop area to show the bright image
      ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

      // Redraw the image only in the crop area (bright and clear)
      ctx.save();
      ctx.translate(canvasWidth / 2, canvasHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(img, -canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);
      ctx.restore();

      // Draw crop border with thicker line
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

      // Draw corner handles (larger and more visible)
      const handleSize = 12;
      ctx.fillStyle = '#3b82f6';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      
      // Top-left corner
      ctx.fillRect(cropArea.x - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize);
      ctx.strokeRect(cropArea.x - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize);
      
      // Top-right corner
      ctx.fillRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize);
      ctx.strokeRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y - handleSize/2, handleSize, handleSize);
      
      // Bottom-left corner
      ctx.fillRect(cropArea.x - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize);
      ctx.strokeRect(cropArea.x - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize);
      
      // Bottom-right corner
      ctx.fillRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize);
      ctx.strokeRect(cropArea.x + cropArea.width - handleSize/2, cropArea.y + cropArea.height - handleSize/2, handleSize, handleSize);

      // Draw side handles for resizing
      const sideHandleSize = 8;
      const sideHandleLength = 20;
      
      // Top side
      ctx.fillRect(cropArea.x + cropArea.width/2 - sideHandleLength/2, cropArea.y - sideHandleSize/2, sideHandleLength, sideHandleSize);
      ctx.strokeRect(cropArea.x + cropArea.width/2 - sideHandleLength/2, cropArea.y - sideHandleSize/2, sideHandleLength, sideHandleSize);
      
      // Bottom side
      ctx.fillRect(cropArea.x + cropArea.width/2 - sideHandleLength/2, cropArea.y + cropArea.height - sideHandleSize/2, sideHandleLength, sideHandleSize);
      ctx.strokeRect(cropArea.x + cropArea.width/2 - sideHandleLength/2, cropArea.y + cropArea.height - sideHandleSize/2, sideHandleLength, sideHandleSize);
      
      // Left side
      ctx.fillRect(cropArea.x - sideHandleSize/2, cropArea.y + cropArea.height/2 - sideHandleLength/2, sideHandleSize, sideHandleLength);
      ctx.strokeRect(cropArea.x - sideHandleSize/2, cropArea.y + cropArea.height/2 - sideHandleLength/2, sideHandleSize, sideHandleLength);
      
      // Right side
      ctx.fillRect(cropArea.x + cropArea.width - sideHandleSize/2, cropArea.y + cropArea.height/2 - sideHandleLength/2, sideHandleSize, sideHandleLength);
      ctx.strokeRect(cropArea.x + cropArea.width - sideHandleSize/2, cropArea.y + cropArea.height/2 - sideHandleLength/2, sideHandleSize, sideHandleLength);
    }
  };

  useEffect(() => {
    if (imageLoaded) {
      applyTransforms();
    }
  }, [rotation, flipH, flipV, imageLoaded, cropMode, cropArea, showCropPreview]);

  // Initialize crop area when entering crop mode
  useEffect(() => {
    if (cropMode && imageLoaded) {
      if (autoCropSuggestion) {
        // Use auto-crop suggestion
        const displayDims = getDisplayDimensions();
        const scaleX = displayDims.width / imageDimensions.width;
        const scaleY = displayDims.height / imageDimensions.height;
        
        setCropArea({
          x: autoCropSuggestion.x * scaleX,
          y: autoCropSuggestion.y * scaleY,
          width: autoCropSuggestion.width * scaleX,
          height: autoCropSuggestion.height * scaleY
        });
      } else {
        // Default centered crop
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
    }
  }, [cropMode, imageLoaded, autoCropSuggestion, imageDimensions]);

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

      // Set canvas size to crop dimensions (ensure minimum size)
      tempCanvas.width = Math.max(cropWidth, 1);
      tempCanvas.height = Math.max(cropHeight, 1);

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
    setShowCropPreview(false);
    if (cropMode) {
      // Reset crop area when exiting crop mode
      setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    }
  };

  const handlePreviewCrop = () => {
    if (cropArea.width > 0 && cropArea.height > 0) {
      setShowCropPreview(!showCropPreview);
    }
  };

  const getHandleAtPoint = (x: number, y: number): string | null => {
    const handleSize = 12;
    const sideHandleSize = 8;
    const sideHandleLength = 20;
    const tolerance = 5;

    // Check corner handles
    if (Math.abs(x - cropArea.x) <= handleSize/2 + tolerance && 
        Math.abs(y - cropArea.y) <= handleSize/2 + tolerance) {
      return 'top-left';
    }
    if (Math.abs(x - (cropArea.x + cropArea.width)) <= handleSize/2 + tolerance && 
        Math.abs(y - cropArea.y) <= handleSize/2 + tolerance) {
      return 'top-right';
    }
    if (Math.abs(x - cropArea.x) <= handleSize/2 + tolerance && 
        Math.abs(y - (cropArea.y + cropArea.height)) <= handleSize/2 + tolerance) {
      return 'bottom-left';
    }
    if (Math.abs(x - (cropArea.x + cropArea.width)) <= handleSize/2 + tolerance && 
        Math.abs(y - (cropArea.y + cropArea.height)) <= handleSize/2 + tolerance) {
      return 'bottom-right';
    }

    // Check side handles
    if (x >= cropArea.x + cropArea.width/2 - sideHandleLength/2 - tolerance &&
        x <= cropArea.x + cropArea.width/2 + sideHandleLength/2 + tolerance &&
        y >= cropArea.y - sideHandleSize/2 - tolerance &&
        y <= cropArea.y + sideHandleSize/2 + tolerance) {
      return 'top';
    }
    if (x >= cropArea.x + cropArea.width/2 - sideHandleLength/2 - tolerance &&
        x <= cropArea.x + cropArea.width/2 + sideHandleLength/2 + tolerance &&
        y >= cropArea.y + cropArea.height - sideHandleSize/2 - tolerance &&
        y <= cropArea.y + cropArea.height + sideHandleSize/2 + tolerance) {
      return 'bottom';
    }
    if (x >= cropArea.x - sideHandleSize/2 - tolerance &&
        x <= cropArea.x + sideHandleSize/2 + tolerance &&
        y >= cropArea.y + cropArea.height/2 - sideHandleLength/2 - tolerance &&
        y <= cropArea.y + cropArea.height/2 + sideHandleLength/2 + tolerance) {
      return 'left';
    }
    if (x >= cropArea.x + cropArea.width - sideHandleSize/2 - tolerance &&
        x <= cropArea.x + cropArea.width + sideHandleSize/2 + tolerance &&
        y >= cropArea.y + cropArea.height/2 - sideHandleLength/2 - tolerance &&
        y <= cropArea.y + cropArea.height/2 + sideHandleLength/2 + tolerance) {
      return 'right';
    }

    // Check if inside crop area (for moving)
    if (x >= cropArea.x && x <= cropArea.x + cropArea.width &&
        y >= cropArea.y && y <= cropArea.y + cropArea.height) {
      return 'move';
    }

    return null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cropMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is outside the canvas (discard crop)
    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
      setCropMode(false);
      setShowCropPreview(false);
      setCropArea({ x: 0, y: 0, width: 0, height: 0 });
      return;
    }

    const handle = getHandleAtPoint(x, y);
    
    if (handle) {
      setIsDragging(true);
      setDragStart({ x, y });
      setDragType(handle === 'move' ? 'move' : 'resize');
      setResizeHandle(handle);
    } else {
      // Start new crop selection
      setIsDragging(true);
      setDragStart({ x, y });
      setDragType('resize');
      setResizeHandle('new');
      setCropArea({ x, y, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cropMode || !isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;

    if (dragType === 'move' && resizeHandle === 'move') {
      // Move the entire crop area
      setCropArea(prev => ({
        x: Math.max(0, Math.min(prev.x + deltaX, canvas.width - prev.width)),
        y: Math.max(0, Math.min(prev.y + deltaY, canvas.height - prev.height)),
        width: prev.width,
        height: prev.height
      }));
    } else if (dragType === 'resize') {
      // Resize based on handle
      if (resizeHandle === 'new') {
        // Create new crop area
        setCropArea({
          x: Math.min(dragStart.x, x),
          y: Math.min(dragStart.y, y),
          width: Math.abs(deltaX),
          height: Math.abs(deltaY)
        });
      } else {
        // Resize existing crop area
        let newCropArea = { ...cropArea };
        
        switch (resizeHandle) {
          case 'top-left':
            newCropArea.x = Math.min(x, cropArea.x + cropArea.width - 20);
            newCropArea.y = Math.min(y, cropArea.y + cropArea.height - 20);
            newCropArea.width = cropArea.width + (cropArea.x - newCropArea.x);
            newCropArea.height = cropArea.height + (cropArea.y - newCropArea.y);
            break;
          case 'top-right':
            newCropArea.y = Math.min(y, cropArea.y + cropArea.height - 20);
            newCropArea.width = Math.max(20, x - cropArea.x);
            newCropArea.height = cropArea.height + (cropArea.y - newCropArea.y);
            break;
          case 'bottom-left':
            newCropArea.x = Math.min(x, cropArea.x + cropArea.width - 20);
            newCropArea.width = cropArea.width + (cropArea.x - newCropArea.x);
            newCropArea.height = Math.max(20, y - cropArea.y);
            break;
          case 'bottom-right':
            newCropArea.width = Math.max(20, x - cropArea.x);
            newCropArea.height = Math.max(20, y - cropArea.y);
            break;
          case 'top':
            newCropArea.y = Math.min(y, cropArea.y + cropArea.height - 20);
            newCropArea.height = cropArea.height + (cropArea.y - newCropArea.y);
            break;
          case 'bottom':
            newCropArea.height = Math.max(20, y - cropArea.y);
            break;
          case 'left':
            newCropArea.x = Math.min(x, cropArea.x + cropArea.width - 20);
            newCropArea.width = cropArea.width + (cropArea.x - newCropArea.x);
            break;
          case 'right':
            newCropArea.width = Math.max(20, x - cropArea.x);
            break;
        }
        
        // Ensure crop area stays within canvas bounds
        newCropArea.x = Math.max(0, Math.min(newCropArea.x, canvas.width - newCropArea.width));
        newCropArea.y = Math.max(0, Math.min(newCropArea.y, canvas.height - newCropArea.height));
        newCropArea.width = Math.min(newCropArea.width, canvas.width - newCropArea.x);
        newCropArea.height = Math.min(newCropArea.height, canvas.height - newCropArea.y);
        
        setCropArea(newCropArea);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
    setResizeHandle(null);
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
              {showCropPreview && ' • Preview Mode'}
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
            {autoCropSuggestion && (
              <button
                onClick={() => {
                  setCropMode(true);
                  // Auto-crop suggestion will be applied in useEffect
                }}
                className="flex items-center px-4 py-2 bg-green-100 border border-green-500 text-green-700 rounded-lg transition-colors hover:bg-green-200"
              >
                <Crop className="h-5 w-5 mr-2" />
                Auto-Crop ({autoCropSuggestion.aspectRatio})
              </button>
            )}
            {cropMode && cropArea.width > 0 && cropArea.height > 0 && (
              <button
                onClick={handlePreviewCrop}
                className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  showCropPreview ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 hover:bg-gray-100'
                }`}
              >
                <Crop className="h-5 w-5 mr-2" />
                {showCropPreview ? 'Edit Crop' : 'Preview Crop'}
              </button>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-auto bg-gray-900 flex items-center justify-center p-8"
          onClick={(e) => {
            // If clicking outside the canvas, discard crop
            if (cropMode && e.target === containerRef.current) {
              setCropMode(false);
              setShowCropPreview(false);
              setCropArea({ x: 0, y: 0, width: 0, height: 0 });
            }
          }}
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
                className="max-w-full max-h-full object-contain border border-gray-600 rounded-lg"
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%',
                  objectFit: 'contain',
                  cursor: cropMode ? 'crosshair' : 'default'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={(e) => {
                  if (cropMode && !isDragging) {
                    const canvas = canvasRef.current;
                    if (canvas) {
                      const rect = canvas.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const handle = getHandleAtPoint(x, y);
                      
                      // Set cursor based on handle type
                      if (handle === 'move') {
                        canvas.style.cursor = 'move';
                      } else if (handle && handle !== 'move') {
                        canvas.style.cursor = 'nw-resize';
                      } else {
                        canvas.style.cursor = 'crosshair';
                      }
                    }
                  }
                  handleMouseMove(e);
                }}
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

