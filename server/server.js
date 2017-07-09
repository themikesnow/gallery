import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import galleryApp from '../src/reducers';
import App from '../src/components/App/App.react';


const app = express();
const port = 3000;

app.use('/public', express.static('dist/'));

function renderFullPage(html, preloadedState) {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Gallery</title>
        <link href="https://fonts.googleapis.com/css?family=Exo+2" rel="stylesheet">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/public/bundle.js"></script>
        <script src="https://use.fontawesome.com/a87dd00f4b.js"></script>
      </body>
    </html>
    `;
}

function handleRender(req,res) {
  const store = createStore(galleryApp);

  const html = renderToString(
    <Provider store={store} >
      <App/>
    </Provider>,
  );

  const preloadedState = store.getState();

  res.send(renderFullPage(html, preloadedState));
}

app.use(handleRender);

app.listen(port, () => {
  console.log('Application running on port : ', port);
});
