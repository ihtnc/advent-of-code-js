[![build](https://img.shields.io/github/actions/workflow/status/ihtnc/advent-of-code-js/build.yml?label=build&logo=github+actions&logoColor=white)](https://github.com/ihtnc/advent-of-code-js/actions/workflows/build.yml)
[![deploy](https://deploy-badge.vercel.app/vercel/advent-of-code-js?name=website)](https://advent-of-code-js.vercel.app/)

# Advent of Code JS
See it [live](https://advent-of-code-js.vercel.app/)!

Repository for the app with solutions to the [Advent of Code](https://adventofcode.com/) challenges.

## Application
The app displays the solutions to the various Advent of Code challenges. It uses a set of sample inputs to derive the answers to the challenges. These inputs are taken from the illustrations on the challenge description itself.

The application also displays the solution to that challenge in a code snippet format, as well as the various type definitions used in the code.

There is also an option to sign in with the Advent of Code session to fetch the actual challenge input associated to that session instead of the sample inputs. This is useful for verifying the accuracy of the solution.

## Folder structure
Solutions to the Advent of Code challenges are located in the folder `/app/solutions/` with the following structure:

```plaintext
./📂app/📂solutions
├─ /📂2024                    # Each year will have its own folder
   ├─ /📂1                    # Each challenge day will have its own folder
      ├─ 📄page.tsx           # The page component
      ├─ 📄solution-part1.ts  # See special files section
      ├─ 📄solution-part2.ts  # See special files section
      ├─ 📄types.ts           # See special files section
      ├─ 📄input.txt          # See special files section
      ├─ 📄other files        # As required
```

## Special files
### Solution code files
The solution code files are written in TypeScript and are located in the same folder as the page component. They are important as they are used in build scripts to generate the content for displaying code on the application.

These code snippets are also used to derive the list of solutions displayed on the main page.

#### ✅ Naming convention

The solution code file should follow the format:

```
solution-part#.ts
```

where `#` is the part number which the solution code file is for.

#### 📝 Content
Solution code files are TypeScript files that export a function that returns the answer to the challenge. It can then be imported into the page component and subsequently called to retrieve the answer.

It is recommended for the file to only include the main logic for solving the challenge.

If there are any additional code needed by the solution code file, they can just be placed in a separate file and then imported.

### Type definition files
Like the solution code files, the type definition files are written in TypeScript and are also located in the same folder as the page component. They are also used in build scripts to generate the content for displaying type definitions on the application.

#### ✅ Naming convention
The type definition file should follow the format:

```
types.ts
```

#### 📝 Content
Type definition files are TypeScript files that export the different types/enums/interfaces used within the solution for each part of the challenge.

It is recommended for the file to only include the types used in solving the challenge.

### Sample input files
The sample input files are plain text files that contain a valid input for a particular challenge. They are also located in the same folder as the page component and are used in build scripts to generate the content for displaying sample inputs on the application.

> [!NOTE]
> The sample input files are not used in the solution when a valid Advent of Code session has been signed in. The actual challenge input associated to the session will be used instead.

#### ✅ Naming convention
The sample input file should follow the format:

```
input.txt
```

#### 📝 Content
The content of the sample input file should be a valid input for the challenge. The input can be taken from the challenge description itself as there is often a sample input in the description to better illustrate the challenge. They contain a small set of data and are commonly used to verify the accuracy of the solution as it is being written.

## Build script
There are prebuild scripts in the project that copies the special files of each solution from their corresponding `/app/solutions` folder. This is what allows various components like `SolutionDetails` and `TypeDetails` to display their corresponding content. There is no need to manually copy the files over.

After the build script runs, the files will be available in the `/app/actions/text-content/files` folder.

```plaintext
./📂app
├─ /📂solutions
│  ├─ /📂2024                          # Each folder will be copied
│     ├─ /📂1                          # Each folder will be copied
│        ├─ 📄solution-part1.ts        # Copied and renamed
│        ├─ 📄solution-part2.ts        # Copied and renamed
│        ├─ 📄types.ts                 # Copied and renamed
│        ├─ 📄input.txt                # Copied
│        ├─ 📄other files              # Not copied
├─ /📂actions/📂text-content/📂files
   ├─ /📂2024
      ├─ /📂1
         ├─ 📄solution-part1.txt
         ├─ 📄solution-part2.txt
         ├─ 📄types.txt
         ├─ 📄input.txt
```

## Solutions list
The list of solutions displayed on the main page is derived from the generated code snippets. The list is generated by reading the contents of the `/app/actions/text-content/files` folder.

Each folder represents a year, each subfolder represents a challenge day, and each `solution-part#.txt` file represents a star which serves as an indicator of the number of parts completed for that challenge.

## SolutionDetails component
The [`SolutionDetails`](app/components/solution-details.tsx#L10) component is used to display the answer to a specific challenge as well as display a code snippet that was used to derive the answer. It looks for the code snippets for a particular challenge in the `/app/actions/text-content/files` folder.

> [!NOTE]
> When displaying the code, `import`, `export`, and type definition statements (`type`, `interface`, `enum`) are automatically stripped off.

> [!WARNING]
> The solution code files should not contain any sensitive information, as they will be displayed on the application.

## TypeDetails component
The [`TypeDetails`](app/components/type-details.tsx#L8) component is used to display the various types used when solving all parts of the challenge. It looks for a particular type definition file that corresponds to a particular challenge in the `/app/actions/text-contents/files` folder.

> [!NOTE]
> When displaying the types, `import` statements are automatically stripped off. The `export` keyword before each type definition statements (`type`, `interface`, `enum`) are also automatically stripped off if they exist.

> [!WARNING]
> The type definition files should not contain any sensitive information, as they will be displayed on the application.

## Debugging
1. Start the application with server debugging enabled by running `npm run debug`.
2. Navigate to the application from the browser.
3. Open a new tab on the browser and navigate to the `chrome://inspect` page.
4. Click on the `inspect` link on the `chrome://inspect` page to open the DevTools for the server.
5. Add breakpoints to the server code and start debugging.

If the `inspect` link is not available, click the `Configure...` button on the `chrome://inspect` page then add the server address. The details can be found on the console output when the server starts. Look for the text `"the Next.js router server should be inspected at [port]"`.

## Advent of Code session
The application requires a valid session value to be able to fetch the associated input from the Advent of Code website.

To get the session value:
1. Navigate to the [Advent of Code](https://adventofcode.com/) website.
2. Log in to your account.
3. Open the browser's developer tools.
4. Go to the `Application` tab and expand the `Cookies` section.
5. Copy the value of the `session` cookie.