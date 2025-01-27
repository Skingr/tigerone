# tiger one

## Getting Started

Execute
```
npm install next react react-dom

```

Create a .env.local file at the root directory. The variable within should be:

```
OPENAI_API_KEY = [Sawyers API-key no brackets]
DATABASE_URL= [Contact Isaac for the key]
CANVAS_API_KEY=[follow below directions]
```

For the canvas api key, go to canvas->account->settings->approved integrations->new access token.
Copy this into the .env, make sure there is a ' ' surround the key
### IMPORTANT
Make sure your .gitignore has this:
```
/node_modules/
.env
*.log
.vscode/
.idea/
.DS_Store
package-lock.json

```
Crucial that we include the .env so we dont publish our key.
