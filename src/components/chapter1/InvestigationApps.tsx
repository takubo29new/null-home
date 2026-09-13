'use client';

import { useState } from 'react';
import { photos, recycleEntries } from '../../data/chapter1-extra';

export function PhotosApp({ onEvidence }: { onEvidence: (id?: string) => void }) {
  const [selected, setSelected] = useState<(typeof photos)[number] | null>(null);
  if (selected) return <div className="photoViewer"><button className="backMini" onClick={()=>setSelected(null)}>← Back</button><div className="photoStage"><div className="fakePhoto"><span>{selected.label}</span>{selected.id==='monitor'&&<code>PROJECT HOME<br/>ASAKURA_YU<br/>INSTANCE #314</code>}</div></div><aside><h3>{selected.name}</h3><div>{selected.date}</div><div>{selected.device}</div><pre>{selected.detail}</pre></aside></div>;
  return <div className="photoGrid">{photos.map(p=><button key={p.id} onClick={()=>{setSelected(p);onEvidence(p.evidence)}}><div className="photoThumb">{p.label}</div><span>{p.name}</span></button>)}</div>;
}

export function RecycleBinApp({ unlocked, onEvidence, onLogOpened }: { unlocked: boolean; onEvidence: (id?: string) => void; onLogOpened?: () => void }) {
  const [selected, setSelected] = useState<(typeof recycleEntries)[number] | null>(null);
  if (!unlocked) return <div className="emptyState"><strong>Recycle Bin</strong><span>No recoverable items.</span></div>;
  if (selected) return <div className="reader"><button className="backMini" onClick={()=>setSelected(null)}>← Back</button><h2>{selected.name}</h2><div className="meta">Deleted: {selected.deleted}<br/>Original: {selected.original}</div><pre>{selected.body}</pre></div>;
  return <div className="fileTable recycleTable">{recycleEntries.map(f=><button key={f.id} onClick={()=>{setSelected(f);onEvidence(f.evidence);if(f.id==='session317')onLogOpened?.()}}><span>{f.name}</span><small>{f.deleted}</small><small>{f.original}</small></button>)}</div>;
}

export function CaseBoardApp({ evidence, onSolved }: { evidence: string[]; onSolved: () => void }) {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'idle'|'wrong'|'correct'>('idle');
  const enough = ['E04','E05','E06'].every(id=>evidence.includes(id));
  const submit = () => {
    if (!enough) { setResult('wrong'); return; }
    if (answer === 'personality') { setResult('correct'); onSolved(); }
    else setResult('wrong');
  };
  return <div className="caseBoard"><div className="caseHeader"><span>CASE ANALYSIS</span><small>QUESTION 01</small></div><h2>PROJECT HOMEとは何か？</h2><p>これまで見つけた記録から、最も説明のつく結論を選んでください。</p><div className="caseEvidence"><strong>Supporting Evidence</strong>{['E04','E05','E06'].map(id=><span key={id} className={evidence.includes(id)?'ready':'missing'}>{evidence.includes(id)?'✓':'—'} {id}</span>)}</div><div className="caseChoices">{[
    ['os','新型OSの開発'],['personality','死亡者の人格再現'],['security','監視AI'],['medical','医療研究']
  ].map(([id,label])=><button key={id} className={answer===id?'selected':''} onClick={()=>setAnswer(id)}>{label}</button>)}</div><button className="caseSubmit" disabled={!answer} onClick={submit}>Analyze</button>{result==='wrong'&&<div className="caseWrong">この結論では説明できない情報があります。証拠を確認してください。</div>}{result==='correct'&&<div className="caseCorrect"><strong>CONCLUSION</strong><span>PROJECT HOMEは、死亡した人物の記録から人格を再構築する研究。</span></div>}</div>;
}
