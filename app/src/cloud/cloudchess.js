Moralis.Cloud.define('updateGame', async(req)=>{
    const updateGame = [
        { filter: { chessboard:req.params.chessboard, turner:req.params.turner} }
    ]
    const res = Moralis.bulkUpdate("Games", updateGame);
    return res
})