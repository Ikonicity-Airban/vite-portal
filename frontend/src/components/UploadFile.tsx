import { FileInput, Label } from "flowbite-react";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface FileUploadProps {
  setFile: Dispatch<SetStateAction<string>>;
  acceptType?: string;
  props?: React.HTMLAttributes<HTMLInputElement>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  acceptType,
  props,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURI = reader.result as string;
      // Save the file to local storage (you can use other storage options as well)
      // Pass the file and data URI to the parent component for further processing
      setFile(dataURI);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(() => file || null);
    handleUpload(file);
  };

  return (
    <div className="flex items-center gap-4 ring-1 rounded-xl text-center">
      <Label htmlFor="upload" className="h-full p-2 cursor-pointer w-full">
        {selectedFile?.name || "Click to choose a file"}
      </Label>
      <FileInput
        {...props}
        name="file"
        max={1000}
        id="upload"
        className="outline-none hidden"
        accept={acceptType || "application/pdf"}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
