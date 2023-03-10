// SPDX-License-Identifier: MIT

/*

    ,·'´¨;.  '                              ,.         ,·´'; '           ,  . .,  °        ,-·-.          ,'´¨;
    ;   ';:\           .·´¨';\         ;'´*´ ,'\       ,'  ';'\°    ;'´    ,   ., _';\'      ';   ';\      ,'´  ,':\'
   ;     ';:'\      .'´     ;:'\        ;    ';::\      ;  ;::'\    \:´¨¯:;'   `;::'\:'\      ;   ';:\   .'   ,'´::'\'
   ;   ,  '·:;  .·´,.´';  ,'::;'       ;      '\;'      ;  ;:::;      \::::;   ,'::_'\;'      '\   ';::;'´  ,'´::::;'
  ;   ;'`.    ¨,.·´::;'  ;:::;       ,'  ,'`\   \      ;  ;:::;          ,'  ,'::;'  ‘          \  '·:'  ,'´:::::;' '
  ;  ';::; \*´\:::::;  ,':::;‘       ;  ;::;'\  '\    ;  ;:::;           ;  ;:::;  °           '·,   ,'::::::;'´
 ';  ,'::;   \::\;:·';  ;:::; '      ;  ;:::;  '\  '\ ,'  ;:::;'           ;  ;::;'  ‘             ,'  /::::::;'  '
 ;  ';::;     '*´  ;',·':::;‘       ,' ,'::;'     '\   ¨ ,'\::;'            ;  ;::;'‚             ,´  ';\::::;'  '
 \´¨\::;          \¨\::::;        ;.'\::;        \`*´\::\; °           ',.'\::;'‚             \`*ª'´\\::/‘
  '\::\;            \:\;·'         \:::\'          '\:::\:' '              \::\:;'‚              '\:::::\';  '
    '´¨               ¨'             \:'             `*´'‚                 \;:'      ‘            `*ª'´‘

                                                                      °                     '
*/
pragma solidity ^0.8.4;

//Basically agreed upon standard defining what functions nft contracts should have
//at the bare minimum
//transferfrom and to are super important, approve allows for nft spending
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//we inherit all the functions from the standard BOOM
contract NFT is ERC721URIStorage {

    //state variable - declared in contract outside of any functions,
    //only functions within contract can modify it
    //they're stored within the blockchain

    // how many tokens, unsigned int [Solidity is a statically typed lang]
    // public to read outside of contract
    // solidity automatically initializes with default value, 0
    uint public tokenCount;

    //called once after contract deployed to blockchain
    // name of nft, symbol of nft
    constructor() ERC721("MusicMinty NFT", "MNTY"){}

    // we accept a string tokenURI (metadata)
    // we also set the memory location to be in memory
    // called from outside, but not from any functions within contract, so external
    function mint(string memory _tokenURI) external returns(uint) {

        //increase token count
        tokenCount ++;

        // mint new nft, comes from inherited conract
        // address we're minting for, id of token (which we can somehow magically pull from tokenCOunt
        _safeMint(msg.sender, tokenCount);

        // Set metadata for new invented nft
        // pass in id, and token URI
        _setTokenURI(tokenCount, _tokenURI);

        //return our tokenCount
        return(tokenCount);
    }
}
