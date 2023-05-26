const { Client,ID,Databases} =require( 'node-appwrite')

const dotenv =require( 'dotenv')


dotenv.config();

const client = new Client()
    .setEndpoint(process.env.APPWRITE_URL||"") // Your Appwrite Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID||"")                // Your project ID
    .setKey(process.env.APPWRITE_API_KEY || "");         // Your secret API key

const db= new Databases(client);    

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
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-databses","id",14,true)
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-databses","type",100,true)
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-databses","db-username",15,true)
            await db.createStringAttribute("appwrite-flexiDB","flexiDB-databses","db-password",15,true)


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
                "isRegable":true
            }).then(console.log).catch(console.error);
        }).catch((err)=>{
            console.log(err);
        });
}
}

const main=async()=>{
    await createDB();
    await createCollections();
    console.log("Seeding Done");
}

main();