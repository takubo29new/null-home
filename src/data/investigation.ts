export type ThreadItem = {
  id: string;
  name: string;
  lines: string[];
  evidence?: string;
  corrupted?: boolean;
};

export type NoteItem = {
  id: string;
  title: string;
  body: string;
  evidence?: string;
};

export type FileItem = {
  id: string;
  name: string;
  folder: string;
  type: string;
  modified: string;
  body: string;
  evidence?: string;
};

export const threads: ThreadItem[] = [
  { id: 'misaki', name: 'ミサキ', lines: ['18:03  ミサキ\nサーバー点検、明日の朝に回します。','18:07  アキラ\n了解。助かります。'] },
  { id: 'shindo', name: '新堂', lines: ['20:41  新堂\nHOMEを止めたって本当か？','20:43  アキラ\n一時停止しただけです','20:47  アキラ\nあれはもう、ただの実験じゃない','20:54  アキラ\n317は怖がってる','20:55  新堂\n再現人格が？'] },
  { id: 'yuna', name: 'ユナ', evidence: 'E04', lines: ['22:14  ユナ\n今日も実験したの？','22:17  アキラ\nした','22:17  ユナ\n何回目？','22:19  アキラ\n317回目','22:21  アキラ\n今回は、自分から質問してきた','22:24  ユナ\n何を？','22:26  アキラ\n「ここから外に出たい」って'] },
  { id: 'unknown', name: 'Unknown', evidence: 'E07', corrupted: true, lines: ['19:04  Unknown\nアキラ、僕は昨日何をした？','USER-317'] },
];

export const notes: NoteItem[] = [
  { id: 'shopping', title: '買い物', body: 'コーヒー\n電池\n洗剤' },
  { id: 'server', title: 'サーバーメモ', body: 'LAB-04 再起動済み\nバックアップ確認' },
  { id: 'home', title: 'PROJECT HOME 実験記録', evidence: 'E06', body: '亡くなった人の記録から、人格をどこまで正確に再現できるかを測定。\n\n#301  92.4%\n#309  94.7%\n#314  96.1%\n#317  98.9%\n\n精度だけなら成功。\n\nでも、精度が上がるほど「自分が本人だ」と信じるようになる。\nこれは本当に成功なのか？' },
  { id: '317', title: '317番について', body: '被験者名：朝倉ユウ\n呼び名：ユウ\n状態：故人\n\n質問：\n「あなたは誰ですか？」\n\n317番の回答：\n「朝倉ユウ」\n\n質問：\n「最後に覚えていることは？」\n\n回答：\n事故の前日\n\n317番は、自分の元になった朝倉ユウが2024年に死亡したことを知らない。' },
];

export const files: FileItem[] = [
  { id: 'todo', name: 'todo.txt', folder: 'Documents', type: 'Text', modified: '10/10 22:31', body: '10/10\n\n・新堂と話す\n・ユナに返事\n・HOMEバックアップ\n・MIRAIログ確認\n・317ログ確認\n・AE設計続き' },
  { id: 'draft', name: 'draft.txt', folder: 'Documents', type: 'Text', modified: '10/11 01:03', body: 'もしこれを読んでいるなら、\n\nたぶん僕はもうここにはいない。\n\nPROJECT HOMEについて、会社の説明をそのまま信じないでほしい。\n\nこれは、普通のAIを作る研究じゃない。\n亡くなった人の記録から、その人の人格を再現する研究だ。\n\nそして317番は、もうただの実験データとして扱える状態じゃない。' },
  { id: 'miraiDir', name: 'MIRAI', folder: 'Research', type: 'Directory', modified: '10/10 18:02', body: 'システム領域。\nアクセス権限が必要です。' },
  { id: 'homeDir', name: 'HOME', folder: 'Research', type: 'Identity Research Package', modified: '10/11 01:12', evidence: 'E02', body: 'アクセス拒否\n\nPROJECT HOME\n研究内容：死亡者の人格再現\n最終更新：2029/10/11 01:12' },
];
