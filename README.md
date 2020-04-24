# Time Tracker
A quick, easy way for a remote developer to set hour goals for each of their projects.

## Why did I make this?
I made this app because I felt I needed a quick reminder of how many hours I had accumulated without having to look through HR software or a timesheet. I also made this because I wanted to set goals for myself and be able to track those goals in real time during my daily workflow.

## Stack

This project was scaffolded with:
- Electron
- React
- Redux
- Redux Persist
- Typescript
- Webpack

I chose to use electron because it works great across a myriad of systems, redux and redux persist to keep track of the application state, typescript to help catch errors with complex data manipulation and webpack to allow for hot reloading during development.

### Development

Launching the development environment is simple.

1. ```yarn install```
2. ```yarn dev```

After this command you will have a webpack dev server running at port 9080

These are scripts you can run for linting the repository or building from the source.

- ```yarn lint``` - Lints the repository
- ```yarn test``` - Lints the repository and runs the test suite
- ```yarn electron:build``` - Compiles binaries for Linux, Mac and Windows to `/dist`
- ```yarn electron:build:mac``` - Compiles binaries only for Mac to `/dist`
- ```yarn electron:build:win``` - Compiles binaries only for Windows to `/dist`

### Contributors

| Name          | Role                   | Email                |
|---------------|------------------------|----------------------|
| Matt Irizarry | Architect and Designer | matthew@irizarry.dev |s