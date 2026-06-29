Project #5: Kudos Board
Overview
This is your final classroom project — and your first full-stack application built completely from scratch 🥳.

In Kudos Board, users can create themed boards and fill them with cards: messages of praise, encouragement, and appreciation. It's a genuinely useful app to ship, and it's the most architecturally complex thing you've built so far. That complexity is the point.

In the weeks leading up to this project, you've practiced spec-driven development one layer at a time — component specs in Week 3, API contracts and database schemas in Week 4. Here, you'll combine all of those practices into a single specification that governs the entire system before you write a line of code. That spec — your planning.md — is the first deliverable of this project and the foundation everything else builds on.

A simple version of the app with all the required features implemented:

Home PageScreenshot of app with core features implemented

Board PageScreenshot of individual board page with core features implemented

You can also view a deployed version of our example website here.

💡 Read through all the milestones before you start. Later milestones often provide context that affects decisions you make in earlier ones. Skim end-to-end first, then come back to Milestone 0. It's expected — and encouraged — to revisit earlier milestones as your plan evolves.
🎯 Goals
By the end of this project, you will be able to:

Author a full-stack project specification — component architecture, API contracts, database schema spec, and state architecture — before writing any implementation code.
Build a React frontend guided by a written component plan, using Claude and Cursor to scaffold and validate components against the spec.
Design an Express API by implementing written API contracts, then auditing the implementation for code-spec parity.
Define a Prisma schema as a source of truth and implement database operations that match documented field names, types, and relationships.
Connect frontend and backend layers by verifying that HTTP requests and responses match the API contracts you defined.
Demonstrate effective Git collaboration and maintain planning.md alongside the codebase as a version-controlled artifact.
Kudos Board README template
✅ Features
Required Features
Home Page

Home Page Display
Home page includes the following features:
Header
Banner
Search bar
List of boards
Footer
Display Boards
Users can view a list of all boards in a grid view on the home page.
For each board displayed, users can see:
An image/gif
A board title
Filter Boards
Home page includes navigation bar, drop down, or some other mechanism which allows users to filter boards by the following categories:
All/Home (displays all boards)
Recent (displays the 6 most recently created boards)
Celebration
Thank you
Inspiration
When a category is clicked, boards matching the specified category are displayed.
Search Functionality
Users can use a search bar to search for boards by title on the home page.
The search bar should include:
Text input field
Submit/Search Button
Clear Mechanism
Boards with a title containing the search query in the text input field are displayed in a grid view when the user:
Presses the Enter key
Clicks the Submit/Search button
User can delete all text from the text input field.
When all text is cleared from the text input field, all boards are displayed in a grid view
View Board
Users can click on a board in the grid view to navigate to a new page containing that board's details.
Add New Board
Users can create a new board on the home page.
When creating a new board, users can specify the:
Title (required)
Category (required)
Author (optional)
Items listed as required above must have a value to successfully create a new board.
When the board is successfully created, it appears in the grid of boards.
Delete Board
User can delete boards on the home page.
When the board is deleted, the board disappears from the grid of boards.
Board Page

Display Cards
For a given board, the board's page displays a list of all cards for that board in a grid view.
For each card should displayed, users can see the card's:
Message
Gif
Number of upvotes
Delete button
Add New Card
Users can make a new card associated with the current board.
To successfully create a new card, users must specify the following:
Text message (required).
A gif users can search for and select within the form using the GIPHY API (required).
Users are given the option to specify the author of the card.
When the new card is successfully created, it appears in the grid of cards.
Upvote Card
Users can upvote a card.
Update the vote count on the card tile when a user clicks the upvote icon.
When the upvote icon is clicked the upvote count increases by 1.
A user can upvote a card multiple times.
Delete Card
Users can delete cards.
When the user clicks the delete button for a card, the card disappears from the grid of cards.
Stretch Features
If you're up to the challenge of implementing User Authentication, feel free to skip ahead to this bonus lab Adopt-a-Pet Part 5 for guidance!

