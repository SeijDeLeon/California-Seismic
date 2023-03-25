<img width="808" alt="california seismic logo" src="https://user-images.githubusercontent.com/55897006/227744390-1e71bdd3-e6cb-453b-ae8b-ad0974dd13a0.png">

# California Seismic

The first free resource for passing the California Seismic Principles Exam.\
We are currently working on updating the website and publishing our bank of 400+ lecture pages, 200+ practice problems, and 10+ lecture vidoes to the website. Expected completion Fall 2023

## CodePipeline
Any commit to the master branch will trigger a process within AWS CodePipeline to pull all contents of the Master branch, export all files in the build folder, and store contents into an S3 bucket for deployal through CloudFront to CaliforniaSeismic.com. 

## Available Scripts from Create-React-App

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


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

