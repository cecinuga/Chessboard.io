Moralis.Cloud.define("updateGames", async (req)=>{
   const filter = [
       { filter: { player1:req.params.player1 }, update: { status:'founded' } }
   ]
   Moralis.bulkUpdate("Games", filter)
   return req
})