For each stretch feature you tackle, update your planning.md before implementing — add the new component to the component architecture, add any new endpoints to the API contracts, update the database schema spec if new fields or models are needed, and document any new state variables. Planning before you build will save you significant time debugging.
User Accounts
Users should be able to log in with a username and password.
Users should be able to sign up for a new account.
Boards and cards should be associated with a user.
Anonymous cards or cards by guest users should still be allowed.
Add a new filter option on the home page to display only the current user's boards.
Allow boards to be deleted only if they are owned by the user.
Deployment
Website is deployed via Render.
Comments
Users can add comments to cards.
To successfully add a comment, users must specify a text message body.
Users are given the option to specify the author of the comment.
Users can view comments on card in a pop-up modal that displays the card's:
Text message
Gif
Author (if specified)
A list of the card's comments and each comment's:
Message body
Author (if specified)
Users can add multiple comments to a single card.
Dark Mode
Users can toggle between light mode and dark mode using a button displayed on the:
Home Page
Board Pages
When dark mode is enabled:
Text and icons use a light color
The background uses a dark color
Color contrast has at least a 4.5:1 ratio using this color contrast checker
When light mode is enabled:
Text and icons use a dark color
The background uses a light color
Color contrast has at least a 4.5:1 ratio using this color contrast checker
The chosen mode (light or dark) persists when navigating from home page to board pages and vice versa.
When the user first visits the site the theme defaults to Light Mode.
Pinned Cards
Users can pin a card to the top of the board.
A Pin button is displayed on each card.
When the user clicks the Pin button of an unpinned card:
The card moves to the top of the grid view for that board.
There is some visual feedback to indicate a card's pin status (e.g., a pin icon, a border highlight).
The pin action is saved so that the card remains pinned after page refreshes.
When the user clicks the Pin button of a pinned card:
The card returns to its original position in the grid based on its creation time or to the end of the grid.
The card's pin status (e.g., a pin icon or highlight) is removed.
The unpin action is saved so that the card remains unpinned after page refresh.
Pinned cards always appear at the top of the board, above unpinned cards.
If multiple cards are pinned, they maintain their pinned order based on the time they were pinned.
More recent pins should appear first.
The pinned state of a card persists when:
navigating away from and back to the board.
refreshing the page.
🧑🏽‍💻 Project Instructions
Milestone 0: Project Setup
Goal
Set up your development environment and write your project specification. Your planning.md is the first real deliverable of this project — it defines the system you're building before you build it. Everything in Milestones 1–3 implements against this plan.

Environment Setup
Set up project structure and initialize version control using Git.
Initialize frontend and backend directories.
Open the project in Cursor using cursor ..
Set up development environment including necessary tools and dependencies.
Review the wireframes and required features before writing your spec.
Write Your planning.md
Create a planning.md file in the root of your project repo. This spec has four sections. You've practiced each of these in the labs — here you're combining them into one document that governs the full stack.

Section 1: Component Architecture

Define every React component the app needs. For each component:

Responsibility: What does this component do? (one sentence)
Renders: What HTML elements or child components does it display?
Props: What data does it receive, and from where?
State: Does it manage any state? If so, what?
Interactions: What user actions does it handle?
Also document the parent-child hierarchy — which components render which.

Section 2: API Contracts

Define every endpoint the frontend will consume. For each route:

Method and path (e.g., POST /boards)
Request body — field names, types, required vs. optional
Success response — shape and status code
Error responses — what cases trigger errors and what status codes they return
You should have contracts for boards CRUD, cards CRUD, upvoting, filtering, and search before writing any Express code.

Section 3: Database Schema Spec

Define the Prisma models for Board and Card before touching schema.prisma. For each model:

Field names and data types
Required vs. optional fields
Relationships between models
Any default values or constraints
When you implement schema.prisma in Milestone 2, it should reflect this spec. If you change a field name or type during implementation, update the spec — don't just change the code silently.

Section 4: State Architecture

Define what state the frontend needs to manage. For each state variable:

