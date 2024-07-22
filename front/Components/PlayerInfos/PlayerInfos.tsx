import React from 'react'
import classes from "./playerInfos.module.css"

interface Infos{
    name:string;
    wins:number;
    losses:number;
    rank:number;

}

const data : Infos = {
    name:"ismail",
    wins:18,
    losses:15,
    rank:4
}

const PlayerInfos = () => {
  return (
    <div className={classes.playerinfos}>
    <div className={classes.info}>
        <h2>Name:</h2>
        <h2>{data.name}</h2>
    </div>
    <div className={classes.info}>
        <h2>Wins:</h2>
        <h2>{data.wins}</h2>
    </div>
    <div className={classes.info}>
        <h2>Losses:</h2>
        <h2>{data.losses}</h2>
    </div>
    <div className={classes.info}>
        <h2>Rank:</h2>
        <h2>{data.rank}</h2>
    </div>
    </div>
  )
}

export default PlayerInfos