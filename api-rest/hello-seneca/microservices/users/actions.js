const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

module.exports = function () {
    const seneca = this 

    seneca.add('role:users, cmd:getAll', async (payload, reply) => {
        try {
            const usersRef = await db.collection('users').get();
            const users = usersRef.docs.map(user => user.data());
            reply(null, users);    
        } catch (error) {
            reply(error)
        }  
    });

    seneca.add('role:users, cmd:getByName', async (payload, reply) => {
        const { args } = payload;
        const userDoc = await getUserByName(args.name);
        reply(null, userDoc.data());
    });

    seneca.add('role:users, cmd:addUser', async (payload, reply) => {
        const { args } = payload;
        const userRef = await db.collection('users').add(args);
        const userDoc = await db.collection('users').doc(userRef.id).get();
        reply(null, {...userDoc.data(), ...{id: userRef.id}});
    });

    seneca.add('role:users, cmd:update', async (payload, reply) => {
        const { filter, user } = payload
        const userDoc = await getUserByName(filter.name);
        if(userDoc) {
            await userDoc.ref.set(user);
            reply(null, userDoc.data());
        } else {
            //responde con un mensaje
        }
        //reply(null,userDoc.data());
    });

    seneca.add('role:users, cmd:patch', async (payload, reply) => {
        const { filter, user } = payload
        const userDoc = await getUserByName(filter.name);
        if(userDoc) {
            //await userDoc.ref.set(req.body, {merge: true});
            await userDoc.ref.update(user);
            reply(null, userDoc.data());
        } else {
            //responde con un mensaje
        }
        //reply(null,userDoc.data());
    });

    seneca.add('role:users, cmd:delete', async (payload, reply) => {
        const { args } = payload
        const userDoc = await getUserByName(args.name);
        if(userDoc) {
            await userDoc.ref.delete();
            reply(null, userDoc.data());
        } else {
            //responde con un mensaje
        }
    });

    seneca.add('role:users, cmd:auth', async (payload, reply) => {
        try {
            const { args } = payload;
            const userDoc = await getUserByName(args.username);
            if(userDoc) {
                const user = userDoc.data();
                if(user.password === args.password) {
                    return reply(null, user);
                } else {
                    return reply(new Error('Invalid user'));
                }
            }
        } catch(error) {
            reply(error);
        }
    });
}

async function getUserByName(name) {
    console.log('getUserByName', name);
    const usersRef = await db.collection('users').where('username', '==', name).get();
    let userDoc = null;
    if(!usersRef.empty) {
        userDoc = usersRef.docs[0];
    }
    return userDoc;
}