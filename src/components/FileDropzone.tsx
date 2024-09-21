import { useEffect, useRef, useState } from "react";
import { Input } from "@nextui-org/react";
import { useDroppable } from "@dnd-kit/core";

import { IoCloudUploadOutline } from "react-icons/io5";

interface FileDropzoneProps {
  value: File | null;
  setFieldValue: (field: string, value: any) => void;
  name: string;
  existingImageUrl?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  value,
  setFieldValue,
  name,
  existingImageUrl,
}) => {
  const [draggedOver, setDraggedOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { isOver, setNodeRef } = useDroppable({ id: "image-drop-zone" });

  useEffect(() => {
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (existingImageUrl) {
      setPreviewUrl(existingImageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [value, existingImageUrl]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0] || null;
    setFieldValue(name, file);
    setDraggedOver(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => setDraggedOver(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFieldValue(name, file);
  };

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const clearFile = () => {
    setFieldValue(name, null);
    setPreviewUrl(null);
  };

  return (
    <div
      ref={setNodeRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed p-4 rounded-lg transition ${
        draggedOver || isOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Uploaded Preview"
            className="mx-auto mb-4 max-h-64 object-contain"
          />
          <button
            type="button"
            onClick={clearFile}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
          >
            X
          </button>
        </div>
      ) : (
        <div>
          <IoCloudUploadOutline className="mx-auto text-center" size={28} />
          <p className="text-center text-gray-500 text-xs font-semibold">
            Drag and drop an image here, or{" "}
            <u onClick={triggerFileInput} className="hover:cursor-pointer">
              click to select a file
            </u>
          </p>
        </div>
      )}
      <Input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        name={name}
        className="hidden"
      />
    </div>
  );
};

export default FileDropzone;
