import client from "@/utils/appwrite/client"
import { Databases, ID } from "appwrite"

export default async function Page () {
    const db = new Databases(client)
    // find OK
    // const result = await databases.getDocument(
    //     '<DATABASE_ID>', // databaseId
    //     '<COLLECTION_ID>', // collectionId
    //     '<DOCUMENT_ID>', // documentId
    //     [] // queries (optional)
    // );
    // store OK
    // await db.createDocument('6638c936001ab457aa18', '6638c9ad0024ec46f1eb', ID.unique(), {
    //     nama: 'Hidayato',
    //     organisasi: 'BPBJ',
    //     telepon: '085375045045',
    //     keperluan: 'Konsultasi'
    // })
    // update OK
    // await db.updateDocument('6638c936001ab457aa18', '6638c9ad0024ec46f1eb', '6638cf89000c2da27cb2', {
    //     organisasi: 'Biro PBJ'
    // })
    // delete OK
    // const result = await databases.deleteDocument(
    //     '<DATABASE_ID>', // databaseId
    //     '<COLLECTION_ID>', // collectionId
    //     '<DOCUMENT_ID>' // documentId
    // );
    // view
    const req = await db.listDocuments('6638c936001ab457aa18', '6638c9ad0024ec46f1eb', [
        
    ])
    
    return (
        <>
            <h1>AppWrite DB</h1>
            {req.documents.map(item => (
                <span>{item.nama}</span>
            ))}
        </>
    )

}