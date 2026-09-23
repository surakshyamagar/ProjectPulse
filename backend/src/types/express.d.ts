// Normally Express le: req.body, req.param, req.cookies thaxa
// but req.user :Express ko default Request ma hudaina.
// so we added ourself by thios code

// tells typescipt: im adding info in global level
declare global {
    // we say: Express ko type bhitra maile kehi add garnu cha
    namespace Express {
        // we add: Express ko Request ma mero custom property.
        // req.user: custom property
        interface Request {
            user?: {
                userId: number;
                name: string;
            };
        }
    }
}

// Yo le file lai TypeScript module banaidincha.
export {};