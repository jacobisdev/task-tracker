# Task Tracker CLI

A CLI application designed for efficient task management.

> I built this CLI application as part of the Backend developer roadmap from [roadmap.sh](https://roadmap.sh/projects/task-tracker)

## Features

- Add new tasks with  a description
- List all tasks with their current status
- Update existing task descriptions
- Delete completed or unwanted tasks
- Mark tasks as `todo`, `in-progress`, or `done`
- Recover a deleted task


## Prerequisites

- [Node.js](https://nodejs.org/) v24 or higher

## Installation

```bash
# Clone the repository
git clone https://github.com/jacobisdev/task-tracker.git
cd task-tracker

# Install globally (to use the "task" command)
npm install -g .
```

### Run with global installation

```bash
task <command> [options]
```

### Run without global installation

```bash
node src/index.js <command> [options]
```

## Usage

```bash
node src/index.js <command> [options]
```

### Uninstall
```bash
# Uninstall globally this app
npm uninstall -g task-tracker
```

### Commands

| Command | Description |
| ------- | ----------- |
| `add` | Add a new task |
| `list` | List all tasks (optionally filter by status) |
| `update` | Update a task description |
| `mark` | Mark a task as `todo`, `in-progress` or `done` |
| `delete` | Delete a task |

### Examples

Using the global `task` command (after `npm install -g .`):

```bash
# Add a new task
task add "Buy groceries"

# List tasks with todo or in-progress status
task list

# List all tasks
task list all

# List tasks with a specific status
task list todo
task list in-progress
task list done

# List tasks in trash
task list deleted

# Update a task description
task update 1 "Buy groceries and milk"

# Change a task status
task mark 1 todo
task mark 1 in-progress
task mark 1 done

# Delete a task
task delete 1

# Recover a task
task mark 1 todo
```

Alternatively, run without global installation:

```bash
# Add a new task
node src/index.js add "Buy groceries"

# List all tasks
node src/index.js list all

# Mark task as done
node src/index.js mark 1 done

# Delete a task
node src/index.js delete 1
```

### Sample Output

```text
------------------------   Tasks   ------------------------
id Description        Status        Created      Updated
1  Buy groceries      todo          2026-03-12   2026-03-12
2  Clean the yard     in-progress   2026-03-12   2026-03-12
3  Do math homework   todo          2026-03-12   2026-03-13
```

## Data Format

Tasks are stored in JSON format (`src/data.json`):

```json
[
    {
      "id": 1,
      "description": "Buy groceries",
      "status": "todo",
      "createdAt": "2026-03-12",
      "updatedAt": "2026-03-12"
    },
    {
      "id": 2,
      "description": "Clean the yard",
      "status": "in-progress",
      "createdAt": "2026-03-12",
      "updatedAt": "2026-03-12"
    },
    {
      "id": 3,
      "description": "Do math homework",
      "status": "deleted",
      "createdAt": "2026-03-12",
      "updatedAt": "2026-03-13",
      "deletedAt": "2026-03-13"
    },
]
```
