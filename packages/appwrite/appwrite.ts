import { Client, Account, ID, Databases, Query, type Models } from 'appwrite';

export const appwriteEndpoint = 'http://localhost/v1';
export const appwriteProjectId = 'flexidb';

const client = new Client().setEndpoint(appwriteEndpoint).setProject(appwriteProjectId);

const account = new Account(client);
const database = new Databases(client);


const login=async (email: string, password: string) => {
    
    const promise = account.createEmailSession('email@example.com', 'password');
 
    promise.then(function (response) {
    console.log(response); // Success
    }, function (error) {
    console.log(error); // Failure
        });

}