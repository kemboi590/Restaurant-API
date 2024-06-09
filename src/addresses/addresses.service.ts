import { eq } from "drizzle-orm";
import db from "../drizzle/db";

import { TIAddress, TSAddress,addressTable } from "../drizzle/schema";

// GET ALL ADDRESSES
export const getAddressesService = async (): Promise<TSAddress[] | null> => {
    const addresses = await db.query.addressTable.findMany();
    return addresses;
};

// GET ADDRESS BY ID
export const getAddressByIdService = async (id: number): Promise<TSAddress | undefined> => {
    const address = await db.query.addressTable.findFirst({
        where: eq(addressTable.id, id)
    });
    return address;
}

// CREATE ADDRESS
export const createAddressService = async (address: TIAddress) => {
    await db.insert(addressTable).values(address)
    return "address created successfully";
}

//  UPDATE ADDRESS
export const updateAddressService = async (id: number, address: TIAddress) => {
    await db.update(addressTable).set(address).where(eq(addressTable.id, id));
    return "address updated successfully";
}

// DELETE ADDRESS
export const deleteAddressService = async (id: number) => {
    await db.delete(addressTable).where(eq(addressTable.id, id));
    return "address deleted successfully";
}