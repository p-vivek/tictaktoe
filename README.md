# ABB Arcade Arena - Advanced Tic Tac Toe

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
During development, AI assistance was utilized primarily for architectural refactoring and boilerplate generation.
* **Prompting Strategy:** Provided an initial monolithic React component and prompted the AI to refactor it utilizing Separation of Concerns. Subsequent prompts requested the removal of experimental features (audio) and the structuring of a production-grade testing directory.

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
