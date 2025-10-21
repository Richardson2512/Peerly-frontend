// Media validation utilities for posts
export interface MediaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
  suggestedSize?: ImageDimensions;
  suggestedAspectRatio?: string;
  autoCropSuggestion?: {
    x: number;
    y: number;
    width: number;
    height: number;
    aspectRatio: string;
  };
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface VideoInfo {
  duration: number; // in seconds
  dimensions: ImageDimensions;
  fileSize: number; // in bytes
}

// Image specifications
export const IMAGE_SPECS = {
  MIN_DIMENSIONS: { width: 552, height: 368 },
  RECOMMENDED_DIMENSIONS: { width: 1200, height: 627 },
  ASPECT_RATIOS: {
    LANDSCAPE: { ratio: 1.91, name: 'Landscape (1.91:1)', width: 1080, height: 566 },
    SQUARE: { ratio: 1, name: 'Square (1:1)', width: 1080, height: 1080 },
    PORTRAIT: { ratio: 0.8, name: 'Portrait (4:5)', width: 1080, height: 1350 }
  },
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
};

// Video specifications
export const VIDEO_SPECS = {
  MIN_DURATION: 3, // seconds
  MAX_DURATION: 600, // 10 minutes
  MAX_FILE_SIZE: 4 * 1024 * 1024 * 1024, // 4GB
  RECOMMENDED_DIMENSIONS: { width: 1920, height: 1080 },
  ASPECT_RATIOS: {
    MIN: 1 / 2.4, // 1:2.4 (vertical)
    MAX: 2.4 / 1, // 2.4:1 (horizontal)
    SQUARE: { ratio: 1, name: 'Square (1:1)', width: 1080, height: 1080 },
    PORTRAIT: { ratio: 0.8, name: 'Portrait (4:5)', width: 1080, height: 1350 },
    LANDSCAPE: { ratio: 1.78, name: 'Landscape (16:9)', width: 1080, height: 608 }
  },
  SUPPORTED_FORMATS: ['video/mp4', 'video/webm', 'video/quicktime'],
  RECOMMENDED_FPS: 30
};

export const validateImage = async (file: File): Promise<MediaValidationResult> => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check file type
  if (!IMAGE_SPECS.SUPPORTED_FORMATS.includes(file.type)) {
    errors.push(`Unsupported image format. Supported: ${IMAGE_SPECS.SUPPORTED_FORMATS.join(', ')}`);
  }

  // Check file size
  if (file.size > IMAGE_SPECS.MAX_FILE_SIZE) {
    errors.push(`File too large. Maximum size: ${(IMAGE_SPECS.MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)}MB`);
  }

  // Get image dimensions
  try {
    const dimensions = await getImageDimensions(file);
    
    // Check minimum dimensions
    if (dimensions.width < IMAGE_SPECS.MIN_DIMENSIONS.width || dimensions.height < IMAGE_SPECS.MIN_DIMENSIONS.height) {
      errors.push(`Image too small. Minimum: ${IMAGE_SPECS.MIN_DIMENSIONS.width}×${IMAGE_SPECS.MIN_DIMENSIONS.height}px`);
    }

    // Analyze best fit size and suggest auto-crop
    const sizeAnalysis = analyzeBestFitSize(dimensions);
    const aspectRatio = dimensions.width / dimensions.height;

    if (sizeAnalysis.autoCropSuggestion) {
      warnings.push(`Image doesn't match recommended aspect ratios`);
      recommendations.push(`Auto-crop suggestion: ${sizeAnalysis.bestFit.name} (${sizeAnalysis.bestFit.width}×${sizeAnalysis.bestFit.height}px)`);
      recommendations.push(`Crop area: ${sizeAnalysis.autoCropSuggestion.width}×${sizeAnalysis.autoCropSuggestion.height}px from position (${sizeAnalysis.autoCropSuggestion.x}, ${sizeAnalysis.autoCropSuggestion.y})`);
    } else {
      recommendations.push(`Perfect! Image matches ${sizeAnalysis.bestFit.name} aspect ratio`);
    }

    // Check if dimensions are optimal
    if (dimensions.width < IMAGE_SPECS.RECOMMENDED_DIMENSIONS.width || 
        dimensions.height < IMAGE_SPECS.RECOMMENDED_DIMENSIONS.height) {
      warnings.push(`Image resolution is below recommended size`);
      recommendations.push(`Recommended size: ${IMAGE_SPECS.RECOMMENDED_DIMENSIONS.width}×${IMAGE_SPECS.RECOMMENDED_DIMENSIONS.height}px for best quality`);
    }

    // Add dimension info
    recommendations.push(`Current size: ${dimensions.width}×${dimensions.height}px (${aspectRatio.toFixed(2)}:1)`);

  } catch (error) {
    errors.push('Could not read image dimensions');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations,
    suggestedSize: sizeAnalysis?.bestFit,
    suggestedAspectRatio: sizeAnalysis?.bestFit?.name,
    autoCropSuggestion: sizeAnalysis?.autoCropSuggestion
  };
};

