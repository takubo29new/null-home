'use client';

import { useEffect, useMemo, useState } from 'react';
import { evidenceMeta } from '../data/chapter1';
import { BootScreen, LoginScreen } from '../components/chapter1/BootLogin';
import { FilesApp, MailApp, MessengerApp, MiraiApp, NewsApp, NotesApp } from '../components/chapter1/CoreApps';
import { PhotosApp, RecycleBinApp, CaseBoardApp } from '../components/chapter1/InvestigationApps';
import { useGameState } from '../game/gameState';

type AppId = 'files' | 'mail' | 'messenger' | 'photos' | 'news' | 'notes' | 'recycle' | 'mirai' | 'caseboard';
type WindowState = { id: AppId; title: string; x: number; y: number; w: number; h: number; open: boolean; minimized: boolean; z: number };

const APP_META: Record<AppId,{title:string;glyph:string}> = {
  files:{title:'Files',glyph:'▱'},mail:{title:'Mail',glyph:'✉'},messenger:{title:'Messenger',glyph:'◇'},photos:{title:'Photos',glyph:'□'},news:{title:'News',glyph:'▤'},notes:{title:'Notes',glyph:'▢'},recycle:{title:'Recycle Bin',glyph:'♲'},mirai:{title:'MIRAI',glyph:'◉'},caseboard:{title:'Case Board',glyph:'⌬'}
};

function createWindows(){
  const init={} as Record<AppId,WindowState>;
  (Object.keys(APP_META) as AppId[]).forEach((id,i)=>{init[id]={id,title:APP_META[id].title,x:140+i*24,y:90+i*18,w:id==='mirai'?560:620,h:id==='mirai'?560:440,open:false,minimized:false,z:1+i}});
  return init;
}

