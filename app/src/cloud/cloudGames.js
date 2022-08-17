Moralis.Cloud.define(
    "updateStatusGames", 
    async (req)=>{
        const filter = [
            { filter: { player2:req.params.player2, status:'unfounded' }, update: { status:'founded' } }
        ]
        const mod = Moralis.bulkUpdate("Games", filter)
        return mod;
    }
)
Moralis.Cloud.define(
    "updateTurnerGame", 
    async(req)=>{
        const updateGame = [
            { filter: { chessboard:req.params.chessboard }, update:{ lastFirstStep:req.params.x, lastSecondStep:req.params.y, turner:req.params.turner, piece:req.params.piece } }
        ]
        const res = Moralis.bulkUpdate("Games", updateGame);
        return res;
    }
)
Moralis.Cloud.define(
    "removeWUser",
    async (req) => {
        const todelete = [
            {filter:{address:req.params.address}}
        ]
        const del = Moralis.bulkDelete('WRoom', todelete);
        return del;
    }
)