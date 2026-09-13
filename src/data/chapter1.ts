export type MailItem = {
  id: string;
  from: string;
  subject: string;
  date: string;
  body: string;
  evidence?: string;
};

export const mails: MailItem[] = [
  { id: 'health', from: '総務部', subject: '健康診断のお知らせ', date: '10/09 09:10', body: '定期健康診断の日程をご確認ください。' },
  { id: 'yuna', from: '水城ユナ', subject: 'お願い', date: '10/10 23:48', body: 'アキラへ\n\n電話に出て。\nお願いだから、今日はMIRAIを起動しないで。\n\nHOMEのことも、317のことも、一人で抱え込まないで。\n明日ちゃんと話そう。' },
  { id: 'home', from: '新堂レン', subject: 'PROJECT HOMEの停止について', date: '10/10 21:08', evidence: 'E02', body: 'アキラ\n\n昨日の件だけど、一度落ち着いて話そう。\nPROJECT HOMEを勝手に停止する権限は君にはない。\n\nこの研究は、亡くなった人の記録から人格を再現するためのものだ。\n君一人の判断で止められる段階ではない。\n\n明日10時、研究室で話そう。\n\n新堂' },
  { id: 'storage', from: 'system@mirage.local', subject: 'HOMEデータ削除の警告', date: '10/11 01:18', evidence: 'E03', body: '/Research/HOME/ で異常な削除処理が検出されました。\n\n削除されたファイル：47\n削除を実行したユーザー：UNKNOWN\n\n※PROJECT HOME関連データです。' },
];

export const evidenceMeta: Record<string, { title: string; source: string }> = {
  E02: { title: 'PROJECT HOMEは人格再現研究', source: 'Mail / Files' },
  E03: { title: 'HOMEデータが大量削除された', source: 'Mail' },
  E04: { title: '317回目の実験', source: 'Messenger' },
  E05: { title: '被験者・朝倉ユウの記録', source: 'Photos' },
  E06: { title: '人格再現の精度記録', source: 'Notes' },
  E07: { title: '317番という存在', source: 'Messenger' },
  E08: { title: '317番の終了に失敗したログ', source: 'Recycle Bin' },
};
