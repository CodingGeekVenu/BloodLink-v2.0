import React, { useState } from 'react';
import { KOTLIN_CODE_FILES } from '../data/initialData';
import { Code, Copy, Check, FileCode, Smartphone, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export const KotlinCodeViewer: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState(KOTLIN_CODE_FILES[0].id);
  const [copied, setCopied] = useState(false);

  const selectedFile =
    KOTLIN_CODE_FILES.find((f) => f.id === selectedFileId) || KOTLIN_CODE_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-6 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-gray-900 to-slate-800 text-white p-5 rounded-2xl shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl font-bold tracking-tight">Android Kotlin Code Explorer</h1>
          </div>
          <p className="text-xs text-gray-300 mt-1 max-w-xl">
            Complete Native Android Kotlin & Jetpack Compose codebase powering BloodLink offline BLE broadcasting, Room DB, and Material Design 3 UI.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>Kotlin 2.0 • Jetpack Compose</span>
        </div>
      </div>

      {/* File Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200">
        {KOTLIN_CODE_FILES.map((file) => {
          const isSelected = file.id === selectedFileId;
          return (
            <button
              key={file.id}
              onClick={() => setSelectedFileId(file.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-[#af101a] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>{file.filename}</span>
            </button>
          );
        })}
      </div>

      {/* Code Card */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
        {/* Header Bar */}
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="font-mono text-emerald-400 font-bold ml-2">
              {selectedFile.filename}
            </span>
            <span className="text-gray-500">— {selectedFile.description}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-gray-200 text-xs font-semibold rounded-lg transition-all border border-slate-700"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block */}
        <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed bg-slate-950/80 max-h-[500px]">
          <code>{selectedFile.code}</code>
        </pre>
      </div>
    </motion.div>
  );
};
