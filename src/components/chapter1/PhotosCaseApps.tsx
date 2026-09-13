'use client';

import { useState } from 'react';
import { photos } from '../../data/chapter1-extra';

export function PhotosApp({onEvidence}:{onEvidence:(id?:string)=>void}){
 const[selected,setSelected]=useState<(typeof photos)[number]|null>(null);
 if(selected)return <div className="photoViewer"><button className="backMini" onClick={()=>setSelected(null)}>← 戻る</button><div className="photoStage"><div className="fakePhoto"><span>{selected.label}</span>{selected.id==='monitor'&&<code>PROJECT HOME 人格再現実験<br/>被験者：朝倉ユウ<br/>実験番号：314<br/>状態：不安定</code>}</div></div><aside><h3>{selected.name}</h3><div>{selected.date}</div><div>{selected.device}</div><pre>{selected.detail}</pre></aside></div>;
 return <div className="photoGrid">{photos.map(p=><button key={p.id} onClick={()=>{setSelected(p);onEvidence(p.evidence)}}><div className="photoThumb">{p.label}</div><span>{p.name}</span></button>)}</div>;
}

export function CaseBoardApp({evidence,onSolved}:{evidence:string[];onSolved:()=>void}){
 const[answer,setAnswer]=useState('');
 const[result,setResult]=useState<'idle'|'wrong'|'correct'>('idle');
 const enough=['E04','E05','E06'].every(id=>evidence.includes(id));
 const submit=()=>{if(!enough){setResult('wrong');return}if(answer==='personality'){setResult('correct');onSolved()}else setResult('wrong')};
 return <div className="caseBoard"><div className="caseHeader"><span>CASE ANALYSIS</span><small>QUESTION 01</small></div><h2>PROJECT HOMEは何をする研究か？</h2><p>集めた記録から、一番自然な答えを選んでください。</p><div className="caseEvidence"><strong>確認する記録</strong>{['E04','E05','E06'].map(id=><span key={id} className={evidence.includes(id)?'ready':'missing'}>{evidence.includes(id)?'✓':'—'} {id}</span>)}</div><div className="caseChoices">{[['os','新しいOSを作る研究'],['personality','亡くなった人の人格を再現する研究'],['security','監視用AIを作る研究'],['medical','医療データを分析する研究']].map(([id,label])=><button key={id} className={answer===id?'selected':''} onClick={()=>setAnswer(id)}>{label}</button>)}</div><button className="caseSubmit" disabled={!answer} onClick={submit}>この答えで確認</button>{result==='wrong'&&<div className="caseWrong">この答えでは説明できない記録があります。証拠をもう一度確認してください。</div>}{result==='correct'&&<div className="caseCorrect"><strong>分かったこと</strong><span>PROJECT HOMEは、亡くなった人の記録を使って人格を再現する研究だった。</span><span>そして「317」は、その実験で作られた317番目の人格らしい。</span></div>}</div>;
}
