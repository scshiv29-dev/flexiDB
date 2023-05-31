const { Client,ID,Databases,Users} =require( 'node-appwrite')

const dotenv =require( 'dotenv');



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
        await db.create("appwrite-flexiDB","mainDB").then(console.log).catch(console.error);
    }
}

const createCollections=async()=>{
    const collectionList=await db.listCollections(process.env.APPWRITE_COLLECTION_ID||"");
    if(collectionList.collections.length===0){
        await db.createCollection("appwrite-flexiDB","flexiDB-databses","Databases",["*"])
        .then(async (res)=>{
            console.log(res);       
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-databses","name",100,true)
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-databses","type",100,true)
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-databses","username",15,true)
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-databses","password",15,true)


        }).catch((err)=>{
            console.log(err);
        });

        await db.createCollection("appwrite-flexiDB","flexiDB-settings","Settings",["*"])
        .then(async (res)=>{
            console.log(res);       
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-settings","name",100,true,"")
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-settings","url",150,true,"")
            await db.createBooleanAttribute("appwrite-flexiDB","flexiDB-settings","isRegable",false,true)
            await db.createDocument("appwrite-flexiDB","flexiDB-settings","main",{
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
const main=async()=>{
await createUser();
}

main();
