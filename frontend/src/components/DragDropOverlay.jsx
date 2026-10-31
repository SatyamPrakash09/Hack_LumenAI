export default function DragDropOverlay({ dragActive, onDragLeave, onDragOver, onDrop }) {
  if (!dragActive) return null;

  return (
    <div 
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="absolute inset-0 bg-white/85 backdrop-blur-sm border-2 border-dashed border-primary z-[100] flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-4 text-primary text-center p-6 select-none">
        <span className="material-symbols-outlined text-6xl animate-bounce">cloud_upload</span>
        <h3 className="text-2xl font-bold text-slate-900">Upload Documents</h3>
        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
          Drop your PDF, DOCX, TXT, MD, or CSV files here to automatically attach them to this session.
        </p>
      </div>
    </div>
  );
}
