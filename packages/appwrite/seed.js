const { Client,ID,Databases,Users,Permission,Role} =require( 'node-appwrite')
const dotenv =require( 'dotenv');
dotenv.config();

const client = new Client()
    .setEndpoint(process.env.APPWRITE_URL||"") // Your Appwrite Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID||"")                // Your project ID
    .setKey(process.env.APPWRITE_API_KEY || "");         // Your secret API key

const db= new Databases(client);    
const users=new Users(client);

const createUser=async()=>{
    const user=await users.create(process.env.USER_ID,process.env.USER_EMAIL,process.env.USER_PHONE,process.env.USER_PASSWORD,process.env.USER_NAME);
}
const createDB=async()=>{
        await db.create(process.env.APPWRITE_DB_ID,"mainDB").then(console.log).catch(console.error);
    
}

const createCollection=async()=>{

        await db.createCollection(process.env.APPWRITE_DB_ID,process.env.APPWRITE_DB_COLLECTION_DB_ID,"Databases",[
            Permission.read(Role.user(process.env.USER_ID)),
            Permission.create(Role.user(process.env.USER_ID)),
            Permission.update(Role.user(process.env.USER_ID)),
            Permission.delete(Role.user(process.env.USER_ID)),
        ]) 
        .then(async (res)=>{
            console.log(res);       
            await db.createStringAttribute(process.env.APPWRITE_DB_ID,process.env.APPWRITE_DB_COLLECTION_DB_ID,"name",100,true)
            await db.createStringAttribute(process.env.APPWRITE_DB_ID,process.env.APPWRITE_DB_COLLECTION_DB_ID,"type",100,true)
            await db.createStringAttribute(process.env.APPWRITE_DB_ID,process.env.APPWRITE_DB_COLLECTION_DB_ID,"tag",15,true)
            await db.createStringAttribute(process.env.APPWRITE_DB_ID,process.env.APPWRITE_DB_COLLECTION_DB_ID,"containerId",15,true)
        }).catch((err)=>{
            console.log(err);
        });

}



const seed=async()=>{
    await createUser();
    await createDB();
    await createCollection();

}
seed();