const SOLSMarketplace = artifacts.require('./SOLSMarketplace.sol') ;
const Legendary = artifacts.require('./Legendary.sol') ;
const Rare = artifacts.require('./Rare.sol') ;
const SOLSNFT = artifacts.require('./SOLSNFT.sol') ;
const SOLSTOKEN = artifacts.require('./SOLSTOKEN.sol') ;
const Bid = artifacts.require('./Bid.sol') ;

const truffleAssert = require('truffle-assertions') ;
const ethers = require('ethers') ;
const { assert } = require('chai');

require('chai')
    .use(require('chai-as-promised'))
    .should() ;

contract('SOLSMarketplace Contract', async (accounts) => {
    let solsMarketplace ;

    let solsNFT ;
    let solsToken ;
    let legenContract ;
    let rareContract ;
    let bidContract ;

    before(async () => {
        solsNFT = await SOLSNFT.deployed() ;
        solsToken = await SOLSTOKEN.deployed() ;
        legenContract = await Legendary.deployed() ;
        rareContract = await Rare.deployed() ;
        bidContract = await Bid.deployed() ;

        solsMarketplace = await SOLSMarketplace.deployed([
            solsToken.address,
            legenContract.address, 
            rareContract.address, 
            bidContract.address, 
            solsNFT.address
        ]);
    });

    // it("setSolsMarketplaceToLegen: don't attemp to change marketplace address", async () => {
    //     await truffleAssert.reverts(
    //         legenContract.setSolsMarketplaceToLegen("0x61779B8ea6Bc6DA179D5b75554Cd2eeDd775A605"),
    //         "setSolsMarketplaceToLegen: don't attemp to change marketplace address"
    //     );
    // }) ;

    // it("isCalledMarketplace: you can't call this function", async () => {
    //     let attacker = "0x61779B8ea6Bc6DA179D5b75554Cd2eeDd775A605" ;

    //     let minimum_bidding = ethers.utils.parseUnits('10.99', 'ether') ;
    //     let item_available = 10 ;
    //     let royalty = ethers.utils.parseUnits('12.35', 'ether') ;

    //     await truffleAssert.reverts(
    //         await rareContract.insertRare(0 , minimum_bidding, item_available, royalty, attacker, false ),
    //         "isCalledMarketplace: you can't call this"
    //     ) ;
    // }) ;

    it('Legendary' , async() => {
        // return;
        let creator = '0xAB3bf7bC138746683311CA350E86E6D37360325b';
        let reseller = '0x565009C96113BAA7620f59D5f190Aa9e6fb24Ec3' ;
        // let buyer = "0x460159E46A59669CBB4a2A314329bF9b73592Dd2" ;
        // let attacker = "0x64a812c6e2614283218fB123B34849fae41740b4" ;

        let product_price = ethers.utils.parseUnits('10', 'ether') ;
        let product_unit = 0;
        let ticket_price = ethers.utils.parseUnits('20', 'ether') ;
        let ticket_unit = 0;
        let ticket_available = 10 ;
        let royalty = ethers.utils.parseUnits('12.35', 'ether') ;

        await solsMarketplace.mintLegendary(
            0, 
            {
                product_price : product_price,
                product_unit : product_unit, 
                ticket_price : ticket_price,
                ticket_unit : ticket_unit,
                ticket_available : ticket_available,
                royalty : royalty,
            },
            "Video sols 4", 
            "I have some videos.", 
            "jlKTUdShKaPix0vK3RYP", 
            {from : creator}
        ) ;

        // await solsMarketplace.mintLegendary(
        //     0, 
        //     product_price, 
        //     ticket_price,
        //     ticket_available,
        //     royalty,
        //     "NFTs sols 4", 
        //     "I have some NFTs.", 
        //     "jlKTUdShKaPix0vK3RYP", 
        //     {from : creator}
        // ) ;

        // balanceOf = await solsNFT.balanceOf(creator, 0) ;
        // console.log("Creator NFTs: ", balanceOf.toString(), "\n") ;
        // assert.equal(await balanceOf.toString(), '10');

        let legendary = await legenContract.fetchLegen(0) ;

        legendary = {
            product_price : ethers.utils.formatUnits(legendary.product_price.toString(), 'ether') ,
            product_unit : product_unit.toString(),
            ticket_price : ethers.utils.formatUnits(legendary.ticket_price.toString(), 'ether'),
            ticket_unit : legendary.ticket_unit.toString() ,
            ticket_available : legendary.ticket_available,
            royalty : ethers.utils.formatUnits(legendary.royalty.toString(), 'ether'),
            creator : legendary.creator,
            sold : legendary.sold
        }

        console.log("---------- Legendary (NFT ID 0) ------------- \n", legendary) ;

        let isBuyer = await legenContract.checkBuyer(0 , reseller) ;

        console.log("&&&&&&&&&&&&&&", isBuyer) ;

        // legendary = await legenContract.fetchLegen(1) ;

        // legendary = {
        //     product_price : ethers.utils.formatUnits(legendary.product_price.toString(), 'ether') ,
        //     ticket_price : ethers.utils.formatUnits(legendary.ticket_price.toString(), 'ether'),
        //     ticket_available : legendary.ticket_available,
        //     royalty : ethers.utils.formatUnits(legendary.royalty.toString(), 'ether'),
        // }

        // console.log("---------- Legendary (NFT ID 1) ------------- \n", legendary) ;

        // let msgValue = ethers.utils.parseEther('0.5') ;
        // let balance = await solsToken.balanceOf(reseller) ;
        // console.log(ethers.utils.formatUnits(balance.toString(), 'ether')) ;

        // await solsToken.approve(solsMarketplace.address, ethers.utils.parseUnits('20').toString() ,{from : reseller});
        // await solsMarketplace.buyLegendaryAsNFT(0, {from : reseller}) ;

        // balance = await solsToken.balanceOf(reseller) ;
        // console.log(ethers.utils.formatUnits(balance.toString(), 'ether')) ;
        // balance = await solsToken.balanceOf(creator) ;
        // console.log(ethers.utils.formatUnits(balance.toString(), 'ether')) ;
        // balanceOf =  await solsNFT.balanceOf(creator, 0) ;
        // console.log("Creator #0 NFTs After Sold to Reseller:" , balanceOf.toString()) ;

        // balanceOf =  await solsNFT.balanceOf(reseller, 0) ;
        // console.log("Reseller #0 NFTs:", balanceOf.toString()) ;
        // console.log("\n");

        // truffleAssert.reverts(
        //     await solsMarketplace.buyLegendary(0, reseller, 4, {from : creator, value : msgValue.toString()}) ,
        //     "buyLegendary: you already bought this nft"
        // )

        // balanceOf =  await solsNFT.balanceOf(creator, 0) ;
        // console.log("Creator #0 NFTs After Sold to Reseller:" , balanceOf.toString()) ;

        // balanceOf =  await solsNFT.balanceOf(reseller, 0) ;
        // console.log("Reseller #0 NFTs After Sold to Creator:", balanceOf.toString()) ;
        // console.log("\n");


        // let creator_nfts = await solsMarketplace.fetchNFTsByOwner(creator) ;

        // creator_nfts = await Promise.all(
        //     creator_nfts.map(async nft => {

        //         let item = {
        //             nft_id : Number(nft.nft_id.toString()),
        //             product_id : Number(nft.product_id.toString()),
        //             price_id : Number(nft.price_id.toString()),
        //             name : nft.name,
        //             description :  nft.description,
        //             uri : nft.uri,
        //             owners : nft.owners
        //         }

        //         return item ;
        //     })
        // );

        // console.log("---------- Creator's NFTs ------------- \n", creator_nfts) ; 


        // let reseller_nfts  = await solsMarketplace.fetchNFTsByOwner(reseller) ;

        // reseller_nfts = await Promise.all(
        //     reseller_nfts.map(async nft => {

        //         let item = {
        //             nft_id : Number(nft.nft_id.toString()),
        //             product_id : Number(nft.product_id.toString()),
        //             price_id : Number(nft.price_id.toString()),
        //             name : nft.name,
        //             description :  nft.description,
        //             uri : nft.uri,
        //             owners : nft.owners
        //         }

        //         return item ;
        //     })
        // );

        // console.log("---------- Reseller's NFTs ------------- \n", reseller_nfts) ; 
    }) ;

    // it('Rare' , async() => {
    //     return ;
    //     let bid_status = ["pending", "accepted", "denied"] ;

    //     let creator = '0xDeBF2B1f9E2907005Fe6E6d4F55dd7Da756616ab';
    //     let buyer_1 = '0x1bfAb103caB9369d7C819bD671d73601B2965512' ;
    //     let buyer_2 = '0x460159E46A59669CBB4a2A314329bF9b73592Dd2' ;
    //     let buyer_3 = '0x64a812c6e2614283218fB123B34849fae41740b4' ;

    //     let minimum_bidding = ethers.utils.parseUnits('20.12', 'ether') ;
    //     let item_available = 15 ;
    //     let royalty = ethers.utils.parseUnits('13.21', 'ether') ;

    //     await solsMarketplace.mintRare(
    //         0, 
    //         minimum_bidding, 
    //         item_available,
    //         royalty,
    //         "Video sols 4", 
    //         "I have some videos.", 
    //         "jlKTUdShKaPix0vK3RYP", 
    //         {from : creator}
    //     ) ;

    //     await solsMarketplace.mintRare(
    //         0, 
    //         minimum_bidding, 
    //         item_available,
    //         royalty,
    //         "NFTs sols 4", 
    //         "I have some NFTs.", 
    //         "jlKTUdShKaPix0vK3RYP", 
    //         {from : creator}
    //     ) ;

    //     balanceOf = await solsNFT._balanceOf(creator, 0) ;
    //     console.log("Creator NFTs: ", balanceOf.toString(), "\n") ;
    //     assert.equal(balanceOf.toString() , "15") ;

    //     let rare = await rareContract.fetchRare(0) ;

    //     rare = {
    //         minimum_bidding : ethers.utils.formatUnits(rare.minimum_bidding.toString(), 'ether') ,
    //         item_available : rare.item_available,
    //         royalty : ethers.utils.formatUnits(rare.royalty.toString(), 'ether'),
    //     }

    //     console.log("---------- Rare (NFT ID 0) ------------- \n", rare) ;

    //     rare = await rareContract.fetchRare(1) ;

    //     rare = {
    //         minimum_bidding : ethers.utils.formatUnits(rare.minimum_bidding.toString(), 'ether') ,
    //         item_available : rare.item_available,
    //         royalty : ethers.utils.formatUnits(rare.royalty.toString(), 'ether'),
    //     }

    //     console.log("---------- Rare (NFT ID 1) ------------- \n", rare) ;

    //     let bid_price = ethers.utils.parseUnits('20.14', 'ether') ;
    //     let bid_amount = 10 ;

    //     await solsMarketplace.placeBid(0, bid_amount, bid_price, {from : buyer_1}) ;

    //     bid_price = ethers.utils.parseUnits('20.35', 'ether') ;
    //     bid_amount = 15 ;

    //     await solsMarketplace.placeBid(0, bid_amount, bid_price, {from : buyer_2}) ;

    //     let _bidsOfCreator = await bidContract.fetchBidsByOwner(creator) ;

    //     _bidsOfCreator = await Promise.all(
    //         _bidsOfCreator.map(async bid => {
    //             let item = {
    //                 bid_id : Number(bid.bid_id.toString()),
    //                 nft_id : Number(bid.nft_id.toString()),
    //                 from : bid.from ,
    //                 to : bid.to,
    //                 amount : Number(bid.amount.toString()),
    //                 price : Number(ethers.utils.formatUnits(bid.price.toString(), 'ether')),
    //                 placed_at : new Date(Number(bid.placed_at)).toLocaleDateString(),
    //                 checked_at : new Date(Number(bid.checked_at)).toLocaleDateString(),
    //                 status : bid_status[Number(bid.status.toString())]
    //             }

    //             return item ;
    //         })
    //     );

    //     console.log("-------- Bids to Creator -----------", _bidsOfCreator) ;

    //     let _ordersOfBuyer_1 = await bidContract.fetchOrdersByBidder(buyer_1) ;

    //     _ordersOfBuyer_1 = await Promise.all(
    //         _ordersOfBuyer_1.map(async bid => {
    //             let item = {
    //                 bid_id : Number(bid.bid_id.toString()),
    //                 nft_id : Number(bid.nft_id.toString()),
    //                 from :bid.from,
    //                 to : bid.to,
    //                 amount : Number(bid.amount.toString()),
    //                 price : Number(ethers.utils.formatUnits(bid.price.toString(), 'ether')),
    //                 placed_at : new Date(Number(bid.placed_at)).toLocaleDateString(),
    //                 checked_at : new Date(Number(bid.checked_at)).toLocaleDateString(),
    //                 status : bid_status[Number(bid.status.toString())]
    //             }

    //             return item ;
    //         })
    //     );

    //     console.log("-------- Buyer1 Orders -----------", _ordersOfBuyer_1) ;

    //     await solsMarketplace.acceptBid(0, {from : creator}) ;

    //     balanceOf = await solsNFT._balanceOf(creator, 0) ;
    //     console.log("Creator #0 NFTs After Accept Bid: ", balanceOf.toString()) ;

    //     balanceOf = await solsNFT._balanceOf(buyer_2, 0) ;
    //     console.log("Buyer 2 #0 NFTs After Accept Bid: ", balanceOf.toString()) ;
    //     console.log("\n") ;

    //     _bidsOfCreator = await bidContract.fetchBidsByOwner(creator) ;

    //     _bidsOfCreator = await Promise.all(
    //         _bidsOfCreator.map(async bid => {
    //             let item = {
    //                 bid_id : Number(bid.bid_id.toString()),
    //                 nft_id : Number(bid.nft_id.toString()),
    //                 to : bid.to,
    //                 amount : Number(bid.amount.toString()),
    //                 price : Number(ethers.utils.formatUnits(bid.price.toString(), 'ether')),
    //                 placed_at : new Date(Number(bid.placed_at)).toLocaleDateString(),
    //                 checked_at : new Date(Number(bid.checked_at)).toLocaleDateString(),
    //                 status : bid_status[Number(bid.status.toString())]
    //             }

    //             return item ;
    //         })
    //     );

    //     console.log("-------- Bids to Creator After Accept #1 Bid -----------", _bidsOfCreator) ;

    //     _ordersOfBuyer_1 = await bidContract.fetchOrdersByBidder(buyer_1) ;

    //     _ordersOfBuyer_1 = await Promise.all(
    //         _ordersOfBuyer_1.map(async bid => {
    //             let item = {
    //                 bid_id : Number(bid.bid_id.toString()),
    //                 nft_id : Number(bid.nft_id.toString()),
    //                 from :bid.from,
    //                 to : bid.to,
    //                 amount : Number(bid.amount.toString()),
    //                 price : Number(ethers.utils.formatUnits(bid.price.toString(), 'ether')),
    //                 placed_at : new Date(Number(bid.placed_at)).toLocaleDateString(),
    //                 checked_at : new Date(Number(bid.checked_at)).toLocaleDateString(),
    //                 status : bid_status[Number(bid.status.toString())]
    //             }

    //             return item ;
    //         })
    //     );

    //     console.log("-------- Buyer1 Orders After Accept #0 Bid -----------", _ordersOfBuyer_1) ;

    //     // let msgValue = ethers.utils.parseEther('0.1') ;
    //     // await solsMarketplace.placeBid(0 , creator, {from : reseller, value : msgValue.toString()}) ;
        
    //     // balanceOf = await solsMarketplace._balanceOf(0,  {from : creator}) ;
    //     // console.log("Creator #0 NFTs After Resell:" , balanceOf.toString()) ;

    //     // balanceOf = await solsMarketplace._balanceOf(0,  {from : reseller}) ;
    //     // console.log("Reseller #0 NFTs:", balanceOf.toString()) ;

    //     // msgValue = ethers.utils.parseEther('0.1') ;
    //     // await solsMarketplace.buyLegendary(0 , reseller, {from : buyer, value : msgValue.toString()}) ;

    //     // balanceOf = await solsMarketplace._balanceOf(0,  {from : reseller}) ;
    //     // console.log("Reseller #0 NFTs:", balanceOf.toString()) ;

    //     // balanceOf = await solsMarketplace._balanceOf(0,  {from : buyer}) ;
    //     // console.log("Buyer #0 NFTs:", balanceOf.toString()) ;

    //     // // await solsMarketplace.buyLegendary(0, reseller, {from : creator, value : msgValue}) ;

    //     // let creator_nfts = await solsMarketplace.fetchNFTsByOwner(creator) ;

    //     // creator_nfts = await Promise.all(
    //     //     creator_nfts.map(async nft => {

    //     //         let item = {
    //     //             nft_id : Number(nft.nft_id.toString()),
    //     //             product_id : Number(nft.product_id.toString()),
    //     //             price_id : Number(ethers.utils.formatUnits(nft.price_id.toString(), 'ether')),
    //     //             name : nft.name,
    //     //             description :  nft.description,
    //     //             uri : nft.uri,
    //     //             owners : nft.owners
    //     //         }

    //     //         return item ;
    //     //     })
    //     // );

    //     // console.log("---------- Creator's NFTs ------------- \n", creator_nfts) ; 


    //     // let reseller_nfts  = await solsMarketplace.fetchNFTsByOwner(reseller) ;

    //     // reseller_nfts = await Promise.all(
    //     //     reseller_nfts.map(async nft => {

    //     //         let item = {
    //     //             nft_id : Number(nft.nft_id.toString()),
    //     //             product_id : Number(nft.product_id.toString()),
    //     //             price_id : Number(ethers.utils.formatUnits(nft.price_id.toString(), 'ether')),
    //     //             name : nft.name,
    //     //             description :  nft.description,
    //     //             uri : nft.uri,
    //     //             owners : nft.owners
    //     //         }

    //     //         return item ;
    //     //     })
    //     // );

    //     // console.log("---------- Reseller's NFTs ------------- \n", reseller_nfts) ; 

    //     // let buyer_nfts  = await solsMarketplace.fetchNFTsByOwner(reseller) ;

    //     // buyer_nfts = await Promise.all(
    //     //     buyer_nfts.map(async nft => {

    //     //         let item = {
    //     //             nft_id : Number(nft.nft_id.toString()),
    //     //             product_id : Number(nft.product_id.toString()),
    //     //             price_id : Number(ethers.utils.formatUnits(nft.price_id.toString(), 'ether')),
    //     //             name : nft.name,
    //     //             description :  nft.description,
    //     //             uri : nft.uri,
    //     //             owners : nft.owners
    //     //         }

    //     //         return item ;
    //     //     })
    //     // );

    //     // console.log("---------- Buyer's NFTs ------------- \n", buyer_nfts) ; 

    // }) ;
});
