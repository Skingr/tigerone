export function organizeData(database: Array<{ 
    role: string;
    messageContent: string;
    userClass: string;
    createdAt: string;
}> = []): Array<{ 
    userQuery: string;
    aiResponse: string;
    userClass: string;
    createdAt: string;
}> {
    if (database.length === 0) return []; 

    const organizedDb: Array<{ 
        userQuery: string;
        aiResponse: string;
        userClass: string;
        createdAt: string;
    }> = [];
    for (let i = 0; i < database.length - 1; i+=2) {
        //console.log(i)
        if (database[i].role === "user" && database[i+1].role === "assistant") {
            organizedDb.push({
                userQuery: database[i].messageContent,
                aiResponse: database[i+1].messageContent,
                userClass: database[i].userClass,
                createdAt: database[i].createdAt,
            });
        } 
        else if (database[i].role === "assistant" && database[i+1].role === "user") {
            organizedDb.push({
                userQuery: database[i+1].messageContent,
                aiResponse: database[i].messageContent,
                userClass: database[i+1].userClass,
                createdAt: database[i+1].createdAt,
            });
        }
    }

    return organizedDb;
}