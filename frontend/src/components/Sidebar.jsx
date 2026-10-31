import { useState } from 'react';

export default function Sidebar({ 
  user, 
  sessions, 
  activeSession, 
  documents, 
  onLogout, 
  setActiveSession, 
  onDeleteSession, 
  onCreateSession,
  onAttachClick
}) {
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [showNewSessionInput, setShowNewSessionInput] = useState(false);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    onCreateSession(newSessionTitle);
    setNewSessionTitle('');
    setShowNewSessionInput(false);
  };

  const getDocIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return 'picture_as_pdf';
    if (ext === 'csv') return 'table_chart';
    if (ext === 'docx') return 'article';
    return 'description';
  };

  return (
    <aside className="w-sidebar-width h-screen glass-panel flex flex-col shadow-sm z-50 flex-shrink-0 select-none bg-white border-r border-slate-200">
      {/* Brand Header */}
      <div className="px-4 py-4 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>token</span>
          <span className="font-semibold text-sm tracking-wide text-slate-900">Lumen</span>
        </div>
        <button 
          onClick={() => setShowNewSessionInput(true)}
          className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
          title="New Chat"
        >
          <span className="material-symbols-outlined text-lg">edit_square</span>
        </button>
      </div>

      {/* Create Session Input */}
      {showNewSessionInput && (
        <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/60">
          <form onSubmit={handleCreateSubmit} className="flex gap-1.5 bg-white border border-slate-200 rounded-xl p-1">
            <input
              type="text"
              required
              autoFocus
              placeholder="Chat title..."
              value={newSessionTitle}
              onChange={(e) => setNewSessionTitle(e.target.value)}
              className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none px-2 py-1"
            />
            <button type="submit" className="text-primary hover:text-indigo-700 p-0.5 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm font-bold">check</span>
            </button>
            <button 
              type="button" 
              onClick={() => { setShowNewSessionInput(false); setNewSessionTitle(''); }} 
              className="text-slate-400 hover:text-slate-600 p-0.5 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </form>
        </div>
      )}

      {/* Scrollable List Items */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        {/* Recent Sessions */}
        <section>
          <div className="px-2 mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chats</span>
          </div>
          <nav className="space-y-0.5 max-h-[30vh] overflow-y-auto pr-1">
            {sessions.map((session) => (
              <div 
                key={session.session_id}
                onClick={() => setActiveSession(session)}
                className={`group px-3 py-2 flex items-center justify-between rounded-lg cursor-pointer transition-colors relative ${
                  activeSession?.session_id === session.session_id 
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className="truncate text-xs font-medium max-w-[85%]">{session.title}</span>
                <button 
                  onClick={(e) => onDeleteSession(session.session_id, e)}
                  className="text-slate-400 hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">delete</span>
                </button>
              </div>
            ))}
            {sessions.length === 0 && (
              <p className="text-[11px] text-slate-400 px-2 italic">No active chats.</p>
            )}
          </nav>
        </section>

        {/* Knowledge Base Collapsible */}
        {activeSession && (
          <section>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Knowledge Base</span>
              <button 
                onClick={onAttachClick}
                className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors cursor-pointer"
                title="Upload Documents"
              >
                <span className="material-symbols-outlined text-[15px]">upload</span>
              </button>
            </div>
            <div className="space-y-1 max-h-[35vh] overflow-y-auto pr-1">
              {documents.map((doc) => (
                <div key={doc.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[14px] ${
                      doc.status === 'ready' ? 'text-primary' : doc.status === 'processing' ? 'text-amber-500' : 'text-slate-400'
                    }`}>
                      {getDocIcon(doc.file_name)}
                    </span>
                    <span className="text-[11px] font-medium text-slate-700 truncate flex-1" title={doc.file_name}>
                      {doc.file_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 ml-[22px]">
                    <span className={`w-1 h-1 rounded-full ${
                      doc.status === 'ready' 
                        ? 'bg-primary' 
                        : doc.status === 'processing' 
                          ? 'bg-amber-500 animate-pulse-emerald' 
                          : 'bg-slate-300'
                    }`}></span>
                    <span className={`text-[8px] uppercase font-bold tracking-wider ${
                      doc.status === 'ready' 
                        ? 'text-primary' 
                        : doc.status === 'processing' 
                          ? 'text-amber-500' 
                          : 'text-slate-400'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
              {documents.length === 0 && (
                <p className="text-[11px] text-slate-400 px-2 italic leading-relaxed">
                  No documents. Drag files anywhere to upload.
                </p>
              )}
            </div>
          </section>
        )}
      </div>

      {/* User Card & Logout Footer */}
      <div className="px-3 py-3.5 border-t border-slate-100 bg-slate-50/60 mt-auto flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600 text-[10px] font-bold uppercase">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{user.first_name[0]}{user.last_name ? user.last_name[0] : ''}</span>
            )}
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-800 truncate">{user.first_name} {user.last_name || ''}</p>
            <p className="text-[9px] text-slate-400 truncate">{user.username}</p>
          </div>
        </div>
        <button 
          onClick={onLogout} 
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          title="Logout"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
        </button>
      </div>
    </aside>
  );
}
