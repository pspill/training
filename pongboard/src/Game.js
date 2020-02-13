import React from 'react';
import Player from './Player';

const Game = props => {
    let playerListItems;
    if (props.updateScore) {
        playerListItems = props.gameData.map(player => (
            <Player
                key={player.id}
                player={player}
                updateScore={() => props.updateScore(player.id)}
            />
        ));
    } else {
        playerListItems = props.gameData.map(player => (
            <Player
                key={player.id}
                player={player}

            />
        ));
    }

    return (
        <ul>
            {playerListItems}
        </ul>
    );
}

export default Game;