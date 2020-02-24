export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';


//
// ??: Where the hell is dispatch defined?! 
//     Redux has `store.dispatch`, but it's being accessed via some dark magic
//

export const navigate = (path) => (dispatch) => {
  // Makes a func w/ a `path` in its closure
  // The returned function takes a dispatch funtion, gets the page from the path,
  //   applies `loadPage` to that page (and the dispatch func to the result ?!)
  // and dispatches an `updateDrawerState` action to the store, setting `state.drawerOpened` to false

  const page = path === '/' ? 'view1' : path.slice(1); // Extracts the page name from path
  // Any other info you might want to extract from the path (like page type),  you can do here
  
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer
  dispatch(updateDrawerState(false));
};

const loadPage = (page) => (dispatch) => {
  // Makes a func w/ `page` in its closure.
  // The returned function takes a dispatch funtion, imports the page component, and prompts
  //   the reducer to set state.page to the value of the local `page` variable
    

  switch(page) {
    case 'view1':
      import('../components/my-view1.js').then((module) => {        

      
        // *** NOTE: ***
        //
        // Put code in here that you want to run every time when navigating to view1 after my-view1.js is loaded.
        //    



      });
      break;
    case 'view2': import('../components/my-view2.js'); break;
    case 'view3': import('../components/my-view3.js'); break;
    default: page = 'view404'; import('../components/my-view404.js');
  }
  dispatch(updatePage(page));
};

const updatePage = (page) => {
  // Creates an action to pass to the store (like `{ type: UPDATE_PAGE, page: page }` )
  // Reducer respondes by setting state.page to value of local `page` variable
  return { type: UPDATE_PAGE, page };
};

let snackbarTimer;
export const showSnackbar = () => (dispatch) => {
  // Opens snackbar for three seconds
  dispatch({ type: OPEN_SNACKBAR }); // Reducer sets `state.snackbarOpened = true`
  window.clearTimeout(snackbarTimer);
  snackbarTimer = window.setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000); // Reducer sets `state.snackbarOpened = false` (after 3 secs)
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Calls showSnackbar (only if offline status will actually change)
  if (offline !== getState().app.offline) { dispatch(showSnackbar()); }
  // Reducer sets `state.offline` to value of local `offline` variable
  dispatch({ type: UPDATE_OFFLINE, offline });
};

export const updateDrawerState = (opened) => {
  // Reducer sets `state.drawerOpened` to value of local `opened` variable 
  return { type: UPDATE_DRAWER_STATE, opened };
};
