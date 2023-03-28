<img width="808" alt="california seismic logo" src="https://user-images.githubusercontent.com/55897006/227744390-1e71bdd3-e6cb-453b-ae8b-ad0974dd13a0.png">

# California Seismic

The first free resource for passing the California Seismic Principles Exam.\
We are currently working on updating the website and publishing our bank of 400+ lecture pages, 200+ practice problems, and 10+ lecture vidoes to the website. Expected completion Fall 2023

## Making Updates
CaliforniaSeismic.com is automatically updated via CodePipeline with changes to the Master branch of this Github Repository. The files in the /build folder are stored into an AWS S3 bucket and distributed through Cloudfront.

To make updates, run 'npm run build' in the console. The production files will be written to the /build folder.

If updates are not visible within a few minutes of merging changes to the Master branch, verify if Cloudfront is caching a previous version, or if the local browser is caching the website.

## Installation & Setup
After cloning the Master branch to your local computer, create a new branch and download the project dependencies.

#### `git checkout -b <YourBranchName> `

*YourBranchName* should be a short description of the feature/fix that the branch will address.

#### `npm install`

Installs project dependencies from package.json

## Available Scripts for Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

