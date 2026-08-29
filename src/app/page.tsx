'use client';

import React, { useState } from 'react';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setConvertedUrl(null);
      setErrorMsg(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setConvertedUrl(null);
      setErrorMsg(null);
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setErrorMsg(null);

    try {
      // ÇÖZÜM: heic2any kütüphanesini sadece butona basılınca dinamik olarak tarayıcıda yüklüyoruz.
      const heic2any = (await import('heic2any')).default;

      const conversionResult = await heic2any({
        blob: selectedFile,
        toType: 'image/jpeg',
        quality: 0.9,
      });

      const resultBlob = Array.isArray(conversionResult) 
        ? conversionResult[0] 
        : conversionResult;

      const url = URL.createObjectURL(resultBlob);
      setConvertedUrl(url);
    } catch (err) {
      console.error(err);
      setErrorMsg('Dönüştürme sırasında bir hata oluştu. Lütfen geçerli bir HEIC dosyası seçin.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col items-center justify-between p-8 selection:bg-zinc-800 font-sans">
      <header className="w-full max-w-4xl flex items-center justify-between py-4 border-b border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100 shadow-inner">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <span className="font-semibold tracking-tight text-zinc-100 text-lg">Convrs</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 font-mono bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">100% Client-Side</span>
        </div>
      </header>

      <div className="w-full max-w-xl flex flex-col items-center gap-8 my-auto">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
            HEIC to JPG Converter
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Transform Apple high-efficiency images into universal JPG format instantly. Zero server uploads, absolute privacy.
          </p>
        </div>

        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full border border-dashed border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 bg-zinc-900/30 hover:border-zinc-700 transition-all cursor-pointer relative group shadow-2xl"
        >
          <input 
            type="file" 
            accept=".heic, .HEIC, image/*" 
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:scale-105 transition-transform shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-medium text-zinc-200">
              {selectedFile ? selectedFile.name : "Drop your HEIC file here, or browse"}
            </p>
            <p className="text-xs text-zinc-500">Drag & drop or click to select from your device</p>
          </div>
        </div>

        {errorMsg && (
          <div className="w-full p-3 rounded-xl bg-red-950/40 border border-red-900/50 text-red-400 text-xs text-center font-mono">
            {errorMsg}
          </div>
        )}

        {selectedFile && !convertedUrl && (
          <button 
            onClick={handleConvert}
            disabled={isConverting}
            className="w-full py-3.5 bg-zinc-100 text-zinc-900 font-medium rounded-xl hover:bg-zinc-200 transition-all shadow-lg active:scale-[0.99] disabled:opacity-50"
          >
            {isConverting ? "Converting in Browser..." : "Convert to JPG Now"}
          </button>
        )}

        {convertedUrl && (
          <div className="w-full flex flex-col gap-3 animate-fade-in">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">Conversion Complete</span>
              <span className="text-xs text-emerald-400 font-mono">● Ready</span>
            </div>
            <a 
              href={convertedUrl} 
              download={`${selectedFile?.name.replace(/\.[^/.]+$/, '') || 'converted'}.jpg`}
              className="w-full py-3.5 bg-emerald-600 text-zinc-100 font-medium rounded-xl hover:bg-emerald-500 transition-all text-center shadow-lg"
            >
              Download JPG Image
            </a>
          </div>
        )}
      </div>

      <footer className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between py-6 border-t border-zinc-800/60 text-xs text-zinc-500 gap-4">
        <p>© 2026 Convrs. Built for performance and privacy.</p>
        <div className="flex gap-6 font-mono">
          <span>Client-Side Processing</span>
          <span>Zero Data Stored</span>
        </div>
      </footer>
    </main>
  );
}