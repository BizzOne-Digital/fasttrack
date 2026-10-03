'use client';
import { useRef, useState } from 'react';

type Folder = 'products' | 'gallery' | 'pages' | 'misc';

interface Props {
  label: string;
  value: string;
  folder: Folder;
  onChange: (url: string) => void;
}

const ACCEPTED = 'image/png,image/jpeg,image/webp,image/gif';

export default function LocalImageField({ label, value, folder, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('folder', folder);
      if (value) body.append('replaceUrl', value);

      const res = await fetch('/api/upload', { method: 'POST', body });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Upload failed');
      }
      onChange(json.url);
      showToast('success', 'Image uploaded');
    } catch (err: any) {
      showToast('error', err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const remove = () => {
    onChange('');
    showToast('success', 'Image removed');
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 8 }}>
        {label}
      </label>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 100, height: 100, background: '#f3f4f6', border: '1px solid #e5e7eb', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {value ? (
            <img src={value} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 11, color: '#9ca3af' }}>No image</span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            disabled={uploading}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            style={{ fontSize: 13 }}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 14px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              {uploading ? 'Uploading...' : value ? 'Replace' : 'Upload'}
            </button>
            {value && (
              <button
                type="button"
                disabled={uploading}
                onClick={remove}
                style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 14px', background: '#fff', color: '#DC2626', border: '1px solid #DC2626', cursor: 'pointer' }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ marginTop: 8, fontSize: 12, color: toast.type === 'success' ? '#16a34a' : '#DC2626' }}>
          {toast.text}
        </div>
      )}
    </div>
  );
}