Data type and initial value
Which component owns it
What user action or event triggers an update
Review Your Spec with Claude
Once your planning.md is drafted, open the Chat panel in Cursor (Ask mode) and share the document using @planning.md. Ask Claude:

"Based on this spec, what's missing? Are there any edge cases in the API contracts I haven't accounted for, any state variables I'll likely need, or any components that seem incomplete?"

Evaluate the response critically — Claude may over-engineer or miss context you have. Your spec is yours to own. Update it based on what you find useful.

Commit Your planning.md
Before writing any implementation code, commit the spec. planning.md is a version-controlled artifact, not a scratchpad. Every meaningful implementation change should be reflected in a spec update — and that update should be committed. The goal at submission is code-spec parity: the spec documents what the system actually does.

📍 Checkpoint
Before moving to Milestone 1, ensure that:

Your repo is initialized with frontend and backend directories committed.
Your planning.md includes all four sections: component architecture, API contracts, database schema spec, and state architecture.
planning.md is committed to your repo.
Milestone 1: Frontend Application
Goal
Build the frontend of your application using your component architecture from planning.md as your guide. You're not working from instructions that tell you what to build — you're implementing against the spec you wrote.

Timeblocking Your Styling Session

We recommend initially spending no more than 1 hour styling your website. While the visuals of your website are important, your primary focus should be on the functionality of your website. Ensure all other requirements are complete before spending additional time on CSS.

Requirements

Dashboard:

Display a home page or dashboard where users can view, create, and delete kudos boards.
On initial page load, the dashboard displays all created kudos boards with relevant details.
The dashboard provides options to filter boards by category: all, recent, celebration, thank you, and inspiration.

Create New Boards:

Provide a form or interface for users to create a new kudos board.
Users must specify a title, category, and image. Author is optional.

View Board Details:

Users can view a specific kudos board's details including all cards associated with that board.
The detailed view includes an interface to add a new card to the board.

Cards:

Users can create new cards on a specific board.
Users must specify a title, description, and gif. Author is optional.
Users can upvote cards.
Users can delete cards.

Real-time Updates:

The UI updates dynamically when boards or cards are created, upvoted, or deleted — no manual refresh required.

Responsive Design:

The frontend works well across desktop, tablet, and mobile screen sizes.
Building Against Your Spec
For each component in your architecture:

Check your spec first. Your planning.md defines the component's responsibility, props, and interactions. That's your implementation guide — not the requirements list above.

Use Claude's Edit mode to scaffold. Review what Claude generates against your spec before accepting — does the JSX structure match? Are the right props being used? Are the interactions implemented correctly?

Keep your spec honest. If you make a meaningful change during implementation (renamed a prop, restructured the hierarchy, added a state variable), update planning.md to match. Code-spec parity applies to your own decisions, not just Claude's output.

If you get blocked on a frontend feature, move on to Milestone 2 and come back. The backend and frontend are largely independent until Milestone 3.
Add to Your Decisions Log in planning.md
After completing the frontend components, add a Decisions Log section to planning.md:

## Decisions Log — Frontend (Milestone 1)
- **Component that diverged most from the original spec**: [e.g., "BoardCard — originally planned as a single component, split into BoardCard + BoardCardActions after seeing how complex the interactions got"]
  **What I changed**: [...]
- **State variable I needed that wasn't in the original spec**: [e.g., "isModalOpen in App — hadn't thought about the create board modal at spec time"]
  **Which component owns it**: [...]
- **Prop that didn't match the API response shape and required adjustment**: [e.g., "board.imageUrl in spec, but backend returns board.image_url — updated state management to normalize on fetch"]
Then commit!s

📍 Checkpoint
Before moving on, ensure that:

You have a working dashboard where users can view and manage kudos boards.
Users can create and delete boards and cards.
Users can view individual kudos boards, including their cards.
The UI updates dynamically without manual refresh.
The frontend is responsive across device sizes.
planning.md reflects your actual implementation (update any sections that changed).
Milestone 2: Backend Application
Goal
Build the Express API and database layer by implementing the API contracts and database schema spec you wrote in Milestone 0.

