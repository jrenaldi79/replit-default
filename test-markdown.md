# Markdown Preview Test

This file tests various markdown rendering features.

## Headings

### Subheading
#### Sub-subheading

## Text Formatting

This is **bold text** and this is *italic text*.

Here's some `inline code` and a [link to Google](https://google.com).

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Code Block

```javascript
function hello() {
  console.log("Hello, World!");
  return true;
}
```

## Blockquote

> This is a blockquote
> It can span multiple lines

## Mermaid Diagrams

### Flowchart Example

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
    C --> E[End]
```

### Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    User->>Browser: Click file
    Browser->>Server: Fetch markdown
    Server->>Browser: Return HTML
    Browser->>User: Display content
```

### Class Diagram

```mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +String breed
        +bark()
    }
    class Cat {
        +meow()
    }
    Animal <|-- Dog
    Animal <|-- Cat
```

## Table

| Feature | Status |
|---------|--------|
| Markdown | ✅ |
| Mermaid | ✅ |
| Styling | ✅ |

## Conclusion

This test file demonstrates that the markdown preview supports all standard markdown features plus Mermaid diagrams!
