import React, { useState } from 'react';
import { LEGAL_DECLARATION_PREFACE, LEGAL_DOCUMENTS } from '../../data/legalDocuments';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, X, ChevronRight } from 'lucide-react';

interface LegalConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  isAccepted?: boolean;
  requiresAction?: boolean;
}

export const LegalConsentModal: React.FC<LegalConsentModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  isAccepted = false,
  requiresAction = false
}) => {
  const [activeDocId, setActiveDocId] = useState<string>(LEGAL_DOCUMENTS[0].id);
  const [agreed, setAgreed] = useState<boolean>(isAccepted);

  if (!isOpen) return null;

  const currentDoc = LEGAL_DOCUMENTS.find(d => d.id === activeDocId) || LEGAL_DOCUMENTS[0];

  const handleContinue = () => {
    if (agreed && onAccept) {
      onAccept();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col max-h-[90vh] overflow-hidden my-auto text-stone-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/10 border border-teal-600/20 flex items-center justify-center text-teal-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {LEGAL_DECLARATION_PREFACE.title}
                </span>
                <span className="text-xs text-stone-500 font-mono">v{LEGAL_DECLARATION_PREFACE.footer.version}</span>
              </div>
              <h2 className="text-lg md:text-xl font-serif font-bold text-stone-900">
                {LEGAL_DECLARATION_PREFACE.heading}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Declaration Subtext */}
        <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-200/60 flex items-start space-x-3 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{LEGAL_DECLARATION_PREFACE.subtext}</p>
            <div className="flex flex-wrap gap-2 mt-1.5 font-medium">
              {LEGAL_DECLARATION_PREFACE.documentsList.map((doc, idx) => (
                <span key={idx} className="bg-amber-100/80 px-2 py-0.5 rounded-full text-[11px] text-amber-800">
                  {doc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Body: Document Selector + Document Viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[380px]">
          {/* Document Navigation Sidebar */}
          <div className="w-full md:w-72 bg-stone-50 border-b md:border-b-0 md:border-r border-stone-200 p-3 overflow-y-auto shrink-0 space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
              Legal Documents ({LEGAL_DOCUMENTS.length})
            </p>
            {LEGAL_DOCUMENTS.map((doc) => {
              const isActive = doc.id === activeDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveDocId(doc.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'text-stone-700 hover:bg-stone-200/60'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-teal-200' : 'text-stone-400'}`} />
                    <span className="truncate">{doc.title.replace(/DOCUMENT \d+:\s*/, '')}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Document Content Viewer */}
          <div className="flex-1 p-6 overflow-y-auto bg-white">
            <div className="border-b border-stone-200 pb-3 mb-4">
              <h3 className="text-base md:text-lg font-serif font-bold text-stone-900">
                {currentDoc.title}
              </h3>
              {currentDoc.subtitle && (
                <p className="text-xs text-stone-500 font-sans mt-0.5">
                  {currentDoc.subtitle} • Effective {LEGAL_DECLARATION_PREFACE.footer.lastUpdated}
                </p>
              )}
            </div>

            <div className="space-y-4 text-xs md:text-sm text-stone-700 leading-relaxed font-sans">
              {currentDoc.sections.map((sec, sIdx) => (
                <div key={sIdx} className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-100">
                  <h4 className="font-semibold text-stone-900 mb-1.5 text-xs md:text-sm flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                    <span>{sec.heading}</span>
                  </h4>
                  <p className="text-stone-600 mb-2">{sec.content}</p>
                  {sec.bullets && (
                    <ul className="list-disc list-inside space-y-1 pl-2 text-stone-600 text-xs">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="leading-snug">{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Consent Checkbox & Action */}
        <div className="p-4 md:p-6 bg-stone-50 border-t border-stone-200 flex flex-col space-y-3">
          <label className="flex items-start space-x-3 p-3 bg-white rounded-xl border border-teal-200/80 shadow-xs cursor-pointer hover:border-teal-400 transition-colors">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-stone-300 cursor-pointer"
            />
            <div className="text-xs text-stone-700 leading-relaxed select-none">
              <span className="font-semibold text-stone-900">Single Consent Checkbox: </span>
              {LEGAL_DECLARATION_PREFACE.singleCheckboxText}
            </div>
          </label>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 pt-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>Version: <strong>{LEGAL_DECLARATION_PREFACE.footer.version}</strong></span>
              <span>Last Updated: <strong>{LEGAL_DECLARATION_PREFACE.footer.lastUpdated}</strong></span>
              <span>Email: <a href={`mailto:${LEGAL_DECLARATION_PREFACE.footer.contactEmail}`} className="underline text-teal-700">{LEGAL_DECLARATION_PREFACE.footer.contactEmail}</a></span>
              <span>Privacy Officer: <strong>{LEGAL_DECLARATION_PREFACE.footer.privacyOfficer}</strong></span>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-stone-600 hover:bg-stone-200/60 transition-colors"
              >
                Cancel
              </button>
              {requiresAction ? (
                <button
                  disabled={!agreed}
                  onClick={handleContinue}
                  className={`px-5 py-2 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-all shadow-sm ${
                    agreed
                      ? 'bg-teal-700 hover:bg-teal-800 text-white cursor-pointer active:scale-95'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept & Continue</span>
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-stone-900 hover:bg-stone-800 text-white transition-all shadow-sm"
                >
                  Close Document Viewer
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