Backend Configuration
Set up a new Node.js project and initialize with npm init -y.
Install Prisma globally: npm install prisma -g
Install required packages:
npm install express @prisma/client pg
Initialize Prisma: npx prisma init
Define Database Schema
Open schema.prisma and implement the database schema spec from your planning.md. The spec defines your models, fields, types, and relationships — translate that directly into Prisma syntax.

If anything in the spec turns out to be incorrect (a field type needs to change, a relationship needs adjustment), update planning.md first, then update the schema. The spec is your source of truth.

Set up the Express Server
Create index.js and set up your Express server. Your routes will implement the API contracts from planning.md — before you write a handler, re-read the contract for that endpoint. It tells you what the request body looks like, what success response to return, and what error cases to handle.

Implement your Routes
For each route group, the process is the same:

Re-read the API contract in planning.md for this route before implementing.
Use Claude's Edit mode to scaffold the route handler: open index.js in Cursor, use Cmd+K, and reference both @planning.md and @schema.prisma as context. Describe the contract you're implementing.
Audit the generated code against your contract before accepting. Check: Does it validate the required fields from the contract? Does the success response match the documented shape? Does it handle the error cases you defined?
Routes to implement:

CRUD operations for boards
CRUD operations for cards
Route to add cards to a specific board and retrieve cards by board
Error handling on each route
Middleware functions to validate incoming request bodies
Integrate Prisma
Use the Prisma client inside your routes to perform CRUD operations on boards and cards.
Store database connection details in a .env file (DATABASE_URL).
Test your routes using Postman or Insomnia to verify all operations work correctly.
Spec Reconciliation: Backend
Once your routes are implemented, open the Chat panel in Cursor (Ask mode). Share your API contracts (from @planning.md) alongside the relevant route implementations (using @index.js). Ask Claude:

"Does my route implementation match these API contracts? Are there any request fields the contract requires that my routes don't validate, any response shapes that diverge from the spec, or any documented error cases I'm not handling?"

If Claude identifies a gap, decide whether to fix the implementation or update the spec — both are valid if the change is intentional. Then document the results in your spec:

Add a Spec Reconciliation — Backend section to planning.md:
## Spec Reconciliation — Backend (Milestone 2)

### Endpoints verified
- `GET /boards` — [✅ matches spec / ⚠️ gap: ...]
- `POST /boards` — [✅ / ⚠️ gap: ...]
- `DELETE /boards/:id` — [✅ / ⚠️ gap: ...]
- `GET /boards/:id/cards` — [✅ / ⚠️ gap: ...]
- `POST /cards` — [✅ / ⚠️ gap: ...]
- `PATCH /cards/:id/upvote` — [✅ / ⚠️ gap: ...]
- `DELETE /cards/:id` — [✅ / ⚠️ gap: ...]

### Schema verified against spec
- Board model fields match planning.md schema spec: [✅ / ⚠️ field that changed: ...]
- Card model fields match planning.md schema spec: [✅ / ⚠️ field that changed: ...]
- Relationship (Board → Cards) correct: [✅ / ⚠️ ...]

### Gaps found and resolved
- [List any mismatches identified and how you resolved them]

### Intentional spec updates made during backend implementation
- [Any changes made because the spec was wrong or incomplete — document why]
Commit the reconciliation.
📍 Checkpoint
Before moving on, ensure that:

PostgreSQL database configured; Prisma initialized and connected.
schema.prisma reflects your database schema spec from planning.md.
Migrations created and applied.
Express server set up with routes for all board and card operations.
CRUD operations implemented and tested in Postman/Insomnia.
Error handling and request validation implemented.
planning.md updated to reflect any schema or API changes — Spec Reconciliation — Backend section committed.
Milestone 3: Connecting Backend to Frontend
Goal
Connect your frontend and backend using your API contracts as the integration contract. Every fetch call should match a documented endpoint — if it doesn't, the contract needs updating on one side.

Expose Backend API
Ensure your backend server is running and exposing API endpoints for the frontend to interact with.

