import React, { useState, DragEvent } from 'react';
// import UploadIcon from "./../../../assets/svgs/upload.svg";
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


    const isPDFFile = (file: File) => {
        return file.type === 'application/pdf';
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (isPDFFile(selectedFile)) {
                handleUpload()
                setErrorMessage(null);
                setFile(selectedFile);
                onFileUpload(selectedFile); // Notify parent component
            } else {
                setErrorMessage('Only PDF files are allowed.');
                setFile(null);
                onFileUpload(selectedFile);
            }
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (isPDFFile(droppedFile)) {
                setErrorMessage(null);
                setFile(droppedFile);
                onFileUpload(droppedFile); // Notify parent component
            } else {
                setErrorMessage('Only PDF files are allowed.');
                setFile(null);
                onFileUpload(droppedFile);
            }
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const selectedFile = droppedFiles[0];
            if (isPDFFile(selectedFile)) {
                setErrorMessage(null);
                setFile(selectedFile);
                onFileUpload(selectedFile);
            } else {
                setErrorMessage('Only PDF files are allowed.');
                setFile(null);
                onFileUpload(selectedFile);
            }
        }
    };

    const handleUpload = () => {
        if (!file) return;
        setUploading(true);
        // Simulate file upload process
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    clearInterval(interval);
                    setUploading(false);
                    return 100;
                }
                return oldProgress + 10;
            });
        }, 1000);
    };

    return (
        <div
            className='main-container flex w-full max-w-[698px] h-[289px] flex-col gap-[24px] justify-center items-center bg-[#f8fbfd] rounded-[4px] border-dashed border border-[#adc9f3] relative mx-auto  cursor-pointer my-0 '
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleUpload}
        >
            <div className='flex w[537.125px] gap[56px] justify-center items-start '>
                <div className='flex ma-w-[339px] justify-center  flexcol gap-[24px]'>
                    <img src={UploadIcon} className='`max-w-[142.125px] max-h-[142.125px] hidden md:block' alt="" />
                    <div className='flex flex-col gap-[10px] px12'>
                        <span className="text-[17px] font-bold text-[#000]">
                            Upload your Pitch Deck
                        </span>
                        <div className='flex flex-col gap-[4px]'>
                            <div className="text-[12px]">
                                <span className="text-[12px] font-bold text-[#f16a38] underline cursor-pointer" onClick={handleUpload}>
                                    Click to upload
                                </span>
                                <span className="text-[12px]">
                                    &nbsp; Drag and drop your file here or click to select a file from your computer.
                                </span>
                            </div>
                            <input
                                type='file'
                                id='fileInput'
                                className='hidden'
                                onChange={handleFileChange}
                                accept='.pdf'
                            />

                            <label
                                htmlFor='fileInput'
                                className='flex w-[300px] pt-[15px] pr-[12px] pb-[15px] pl-[12px] gap-[12px] items-center bg-[#fff] rounded-[7.5px] border-dashed border-[0.75px] border-[#d0d4dd] cursor-pointer'
                            >
                                <div className='w-[21px] h-[21px]'>
                                    <button
                                        className='flex w-full h-[41.67%] bg-[#dd514d] rounded-[0.75px] border-none flex items-center justify-center'
                                        onClick={handleUpload}
                                    >
                                        <span className="text-[6px] font-semibold text-[#fff]">
                                            PDF
                                        </span>
                                    </button>
                                </div>
                                <div className='flex gap-[9px] items-center'>
                                    <div className='flex flex-col gap-[4.5px]'>
                                        <span className="text-[14px] font-medium text-[#1d2639]">
                                            {uploading ? 'Uploading Document' : file ? file.name : 'No file selected'}
                                        </span>
                                        {uploading && (
                                            <>
                                                <div
                                                    className={`h-[3.75px] bg-[url(${UploadIcon})] bg-cover bg-no-repeat rounded-[9px]`}
                                                    style={{ width: `${progress}%` }}
                                                />
                                                <div className="text-[8.25px]">
                                                    <span className="text-[#98a1b2]">
                                                        {file ? `${file.name} | ` : ''} <span className="text-[#475267]">{`${progress}% Completed`}</span>
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className='w-[18px] h-[18px]'>
                                    <div className='w-[9.985px] h-[9.985px] bg-[url(${})] bg-cover bg-no-repeat' />
                                </div>
                            </label>

                            {errorMessage && (
                                <span className="text-[12px] text-[#dd514d]">
                                    {errorMessage}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default FileUploadComponent;
