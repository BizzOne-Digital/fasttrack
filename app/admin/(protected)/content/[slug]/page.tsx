'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { pageConfigs, FieldDef } from '../../../../../lib/pageConfigs';
import LocalImageField from '../../../../components/admin/LocalImageField';

const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', fontSize: 14 };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6b7280', marginBottom: 6 };

function FieldInput({ field, value, onChange, folder }: { field: FieldDef; value: any; onChange: (v: any) => void; folder: 'products' | 'gallery' | 'pages' | 'misc' }) {
  if (field.type === 'image') {
    return <LocalImageField label={field.label} value={value || ''} folder={folder} onChange={onChange} />;
  }
  if (field.type === 'textarea') {
    return (
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>{field.label}</label>
        <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={value || ''} onChange={e => onChange(e.target.value)} />
      </div>
    );
  }
  if (field.type === 'list') {
    const text = Array.isArray(value) ? value.join('\n') : '';
    return (
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>{field.label}</label>
        <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={text}
          onChange={e => onChange(e.target.value.split('\n'))} />
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{field.label}</label>
      <input style={inputStyle} value={value || ''} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export default function ContentEditorPage() {
  const params = useParams();
  const slug = params.slug as string;
  const config = pageConfigs.find(p => p.slug === slug);

  const [data, setData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/content/${slug}`)
      .then(res => res.json())
      .then(json => setData(json.data || {}))
      .finally(() => setLoading(false));
  }, [slug]);

  if (!config) {
    return <p style={{ color: '#DC2626' }}>Unknown page: {slug}</p>;
  }
  if (loading || !data) {
    return <p style={{ color: '#6b7280' }}>Loading...</p>;
  }

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch(`/api/content/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const updateFlatField = (key: string, value: any) => {
    setData(d => ({ ...d!, [key]: value }));
  };

  const updateArrayItemField = (arrayKey: string, index: number, fieldKey: string, value: any) => {
    setData(d => {
      const arr = [...(d![arrayKey] || [])];
      arr[index] = { ...arr[index], [fieldKey]: value };
      return { ...d!, [arrayKey]: arr };
    });
  };

  const addArrayItem = (arrayKey: string, newItem: Record<string, unknown>) => {
    setData(d => ({ ...d!, [arrayKey]: [...(d![arrayKey] || []), { ...newItem }] }));
  };

  const removeArrayItem = (arrayKey: string, index: number) => {
    setData(d => {
      const arr = [...(d![arrayKey] || [])];
      arr.splice(index, 1);
      return { ...d!, [arrayKey]: arr };
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h1 className="font-display" style={{ fontSize: 28, color: '#111' }}>{config.title}</h1>
        <button onClick={save} disabled={saving} className="btn-red" style={{ border: 'none', cursor: 'pointer' }}>
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>

      {config.fields && (
        <div style={{ background: '#fff', padding: 28, border: '1px solid #e5e7eb', marginBottom: 24 }}>
          {config.fields.map(f => (
            <FieldInput key={f.key} field={f} value={data[f.key]} folder={config.folder} onChange={v => updateFlatField(f.key, v)} />
          ))}
        </div>
      )}

      {config.arrays?.map(arrayDef => {
        const items: any[] = data[arrayDef.key] || [];
        return (
          <div key={arrayDef.key} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{arrayDef.label}</h2>
              <button onClick={() => addArrayItem(arrayDef.key, arrayDef.newItem)}
                style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', padding: '6px 14px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer' }}>
                + Add
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map((item, i) => (
                <div key={i} style={{ background: '#fff', padding: 24, border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>{arrayDef.itemLabel(item, i)}</div>
                    <button onClick={() => removeArrayItem(arrayDef.key, i)}
                      style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#DC2626', background: 'none', border: '1px solid #DC2626', padding: '4px 10px', cursor: 'pointer' }}>
                      Remove
                    </button>
                  </div>
                  {arrayDef.fields.map(f => (
                    <FieldInput key={f.key} field={f} value={item[f.key]} folder={config.folder}
                      onChange={v => updateArrayItemField(arrayDef.key, i, f.key, v)} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
