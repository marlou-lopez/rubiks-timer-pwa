import Dexie, { Table } from 'dexie';

export type Solve = {
  id?: number;
  time: number;
  scramble: string;
};

export class DBDexie extends Dexie {
  solves!: Table<Solve, number>;

  constructor() {
    super('rubiksPwa');
    this.version(1).stores({
      solves: '++id',
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
  });
  await db.solves.bulkAdd(generatedData);
};
// db.on('ready', populate);
