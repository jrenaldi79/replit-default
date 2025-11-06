# Sample Markdown with Mermaid

This is a test markdown file with a Mermaid diagram.

## Project Flow

```mermaid
graph TD
    A["Start: Project Idea"] --> B{"Optional: Analyst Research"}
    B -->|Yes| C["Analyst: Brainstorming (Optional)"]
    B -->|No| G{"Project Brief Available?"}
    C --> C2["Analyst: Market Research (Optional)"]
    C2 --> C3["Analyst: Competitor Analysis (Optional)"]
    C3 --> D["Analyst: Create Project Brief"]
```

## Features

- Automatic markdown file detection
- Live Mermaid diagram rendering
- Clean, simple interface
- File browser sidebar

That's it!