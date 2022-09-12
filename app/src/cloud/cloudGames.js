Moralis.Cloud.define(
    "updateStatusGames", 
    async (req)=>{
        const filter = [
            { filter: { player2:req.params.player2, status:'unfounded', quote:req.params.quote }, update: { status:'founded', player1:req.params.player1, turner:req.params.player1, chessboard:req.params.chessboard } }
        ]
        const mod = Moralis.bulkUpdate("Games", filter)
        return mod;
    }
)
Moralis.Cloud.define(
    "updateGame", 
    async(req)=>{
        const updateGame = [//AGGIORNARE LA FUNZIONE NEL CLOUD
            { filter: { chessboard:req.params.chessboard }, update:{ lastFirstStep:req.params.x, lastSecondStep:req.params.y, turner:req.params.turner, piece:req.params.piece, piece2:req.params.piece2 } }
        ]
        const res = Moralis.bulkUpdate("Games", updateGame);
        return res;
    }
)
