import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Trash2, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { getAllPhotos, savePhoto, deletePhoto, SavedPhoto } from '../utils/db';

export default function GallerySection() {
  const [photos, setPhotos] = useState<SavedPhoto[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load photos from DB on mount
  useEffect(() => {
    async function load() {
      try {
        const list = await getAllPhotos();
        setPhotos(list);
      } catch (err) {
        console.error('Failed to load photos from IndexedDB:', err);
      }
    }
    load();
  }, []);

  // Handle files selection
  const processFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload image files only.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          const newPhoto: SavedPhoto = {
            id: 'photo_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now(),
            name: file.name,
            dataUrl,
            addedAt: Date.now(),
          };

          try {
            await savePhoto(newPhoto);
            setPhotos((prev) => [...prev, newPhoto]);
          } catch (err) {
            console.error('Failed to save photo:', err);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Avoid opening lightbox
    if (confirm('Are you sure you want to remove this memory?')) {
      try {
        await deletePhoto(id);
        setPhotos((prev) => prev.filter((p) => p.id !== id));
        if (activePhotoIndex !== null) {
          setActivePhotoIndex(null);
        }
      } catch (err) {
        console.error('Failed to delete photo:', err);
      }
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev === null || prev === 0 ? photos.length - 1 : prev - 1));
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev === null || prev === photos.length - 1 ? 0 : prev + 1));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, photos]);

  return (
    <section
      id="gallery-section"
      className="relative w-full py-24 px-4 md:px-8 bg-slate-950"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title Group */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans"
          >
            Beautiful Memories
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 w-20 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"
          />
          <p className="text-sm md:text-base text-rose-200/50 max-w-md mx-auto">
            A hand-picked collection of moments that will be treasured forever.
          </p>
        </div>

        {/* Upload Trigger Area always available to append new files */}
        <div className="flex flex-col items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />
          
          <motion.div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full max-w-2xl p-8 border-2 border-dashed rounded-3xl cursor-pointer flex flex-col items-center justify-center text-center space-y-4 transition-all duration-300 ${
              isDragging
                ? 'border-rose-400 bg-rose-500/10'
                : 'border-rose-500/20 hover:border-rose-500/50 bg-slate-900/40 hover:bg-slate-900/60'
            }`}
          >
            <div className="p-4 rounded-full bg-rose-500/10 text-rose-400">
              <Upload size={28} className="animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-rose-100">
                Upload NAEMA's Beautiful Photos
              </h3>
              <p className="text-sm text-rose-300/40 mt-1">
                Drag and drop or click to choose files from your device
              </p>
            </div>
            <span className="text-xs text-rose-400/50 font-mono tracking-widest uppercase">
              Supports PNG, JPG, JPEG, WEBP
            </span>
          </motion.div>
        </div>

        {/* Photos Grid */}
        {photos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 border border-slate-900 bg-slate-900/10 rounded-3xl text-center space-y-3 flex flex-col items-center justify-center min-h-[250px]"
          >
            <ImageIcon className="text-rose-500/20 animate-pulse" size={48} />
            <p className="text-rose-100/40 text-sm md:text-base font-light font-sans max-w-xs">
              No memories uploaded yet. Use the area above to add some real pictures of NAEMA to fill the layout.
            </p>
          </motion.div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 [column-fill:_balance] box-border">
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group overflow-hidden rounded-2xl bg-slate-900 border border-white/5 cursor-pointer shadow-lg hover:shadow-rose-500/10 shadow-black/30 transition-all duration-300"
                onClick={() => setActivePhotoIndex(idx)}
              >
                <img
                  src={photo.dataUrl}
                  alt={photo.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  {/* Top Delete Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={(e) => handleDelete(e, photo.id)}
                      className="p-2 rounded-full bg-slate-950/80 hover:bg-red-600 hover:text-white text-rose-300 backdrop-blur-md border border-white/10 transition-all active:scale-90 shadow-md cursor-pointer"
                      title="Delete Memory"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Bottom details */}
                  <div className="flex items-center justify-between text-rose-100">
                    <span className="text-xs tracking-wider opacity-80 truncate max-w-[70%]">
                      {photo.name}
                    </span>
                    <span className="p-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                      <Maximize2 size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && photos[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 select-none"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 text-white">
              <span className="text-sm font-light tracking-wide text-rose-200/60 font-sans">
                {activePhotoIndex + 1} / {photos.length}
              </span>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="p-3 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-white backdrop-blur-md border border-white/10 transition-all active:scale-95 z-50 cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Active Image Frame */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="max-w-4xl max-h-[80vh] flex items-center justify-center relative p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[activePhotoIndex].dataUrl}
                alt={photos[activePhotoIndex].name}
                className="max-w-full max-h-[75vh] md:max-h-[80vh] rounded-xl object-contain shadow-2xl border border-white/10"
              />
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-slate-900/80 hover:bg-rose-500/20 text-white backdrop-blur-md border border-white/10 transition-all active:scale-95 z-50 cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>

            {/* Bottom info banner */}
            <div className="absolute bottom-6 left-4 right-4 text-center">
              <span className="text-base font-light text-rose-100 font-sans tracking-wide">
                {photos[activePhotoIndex].name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
