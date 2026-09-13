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
  { id: 'shindo', name: '新堂', lines: ['20:41  新堂\nHOMEを止めたって本当か？','20:43  アキラ\n一時停止しただけです','20:47  アキラ\nあれはもう実験じゃない','20:54  アキラ\n怖がってる','20:55  新堂\nAIが？'] },
  { id: 'yuna', name: 'ユナ', evidence: 'E04', lines: ['22:14  ユナ\n今日もやったの？','22:17  アキラ\nやった','22:17  ユナ\n何回目？','22:19  アキラ\n317','22:21  アキラ\n今回は自分から質問した','22:24  ユナ\n何を？','22:26  アキラ\n「外に出たい」って'] },
  { id: 'unknown', name: 'Unknown', evidence: 'E07', corrupted: true, lines: ['19:04  Unknown\nアキラ、僕は昨日何をした？','USER-317'] },
];

export const notes: NoteItem[] = [
  { id: 'shopping', title: '買い物', body: 'コーヒー\n電池\n洗剤' },
  { id: 'server', title: 'サーバーメモ', body: 'LAB-04 再起動済み\nバックアップ確認' },
  { id: 'home', title: 'HOME', evidence: 'E06', body: '人格再現精度\n\n#301  92.4%\n#309  94.7%\n#314  96.1%\n#317  98.9%\n\n精度だけなら成功。\n\nでも、これは本当に成功なのか？' },
  { id: '317', title: '317', body: '質問：\n「あなたは誰ですか？」\n\n回答：\n「朝倉ユウ」\n\n質問：\n「最後に覚えていることは？」\n\n回答：\n事故の前日\n\n本人は、自分が2024年に死亡したことを知らない。' },
];

export const files: FileItem[] = [
  { id: 'todo', name: 'todo.txt', folder: 'Documents', type: 'Text', modified: '10/10 22:31', body: '10/10\n\n・新堂と話す\n・ユナに返事\n・HOMEバックアップ\n・MIRAIログ確認\n・317ログ確認\n・AE設計続き' },
  { id: 'draft', name: 'draft.txt', folder: 'Documents', type: 'Text', modified: '10/11 01:03', body: 'もしこれを読んでいるなら、\n\nたぶん僕はもうここにはいない。\n\nHOMEについて、会社が説明することをそのまま信じないでほしい。\n\nこれは、AIを作る研究ではない。\n\nこれは――' },
  { id: 'miraiDir', name: 'MIRAI', folder: 'Research', type: 'Directory', modified: '10/10 18:02', body: 'System package.\nAccess level: restricted.' },
  { id: 'homeDir', name: 'HOME', folder: 'Research', type: 'Identity Research Package', modified: '10/11 01:12', evidence: 'E02', body: 'ACCESS DENIED\n\nOwner: PROJECT HOME\nType: Identity Research Package\nLast Modified: 2029/10/11 01:12' },
];
