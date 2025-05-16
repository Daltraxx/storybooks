# Storybooks
Storybooks is a webapp where users can sign in using their Google accounts, share stories, and view stories shared by other users.
<!-- add screenshots -->
<!-- **Link to project:** Looking for affordable/free hosting service -->

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express.js, Handlebars.js, MongoDB, Materialize

This is a server-side rendered app with an MVC structure. It uses passport combined with the Google OAuth 2.0 API to allow users to sign in using their Google accounts. It also protects certain routes using authentication middleware, ensuring that only signed-in users have access to the relevant pages and redirects the user if this is not the case.

The application uses MongoDB for storage and mongoose for interaction with the database, storing users and their stories as well as sessions (using express-session and connect-mongo) so that logins can remain persistent.

Views are dynamically rendered using express-handlebars, displaying stories that have been set to 'public' by their respective users. 'Private' stories will only appear if the logged-in user is the user is the owner of that story. Stories, can be added, edited, and deleted freely. Mongoose and its schemas are used for interaction with MongoDB and consistency regarding that data held within collections and documents. Regarding the styling of the webpages, Materialize is used for most of the heavy lifting.

Users are also able to search for stories by their title. The request is handled by client-side JS in this case, though client-js is forgone in almost all other cases. For example, when it's necessary for a form to submit a PUT request, such as when editing an existing story, method overriding (using the method-override npm module) is used.

## Optimizations

Optimizations and updates to be factored in at a later time include more caching to limit requests sent, particularly for Google user information, and more client-side dom manipulation (likely through a framework such as React) to limit the necessary page reloads and requests sent.

I would also like to add more authentication methods so that usage is not contingent on the user having a Google account.

## Lessons Learned:

This webapp was a wonderful exercise in using many NPM modules such as passport, express-session, express-handlebars, and others. The ease of use of passport with the google-oauth-20 google strategy was unexpected, and I also learned a lot about writing and configuring helpers and middleware to store and access user data for rendering and ensuring the correct authentication level with each page request. Materialize was very helpful in quickly styling the views without too much custom CSS allowing quick presentation with very little development time in terms of styling.