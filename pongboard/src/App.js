import React from 'react';
import './App.css';
import Game from './Game';

const AppHeader = () => <h1 className="app-header">Pongboard</h1>;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGame: [
                { id: 1, name: 'Player 1', score: 0 },
                { id: 2, name: 'Player 2', score: 0 }
            ],
            allGames: [],
            viewing: 'All',
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('https://pongboardapi.herokuapp.com/');
            const responseJson = await response.json();

            this.setState({allGames: responseJson});
        } catch (error) {
            console.log(error);
        }
    }

    updateScore(playerId) {
        this.setState((previousState) => {
            const updatedGame = previousState.currentGame.map(player => {
                if (player.id !== playerId) { return player; }
                return {
                    ...player,
                    score: player.score + 1
                }
            });
            return { currentGame: updatedGame };
        })
    }

    showCurrentGame() {
        this.setState({
            viewing: 'Current'
        });
    }

    showAllGame() {
        this.setState({
            viewing: 'All'
        });
    }

    render() {
        let gameView;
        if (this.state.viewing === 'Current') {
            gameView = (
                <Game
                gameData={this.state.currentGame}
                updateScore={playerId => this.updateScore(playerId)}
            />
            );
        } else {
            gameView = this.state.allGames.map(game => (
                <Game
                key={game.id}
                gameData={game.players}
            />     
            ))
        }
        return (
            <div>
                <AppHeader />
                <div className="app-navigation">
                    <button onClick={() => this.showAllGame()}>View Previous Games</button>
                    <button onClick={() => this.showCurrentGame()}>View Current Games</button>
                </div>
                { gameView }
            </div>
        );
    }
}

export default App;