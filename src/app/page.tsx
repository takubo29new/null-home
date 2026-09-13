'use client';

import { useEffect, useMemo, useState } from 'react';

type Phase = 'boot' | 'login' | 'desktop';
type AppId = 'files' | 'mail' | 'messenger' | 'photos' | 'news' | 'notes' | 'recycle' | 'mirai';

type WindowState = {
  id: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  open: boolean;
  minimized: boolean;
  z: number;
};

const APP_META: Record<AppId, { title: string; glyph: string }> = {
  files: { title: 'Files', glyph: '▱' },
  mail: { title: 'Mail', glyph: '✉' },
  messenger: { title: 'Messenger', glyph: '◇' },
  photos: { title: 'Photos', glyph: '□' },
  news: { title: 'News', glyph: '▤' },
  notes: { title: 'Notes', glyph: '▢' },
  recycle: { title: 'Recycle Bin', glyph: '♲' },
  mirai: { title: 'MIRAI', glyph: '◉' },
};

const BOOT_LINES = [
  'MIRAGE SYSTEMS BIOS 4.18',
  'Memory Check..............OK',
  'Storage...................OK',
  'Network...................OFFLINE',
  'Identity Module...........FAILED',
  '',
  'Previous session was not terminated correctly.',
];

function Placeholder({ name }: { name: string }) {
  return (
    <div className="placeholder">
      <div className="placeholderTitle">{name}</div>
      <div className="placeholderText">Chapter 1 data module is not installed in this prototype.</div>
    </div>
  );
}

