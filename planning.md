## Section 1: Component Architecture 

### App
- Responsibility: Root component that handles routing between home page and individual board pages
- Renders: Header, Router with routes for HomePage and BoardPage
- Props: None (root component)
- State: None (routing handled by React Router)
- Interactions: None directly (delegates to child routes)

### Header
- Responsibility: Displays site title and navigation
- Renders: Site title/logo, navigation links
- Props: None
- State: None
- Interactions: Navigation clicks (handled by React Router Link)

### SearchBar
- Responsibility: Text input for searching boards and clear button
- Renders: Text input field, search button, clear button
- Props: `searchQuery` (string), `onSearchChange` (function), `onClear` (function)
- State: None (controlled by parent)
- Interactions: Text input changes, clear button click

### FilterBar
- Responsibility: Category filter buttons for All, Recent, Celebration, Thank You, Inspiration
- Renders: Button group or dropdown with category options
- Props: `activeFilter` (string), `onFilterChange` (function)
- State: None (controlled by parent)
- Interactions: Category button clicks

### BoardGrid
- Responsibility: Grid container that renders all board cards
- Renders: Grid layout containing BoardCard components
- Props: `boards` (array), `onDeleteBoard` (function)
- State: None
- Interactions: None directly (delegates to BoardCard)

### BoardCard
- Responsibility: Displays a single board with image/gif, title, and delete button
- Renders: Card container with image, title, delete button, link to board page
- Props: `board` (object with id, title, imageUrl, category), `onDelete` (function)
- State: None
- Interactions: Delete button click, click to navigate to board page

### CreateBoardForm
- Responsibility: Form/modal for creating a new board
- Renders: Form inputs (title, category dropdown, author, gif search), submit and cancel buttons
- Props: `onSubmit` (function), `onCancel` (function)
- State: Form field values (title, category, author, imageUrl)
- Interactions: Form input changes, form submission, cancel button click

### BoardPage
- Responsibility: Page for a specific board showing all its cards
- Renders: Board title and details, CardGrid, button to show CreateCardForm
- Props: Board ID from URL params
- State: `cards` (array), `showCreateCardForm` (boolean), `board` (object)
- Interactions: Add Card button click

### CardGrid
- Responsibility: Grid container for all cards on a board
- Renders: Grid layout containing CardTile components
- Props: `cards` (array), `onDeleteCard` (function), `onUpvote` (function)
- State: None
- Interactions: None directly (delegates to CardTile)

### CardTile
- Responsibility: Displays a single card with message, gif, upvote count, and delete button
- Renders: Card container with gif, message, author, upvote button with count, delete button
- Props: `card` (object with id, message, gifUrl, author, upvotes), `onDelete` (function), `onUpvote` (function)
- State: None
- Interactions: Upvote button click, delete button click

### CreateCardForm
- Responsibility: Form for creating a new card on a board
- Renders: Form inputs (message textarea, gif search, author), submit and cancel buttons
- Props: `boardId` (number), `onSubmit` (function), `onCancel` (function)
- State: Form field values (message, gifUrl, author)
- Interactions: Form input changes, form submission, cancel button click

### Component Hierarchy
```
App
├── Header
└── Routes
    ├── HomePage
    │   ├── SearchBar
    │   ├── FilterBar
    │   ├── BoardGrid
    │   │   └── BoardCard (multiple)
    │   └── CreateBoardForm (conditional)
    └── BoardPage
        ├── CardGrid
        │   └── CardTile (multiple)
        └── CreateCardForm (conditional)
```


//////////////////////////////////////////////////////////////////////////////////////////////////
## Section 2: API Contracts

### Boards Endpoints

#### GET /boards
- Purpose: Fetch all boards with optional search and category filter
- Query Parameters:
  - `search` (string, optional) — filters boards by title
  - `category` (string, optional) — filters by category (Celebration, Thank You, Inspiration)
- Request Body: None
- Success Response (200):
  ```json
  [
    {
      "id": 1,
      "title": "Team Wins",
      "category": "Celebration",
      "author": "John Doe",
      "imageUrl": "https://media.giphy.com/...",
      "createdAt": "2026-06-29T10:00:00Z"
    }
  ]
  ```
