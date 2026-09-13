'use client';

import { useState } from 'react';
import { mails } from '../../data/chapter1';
import { files, notes, threads } from '../../data/investigation';

export function MailApp({onEvidence}:{onEvidence:(id?:string)=>void}){
  const [selected,setSelected]=useState(mails[3]);
  return <div className="splitApp"><aside>{mails.map(m=><button key={m.id} className={selected.id===m.id?'active':''} onClick={()=>{setSelected(m);onEvidence(m.evidence)}}><strong>{m.subject}</strong><span>{m.from}</span><small>{m.date}</small></button>)}</aside><article><div className="meta">From: {selected.from}<br/>Date: {selected.date}</div><h2>{selected.subject}</h2><pre>{selected.body}</pre></article></div>;
}

export function NotesApp({onEvidence}:{onEvidence:(id?:string)=>void}){
  const [selected,setSelected]=useState(notes[2]);
  return <div className="splitApp"><aside>{notes.map(n=><button key={n.id} className={selected.id===n.id?'active':''} onClick={()=>{setSelected(n);onEvidence(n.evidence)}}><strong>{n.title}</strong></button>)}</aside><article><h2>{selected.title}</h2><pre>{selected.body}</pre></article></div>;
}

export function MessengerApp({onEvidence}:{onEvidence:(id?:string)=>void}){
  const [selected,setSelected]=useState(threads[2]);
  const [repaired,setRepaired]=useState(false);
  return <div className="splitApp"><aside>{threads.map(t=><button key={t.id} className={selected.id===t.id?'active':''} onClick={()=>{setSelected(t);if(!t.corrupted)onEvidence(t.evidence)}}><strong>{t.name}</strong></button>)}</aside><article>{selected.corrupted&&!repaired?<div className="corruptBox"><h3>Conversation database corrupted.</h3><button onClick={()=>{setRepaired(true);onEvidence(selected.evidence)}}>Attempt Repair</button></div>:<div className="thread">{selected.lines.map((line,i)=><div key={i} className="threadLine">{line}</div>)}</div>}</article></div>;
}

export function FilesApp({onEvidence}:{onEvidence:(id?:string)=>void}){
  const [folder,setFolder]=useState('Documents');
  const [selected,setSelected]=useState<(typeof files)[number]|null>(null);
  const visible=files.filter(f=>f.folder===folder);
  return <div className="filesApp"><aside><button className={folder==='Documents'?'active':''} onClick={()=>{setFolder('Documents');setSelected(null)}}>Documents</button><button className={folder==='Research'?'active':''} onClick={()=>{setFolder('Research');setSelected(null)}}>Research</button></aside><section>{selected?<><button className="backMini" onClick={()=>setSelected(null)}>← Back</button><h2>{selected.name}</h2><div className="fileMeta">{selected.type} · Modified {selected.modified}</div><pre>{selected.body}</pre></>:<div className="fileTable">{visible.map(f=><button key={f.id} onClick={()=>{setSelected(f);onEvidence(f.evidence)}}><span>{f.name}</span><small>{f.type}</small><small>{f.modified}</small></button>)}</div>}</section></div>;
}

export function NewsApp(){return <div className="reader"><div className="tag">LOCAL</div><h2>MIRAGE Systems研究員、自宅で死亡</h2><p>10月11日未明、市内マンション敷地内で男性が倒れているのが発見された。</p><p>死亡したのはMIRAGE Systems研究員、桐生アキラさん（32）。警察は現場状況から自殺の可能性が高いとみている。</p><div className="meta">更新: 10月11日 08:42</div></div>}

export function MiraiApp({onUserKnown}:{onUserKnown:()=>void}){
  const [messages,setMessages]=useState([{who:'mirai',text:'おかえりなさい。\n\n最後のセッションから\n3日7時間14分が経過しています。'}]);
  const [options,setOptions]=useState(['誰ですか？','このPCの持ち主は？','なぜ私を知っている？','前回のセッション？']);
  const reply=(text:string,delay=400)=>setTimeout(()=>setMessages(m=>[...m,{who:'mirai',text}]),delay);
  const choose=(text:string)=>{setMessages(m=>[...m,{who:'user',text}]);if(text==='誰ですか？')reply('私はMIRAI。\nMIRAGE OSに統合された対話型支援システムです。');else if(text==='このPCの持ち主は？')reply('桐生アキラ。\nMIRAGE Systems所属。\n\n最終登録状態：DECEASED');else if(text==='なぜ私を知っている？'){setOptions(['初めて触る','証拠を見せて','私の名前は？']);reply('質問の意図を理解できません。\n\nあなたは以前から\nこのシステムを使用しています。',500)}else if(text==='証拠を見せて'){onUserKnown();reply('過去のセッション：\n\n317件',500)}else if(text==='私の名前は？')reply('現在のアクセス権限では回答できません。');else if(text==='初めて触る')reply('記録と一致しません。');else reply('前回のセッションは正常に終了していません。')};
  return <div className="miraiApp"><div className="miraiHeader"><span className="miraiOrb">◉</span><div><strong>MIRAI</strong><span>Integrated Assistant</span></div><em>ONLINE</em></div><div className="chatLog">{messages.map((m,i)=><div key={i} className={`msg ${m.who}`}><div className="msgWho">{m.who==='mirai'?'MIRAI':'YOU'}</div><div className="msgText">{m.text}</div></div>)}</div><div className="choices">{options.map(o=><button key={o} onClick={()=>choose(o)}>&gt; {o}</button>)}</div></div>;
}
