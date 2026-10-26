# ABB Arcade Arena - Tic Tac Toe

## 1. Project Overview
A production-ready, feature-rich Tic Tac Toe web application built with a focus on clean architecture, modularity, and user experience. Designed to demonstrate Senior-level frontend engineering practices, the project enforces strict Separation of Concerns (SoC) by isolating state management, pure business logic, and UI rendering. It supports both Player vs. Player (PvP) and Player vs. Environment (PvE) modes, dynamic rollback policies, and comprehensive session analytics.

## 2. Tech Stack
* **Core:** React.js (Functional Components, Custom Hooks)
* **Styling:** Tailwind CSS (Utility-first CSS for responsive, glass-morphic UI)
* **Testing:** Jest, React Testing Library (RTL)
* **Architecture:** Modular component design, pure utility functions, centralized state management

## 3. Features Implemented
* **Game Modes:** 
  * **vs Computer (PvE):** Features a responsive, 5-tier tactical AI (Win -> Block -> Center -> Corner -> Random).
  * **Two Player (PvP):** Local pass-and-play functionality.
* **Dynamic Undo Policies:**
  * **Option A (Strict):** Locks the board immediately upon a win/draw. Ideal for competitive play.
  * **Option B (Rollback):** Permissive mode allowing users to undo a decisive move, automatically decrementing the scoreboard to maintain data integrity.
* **Match Analytics:** Real-time scoreboard tracking X wins, O wins, and draws, alongside a visual win-ratio progress bar.
* **Move History:** A scrollable log of every move made in the current round, displaying player, row, and column.
* **Keyboard Accessibility:** Fully playable via keyboard (Numbers `1-9` for grid placement, `Z`/`U` for undo, `R` for reset).

## 4. How to Run the Frontend Locally
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## 5. How to Run Tests
The project includes a robust test suite located in the `src/__tests__` directory, covering pure functions, state management hooks, and UI components.

To execute the test suite:
```bash
npm test
```
* **Pure Logic Tests (`utils/gameLogic.test.js`)**
* **State Management Tests (`hooks/useTicTacToe.test.js`)**
* **Component Tests (`components/Board.test.jsx`)**

## 6. AI Tools and Prompt Summary

**Tool Strategy & Workflow:**
This project was developed using a dual-tool AI workflow. I utilized **Stitch** for rapid visual scaffolding to generate the base layout, and **Gemini** as my pair-programmer to engineer the algorithmic logic, extract custom hooks, and generate the testing suite. I manually integrated the dumb UI components with the complex state management to enforce strict Separation of Concerns.

### Prompts Used:

**1. Scaffolding the Design (Tool: Stitch)**
> "Generate a responsive, glass-morphic 3x3 Tic Tac Toe layout using CSS. Include a main game board, a sidebar for move history, and a header for a scoreboard. Provide the pure UI components without state."

**2. Engineering the Algorithmic Logic (Tool: Gemini)**
> "Write a testable, pure JavaScript function for a Tic Tac Toe bot that evaluates a given board state array.strategy: 1) Take winning move, 2) Block opponent win, 3) Take center, 4) Take corner, 5) Random. Ensure the function deeply clones the board array so it does not mutate the original state."

**3. Enforcing Architectural Standards (Tool: Gemini)**
> "Take this stitched UI and extract all state variables, turn-switching logic, and the bot's simulated latency into a custom React hook called `useTicTacToe`. Ensure the components remain 'dumb' and only receive state and handlers as props."

**4. Driving Quality Assurance (Tool: Gemini)**
> "Generate a standard Jest and React Testing Library suite for the `useTicTacToe` hook. Focus purely on testing the state transitions (e.g., verifying that executing a move updates the board array, switches the active player, and pushes the action to the move history log) without relying on the DOM."


## 7. Design Decisions
* **Separation of Concerns (Custom Hook):** All game logic, state management, and lifecycle events were extracted into `useTicTacToe`. 
* **Pure Utility Functions:** `checkBoardWin` and `computeAiMove` do not rely on React state. 
* **Simulated AI Latency:** Added a slight `setTimeout` (300ms) to the AI's turn to prevent jarring UI flashes.

## 8. Clarifications and Assumptions
* **Environment:** It is assumed that Tailwind CSS is globally configured in the project.
* **State Persistence:** Game data only needs to persist for the current active browser session.

## 9. Known Limitations
* **No Backend Integration:** Scores and histories are isolated to the local browser tab.
* **Mobile Grid Scaling:** On exceptionally small viewports, the 3x3 grid relies heavily on CSS scaling.

## 10. Future Improvements
* **Minimax Algorithm:** Add an "Unbeatable" difficulty setting.
* **Persistent Storage:** Integrate `localStorage`.
* **Multiplayer Integration:** Hook up a WebSocket backend for remote PvP.
