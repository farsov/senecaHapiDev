const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

module.exports = function () {
    const seneca = this

    seneca.add('role:movies, cmd:getAll', async (payload, reply) => {
        try {
            const moviesRef = await db.collection('movies').get();
            const movies = moviesRef.docs.map(movie => movie.data());
            reply(null, movies);    
        } catch (error) {
            reply(error)
        }  
    });
    
    seneca.add('role:movies, cmd:getByTitle', async (payload, reply) => {
        const { args } = payload;
        const movieDoc = await getMovieByTitle(args.title);
        reply(null, movieDoc.data());
    });
    
    seneca.add('role:movies, cmd:add', async (payload, reply) => {
        const { args } = payload;
        const movieRef = await db.collection('movies').add(args);
        const movieDoc = await db.collection('movies').doc(movieRef.id).get();
        reply(null, {...movieDoc.data(), ...{id: movieRef.id}});
    });
    
    seneca.add('role:movies, cmd:update', async (payload, reply) => {
        const { filter, movie } = payload
        const movieDoc = await getMovieByTitle(filter.title);
        if(movieDoc) {
            await movieDoc.ref.set(movie);
            reply(null, movieDoc.data());
        } else {
            //responde con un mensaje
        }
        //reply(null, movieDoc.data());
    });
    
    seneca.add('role:movies, cmd:patch', async (payload, reply) => {
        const { filter, movie } = payload
        const movieDoc = await getMovieByTitle(filter.title);
        if(movieDoc) {
            //await movieDoc.ref.set(req.body, {merge: true});
            await movieDoc.ref.update(movie);
            reply(null, movieDoc.data());
        } else {
            //responde con un mensaje
        }
    });
    
    seneca.add('role:movies, cmd:delete', async (payload, reply) => {
        const { args } = payload
        const movieDoc = await getMovieByTitle(args.title);
        if(movieDoc) {
            await movieDoc.ref.delete();
            reply(null, movieDoc.data());
        } else {
            //responde con un mensaje
        }
    });
}


async function getMovieByTitle(title) {
    console.log('getMovieByTitle', title);
    const moviesRef = await db.collection('movies').where('title', '==', title).get();
    let movieDoc = null;
    if(!moviesRef.empty) {
        movieDoc = moviesRef.docs[0];
    }
    return movieDoc;
}

