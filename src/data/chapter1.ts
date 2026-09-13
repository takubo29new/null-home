export type MailItem = {
  id: string;
  from: string;
  subject: string;
  date: string;
  body: string;
  evidence?: string;
};

export const mails: MailItem[] = [
  { id: 'home', from: '新堂レン', subject: 'HOMEの件', date: '10/10 21:08', evidence: 'E02', body: 'アキラ\n\n昨日の件だけど、一度落ち着いて話そう。\nHOMEを勝手に停止する権限は君にはない。\n\n明日10時、研究室で話そう。\n\n新堂' },
  { id: 'yuna', from: '水城ユナ', subject: 'お願い', date: '10/10 23:48', body: 'アキラへ\n\n電話に出て。\nお願いだから、今日はMIRAIを起動しないで。\n\n明日ちゃんと話そう。' },
  { id: 'storage', from: 'system@mirage.local', subject: 'Storage integrity warning', date: '10/11 01:18', evidence: 'E03', body: '/Research/HOME/ で異常な削除処理が検出されました。\n\nDeleted Files: 47\nDeletion initiated by: UNKNOWN' },
  { id: 'health', from: '総務部', subject: '健康診断のお知らせ', date: '10/09 09:10', body: '定期健康診断の日程をご確認ください。' },
];

export const evidenceMeta: Record<string, { title: string; source: string }> = {
  E02: { title: 'HOME停止の痕跡', source: 'Mail / Files' },
  E03: { title: 'HOMEデータ削除', source: 'Mail' },
  E04: { title: '317回目の実験', source: 'Messenger' },
  E05: { title: '朝倉ユウの実験写真', source: 'Photos' },
  E06: { title: '人格再現精度', source: 'Notes' },
  E07: { title: '#317の存在', source: 'Messenger' },
  E08: { title: '#317終了失敗ログ', source: 'Recycle Bin' },
};
