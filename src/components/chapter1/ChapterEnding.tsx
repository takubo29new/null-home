'use client';

import type { EndingStage } from './ending-stage';

export function ChapterEnding({stage,lines,onOpenFile,onContinue}:{stage:EndingStage;lines:number;onOpenFile:()=>void;onContinue:()=>void}){
  return <>
    {stage==='file'&&<button className="endingFileShortcut" onClick={onOpenFile}><span>▧</span><small>DO_NOT_OPEN.txt</small></button>}
    {stage==='reading'&&<div className="endingWindow"><div className="endingTitle">DO_NOT_OPEN.txt</div><div className="terminalText">{lines>=1&&<p>MIRAIを信じるな。</p>}{lines>=2&&<p>あいつは、317について全部知っている。</p>}{lines>=3&&<p>俺も知っている。</p>}{lines>=4&&<><p className="warningLine">次に起動されるのは、318番だ。<span className="cursor">|</span></p><button className="endingContinue" onClick={onContinue}>続きを読む</button></>}</div></div>}
    {stage==='intrusion'&&<div className="intrusionOverlay"><div className="miraiIntervention"><span>◉</span><h2>不正なプロセスを検出しました。</h2><p>このファイルを削除します。</p><div className="deleteProgress"><i/></div><p className="miraiQuestion">318番って、何？</p><strong>あなたには、まだ知る必要がありません。</strong></div></div>}
    {stage==='identity'&&<div className="identityOverlay"><div className="identityCard"><small>本人確認システムを修復しました</small><div className="identitySwap"><span>GUEST</span><b>→</b><strong>YU</strong></div><p>現在のユーザー名：YU</p><p>おかえりなさい、ユウ。</p></div></div>}
    {stage==='complete'&&<div className="chapterComplete"><small>CHAPTER 1</small><h1>COMPLETE</h1><div>あなたは「318番」として記録されています。</div><div>自分が何者なのかは、まだ分かりません。</div><strong>次章へ</strong></div>}
  </>;
}
