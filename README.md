# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

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
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


/* 🌈 Global Styles */
body {
  background: linear-gradient(135deg, #f0f4ff, #e3f2fd);
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
}

/* 🧊 Container */
.container {
  max-width: 850px;
  margin: 40px auto;
  background: #ffffffa8;
  backdrop-filter: blur(6px);
  padding: 25px 35px;
  border-radius: 16px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
}

/* 🏷️ Title */
h1 {
  text-align: center;
  color: #1565c0;
  margin-bottom: 25px;
}

/* 📝 Form Section */
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.form input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  flex: 1 1 200px;
}

.form button {
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: 0.3s;
}

.form button:hover {
  background: #0d47a1;
}

/* Image preview */
.preview-img {
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-top: 5px;
}

/* 🔍 Filter Section */
.filters {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.filters input,
.filters select,
.filters button {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.filters button {
  background: #388e3c;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.filters button:hover {
  background: #2e7d32;
}

/* 👥 Contact Cards */
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9ff;
  border-radius: 12px;
  padding: 12px 18px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.07);
  transition: 0.3s;
}

.card:hover {
  transform: scale(1.01);
  background: #f3f6ff;
}

/* 🖼️ Profile Image */
.profile-pic {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.3s;
}

.profile-pic:hover {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

/* ℹ️ Info Section */
.info {
  flex: 1;
  margin-left: 15px;
}

.info h3 {
  margin: 0;
  color: #1565c0;
}

.info p {
  margin: 3px 0;
  color: #444;
}

/* ✏️ Action Buttons */
.actions button {
  margin-right: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.actions button:first-child {
  background-color: #4caf50;
  color: white;
}

.actions button:last-child {
  background-color: #e53935;
  color: white;
}

.actions button:hover {
  opacity: 0.85;
}

/* 🔢 Pagination */
.pagination {
  text-align: center;
  margin-top: 20px;
}

.pagination button {
  margin: 3px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  transition: 0.3s;
}

.pagination button.active {
  background: #1565c0;
  color: white;
  border: none;
}

/* 🖼️ Image Popup Overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  max-width: 90%;
  max-height: 90%;
}

.popup-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