function MiraiApp({ onUserKnown }: { onUserKnown: () => void }) {
  const [messages, setMessages] = useState([
    { who: 'mirai', text: 'おかえりなさい。\n\n最後のセッションから\n3日7時間14分が経過しています。' },
  ]);
  const [options, setOptions] = useState([
    '誰ですか？',
    'このPCの持ち主は？',
    'なぜ私を知っている？',
    '前回のセッション？',
  ]);

  const choose = (text: string) => {
    setMessages((m) => [...m, { who: 'user', text }]);
    if (text === '誰ですか？') {
      setTimeout(() => setMessages((m) => [...m, { who: 'mirai', text: '私はMIRAI。\nMIRAGE OSに統合された対話型支援システムです。' }]), 350);
    } else if (text === 'このPCの持ち主は？') {
      setTimeout(() => setMessages((m) => [...m, { who: 'mirai', text: '桐生アキラ。\nMIRAGE Systems所属。\n\n最終登録状態：DECEASED' }]), 350);
    } else if (text === 'なぜ私を知っている？') {
      setOptions(['初めて触る', '証拠を見せて', '私の名前は？']);
      setTimeout(() => setMessages((m) => [...m, { who: 'mirai', text: '質問の意図を理解できません。\n\nあなたは以前から\nこのシステムを使用しています。' }]), 550);
    } else if (text === '証拠を見せて') {
      onUserKnown();
      setTimeout(() => setMessages((m) => [...m, { who: 'mirai', text: '過去のセッション：\n\n317件' }]), 550);
    } else if (text === '私の名前は？') {
      setTimeout(() => setMessages((m) => [...m, { who: 'mirai', text: '現在のアクセス権限では回答できません。' }]), 450);
    } else if (text === '初めて触る') {
      setTimeout(() => setMessages((m) => [...m, { who: 'mirai', text: '記録と一致しません。' }]), 450);
    } else {
      setTimeout(() => setMessages((m) => [...m, { who: 'mirai', text: '前回のセッションは正常に終了していません。' }]), 450);
    }
  };

  return (
    <div className="miraiApp">
      <div className="miraiHeader"><span className="miraiOrb">◉</span><div><strong>MIRAI</strong><span>Integrated Assistant</span></div><em>ONLINE</em></div>
      <div className="chatLog">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.who}`}>
            <div className="msgWho">{m.who === 'mirai' ? 'MIRAI' : 'YOU'}</div>
            <div className="msgText">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="choices">
        {options.map((o) => <button key={o} onClick={() => choose(o)}>&gt; {o}</button>)}
      </div>
    </div>
  );
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>('boot');
  const [bootCount, setBootCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [knownFlag, setKnownFlag] = useState(false);
  const [notice, setNotice] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [drag, setDrag] = useState<{ id: AppId; dx: number; dy: number } | null>(null);
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(() => {
    const init: Partial<Record<AppId, WindowState>> = {};
    (Object.keys(APP_META) as AppId[]).forEach((id, i) => {
      init[id] = { id, title: APP_META[id].title, x: 140 + i * 24, y: 90 + i * 18, w: id === 'mirai' ? 560 : 520, h: id === 'mirai' ? 560 : 400, open: false, minimized: false, z: 1 + i };
    });
    return init as Record<AppId, WindowState>;
  });

  useEffect(() => {
    if (phase !== 'boot') return;
    if (bootCount >= BOOT_LINES.length) {
      const t = setTimeout(() => setPhase('login'), 850);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootCount((c) => c + 1), bootCount === 0 ? 300 : 520);
    return () => clearTimeout(t);
  }, [phase, bootCount]);

  useEffect(() => {
    if (phase !== 'desktop') return;
    const t = setInterval(() => setSeconds((s) => (s + 1) % 60), 1000);
    return () => clearInterval(t);
  }, [phase]);

  useEffect(() => {
    if (phase === 'desktop') {
      const t = setTimeout(() => setNotice('MIRAI\nおかえりなさい。'), 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!drag) return;
      setWindows((ws) => ({ ...ws, [drag.id]: { ...ws[drag.id], x: Math.max(0, e.clientX - drag.dx), y: Math.max(0, e.clientY - drag.dy) } }));
    };
    const up = () => setDrag(null);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up); };
  }, [drag]);

  const topZ = useMemo(() => Math.max(...Object.values(windows).map(w => w.z)), [windows]);

  const openApp = (id: AppId) => setWindows((ws) => ({ ...ws, [id]: { ...ws[id], open: true, minimized: false, z: topZ + 1 } }));
  const focus = (id: AppId) => setWindows((ws) => ({ ...ws, [id]: { ...ws[id], z: topZ + 1 } }));
  const close = (id: AppId) => setWindows((ws) => ({ ...ws, [id]: { ...ws[id], open: false } }));
  const minimize = (id: AppId) => setWindows((ws) => ({ ...ws, [id]: { ...ws[id], minimized: true } }));

  if (phase === 'boot') {
    return <main className="boot" onClick={() => { setBootCount(BOOT_LINES.length); setTimeout(() => setPhase('login'), 120); }}>
      <div className="bootText">
        {BOOT_LINES.slice(0, bootCount).map((l, i) => <div key={i} className={l.includes('FAILED') ? 'warn' : ''}>{l || '\u00A0'}</div>)}
      </div>
      <div className="skip">CLICK TO SKIP</div>
    </main>;
  }

  if (phase === 'login') {
    return <main className="login">
      <div className="loginCard">
        <div className="brandMark">◫</div>
        <div className="brand">MIRAGE</div>
        <div className="brandSub">OPERATING ENVIRONMENT</div>
        {!showPassword ? <>
          <div className="loginLead">Select a user to continue</div>
          <button className="userCard" onClick={() => { setShowPassword(true); setPasswordError(false); }}><span className="avatar">A</span><span><strong>AKIRA</strong><small>Administrator · Password required</small></span><span className="lockedTag">LOCKED</span></button>
          <div className="guestDivider"><span>or</span></div>
          <button className="guest primaryGuest" onClick={() => setPhase('desktop')}>Continue as Guest</button>
          <div className="guestHelp">パスワードが分からない場合はこちらから調査を開始できます。</div>
        </> : <form className="passwordPanel" onSubmit={(e) => { e.preventDefault(); setPasswordError(true); }}>
          <div className="avatar large">A</div><strong>AKIRA</strong>
          <div className="passwordLabel">Enter password</div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }} autoFocus />
          <div className="hint">Hint: 最初に会った日</div>
          {passwordError && <div className="passwordError">Password incorrect. 別の方法でログインしてください。</div>}
          <button className="unlockButton" type="submit">Unlock</button>
          <button className="guest guestFromPassword" type="button" onClick={() => setPhase('desktop')}>パスワードが分からない → Continue as Guest</button>
          <button className="backButton" type="button" onClick={() => { setShowPassword(false); setPasswordError(false); setPassword(''); }}>← Back</button>
        </form>}
      </div>
    </main>;
  }

  return <main className="desktop">
    <div className="wallpaperMark">◫</div>
    <div className="icons">
      {(Object.keys(APP_META) as AppId[]).map((id) => <button className="desktopIcon" key={id} onDoubleClick={() => openApp(id)} onClick={() => id === 'mirai' && openApp(id)}><span>{APP_META[id].glyph}</span><small>{APP_META[id].title}</small></button>)}
    </div>

    {Object.values(windows).filter(w => w.open && !w.minimized).map((w) => <section key={w.id} className="window" style={{ left: w.x, top: w.y, width: w.w, height: w.h, zIndex: w.z }} onMouseDown={() => focus(w.id)}>
      <header className="titlebar" onMouseDown={(e) => { focus(w.id); setDrag({ id: w.id, dx: e.clientX - w.x, dy: e.clientY - w.y }); }}>
        <div><span>{APP_META[w.id].glyph}</span>{w.title}</div>
        <nav><button onClick={(e) => {e.stopPropagation(); minimize(w.id)}}>—</button><button disabled>□</button><button onClick={(e) => {e.stopPropagation(); close(w.id)}}>×</button></nav>
      </header>
      <div className="windowBody">
        {w.id === 'mirai' ? <MiraiApp onUserKnown={() => setKnownFlag(true)} /> : <Placeholder name={APP_META[w.id].title} />}
      </div>
    </section>)}

    {notice && <button className="notice" onClick={() => { setNotice(''); openApp('mirai'); }}><span>◉</span><div>{notice.split('\n').map((x, i) => <div key={i}>{x}</div>)}</div></button>}

    <footer className="taskbar">
      <button className="start">◫</button>
      <div className="running">
        {Object.values(windows).filter(w => w.open).map(w => <button key={w.id} onClick={() => setWindows(ws => ({...ws, [w.id]: {...ws[w.id], minimized: !ws[w.id].minimized, z: topZ + 1}}))}>{APP_META[w.id].glyph} {APP_META[w.id].title}</button>)}
      </div>
      <div className="status"><span>OFFLINE</span><button className="clock">19:04<span className="seconds">:{String(seconds).padStart(2,'0')}</span></button><small>2029/10/14</small><em>{knownFlag ? '317' : ''}</em></div>
    </footer>
  </main>;
}
