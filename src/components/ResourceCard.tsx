import { Resource } from '../types/resources';
import { ExternalLink, Phone, MapPin, Bookmark, BookmarkCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResourceCardProps {
  resource: Resource;
  isSaved?: boolean;
  onToggleSave?: (resource: Resource) => void;
}

export default function ResourceCard({ resource, isSaved, onToggleSave }: ResourceCardProps) {
  if (!resource) return null;

  return (
    <div className="bg-white rounded-[2rem] border border-brand-900/5 p-6 academic-shadow hover:shadow-lg transition-all flex flex-col gap-4 relative group">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-serif font-bold text-brand-900 text-xl leading-tight">
            {resource.service_name || 'Unnamed Service'}
          </h3>
          <span className="inline-block mt-2 bg-brand-900/5 text-brand-900 text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border border-brand-900/10">
            {resource.category || 'Support'}
          </span>
        </div>
        <button
          onClick={() => onToggleSave?.(resource)}
          className={cn(
            "p-3 rounded-2xl transition-all active:scale-90",
            isSaved 
              ? "bg-brand-900 text-white shadow-lg shadow-brand-900/20" 
              : "bg-slate-50 text-slate-300 hover:bg-brand-900/5 hover:text-brand-900"
          )}
          title={isSaved ? "Remove from saved" : "Save resource"}
        >
          {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-3">
        {resource.description || 'No description available.'}
      </p>

      <div className="mt-auto pt-4 flex flex-col gap-3 border-t border-slate-50">
        <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
          <MapPin size={14} className="text-brand-900/40" />
          <div className="flex flex-col">
            <span>{resource.city || 'Unknown City'}, {resource.province || 'Unknown Province'}</span>
            {resource.address && (
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address + ' ' + resource.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline mt-0.5"
              >
                {resource.address}
              </a>
            )}
          </div>
        </div>

        {resource.contact_phone && (
          <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
            <Phone size={14} className="text-brand-900/40" />
            <a href={`tel:${resource.contact_phone}`} className="hover:text-brand-900 transition-colors">
              {resource.contact_phone}
            </a>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-1">
          {(resource.subcategory || []).slice(0, 3).map((sub) => (
            <span key={sub} className="text-[9px] font-bold uppercase tracking-widest text-slate-300 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
              {sub.replace('_', ' ')}
            </span>
          ))}
        </div>

        {resource.website_url && (
          <a
            href={resource.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-600 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-2xl transition-all shadow-lg shadow-brand-900/10"
          >
            Visit Official Site
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