export const validateVideo = async (file: File): Promise<MediaValidationResult> => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check file type
  if (!VIDEO_SPECS.SUPPORTED_FORMATS.includes(file.type)) {
    errors.push(`Unsupported video format. Supported: ${VIDEO_SPECS.SUPPORTED_FORMATS.join(', ')}`);
  }

  // Check file size
  if (file.size > VIDEO_SPECS.MAX_FILE_SIZE) {
    errors.push(`File too large. Maximum size: ${(VIDEO_SPECS.MAX_FILE_SIZE / (1024 * 1024 * 1024)).toFixed(1)}GB`);
  }

  // Get video info
  try {
    const videoInfo = await getVideoInfo(file);
    
    // Check duration
    if (videoInfo.duration < VIDEO_SPECS.MIN_DURATION) {
      errors.push(`Video too short. Minimum duration: ${VIDEO_SPECS.MIN_DURATION} seconds`);
    }
    if (videoInfo.duration > VIDEO_SPECS.MAX_DURATION) {
      errors.push(`Video too long. Maximum duration: ${VIDEO_SPECS.MAX_DURATION} seconds (10 minutes)`);
    }

    // Check aspect ratio
    const aspectRatio = videoInfo.dimensions.width / videoInfo.dimensions.height;
    if (aspectRatio < VIDEO_SPECS.ASPECT_RATIOS.MIN || aspectRatio > VIDEO_SPECS.ASPECT_RATIOS.MAX) {
      errors.push(`Invalid aspect ratio. Supported range: 1:2.4 to 2.4:1`);
    }

    // Check dimensions
    if (videoInfo.dimensions.width < 480 || videoInfo.dimensions.height < 480) {
      warnings.push(`Video resolution is low`);
      recommendations.push(`Recommended: ${VIDEO_SPECS.RECOMMENDED_DIMENSIONS.width}×${VIDEO_SPECS.RECOMMENDED_DIMENSIONS.height}px (1080p HD)`);
    }

    // Add video info
    recommendations.push(`Duration: ${videoInfo.duration.toFixed(1)}s, Size: ${videoInfo.dimensions.width}×${videoInfo.dimensions.height}px`);
    recommendations.push(`File size: ${(file.size / (1024 * 1024)).toFixed(1)}MB`);

  } catch (error) {
    errors.push('Could not read video information');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations
  };
};

export const getImageDimensions = (file: File): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const getVideoInfo = (file: File): Promise<VideoInfo> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve({
        duration: video.duration,
        dimensions: { width: video.videoWidth, height: video.videoHeight },
        fileSize: file.size
      });
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Could not load video'));
    };
    
    video.src = URL.createObjectURL(file);
  });
};

export const getRecommendedDimensions = (currentDimensions: ImageDimensions, type: 'image' | 'video'): ImageDimensions[] => {
  if (type === 'image') {
    return Object.values(IMAGE_SPECS.ASPECT_RATIOS).map(spec => ({
      width: spec.width,
      height: spec.height
    }));
  } else {
    return Object.values(VIDEO_SPECS.ASPECT_RATIOS).map(spec => ({
      width: spec.width,
      height: spec.height
    }));
  }
};

export const analyzeBestFitSize = (originalDimensions: ImageDimensions): {
  bestFit: typeof IMAGE_SPECS.ASPECT_RATIOS[keyof typeof IMAGE_SPECS.ASPECT_RATIOS];
  autoCropSuggestion?: {
    x: number;
    y: number;
    width: number;
    height: number;
    aspectRatio: string;
  };
} => {
  const aspectRatio = originalDimensions.width / originalDimensions.height;
  const tolerance = 0.1; // 10% tolerance for aspect ratio matching

  // Check if image already matches a recommended aspect ratio
  for (const [key, spec] of Object.entries(IMAGE_SPECS.ASPECT_RATIOS)) {
    if (Math.abs(aspectRatio - spec.ratio) <= tolerance) {
      return { bestFit: spec };
    }
  }

  // Find the closest aspect ratio
  let closestRatio = IMAGE_SPECS.ASPECT_RATIOS.LANDSCAPE;
  let smallestDiff = Math.abs(aspectRatio - IMAGE_SPECS.ASPECT_RATIOS.LANDSCAPE.ratio);

  for (const spec of Object.values(IMAGE_SPECS.ASPECT_RATIOS)) {
    const diff = Math.abs(aspectRatio - spec.ratio);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closestRatio = spec;
    }
  }

  // Calculate auto-crop suggestion
  const autoCropSuggestion = calculateAutoCrop(originalDimensions, closestRatio);

  return {
    bestFit: closestRatio,
    autoCropSuggestion
  };
};

const calculateAutoCrop = (
  originalDimensions: ImageDimensions,
  targetSpec: typeof IMAGE_SPECS.ASPECT_RATIOS[keyof typeof IMAGE_SPECS.ASPECT_RATIOS]
): {
  x: number;
  y: number;
  width: number;
  height: number;
  aspectRatio: string;
} => {
  const { width: origWidth, height: origHeight } = originalDimensions;
  const targetRatio = targetSpec.ratio;

  let cropWidth, cropHeight, cropX, cropY;

  if (origWidth / origHeight > targetRatio) {
    // Image is wider than target ratio - crop width
    cropHeight = origHeight;
    cropWidth = origHeight * targetRatio;
    cropX = (origWidth - cropWidth) / 2;
    cropY = 0;
  } else {
    // Image is taller than target ratio - crop height
    cropWidth = origWidth;
    cropHeight = origWidth / targetRatio;
    cropX = 0;
    cropY = (origHeight - cropHeight) / 2;
  }

  return {
    x: Math.round(cropX),
    y: Math.round(cropY),
    width: Math.round(cropWidth),
    height: Math.round(cropHeight),
    aspectRatio: targetSpec.name
  };
};
