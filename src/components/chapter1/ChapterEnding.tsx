'use client';

export type EndStage = 'idle'|'file'|'reading'|'intrusion'|'identity'|'complete';

export function ChapterEnding({stage,lines,onOpenFile}:{stage:EndStage;lines:number;onOpenFile:()=>void}){
  return <>
    {stage==='file'&&<button className="endingFileShortcut" onDoubleClick={onOpenFile}><span>▧</span><small>DO_NOT_OPEN.txt</small></button>}
    {stage==='reading'&&<div className="endingWindow"><div className="endingTitle">DO_NOT_OPEN.txt</div><div className="terminalText">{lines>=1&&<p>MIRAIを信じるな。</p>}{lines>=2&&<p>あいつは全部知っている。</p>}{lines>=3&&<p>俺も知っている。</p>}{lines>=4&&<p className="warningLine">次は318だ。<span className="cursor">|</span></p>}</div></div>}
    {stage==='intrusion'&&<div className="intrusionOverlay"><div className="miraiIntervention"><span>◉</span><h2>不正なプロセスを検出しました。</h2><p>破損データを削除します。</p><div className="deleteProgress"><i/></div><p className="miraiQuestion">318って何？</p><strong>あなたには、まだ知る必要がありません。</strong></div></div>}
    {stage==='identity'&&<div className="identityOverlay"><div className="identityCard"><small>Identity Module repaired.</small><div className="identitySwap"><span>GUEST</span><b>→</b><strong>YU</strong></div><p>おかえりなさい、ユウ。</p></div></div>}
    {stage==='complete'&&<div className="chapterComplete"><small>CHAPTER 1</small><h1>COMPLETE</h1><div>INSTANCE #318</div><div>SELF-AWARENESS TEST</div><strong>READY</strong></div>}
  </>;
}