export default function Home(){
  const {state,dispatch}=useGameState();
  const [notice,setNotice]=useState('');
  const [seconds,setSeconds]=useState(0);
  const [drag,setDrag]=useState<{id:AppId;dx:number;dy:number}|null>(null);
  const [windows,setWindows]=useState<Record<AppId,WindowState>>(createWindows);

  const evidence=state.evidenceIds;
  const caseSolved=Boolean(state.eventFlags.caseSolved);
  const knownFlag=Boolean(state.eventFlags.mirai317Known);
  const caseUnlocked=['E04','E05','E06'].every(id=>evidence.includes(id));

  useEffect(()=>{if(state.phase!=='desktop')return;const t=setInterval(()=>setSeconds(s=>(s+1)%60),1000);return()=>clearInterval(t)},[state.phase]);
  useEffect(()=>{if(state.phase==='desktop'&&!state.eventFlags.desktopGreetingShown){const t=setTimeout(()=>{setNotice('MIRAI\nおかえりなさい。');dispatch({type:'SET_FLAG',key:'desktopGreetingShown'})},700);return()=>clearTimeout(t)}},[state.phase,state.eventFlags.desktopGreetingShown,dispatch]);
  useEffect(()=>{if(caseUnlocked)dispatch({type:'UNLOCK_APP',id:'caseboard'})},[caseUnlocked,dispatch]);

  useEffect(()=>{
    const move=(e:MouseEvent)=>{
      if(!drag)return;
      setWindows(ws=>{const w=ws[drag.id];const maxX=Math.max(0,window.innerWidth-40);const maxY=Math.max(0,window.innerHeight-74);return{...ws,[drag.id]:{...w,x:Math.min(maxX,Math.max(0,e.clientX-drag.dx)),y:Math.min(maxY,Math.max(0,e.clientY-drag.dy))}}});
    };
    const up=()=>setDrag(null);
    window.addEventListener('mousemove',move);window.addEventListener('mouseup',up);
    return()=>{window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up)};
  },[drag]);

  const topZ=useMemo(()=>Math.max(...Object.values(windows).map(w=>w.z)),[windows]);
  const nextZ=(ws:Record<AppId,WindowState>)=>Math.max(...Object.values(ws).map(w=>w.z))+1;
  const openApp=(id:AppId)=>setWindows(ws=>({...ws,[id]:{...ws[id],open:true,minimized:false,z:nextZ(ws)}}));
  const focus=(id:AppId)=>setWindows(ws=>({...ws,[id]:{...ws[id],z:nextZ(ws)}}));
  const close=(id:AppId)=>setWindows(ws=>({...ws,[id]:{...ws[id],open:false}}));
  const minimize=(id:AppId)=>setWindows(ws=>({...ws,[id]:{...ws[id],minimized:true}}));
  const toggleTask=(id:AppId)=>setWindows(ws=>({...ws,[id]:{...ws[id],minimized:!ws[id].minimized,z:nextZ(ws)}}));

  const collectEvidence=(id?:string)=>{
    if(!id||evidence.includes(id))return;
    dispatch({type:'ADD_EVIDENCE',id});
    const meta=evidenceMeta[id];if(meta)setNotice(`NEW EVIDENCE\n${meta.title}`);
  };
  const solveCase=()=>{if(caseSolved)return;dispatch({type:'SET_FLAG',key:'caseSolved'});setNotice('MIRAI\nその結論は、正確ではありません。\nRecycle Binに復元可能な項目があります。')};

  if(state.phase==='boot')return <BootScreen onDone={()=>dispatch({type:'SET_PHASE',phase:'login'})}/>;
  if(state.phase==='login')return <LoginScreen onGuest={()=>dispatch({type:'SET_PHASE',phase:'desktop'})}/>;

  const visibleApps=(Object.keys(APP_META) as AppId[]).filter(id=>state.unlockedApps.includes(id));
  const renderApp=(id:AppId)=>{
    if(id==='mirai')return <MiraiApp onUserKnown={()=>dispatch({type:'SET_FLAG',key:'mirai317Known'})}/>;
    if(id==='mail')return <MailApp onEvidence={collectEvidence}/>;
    if(id==='messenger')return <MessengerApp onEvidence={collectEvidence}/>;
    if(id==='notes')return <NotesApp onEvidence={collectEvidence}/>;
    if(id==='files')return <FilesApp onEvidence={collectEvidence}/>;
    if(id==='news')return <NewsApp/>;
    if(id==='photos')return <PhotosApp onEvidence={collectEvidence}/>;
    if(id==='recycle')return <RecycleBinApp unlocked={caseSolved} onEvidence={collectEvidence} onComplete={()=>dispatch({type:'COMPLETE_CHAPTER_1'})}/>;
    return <CaseBoardApp evidence={evidence} onSolved={solveCase}/>;
  };

  return <main className="desktop">
    <div className="wallpaperMark">◫</div>
    <div className="icons">{visibleApps.map(id=><button className="desktopIcon" key={id} onClick={()=>openApp(id)}><span>{APP_META[id].glyph}</span><small>{APP_META[id].title}</small></button>)}</div>
    {Object.values(windows).filter(w=>w.open&&!w.minimized).map(w=><section key={w.id} className="window" style={{left:w.x,top:w.y,width:w.w,height:w.h,zIndex:w.z}} onMouseDown={()=>focus(w.id)}><header className="titlebar" onMouseDown={e=>{focus(w.id);setDrag({id:w.id,dx:e.clientX-w.x,dy:e.clientY-w.y})}}><div><span>{APP_META[w.id].glyph}</span>{w.title}</div><nav><button onClick={e=>{e.stopPropagation();minimize(w.id)}}>—</button><button disabled aria-label="Maximize unavailable">□</button><button onClick={e=>{e.stopPropagation();close(w.id)}}>×</button></nav></header><div className="windowBody">{renderApp(w.id)}</div></section>)}
    {notice&&<button className="notice" onClick={()=>setNotice('')}><span>◉</span><div>{notice.split('\n').map((x,i)=><div key={i}>{x}</div>)}</div></button>}
    {caseUnlocked&&!caseSolved&&<button className="caseReady" onClick={()=>openApp('caseboard')}>⌬ Case Board available</button>}
    <footer className="taskbar"><button className="start">◫</button><div className="running">{Object.values(windows).filter(w=>w.open).map(w=><button key={w.id} onClick={()=>toggleTask(w.id)}>{APP_META[w.id].glyph} {APP_META[w.id].title}</button>)}</div><div className="status"><span>OFFLINE</span><button className="clock">19:04<span className="seconds">:{String(seconds).padStart(2,'0')}</span></button><small>2029/10/14</small><em>{state.chapter1Complete?'YU':knownFlag?'317':'GUEST'}</em></div></footer>
  </main>;
}
