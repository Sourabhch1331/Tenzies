import { useState } from "react"
import Block from "./Block"


export default function Board(){

    // state of Block

    const [blocks,setBlocks]=useState(Fill());

    function Fill(){
        let newBlocks=[];
        for(let i=0;i<10;++i){
            newBlocks.push(
                {
                    num: Math.floor((Math.random()*6)+1),
                    isFrozen: false,
                    idx:i
                }
            )
        }
        return newBlocks;
    }

    function handleClick(Event){
        setBlocks((prevBlocks)=>{
            return prevBlocks.map((currBlock)=>{
                return {
                    ...currBlock,
                    isFrozen:Event.target.className[0]==currBlock.idx ? !currBlock.isFrozen:currBlock.isFrozen
                }
            })
        })
    }

    if(gameWon()){
        console.log('won')
    }

    //Utility Functions

    function gameWon(){
        for(let i=0;i<blocks.length;++i){
            if(!blocks[i].isFrozen || blocks[i].num!=blocks[0].num) return false;
        }
        return true;
    }

    function roll(){
        setBlocks((prevBlocks)=>{
            for(let i=0;i<prevBlocks.length;++i){
                if(!prevBlocks[i].isFrozen){
                    prevBlocks[i].num=Math.floor((Math.random()*6)+1);
                }
            }
            return [...prevBlocks]
        })
    }
    function reset(){
        setBlocks(prevBlocks => Fill()) 
    }

    
    const block=blocks.map((currBlock)=>{
        return(
            <Block
                key={currBlock.idx}
                num={currBlock.num}
                isFrozen={currBlock.isFrozen}
                idx={currBlock.idx}
                handleClick={()=>handleClick}
            />
        )
    })
    return(
        <div className="Board--wrapper">
            <div className="Board--blocks">
                {block}
            </div>
            <button className="Roll--btn" onClick={gameWon() ? reset:roll}>{gameWon() ? "Reset" : "Roll"}</button>
        </div>
    )
}