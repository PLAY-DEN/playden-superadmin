import React, { useState, DragEvent } from 'react';
import UploadIcon from "./../assets/svgs/upload.svg";

interface FileUploadComponentProps {
    onFileUpload: (file: File | null) => void;
    error: string | null;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ onFileUpload, error }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(error);

    const isValidFileType = (file: File) => {
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
        return allowedTypes.includes(file.type);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (isValidFileType(selectedFile)) {
                setErrorMessage(null);
                setFile(selectedFile);
                onFileUpload(selectedFile); // Notify parent component
            } else {
                setErrorMessage('Only PDF, PNG, JPG, and JPEG files are allowed.');
                setFile(null);
                onFileUpload(null);
            }
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (isValidFileType(droppedFile)) {
                setErrorMessage(null);
                setFile(droppedFile);
                onFileUpload(droppedFile); // Notify parent component
            } else {
                setErrorMessage('Only PDF, PNG, JPG, and JPEG files are allowed.');
                setFile(null);
                onFileUpload(null);
            }
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            className="main-container flex w-full max-w-[698px] h-[289px] flex-col gap-[24px] justify-center items-center bg-[#f8fbfd] rounded-[4px] border-dashed border border-[#adc9f3] relative mx-auto cursor-pointer my-0"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <div className="flex flex-col items-center">
                <img src={UploadIcon} alt="Upload Icon" className="max-w-[142.125px] hidden md:block" />
                <span className="text-[17px] font-bold text-[#000]">Upload your Pitch Deck or Image</span>
                <div className="flex flex-col gap-[10px]">
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf, .png, .jpg, .jpeg" // Allow PDFs and image formats
                    />
                    <label
                        htmlFor="fileInput"
                        className="flex w-[300px] py-[15px] px-[12px] gap-[12px] items-center bg-[#fff] rounded-[7.5px] border-dashed border-[0.75px] border-[#d0d4dd] cursor-pointer"
                    >
                        <span>{file ? file.name : "Click to upload or drag and drop a file"}</span>
                    </label>
                    {errorMessage && (
                        <span className="text-[12px] text-[#dd514d]">{errorMessage}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploadComponent;
