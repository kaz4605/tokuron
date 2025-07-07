import { drizzle } from 'drizzle-orm/d1';
import { eq, and } from 'drizzle-orm';
import type { DBChat, DBCreateChat, DBMessage, DBCreateMessage, DBUser, DBCreateUser } from "../models/db";
import type { IDatabaseResource } from "./types";
import { chatTable, messageTable, userTable }  from "../schema";

export class UserSQLResource implements IDatabaseResource<DBUser, DBCreateUser> {
  db: ReturnType<typeof drizzle>;

  constructor(d1: D1Database) {
    this.db = drizzle(d1);
  }

  async create(data: DBCreateUser): Promise<DBUser> {
    const result = await this.db
      .insert(userTable)
      .values({ name: data.name, email: data.email, password: data.password })
      .returning()
      .get();
    return result as DBUser;
  }

async delete(id: string): Promise<DBUser | null> {
  const result = await this.db
    .delete(userTable)
    .where(eq(userTable.id, id))
    .returning()
    .get();

  if (result === undefined) {
    return null;
  }

  return result as DBUser;
}

  async find(data: Partial<DBUser>): Promise<DBUser | null> {
    return this.findByFields(data, false);
  }

  async findAll(data: Partial<DBUser>): Promise<DBUser[]> {
    return this.findByFields(data, true);
  }

  private async findByFields<T extends (DBUser | null) | DBUser[]>(
    data: Partial<DBUser>,
    all: boolean = false,
  ): Promise<T> {
    let query = this.db.select().from(userTable);
    const conditions = Object.entries(data)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => eq(userTable[key as keyof typeof userTable], value as string));

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    if (all) {
      const results = await query.all();
      return results as T;
    } else {
      const result = await query.get();
      return (result || null) as T;
    }
  }
  async update(id: string, data: Partial<DBUser>): Promise<DBUser | null> {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key as keyof DBUser] = value;
      return acc;
    }, {} as Record<string, any>);

  if (Object.keys(updateData).length === 0) {
    return null;
  }
　　const result = await this.db
  　　.update(userTable)
  　　.set(updateData)
  　　.where(eq(userTable.id, id))
  　　.returning()
  　　.get();
　　if (result === undefined) {
  　　return null;
　　}
　　return result as DBUser;
　}

}

export class ChatSQLResource implements IDatabaseResource<DBChat, DBCreateChat> {
  db: ReturnType<typeof drizzle>;

  constructor(d1: D1Database) {
    this.db = drizzle(d1);
  }
async create(data: DBCreateChat): Promise<DBChat> {
    const result = await this.db
      .insert(chatTable)
      .values({ name: data.name, ownerId: data.ownerId })
      .returning()
      .get();
    return result as DBChat;
  }
async delete(id: string): Promise<DBChat | null> {
  const result = await this.db
   .delete(chatTable)
    .where(eq(chatTable.id, id))
    .returning()
    .get();

  if (result === undefined) {
    return null;
  }

  return result as DBChat;
}
async find(data: Partial<DBChat>): Promise<DBChat | null> {
    return this.findByFields(data, false);
  }

  async findAll(data: Partial<DBChat>): Promise<DBChat[]> {
    return this.findByFields(data, true);
  }

private async findByFields<T extends DBChat | null | DBChat[]>(
    data: Partial<DBChat>,
    all: boolean
  ): Promise<T> {
    let query = this.db.select().from(chatTable);
    const conditions = Object.entries(data)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => eq(chatTable[key as keyof typeof chatTable], value as any));

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    if (all) {
      const results = await query.all();
      return results as T;
    } else {
      const result = await query.get();
      return (result || null) as T;
    }
  }
async update(id: string, data: Partial<DBChat>): Promise<DBChat | null> {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key as keyof DBUser] = value;
      return acc;
    }, {} as Record<string, any>);

  if (Object.keys(updateData).length === 0) {
    return null;
  }
　　const result = await this.db
  　　.update(chatTable)
      .set(updateData)
      .where(eq(chatTable.id, id))
      .returning()
      .get();
　　if (result === undefined) {
  　　return null;
　　}
　　return result as DBChat;
　}
}

export class MessageSQLResource implements IDatabaseResource<DBMessage, DBCreateMessage> {
  db: ReturnType<typeof drizzle>;

 constructor(d1: D1Database) {
    this.db = drizzle(d1);
  }
async create(data: DBCreateMessage): Promise<DBMessage> {
    const result = await this.db
      .insert(messageTable)
      .values({ chatId: data.chatId, message: data.message, type: data.type })
      .returning()
      .get();
    return result as DBMessage;
  }
async delete(id: string): Promise<DBMessage | null> {
  const result = await this.db
   .delete(messageTable)
    .where(eq(messageTable.id, id))
    .returning()
    .get();

  if (result === undefined) {
    return null;
  }

  return result as DBMessage;
}
 async find(data: Partial<DBMessage>): Promise<DBMessage | null> {
    return this.findByFields(data, false);
  }

  async findAll(data: Partial<DBMessage>): Promise<DBMessage[]> {
    return this.findByFields(data, true);
  }

  private async findByFields<T extends DBMessage | null | DBMessage[]>(
    data: Partial<DBMessage>,
    all: boolean
  ): Promise<T> {
    let query = this.db.select().from(messageTable);
    const conditions = Object.entries(data)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => eq(messageTable[key as keyof typeof messageTable], value as any));

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    if (all) {
      const results = await query.all();
      return results as T;
    } else {
      const result = await query.get();
      return (result || null) as T;
    }
  }
async update(id: string, data: Partial<DBMessage>): Promise<DBMessage | null> {
  const updateData = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key as keyof DBMessage] = value;
      return acc;
    }, {} as Record<string, any>);

  if (Object.keys(updateData).length === 0) {
    return null;
  }
　　const result = await this.db
  　.update(messageTable)
    .set(updateData)
    .where(eq(messageTable.id, id))
    .returning()
    .get();
　　if (result === undefined) {
  　　return null;
　　}
　　return result as DBMessage;
　}

}
