# 🔥 Matches Game 🔥

A simple Matches Game implemented using React.

## Demo

[DEMO](https://sveta-kryukova.github.io/matches-game/)

## Description

The game starts with 25 matches displayed on the table.
Players take turns removing matches from the table.
Only one player can take a turn at a time: either the player or the AI opponent.
The player always starts the game.
On the player's turn, they can select to remove 1, 2, or 3 matches from the table.
On the AI opponent's turn, the game automatically determines the optimal number of matches to remove.
The game continues until all matches are taken from the table.
After the last match is removed, the winner is determined based on the total number of matches each player took.
If the total number of matches taken is even, the player wins. Otherwise, the AI opponent wins.
Once the game is over, the option to play again is displayed.
The game also provides an instructions modal that explains the rules to the players.
The instructions modal is shown on the first visit to the game and can be dismissed by the player.
The game keeps track of the player's total matches and the AI opponent's total matches throughout multiple game rounds.

## Technologies Used
The Matches Game is built using the following technologies:

🔵 React: The game is developed using React, a popular JavaScript library for building user interfaces. React provides a component-based architecture and allows for efficient rendering and updating of the game's UI.

🔵 TypeScript: TypeScript is used to add static typing to the JavaScript codebase, providing better tooling, error checking, and code maintainability.

🔵 React Modal: The game utilizes the react-modal library to display modals for instructions and game over messages. react-modal provides a simple way to create accessible and customizable modal dialogs.

🔵 CSS: The game's styling is done using CSS. The styles are organized in separate CSS files and imported into the components where they are applied.

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/matches-game.git`
2. Navigate to the project directory: `cd matches-game`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit [link to](http://localhost:5173/) to see the app running.

## Usage

Once the app is running, you can play the Matches Game by taking turns selecting the number of matches to remove from the table. The game will keep track of the number of matches remaining and display the winner once all matches are taken.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

