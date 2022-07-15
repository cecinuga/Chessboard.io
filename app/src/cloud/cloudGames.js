Moralis.Cloud.define(
    "updateStatusGames", 
    async (req)=>{
        const logger = Moralis.Cloud.getLogger();
        const filter = [
            { filter: { player2:req.params.player2 }, update: { status:'founded' } }
        ]
        const mod = Moralis.bulkUpdate("Games", filter)
        return mod;
    }
)
Moralis.Cloud.define(
    'removeWUser',
    async (req) => {
        const todelete = [
            {filter:{address:req.params.address}}
        ]
        const del = Moralis.bulkDelete('WRoom', todelete);
        return del;
    }
)