import { useState } from "react";
import { recognizeImage } from "@/lib/api";

interface ImageUploadProps {
  onResults: (ingredients: string[]) => void;
}

export default function ImageUpload({ onResults }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match("image.*")) {
        setError("Please upload an image file");
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }
      
      processImage(file);
    }
  };
  
  const processImage = async (file: File) => {
    setLoading(true);
    setError(null);
    
    try {
      // Resize image to ~1024px max side before upload
      const resizedFile = await resizeImage(file, 1024);
      
      // Send to recognition API
      const response = await recognizeImage(resizedFile);
      
      if (response.error) {
        setError(response.error);
      } else {
        onResults(response.ingredients);
      }
    } catch (err) {
      setError("Failed to process image. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const resizeImage = (file: File, maxSize: number): Promise<File> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const reader = new FileReader();
      
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      
      img.onload = () => {
        let { width, height } = img;
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        // Resize image
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to blob and then to file
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            resolve(file); // Return original if resize fails
          }
        }, "image/jpeg", 0.8);
      };
      
      reader.readAsDataURL(file);
    });
  };
  
  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
        
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Analyzing image...</p>
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload an image</span>
              </label>
              <span className="ml-1">or drag and drop</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </>
        )}
      </div>
      
      {error && (
        <div className="mt-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
}