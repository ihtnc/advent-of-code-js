[![build](https://img.shields.io/github/actions/workflow/status/ihtnc/advent-of-code-js/build.yml?label=build&logo=github+actions&logoColor=white)](https://github.com/ihtnc/advent-of-code-js/actions/workflows/build.yml)
[![deploy](https://deploy-badge.vercel.app/vercel/advent-of-code-js?name=website)](https://advent-of-code-js.vercel.app/)

# Advent of Code JS
An app with solutions to the [Advent of Code](https://adventofcode.com/) challenges.

## Folder structure
Solutions to the Advent of Code challenges are located in the folder `/app/solutions/(year)/` with the following structure:

```plaintext
./app/solutions/(year)
├── /2024                        # Each year will have its own folder
    ├── /1                       # Each challenge day will have its own folder
        ├── page.tsx             # (Required) The page component
        ├── solution-part1.tsx   # See solution code files section
        ├── solution-part2.tsx   # See solution code files section
        ├── other files          # As required
```

## Solution code files
The solution code files are written in TypeScript and are located in the same folder as the page component. They are important as they are used in build scripts to generate the code snippets used for displaying code on the website.

These code snippets are also used to derive the list of solutions displayed on the main page.

### Naming convention
The solution code file should follow the format:

```
solution-part#.tsx
```

where `#` is the part number which the solution code file is for.

### Content
Solution code files are TypeScript files that export a function that returns the answer to the challenge. It can then be imported into the page component and subsequently called to retrieve the answer.

It is recommended for the file to only include the main logic for solving the challenge.

If there are any additional code needed by the solution code file, they can just be placed in a separate file and then imported.

### Build script
There are prebuild scripts in the project that copies these specific solution code files to the `/api/code/contents` folder. This is what allows the `SolutionDetails` component to display the code. There is no need to manually copy the files over.

After the build script runs, the code snippets will be available in the `/api/code/contents` folder.

```plaintext
./app
├── /solutions/(year)
│   ├── /2024                                # Each folder will be copied
│       ├── /1                               # Each folder will be copied
│           ├── solution-part1.tsx           # Copied and renamed
│           ├── solution-part2.tsx           # Copied and renamed
│           ├── other files                  # Not copied
├── /api
    ├── /code
        ├── /contents
            ├── /2024
                ├── /1
                    ├── solution-part1.txt
                    ├── solution-part2.txt
```

### SolutionDetails component
The [`SolutionDetails`](app/components/solution-details.tsx#L8) component is used to display the answer to a specific challenge as well as display a code snippet that was used to derive the answer. It looks for the code snippets for a particular challenge in the `/api/code/contents` folder.

> **NOTE:** When displaying the code, `import`, `export`, and `type` definition statements are automatically stripped off.

> **IMPORTANT:** The solution code files should not contain any sensitive information, as they will be publicly available on the website.

### Solutions list
The list of solutions displayed on the main page is derived from the generated code snippets. The list is generated by reading the contents of the `/api/code/contents` folder.

Each folder represents a year, each subfolder represents a challenge day, and each code snippet represents a star which serves as an indicator of the number of parts completed for that challenge.

## Debugging
1. Enable server debugging by uncommenting the`NODE_OPTIONS='--inspect'` line on the [`.env.development`](.env.development) file.
2. Start the next application with `npm run dev`.
3. Open the Chrome DevTools and go to the `chrome://inspect` page.
4. Click on the `inspect` link to open the DevTools for the server.
   * If the link is not available, click on the `Configure...` button and add the server address (i.e.: `localhost:3000`).
5. Add breakpoints to the server code and start debugging.

## Advent of Code session

The application requires a session cookie to be able to fetch the challenge data from the Advent of Code website.

To get the session cookie:
1. Open the [Advent of Code](https://adventofcode.com/) website.
2. Log in to your account.
3. Open the browser's developer tools.
4. Go to the `Application` tab and expand the `Cookies` section.
5. Copy the value of the `session` cookie.