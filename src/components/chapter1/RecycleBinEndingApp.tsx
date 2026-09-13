'use client';

import { useEffect,useState } from 'react';
import { recycleEntries } from '../../data/chapter1-extra';
import { ChapterEnding } from './ChapterEnding';
import type { EndingStage } from './ending-stage';

export default function RecycleBinEndingApp({unlocked,onEvidence}:{unlocked:boolean;onEvidence:(id?:string)=>void}){
  const[selected,setSelected]=useState<(typeof recycleEntries)[number]|null>(null);
  const[stage,setStage]=useState<EndingStage>('idle');
  const[lines,setLines]=useState(0);

  useEffect(()=>{
    if(stage!=='reading')return;
    setLines(1);
    const a=setTimeout(()=>setLines(2),900);
    const b=setTimeout(()=>setLines(3),1800);
    const c=setTimeout(()=>setLines(4),2800);
    const d=setTimeout(()=>setStage('intrusion'),4300);
    return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c);clearTimeout(d)};
  },[stage]);

  useEffect(()=>{
    if(stage==='intrusion'){const t=setTimeout(()=>setStage('identity'),3300);return()=>clearTimeout(t)}
    if(stage==='identity'){const t=setTimeout(()=>setStage('complete'),3200);return()=>clearTimeout(t)}
  },[stage]);

  if(!unlocked)return <div className="emptyState"><strong>Recycle Bin</strong><span>No recoverable items.</span></div>;
  if(selected)return <><div className="reader"><button className="backMini" onClick={()=>setSelected(null)}>← Back</button><h2>{selected.name}</h2><div className="meta">Deleted: {selected.deleted}<br/>Original: {selected.original}</div><pre>{selected.body}</pre></div><ChapterEnding stage={stage} lines={lines} onOpenFile={()=>setStage('reading')}/></>;
  return <><div className="fileTable recycleTable">{recycleEntries.map(f=><button key={f.id} onClick={()=>{setSelected(f);onEvidence(f.evidence);if(f.id==='session317')setTimeout(()=>setStage('file'),900)}}><span>{f.name}</span><small>{f.deleted}</small><small>{f.original}</small></button>)}</div><ChapterEnding stage={stage} lines={lines} onOpenFile={()=>setStage('reading')}/></>;
}
