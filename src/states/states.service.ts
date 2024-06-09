import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIState, TSState, stateTable } from "../drizzle/schema";

// GET STATES
export const getStatesService = async (): Promise<TSState[] | null> => {
  const states = await db.query.stateTable.findMany();
  return states;
};

// GET STATE BY ID
export const getStateByIdService = async (id: number): Promise<TSState | undefined> => {
  const state = await db.query.stateTable.findFirst({
    where: eq(stateTable.id, id)
  });
  return state;
}

// CREATE STATE
export const createStateService = async (state: TIState) => {
  await db.insert(stateTable).values(state)
  return "state created successfully";
}

//  UPDATE STATE
export const updateStateService = async (id: number, state: TIState) => {
  await db.update(stateTable).set(state).where(eq(stateTable.id, id));
  return "state updated successfully";
}

// DELETE STATE
export const deleteStateService = async (id: number) => {
  await db.delete(stateTable).where(eq(stateTable.id, id));
  return "state deleted successfully";
}