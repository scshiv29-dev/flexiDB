import { Client, Account, ID, Databases, Query, type Models } from "appwrite";

import { nanoid } from "nanoid";


export const accLogin = async (email: string, password: string,appwriteEndpoint,appwriteProjectId) => {

  
  const client = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId);

  const account = new Account(client);
  const promise = await account.createEmailSession(email, password);
  console.log(promise);
  return promise;
};

export const getDatabases = async (appwriteEndpoint,appwriteProjectId) => {

  const client = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId);

  const database = new Databases(client);
  const promise = await database.listDocuments(
    "appwrite-flexiDB",
    "flexiDB-databses"
  );

  return promise;
};

export const createDatabase = async (
  name: string,
  type: string,
  tag: string,
  containerId: string,
  appwriteEndpoint:string,
  appwriteProjectId:string
) => {
  const client = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId);

  const database = new Databases(client);
  const promise = await database.createDocument(
    "appwrite-flexiDB",
    "flexiDB-databses",
    nanoid(),
    { name: name, type: type, tag: tag, containerId: containerId }
  );
  console.log(promise);
  return promise;
};

export const deleteDatabase = async (id: string,appwriteEndpoint,appwriteProjectId) => {
  const client = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId);

  const database = new Databases(client);
  const promise = await database.deleteDocument(
    "appwrite-flexiDB",
    "flexiDB-databses",
    id
  );
  console.log(promise);
  return promise;
};

export const getDatabase = async (id: string,appwriteEndpoint,appwriteProjectId) => {
  const client = new Client()
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId);

  const database = new Databases(client);
  const promise = await database.getDocument(
    "appwrite-flexiDB",
    "flexiDB-databses",
    id
  );

  return promise;
};
