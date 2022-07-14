Moralis.Cloud.define(
    "updateGames", 
    async (req)=>{
        const logger = Moralis.Cloud.getLogger();
        const filter = [
            { filter: { player2:req.params.player2 }, update: { status:'founded' } }
        ]
        const mod = Moralis.bulkUpdate("Games", filter)
        return mod;
})