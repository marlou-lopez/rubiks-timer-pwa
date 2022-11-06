import Dexie, { Table } from 'dexie';

export type PuzzleType = '222' | '333' | '444';

export type Puzzle = {
  name: string;
  value: PuzzleType;
};

export type Solve = {
  id?: number;
  time: number;
  scramble: string;
  puzzleType: PuzzleType;
  sessionId?: number;
  date: number;
};

export type Session = {
  id?: number;
  name: string;
  puzzleType: PuzzleType;
  isDefault?: boolean;
};

export const PUZZLES: Puzzle[] = [
  {
    name: '2x2x2',
    value: '222',
  },
  {
    name: '3x3x3',
    value: '333',
  },
  {
    name: '4x4x4',
    value: '444',
  },
];

export class DBDexie extends Dexie {
  solves!: Table<Solve, number>;
  sessions!: Table<Session, number>;

  constructor() {
    super('rubiksPwa');
    this.version(2).stores({
      solves: '++id',
      sessions: '++id, puzzleType',
    });

    this.on('populate', async () => {
      await this.sessions.bulkAdd([
        {
          name: 'default session (4x4x4)',
          puzzleType: '444',
          isDefault: true,
        },
        {
          name: 'default session (3x3x3)',
          puzzleType: '333',
          isDefault: true,
        },
        {
          name: 'default session (2x2x2)',
          puzzleType: '222',
          isDefault: true,
        },
      ]);
    });
  }

  // TODO: Move db operations here
}

export const db = new DBDexie();

// For testing purpose
const populate = async () => {
  const generatedData = Array<Solve>(9000).fill({
    scramble: "B' L B2 U2 L' U2 B2 R U2 R2 U2 B' D' R2 D' B' F' D F",
    time: 30000,
    date: Date.now(),
    puzzleType: '333',
    sessionId: 1,
  });
  await db.solves.bulkAdd(generatedData);
};
// db.on('ready', populate);
