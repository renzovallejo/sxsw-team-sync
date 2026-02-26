import { useState, useCallback } from 'react';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DragAndDropProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export function DragAndDrop({ onFileUpload, isLoading, error }: DragAndDropProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files && files[0]) {
        if (files[0].name.endsWith('.xls') || files[0].name.endsWith('.xlsx')) {
          setFileName(files[0].name);
          onFileUpload(files[0]);
        } else {
          // You could trigger an error here specifically for wrong file types
        }
      }
    },
    [onFileUpload]
  );

  return (
    <div className="glass-panel p-6 w-full flex flex-col items-center justify-center min-h-[250px] transition-all duration-300">
      <motion.div
        animate={{ scale: isDragging ? 1.05 : 1 }}
        className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging
            ? 'border-brand-cyan bg-brand-cyan/10'
            : error
            ? 'border-red-500 bg-red-500/10'
            : 'border-panel-border hover:border-brand-purple/50 cursor-pointer'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept=".xls,.xlsx"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFileName(file.name);
              onFileUpload(file);
            }
          }}
        />

        {isLoading ? (
          <div className="flex flex-col items-center">
             <div className="mb-4 h-12 w-12 rounded-full border-b-2 border-brand-cyan animate-spin"></div>
             <p className="text-gray-300 font-medium">Processing Schedule...</p>
             <div className="w-48 h-2 bg-panel-dark rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple animate-pulse w-full"></div>
             </div>
          </div>
        ) : fileName && !error ? (
          <div className="flex flex-col items-center text-green-400">
             <CheckCircle size={48} className="mb-4" />
             <p className="font-semibold text-center">{fileName} uploaded successfully!</p>
          </div>
        ) : (
          <>
            <UploadCloud size={48} className={`mb-4 ${isDragging ? 'text-brand-cyan' : 'text-gray-400'}`} />
            <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Excel File</h3>
            <p className="text-gray-400 text-sm text-center">
              Upload your event schedule (.xls, .xlsx) here
            </p>
            {error && (
              <div className="mt-4 flex items-center text-red-400 bg-red-400/10 px-3 py-2 rounded-md">
                 <AlertCircle size={16} className="mr-2" />
                 <span className="text-sm">{error}</span>
              </div>
            )}
            <button className="mt-6 px-6 py-2 rounded-full bg-panel-dark border border-panel-border hover:bg-white/5 transition-colors text-sm font-medium">
              Browse Files
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