- Error Responses:
  - 500 — Server error

#### GET /boards/:id/
- Purpose: Fetch a specific board with optional search and category filter
- Request Body: None
- Success Response (200):
  ```json
  [
    {
      "id": 1,
      "title": "Team Wins",
      "category": "Celebration",
      "author": "John Doe",
      "imageUrl": "https://media.giphy.com/...",
      "createdAt": "2026-06-29T10:00:00Z"
    }
  ]
  ```
- Error Responses:
  - 500 — Server error



#### POST /boards
- Purpose: Create a new board
- Request Body:
  ```json
  {
    "title": "Team Wins",         // required, string
    "category": "Celebration",    // required, string (enum: Celebration, Thank You, Inspiration)
    "author": "John Doe",         // optional, string
    "imageUrl": "https://..."     // optional, string (URL)
  }
  ```
- Success Response (201):
  ```json
  {
    "id": 1,
    "title": "Team Wins",
    "category": "Celebration",
    "author": "John Doe",
    "imageUrl": "https://media.giphy.com/...",
    "createdAt": "2026-06-29T10:00:00Z"
  }
  ```
- Error Responses:
  - 400 — Missing required fields (title, category) or invalid category value
  - 500 — Server error

#### DELETE /boards/:id
- Purpose: Delete a board
- URL Parameters: `id` (number) — board ID
- Request Body: None
- Success Response (200):
  ```json
  {
    "message": "Board deleted successfully"
  }
  ```
- Error Responses:
  - 404 — Board not found
  - 500 — Server error

### Cards Endpoints

#### GET /boards/:id/cards
- Purpose: Fetch all cards for a specific board
- URL Parameters: `id` (number) — board ID
- Request Body: None
- Success Response (200):
  ```json
  [
    {
      "id": 1,
      "message": "Great job on the presentation!",
      "gifUrl": "https://media.giphy.com/...",
      "author": "Jane Smith",
      "upvotes": 5,
      "createdAt": "2026-06-29T10:30:00Z",
      "boardId": 1
    }
  ]
  ```
- Error Responses:
  - 404 — Board not found
  - 500 — Server error

#### POST /boards/:id/cards
- Purpose: Create a new card on a board
- URL Parameters: `id` (number) — board ID
- Request Body:
  ```json
  {
    "message": "Great job!",       // required, string
    "gifUrl": "https://...",       // required, string (URL)
    "author": "Jane Smith"         // optional, string
  }
  ```
- Success Response (201):
  ```json
  {
    "id": 1,
    "message": "Great job!",
    "gifUrl": "https://media.giphy.com/...",
    "author": "Jane Smith",
    "upvotes": 0,
    "createdAt": "2026-06-29T10:30:00Z",
    "boardId": 1
  }
  ```
- Error Responses:
  - 400 — Missing required fields (message, gifUrl)
  - 404 — Board not found
  - 500 — Server error

#### DELETE /cards/:id
- Purpose: Delete a card
- URL Parameters: `id` (number) — card ID
- Request Body: None
- Success Response (200):
  ```json
  {
    "message": "Card deleted successfully"
  }
  ```
- Error Responses:
  - 404 — Card not found
  - 500 — Server error

#### PUT /cards/:id/upvote
- Purpose: Increment a card's upvote count
- URL Parameters: `id` (number) — card ID
- Request Body: None
- Success Response (200):
  ```json
  {
    "id": 1,
    "message": "Great job!",
    "gifUrl": "https://media.giphy.com/...",
    "author": "Jane Smith",
    "upvotes": 6,
    "createdAt": "2026-06-29T10:30:00Z",
    "boardId": 1
  }
  ```
- Error Responses:
  - 404 — Card not found
  - 500 — Server error




//////////////////////////////////////////////////////////////////////////////////////////////////

## Section 3: Database Schema Spec

### Board Model
```prisma
model Board {
  id        Int      @id @default(autoincrement())
  title     String   // required
  category  String   // required, enum: "Celebration", "Thank You", "Inspiration"
  author    String?  // optional
  imageUrl  String?  // optional, stores gif/image URL
  createdAt DateTime @default(now())
  cards     Card[]   // one-to-many relationship
}
```

