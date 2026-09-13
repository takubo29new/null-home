'use client';

import { useEffect,useState } from 'react';

const BOOT_LINES=['MIRAGE SYSTEMS BIOS 4.18','Memory Check..............OK','Storage...................OK','Network...................OFFLINE','Identity Module...........FAILED','','Previous session was not terminated correctly.'];

export function BootScreen({onDone}:{onDone:()=>void}){
 const[count,setCount]=useState(0);
 useEffect(()=>{if(count>=BOOT_LINES.length){const t=setTimeout(onDone,850);return()=>clearTimeout(t)}const t=setTimeout(()=>setCount(c=>c+1),count===0?300:520);return()=>clearTimeout(t)},[count,onDone]);
 return <main className="boot" onClick={()=>{setCount(BOOT_LINES.length);setTimeout(onDone,120)}}><div className="bootText">{BOOT_LINES.slice(0,count).map((l,i)=><div key={i} className={l.includes('FAILED')?'warn':''}>{l||'\u00A0'}</div>)}</div><div className="skip">CLICK TO SKIP</div></main>;
}

export function LoginScreen({onGuest}:{onGuest:()=>void}){
 const[showPassword,setShowPassword]=useState(false);const[password,setPassword]=useState('');const[error,setError]=useState(false);
 return <main className="login"><div className="loginCard"><div className="brandMark">◫</div><div className="brand">MIRAGE</div><div className="brandSub">OPERATING ENVIRONMENT</div>{!showPassword?<><div className="loginLead">Select a user to continue</div><button className="userCard" onClick={()=>setShowPassword(true)}><span className="avatar">A</span><span><strong>AKIRA</strong><small>Administrator · Password required</small></span><span className="lockedTag">LOCKED</span></button><div className="guestDivider"><span>or</span></div><button className="guest primaryGuest" onClick={onGuest}>Continue as Guest</button><div className="guestHelp">パスワードが分からない場合はこちらから調査を開始できます。</div></>:<form className="passwordPanel" onSubmit={e=>{e.preventDefault();setError(true)}}><div className="avatar large">A</div><strong>AKIRA</strong><div className="passwordLabel">Enter password</div><input type="password" placeholder="Password" value={password} onChange={e=>{setPassword(e.target.value);setError(false)}} autoFocus/><div className="hint">Hint: 最初に会った日</div>{error&&<div className="passwordError">Password incorrect. 別の方法でログインしてください。</div>}<button className="unlockButton" type="submit">Unlock</button><button className="guest guestFromPassword" type="button" onClick={onGuest}>パスワードが分からない → Continue as Guest</button><button className="backButton" type="button" onClick={()=>{setShowPassword(false);setPassword('');setError(false)}}>← Back</button></form>}</div></main>;
}
