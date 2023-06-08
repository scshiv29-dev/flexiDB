const { Client,ID,Databases,Users,Permission} =require( 'node-appwrite')
const dotenv =require( 'dotenv');
const { Role } = require('appwrite');
dotenv.config();

const client = new Client()
    .setEndpoint(process.env.APPWRITE_URL||"") // Your Appwrite Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID||"")                // Your project ID
    .setKey(process.env.APPWRITE_API_KEY || "");         // Your secret API key

const db= new Databases(client);    
const users=new Users(client);
const createDB=async()=>{
    const dbList=await db.list();
    if(dbList.databases.length===0){
        await db.create(proccess.env.APPWRITE_DB_ID,"mainDB").then(console.log).catch(console.error);
    }
}

const createCollections=async()=>{
    const collectionList=await db.listCollections(process.env.APPWRITE_COLLECTION_ID||"");
    if(collectionList.collections.length===0){
        await db.createCollection(proccess.env.APPWRITE_DB_ID,"flexiDB-databses","Databases",[
            Permission.read(Role.user(process.env.USERID)),
            Permission.create(Role.user(process.env.USERID)),
            Permission.update(Role.user(process.env.USERID)),
            Permission.delete(Role.user(process.env.USERID)),
        ]) 
        .then(async (res)=>{
            console.log(res);       
            await db.createStringAttribute(proccess.env.APPWRITE_DB_ID,"flexiDB-databses","name",100,true)
            await db.createStringAttribute(proccess.env.APPWRITE_DB_ID,"flexiDB-databses","type",100,true)
            await db.createStringAttribute(proccess.env.APPWRITE_DB_ID,"flexiDB-databses","tag",15,true)
            await db.createStringAttribute(proccess.env.APPWRITE_DB_ID,"flexiDB-databses","containerId",15,true)


        }).catch((err)=>{
            console.log(err);
        });

        await db.createCollection(proccess.env.APPWRITE_DB_ID,"flexiDB-settings","Settings",["*"])
        .then(async (res)=>{
            console.log(res);       
            await db.createStringAttribute(proccess.env.APPWRITE_DB_ID,"flexiDB-settings","name",100,true,"")
            await db.createStringAttribute(proccess.env.APPWRITE_DB_ID,"flexiDB-settings","url",150,true,"")
            await db.createBooleanAttribute(proccess.env.APPWRITE_DB_ID,"flexiDB-settings","isRegable",false,true)
            await db.createDocument(proccess.env.APPWRITE_DB_ID,"flexiDB-settings","main",{
                "name":"FlexiDB",
                "url":"",
                "isRegable":false
            }).then(console.log).catch(console.error);
        }).catch((err)=>{
            console.log(err);
        });
}
}

const createUser=async()=>{
    const user=await users.create(process.env.USERID,process.env.USER_EMAIL,process.env.USER_PHONE,process.env.USER_PASSWORD,process.env.USER_NAME);
}