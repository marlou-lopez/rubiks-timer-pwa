import Dexie, { Table } from 'dexie';
import f2lAlgs from './algs_set/f2l.json';
import ollAlgs from './algs_set/oll.json';
import pllAlgs from './algs_set/pll.json';

export type PuzzleType = '222' | '333' | '444';

export type Puzzle = {
  name: string;
  value: PuzzleType;
};

export type Penalty = '+2' | 'DNF';
export type Solve = {
  id?: number;
  time: number;
  scramble: string;
  puzzleType: PuzzleType;
  sessionId?: number;
  penalty: Penalty | null;
  date: number;
};

export type Session = {
  id?: number;
  name: string;
  puzzleType: PuzzleType;
  isDefault?: boolean;
  date: number;
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

export type Case = {
  id?: number;
  name: string;
  // algSet: 'f2l' | 'oll' | 'pll';
  slug: string;
  algSet: string;
  imageSrc: string;
  algorithms: string[];
  isBookMarked: boolean;
};

export class DBDexie extends Dexie {
  solves!: Table<Solve, number>;
  sessions!: Table<Session, number>;
  cases!: Table<Case, number>;

  constructor() {
    super('rubiksPwa');
    this.version(6).stores({
      solves: '++id, sessionId, penalty',
      sessions: '++id, puzzleType',
      cases: '++id, algSet, slug',
    });

    this.on('populate', async () => {
      await this.sessions.bulkAdd([
        {
          name: 'default session (4x4x4)',
          puzzleType: '444',
          isDefault: true,
          date: Date.now(),
        },
        {
          name: 'default session (3x3x3)',
          puzzleType: '333',
          isDefault: true,
          date: Date.now(),
        },
        {
          name: 'default session (2x2x2)',
          puzzleType: '222',
          isDefault: true,
          date: Date.now(),
        },
      ]);
      await this.cases.bulkAdd([...f2lAlgs, ...ollAlgs, ...pllAlgs]);
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
    penalty: null,
  });
  await db.solves.bulkAdd(generatedData);
};
// db.on('ready', populate);