Fields:
- `id`: Unique identifier, auto-generated integer
- `title`: String, required — the board's title
- `category`: String, required — must be one of: "Celebration", "Thank You", "Inspiration"
- `author`: String, optional — creator's name
- `imageUrl`: String, optional — URL of the gif/image displayed on the board card
- `createdAt`: DateTime, auto-generated timestamp
- `cards`: Relation to Card model (one board has many cards)

### Card Model
```prisma
model Card {
  id        Int      @id @default(autoincrement())
  message   String   // required
  gifUrl    String   // required, stores gif URL
  author    String?  // optional
  upvotes   Int      @default(0)
  createdAt DateTime @default(now())
  boardId   Int      // foreign key
  board     Board    @relation(fields: [boardId], references: [id], onDelete: Cascade)
}
```

Fields:
- `id`: Unique identifier, auto-generated integer
- `message`: String, required — the kudos message text
- `gifUrl`: String, required — URL of the gif displayed on the card
- `author`: String, optional — creator's name
- `upvotes`: Integer, default 0 — count of upvotes received
- `createdAt`: DateTime, auto-generated timestamp
- `boardId`: Integer, foreign key linking to Board
- `board`: Relation to Board model (many cards belong to one board)

Relationships:
- A Board has many Cards (one-to-many)
- A Card belongs to one Board (many-to-one)
- Deleting a Board cascades to delete all its Cards

Constraints:
- Board.category should be validated to only accept: "Celebration", "Thank You", "Inspiration"
- Card.upvotes must be non-negative (enforced at application level)



//////////////////////////////////////////////////////////////////////////////////////////////////

## Section 4: State Architecture

### HomePage State

#### boards
- Type: Array of board objects
- Initial Value: `[]` (empty array)
- Owner: HomePage component
- Update Triggers:
  - On component mount (fetch from GET /boards)
  - After creating a new board (add to array)
  - After deleting a board (remove from array)
  - When search query or filter changes (re-fetch from API)

#### searchQuery
- Type: String
- Initial Value: `""` (empty string)
- Owner: HomePage component
- Update Triggers:
  - User types in SearchBar input
  - User clicks clear button (reset to empty string)

#### activeFilter
- Type: String
- Initial Value: `"All"`
- Owner: HomePage component
- Update Triggers:
  - User clicks a category button in FilterBar
  - Options: "All", "Recent", "Celebration", "Thank You", "Inspiration"

#### showCreateBoardForm
- Type: Boolean
- Initial Value: `false`
- Owner: HomePage component
- Update Triggers:
  - User clicks "Create Board" button (set to true)
  - User submits the form or clicks cancel (set to false)

### BoardPage State

#### board
- Type: Board object or null
- Initial Value: `null`
- Owner: BoardPage component
- Update Triggers:
  - On component mount (fetch specific board details if needed)
  - Derived from URL params (board ID)

#### cards
- Type: Array of card objects
- Initial Value: `[]` (empty array)
- Owner: BoardPage component
- Update Triggers:
  - On component mount (fetch from GET /boards/:id/cards)
  - After creating a new card (add to array)
  - After deleting a card (remove from array)
  - After upvoting a card (update upvote count for that card)

#### showCreateCardForm
- Type: Boolean
- Initial Value: `false`
- Owner: BoardPage component
- Update Triggers:
  - User clicks "Add Card" button (set to true)
  - User submits the form or clicks cancel (set to false)

### Form Component State

#### CreateBoardForm Internal State
- title: String, initial value `""`
- category: String, initial value `"Celebration"`
- author: String, initial value `""`
- imageUrl: String, initial value `""`
- Update Triggers: User input in form fields

#### CreateCardForm Internal State
- message: String, initial value `""`
- gifUrl: String, initial value `""`
- author: String, initial value `""`
- Update Triggers: User input in form fields

### State Flow Summary
1. HomePage manages: boards list, search/filter state, create board modal visibility
2. BoardPage manages: cards list for current board, create card modal visibility
3. Form components manage: their own input field values (controlled components)
4. Data flows down via props, changes flow up via callback functions
5. API calls triggered by user actions update state, causing re-renders




//////////////////////////////////////////////////////////////////////////////////////////////////

Decision Log

Milestone 1
