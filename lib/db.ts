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