Enable CORS
If your backend and frontend are on different ports, add CORS middleware to your Express server:

npm install cors
const cors = require('cors');
app.use(cors());
Implement HTTP Requests
In your frontend, use fetch or axios to call your backend endpoints. Before writing each fetch call, check the relevant API contract in planning.md — confirm the route path, HTTP method, request body shape, and expected response structure.

fetch('http://localhost:3000/boards')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Boards:', data);
  })
  .catch(error => {
    console.error('Error fetching boards:', error);
  });
Handle Responses
For each API call, handle the response appropriately: update UI on success, display error messages on failure, and manage loading states where needed.

Final Spec Reconciliation: Full Pipeline
With the frontend and backend connected, do a cross-layer audit — the most architecturally comprehensive check in the entire project. Open the Claude Chat panel and share three things: your API contracts from @planning.md, the relevant Express routes, and the frontend fetch calls. Ask Claude:

"Does my frontend integration match my API contracts? Are there any endpoints my frontend calls that aren't defined in the contracts, any contract fields the frontend isn't sending, or any response fields the frontend is trying to use that the backend isn't returning?"

Then document the results in planning.md and commit before submitting:

Add a Final Spec Reconciliation — Full Pipeline section to planning.md:
## Final Spec Reconciliation — Full Pipeline (Milestone 3)

### Frontend fetch calls verified against API contracts
- `GET /boards` (home page load): [✅ request/response match spec / ⚠️ gap: ...]
- `POST /boards` (create board): [✅ / ⚠️ gap: ...]
- `DELETE /boards/:id`: [✅ / ⚠️ gap: ...]
- `GET /boards/:id/cards`: [✅ / ⚠️ gap: ...]
- `POST /cards`: [✅ / ⚠️ gap: ...]
- `PATCH /cards/:id/upvote`: [✅ / ⚠️ gap: ...]
- `DELETE /cards/:id`: [✅ / ⚠️ gap: ...]

### Integration gaps found and resolved
- [List any mismatches: field names the frontend expected that the backend didn't return, routes called that weren't in the spec, etc.]

### State architecture verified
- State variables in planning.md match actual component implementation: [✅ / ⚠️ differences: ...]

### Final code-spec parity assessment
- Is planning.md an accurate description of the system as built? [✅ Yes / ⚠️ Remaining intentional divergences: ...]
Commit the final reconciliation.
Testing and Debugging
If a fetch call isn't returning what you expect:

Check the Network tab in Chrome DevTools to see the actual request and response.
Compare what you see against the API contract in planning.md.
If the response shape doesn't match the contract, the bug is in one of two places: the route isn't returning what the contract specifies, or the frontend is parsing incorrectly. The contract tells you what's supposed to happen.
📍 Checkpoint
Congratulations! By the end of Milestone 3, you should have a connected frontend and backend with data flowing correctly in both directions.

Make a final pass through your planning.md. Your submitted repo should reflect code-spec parity: the spec documents what the system actually does, not just what you intended to build.

🎉 Stretch Features
Add User Authentication
Users can log in with a username and password.
Users can sign up for a new account.
Boards and cards are associated with a user; anonymous guest cards are still allowed.
New filter option on the home page displays only the current user's boards.
Boards can only be deleted by their owner.
Deployment
Website is deployed via Render. Render Docs for deployment Note: frontend and backend will have to deployed separately on Render.
Comments
Users can add comments to cards with a required text message body and optional author.
Users can view comments in a pop-up modal showing the card's message, gif, author, and all comments.
Users can add multiple comments to a single card.
Dark Mode
Dark/light mode toggle on Home Page and Board Pages.
Mode persists across navigation; defaults to Light Mode on first visit.
Color contrast meets 4.5:1 ratio in both modes (contrast checker).
Pinned Cards
Users can pin/unpin cards; pinned cards appear at the top of the board grid.
Visual feedback indicates a card's pin status.
Pin state is saved and persists across navigation and page refresh.
Multiple pinned cards are ordered by time pinned, most recent first.