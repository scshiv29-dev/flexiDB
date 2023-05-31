import { Client, Account, ID, Databases, Query, type Models } from 'appwrite';
export const appwriteEndpoint = 'https://cloud.appwrite.io/v1';
export const appwriteProjectId = 'flexidb';
import { nanoid } from 'nanoid';
const client = new Client().setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

const account = new Account(client);
const database = new Databases(client);

interface EnvVariable {
    name: string;
    value: string;
  }

export const accLogin=async (email: string, password: string) => {
    
    const promise =await  account.createEmailSession(email, password);
    console.log(promise);
    return promise;

}

export const getDatabases=async ()=>{
    const promise = await database.listDocuments("appwrite-flexiDB","flexiDB-databses");
    
    return promise;
}

export const createDatabase=async (name: string, type: string, tag:string,env:EnvVariable[],containerId:string)=>{

    const promise = await database.createDocument("appwrite-flexiDB","flexiDB-databses",nanoid(),{"name":name,"type":type,"env":env,"tag":tag,"containerId":containerId});
    console.log(promise);
    return promise;
}

export const deleteDatabase=async (id: string)=>{
    const promise = await database.deleteDocument("appwrite-flexiDB","flexiDB-databses",id);
    console.log(promise);
    return promise;
}

export const getDatabase=async (id: string)=>{
    const promise = await database.getDocument("appwrite-flexiDB","flexiDB-databses",id);
    console.log(promise);
    return promise;
}

export const updateDatabase=async (id: string, name: string, type: string, username: string, password: string)=>{
    const promise = await database.updateDocument("appwrite-flexiDB","flexiDB-databses",id,{
        name,
        type,
        username,
        password
    });
    console.log(promise);
    return promise;
}

